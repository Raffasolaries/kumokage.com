import type { Metadata } from "next";
import { COMPANY, SITE_URL } from "@/lib/site";

// Wording unchanged from the policy published on 21 October 2026 for the Google OAuth app.
export const metadata: Metadata = {
  title: "Privacy policy · Kumokage",
  description: "How Workspace MCP Servers, a private tool by Kumokage, handles Google user data.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const link = "text-aizome underline decoration-aizome/30 underline-offset-2 hover:decoration-aizome";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-14 leading-relaxed text-ink sm:px-8 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-sumi [&_p]:mt-2">
      <h1 className="text-3xl font-semibold tracking-tight text-sumi sm:text-4xl">Privacy policy</h1>
      <p className="text-sm text-slate">Effective 21 October 2026</p>

      <p className="!mt-6">
        Kumokage (“we”) runs <strong>Workspace MCP Servers</strong>, a private tool that lets the account owner&apos;s own AI
        assistants work with the owner&apos;s own Google accounts. It is not offered to the public. This policy explains what it
        does with Google user data.
      </p>

      <h2>Data we access</h2>
      <p>
        Only the data the signed-in account owner grants on Google&apos;s consent screen, through Google&apos;s official Workspace
        APIs: Gmail messages and drafts, Calendar events and availability, Drive files, Docs, Sheets, Slides, and contacts and
        directory profiles.
      </p>

      <h2>How we use it</h2>
      <p>
        Solely to carry out requests the account owner makes to their own AI assistants, for example finding an email, reading a
        document or checking availability. To carry out a request, the relevant data is passed to the AI model provider the owner
        uses for that assistant, and only for that request.
      </p>

      <h2>What we do not do</h2>
      <p>
        We do not sell Google user data, use it for advertising, share it with anyone else, or use it to train or improve AI or
        machine-learning models. No person reads it except the account owner.
      </p>

      <h2>Storage and security</h2>
      <p>
        We store the OAuth credentials needed to reach the APIs, encrypted at rest and readable only by the owner&apos;s private
        development environment. Data retrieved from Google is not stored beyond the request that needed it, except where the
        owner chooses to save a result.
      </p>

      <h2>Limited Use</h2>
      <p>
        Kumokage&apos;s use and transfer of information received from Google APIs adheres to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" className={link}>
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>Your control</h2>
      <p>
        Access can be revoked at any time at{" "}
        <a href="https://myaccount.google.com/permissions" className={link}>
          myaccount.google.com/permissions
        </a>
        . Revoking it stops all access immediately; stored credentials then no longer work.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${COMPANY.email}`} className={link}>
          {COMPANY.email}
        </a>
      </p>
    </article>
  );
}
