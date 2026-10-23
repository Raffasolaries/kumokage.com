import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { ROUTES, SITE_URL, STANDALONE_ROUTES, languageAlternates, localizedUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const path of ROUTES) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified,
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.3,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }
  for (const path of STANDALONE_ROUTES) {
    entries.push({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "yearly", priority: 0.2 });
  }
  return entries;
}
