import Link from "next/link";
import { Mark } from "@/components/Mark";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
  title: "Page not found · Kumokage GmbH",
  robots: { index: false, follow: true },
};

/** Root 404, served by the Worker's assets (not_found_handling = "404-page"). Trilingual and self-contained. */
export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen items-center justify-center bg-washi px-6 font-sans text-sumi antialiased">
        <main className="max-w-xl text-center">
          <Mark className="mx-auto h-20 w-auto" />
          <p className="eyebrow mt-8">404</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Page not found · Seite nicht gefunden · Pagina non trovata
          </h1>
          <p className="mt-4 text-slate">
            The page you requested does not exist or has moved.
            <br />
            Die angeforderte Seite existiert nicht oder wurde verschoben.
            <br />
            La pagina richiesta non esiste o è stata spostata.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium">
            <Link href="/en" className="rounded-md bg-sumi px-5 py-2.5 text-washi">English</Link>
            <Link href="/de" className="rounded-md border border-rule px-5 py-2.5">Deutsch</Link>
            <Link href="/it" className="rounded-md border border-rule px-5 py-2.5">Italiano</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
