import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMPANY, FOUNDER, isLocale, pageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.legal" });
  return pageMetadata({ locale, path: "legal", title: t("title"), description: t("description") });
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-sumi">{label}</dt>
      <dd className="text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-16 sm:px-8">
      <span className="rule-accent" aria-hidden="true" />
      <p className="eyebrow mt-4">{t("eyebrow")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>

      <dl className="mt-10 border-b border-rule">
        <Row label={t("companyLabel")}>
          <strong className="font-semibold text-sumi">{COMPANY.name}</strong>
          <br />
          {COMPANY.alternateNames.join(" · ")}
          <br />
          {t("legalForm")}
        </Row>
        <Row label={t("officeLabel")}>
          {COMPANY.name}
          <br />
          {COMPANY.careOf}
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.postalCode} {COMPANY.locality}, {t("country")}
        </Row>
        <Row label={t("directorLabel")}>{FOUNDER.name}</Row>
        <Row label={t("registerLabel")}>
          {t("register")}, {COMPANY.registerNumber}
        </Row>
        <Row label={t("uidLabel")}>
          {COMPANY.uid} ·{" "}
          <a href={COMPANY.registerExtract} target="_blank" rel="noopener noreferrer" className="text-aizome hover:text-aizome-dark">
            {t("extract")} ↗
          </a>
        </Row>
        <Row label={t("contactLabel")}>
          <a href={`mailto:${COMPANY.email}`} className="text-aizome hover:text-aizome-dark">
            {COMPANY.email}
          </a>
        </Row>
      </dl>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">{t("liabilityTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">{t("liability")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">{t("copyrightTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">{t("copyright")}</p>
      </section>

      <section className="mt-8" id="privacy">
        <h2 className="text-lg font-semibold">{t("privacyTitle")}</h2>
        <div className="mt-2 space-y-3 text-sm leading-relaxed text-ink">
          <p>{t("privacy1")}</p>
          <p>
            {t("privacy2")}{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-aizome hover:text-aizome-dark">
              {t("cloudflarePolicy")} ↗
            </a>
          </p>
          <p>{t("privacy3")}</p>
          <p>
            {t("privacy4")}{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-aizome hover:text-aizome-dark">
              {COMPANY.email}
            </a>
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">{t("mcpTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {t("mcp")}{" "}
          <Link href="/privacy" hrefLang="en" className="text-aizome hover:text-aizome-dark">
            kumokage.com/privacy
          </Link>
        </p>
      </section>

      <p className="mt-12 text-xs text-slate">{t("updated")}</p>
    </article>
  );
}
