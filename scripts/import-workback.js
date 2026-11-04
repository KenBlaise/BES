const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const xlsx = path.join(
  __dirname,
  "..",
  "Blaze_Eyewear_Studio_Grand_Opening_Workback_2027.xlsx",
);
const dest = path.join(process.env.TEMP, "workback-xlsx-import");
const zip = path.join(process.env.TEMP, "workback-xlsx-import.zip");

fs.copyFileSync(xlsx, zip);
fs.rmSync(dest, { recursive: true, force: true });
execFileSync("powershell", [
  "-NoProfile",
  "-Command",
  `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${zip.replace(/\\/g, "\\\\")}', '${dest.replace(/\\/g, "\\\\")}')`,
]);

const xml = fs.readFileSync(path.join(dest, "xl/worksheets/sheet2.xml"), "utf8");
const rows = [...xml.matchAll(/<x:row r="(\d+)"[\s\S]*?<\/x:row>/g)];

function excelDate(n) {
  const d = new Date(Date.UTC(1899, 11, 30));
  d.setUTCDate(d.getUTCDate() + Number(n));
  return d.toISOString().slice(0, 10);
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");
}

function cells(row) {
  const map = {};
  for (const m of row.matchAll(
    /<x:c r="([A-Z]+)(\d+)"([^>]*)>(?:<x:f[^>]*>[\s\S]*?<\/x:f>)?(?:<x:v>([\s\S]*?)<\/x:v>)?<\/x:c>/g,
  )) {
    map[m[1]] = decode(m[4] || "");
  }
  return map;
}

const events = rows.slice(1).map((r) => {
  const c = cells(r[0]);
  return {
    id: c.A,
    workstream: c.B,
    title: c.C,
    startDate: excelDate(c.D),
    dueDate: excelDate(c.E),
    owner: c.F,
    priority: c.G,
    status: c.H,
    criticalPath: c.I === "Yes",
    dependency: c.J || undefined,
    criteria: c.K || undefined,
    notes: c.L || undefined,
  };
});

const targetOpening = events.find((event) => event.id === "BES-086")?.dueDate ?? "2027-02-26";

const file = `export type WorkbackStatus =
  | "Not Started"
  | "In Progress"
  | "Blocked"
  | "Complete"
  | "Deferred";

export type WorkbackEvent = {
  id: string;
  workstream: string;
  title: string;
  startDate: string;
  dueDate: string;
  owner: string;
  priority: "P0" | "P1" | "P2";
  status: WorkbackStatus;
  criticalPath: boolean;
  dependency?: string;
  criteria?: string;
  notes?: string;
};

export const workbackTargetOpening = "${targetOpening}";

export const workbackEvents: WorkbackEvent[] = ${JSON.stringify(events, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, "..", "mock", "workback.ts"), file);
console.log(`wrote ${events.length} events, opening ${targetOpening}`);
