"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

/** EN · DE · IT switcher that keeps the current page. Text labels only: Switzerland has four languages, so no flags. */
export function LocaleSwitcher({ label }: { label: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const current = segments[1] as Locale;

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-xs font-medium">
      {locales.map((locale, i) => {
        const active = locale === current;
        const href = ["", locale, ...segments.slice(2)].join("/");
        return (
          <span key={locale} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden="true" className="text-rule">·</span> : null}
            <Link
              href={href}
              hrefLang={locale}
              lang={locale}
              title={localeNames[locale]}
              aria-current={active ? "page" : undefined}
              className={`rounded px-1.5 py-1 tracking-wider transition-colors ${
                active ? "text-sumi underline decoration-aizome decoration-2 underline-offset-4" : "text-slate hover:text-sumi"
              }`}
            >
              {locale.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
