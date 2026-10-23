import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { COMPANY } from "@/lib/site";
import { Logo } from "./Mark";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-washi">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-slate sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo label={COMPANY.name} />
            <p className="mt-3 text-ink">{t("tagline")}</p>
          </div>
          <nav aria-label={t("legal")} className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`/${locale}/legal`} className="hover:text-sumi">
              {t("legal")}
            </Link>
            <Link href={`/${locale}/legal#privacy`} className="hover:text-sumi">
              {t("privacy")}
            </Link>
            <Link href="/workspace-mcp" hrefLang="en" className="hover:text-sumi">
              {t("mcp")}
            </Link>
            <Link href="/privacy" hrefLang="en" className="hover:text-sumi">
              {t("mcpPrivacy")}
            </Link>
            <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sumi">
              {t("linkedin")}
            </a>
          </nav>
        </div>
        <p className="mt-8 text-xs leading-relaxed">
          {COMPANY.name} · {COMPANY.careOf} · {COMPANY.street} · {COMPANY.postalCode} {COMPANY.locality} · UID {COMPANY.uid}
          <br />© {year} {COMPANY.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
