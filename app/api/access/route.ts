import { accessToken, passwordMatches, SITE_ACCESS_COOKIE } from "@/lib/siteAccess";
import { NextResponse } from "next/server";

async function readPassword(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => null);
    return typeof body?.password === "string" ? body.password : "";
  }
  const form = await request.formData().catch(() => null);
  const value = form?.get("password");
  return typeof value === "string" ? value : "";
}

function redirect(request: Request, path: string) {
  const current = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) current.host = host;
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) current.protocol = `${proto}:`;
  return NextResponse.redirect(new URL(path, current), 303);
}

function withAccessCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SITE_ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function POST(request: Request) {
  const password = await readPassword(request);
  const wantsJson = (request.headers.get("content-type") ?? "").includes("application/json");

  if (!passwordMatches(password)) {
    if (wantsJson) return NextResponse.json({ ok: false }, { status: 401 });
    return redirect(request, "/coming-soon?error=1");
  }

  const token = await accessToken();
  if (wantsJson) return withAccessCookie(NextResponse.json({ ok: true }), token);
  return withAccessCookie(redirect(request, "/"), token);
}
