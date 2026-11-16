import { accessToken, SITE_ACCESS_COOKIE } from "@/lib/siteAccess";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await accessToken();
  const unlocked = request.cookies.get(SITE_ACCESS_COOKIE)?.value === token;

  if (unlocked) {
    if (pathname === "/coming-soon") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/coming-soon" || pathname.startsWith("/api/access")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|svg|jpg|jpeg|gif|webp|ico)$).*)"],
};
