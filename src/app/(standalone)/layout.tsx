import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Mark";
import { fontVariables } from "@/lib/fonts";
import { COMPANY, SITE_URL } from "@/lib/site";
import "../globals.css";

/** English-only pages at fixed paths (/privacy, /workspace-mcp) used by the Google OAuth app's branding. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: COMPANY.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <header className="border-b border-rule/70">
          <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-8">
            <Link href="/en">
              <Logo label="Kumokage GmbH, home" />
            </Link>
          </div>
        </header>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
