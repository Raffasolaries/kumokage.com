import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { Logo } from "./Mark";
import { LocaleSwitcher } from "./LocaleSwitcher";

const SECTIONS = ["services", "work", "founder", "contact"] as const;

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <header className="sticky top-0 z-30 border-b border-rule/70 bg-washi/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-sumi focus:px-3 focus:py-2 focus:text-washi"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={`/${locale}`} className="shrink-0">
          <Logo label={t("home")} />
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label={t("main")} className="hidden items-center gap-6 text-sm text-ink md:flex">
            {SECTIONS.map((section) => (
              <a key={section} href={`/${locale}#${section}`} className="transition-colors hover:text-aizome">
                {t(section)}
              </a>
            ))}
          </nav>
          <LocaleSwitcher label={t("language")} />
        </div>
      </div>
    </header>
  );
}
