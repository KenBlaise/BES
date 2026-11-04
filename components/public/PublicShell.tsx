"use client";

import { SaveFramePrompt } from "@/components/frames/SaveFramePrompt";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { usePathname } from "next/navigation";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/staff")) {
    return <>{children}</>;
  }
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <SaveFramePrompt />
    </>
  );
}
