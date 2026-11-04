import { isWorkbackStatus, type WorkbackProgress } from "@/lib/workback/progress";
import { promises as fs } from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "workback-progress.json");
const REPO = process.env.GITHUB_REPO ?? "KenBlaise/BES";
const FILE = process.env.GITHUB_WORKBACK_PATH ?? "data/workback-progress.json";
const BRANCH = process.env.GITHUB_WORKBACK_BRANCH ?? "main";

function githubToken() {
  return process.env.WORKBACK_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
}

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${githubToken()}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function parseProgress(value: unknown): WorkbackProgress {
  if (!value || typeof value !== "object") return {};

  const next: WorkbackProgress = {};
  for (const [id, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!entry || typeof entry !== "object") continue;
    const status = (entry as { status?: unknown }).status;
    const updatedAt = (entry as { updatedAt?: unknown }).updatedAt;
    if (typeof status === "string" && isWorkbackStatus(status)) {
      next[id] = {
        status,
        updatedAt: typeof updatedAt === "string" ? updatedAt : new Date().toISOString(),
      };
    }
  }
  return next;
}

async function readLocal(): Promise<WorkbackProgress> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return parseProgress(JSON.parse(raw));
  } catch {
    return {};
  }
}

async function writeLocal(progress: WorkbackProgress) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, `${JSON.stringify(progress, null, 2)}\n`);
}

async function readGitHub(): Promise<{ progress: WorkbackProgress; sha: string | null }> {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE}?ref=${BRANCH}`,
    { headers: githubHeaders(), cache: "no-store" },
  );

  if (response.status === 404) return { progress: {}, sha: null };
  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status})`);
  }

  const payload = (await response.json()) as { content?: string; sha?: string };
  const decoded = Buffer.from(payload.content ?? "", "base64").toString("utf8");
  return {
    progress: parseProgress(decoded ? JSON.parse(decoded) : {}),
    sha: payload.sha ?? null,
  };
}

async function writeGitHub(progress: WorkbackProgress, sha: string | null, message: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    method: "PUT",
    headers: { ...githubHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(`${JSON.stringify(progress, null, 2)}\n`).toString("base64"),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub write failed (${response.status})`);
  }
}

export async function loadWorkbackProgress(): Promise<{
  progress: WorkbackProgress;
  persist: "github" | "local";
}> {
  if (githubToken()) {
    const { progress } = await readGitHub();
    return { progress, persist: "github" };
  }

  return { progress: await readLocal(), persist: "local" };
}

export async function saveWorkbackProgress(
  id: string,
  status: WorkbackProgress[string]["status"],
): Promise<{ progress: WorkbackProgress; persist: "github" | "local" }> {
  const entry = { status, updatedAt: new Date().toISOString() };

  if (githubToken()) {
    const current = await readGitHub();
    const progress = { ...current.progress, [id]: entry };
    await writeGitHub(progress, current.sha, `Update workback ${id} to ${status}`);
    return { progress, persist: "github" };
  }

  const progress = { ...(await readLocal()), [id]: entry };
  await writeLocal(progress);
  return { progress, persist: "local" };
}
