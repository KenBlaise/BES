import { PublicShell } from "@/components/public/PublicShell";
import { BlazeProvider } from "@/lib/store/BlazeProvider";
import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Blaze Eyewear Studio — Ignite Your Style",
  description:
    "Independent eyewear studio in Snellville, GA. Premium frames, personal styling, and a modern optical experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable} font-sans antialiased`}>
        <BlazeProvider>
          <PublicShell>{children}</PublicShell>
        </BlazeProvider>
      </body>
    </html>
  );
}
