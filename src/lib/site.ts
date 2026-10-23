import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

export const SITE_URL = "https://kumokage.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
/** The founder's Person entity, defined on his own site. */
export const FOUNDER_ID = "https://raffaelesollecito.org/#person";

/** Company facts, from the commercial register (Zefix / SHAB, October 2026). */
export const COMPANY = {
  name: "Kumokage GmbH",
  alternateNames: ["Kumokage Sàrl", "Kumokage Sagl", "Kumokage LLC"],
  uid: "CHE-257.027.078",
  registerNumber: "CH-020.4.093.816-5",
  registerExtract: "https://zh.chregister.ch/cr-portal/auszug/auszug.xhtml?uid=CHE-257.027.078",
  foundingDate: "2026-10-12",
  careOf: "c/o Enterprise Treuhand Partners GmbH",
  street: "Schifflände 26",
  postalCode: "8001",
  locality: "Zürich",
  email: "info@kumokage.com",
  linkedin: "https://www.linkedin.com/company/kumokage/",
} as const;

export const FOUNDER = {
  name: "Raffaele Sollecito",
  email: "raffaele.sollecito@kumokage.com",
  linkedin: "https://www.linkedin.com/in/raffasolaries/",
  website: "https://raffaelesollecito.org/",
  credly: "https://www.credly.com/users/raffasolaries",
} as const;

/** The two-page capability statement (English), also in the Kumokage shared drive. */
export const CAPABILITY_STATEMENT = "/Kumokage-Capability-Statement.pdf";

/** Localized routes, without the locale prefix ("" = home). No trailing slashes. */
export const ROUTES = ["", "legal"] as const;
export type Route = (typeof ROUTES)[number];

/** English-only pages kept at fixed paths for the Workspace MCP Servers OAuth app. */
export const STANDALONE_ROUTES = ["/workspace-mcp", "/privacy"] as const;

const OG_LOCALES: Record<Locale, string> = { en: "en_US", de: "de_CH", it: "it_CH" };

export const localizedUrl = (locale: string, path: Route = "") =>
  path ? `${SITE_URL}/${locale}/${path}` : `${SITE_URL}/${locale}`;

export function languageAlternates(path: Route = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl("en", path);
  return languages;
}

interface PageMetaInput {
  locale: Locale;
  path: Route;
  title: string;
  description: string;
}

/** Per-page metadata: canonical, hreflang alternates, OpenGraph and Twitter cards. */
export function pageMetadata({ locale, path, title, description }: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      locale: OG_LOCALES[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kumokage GmbH · Secure, resilient cloud platforms" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
