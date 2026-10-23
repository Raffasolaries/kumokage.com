import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, SITE_URL } from "@/lib/site";

// Description of the Google OAuth app "Workspace MCP Servers"; wording unchanged from the former kumokage.com home page.
export const metadata: Metadata = {
  title: "Workspace MCP Servers · Kumokage",
  description:
    "Workspace MCP Servers is a private tool by Kumokage that connects the account owner's own AI coding assistants to the owner's own Google accounts.",
  alternates: { canonical: `${SITE_URL}/workspace-mcp` },
};

const link = "text-aizome underline decoration-aizome/30 underline-offset-2 hover:decoration-aizome";

export default function WorkspaceMcpPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-14 leading-relaxed text-ink sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-sumi sm:text-4xl">Workspace MCP Servers</h1>
      <p className="mt-6">
        Workspace MCP Servers is a private tool by Kumokage that connects the account owner&apos;s own AI coding assistants (Claude
        Code, Visual Studio Code and GitHub Copilot) to the owner&apos;s own Google accounts, through Google&apos;s official Google
        Workspace MCP servers.
      </p>
      <p className="mt-4">With it, the owner can ask an assistant to:</p>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>search and read Gmail messages and prepare draft replies,</li>
        <li>check Google Calendar events and free/busy times,</li>
        <li>find, read and edit files in Google Drive, Docs, Sheets and Slides,</li>
        <li>look up contacts.</li>
      </ul>
      <p className="mt-4">
        It acts only when the owner asks, only on the accounts the owner signed in with, and only with the permissions granted on
        Google&apos;s consent screen. It is not offered to the public. How it handles Google user data is described in the{" "}
        <Link href="/privacy" className={link}>
          privacy policy
        </Link>
        .
      </p>
      <p className="mt-8 text-sm text-slate">
        <a href={`mailto:${COMPANY.email}`} className={link}>
          {COMPANY.email}
        </a>
      </p>
    </article>
  );
}
