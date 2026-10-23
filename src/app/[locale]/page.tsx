import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mark } from "@/components/Mark";
import { CREDENTIALS, badgeUrl } from "@/lib/credentials";
import { CAPABILITY_STATEMENT, COMPANY, FOUNDER, isLocale, pageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.home" });
  return {
    ...pageMetadata({ locale, path: "", title: t("title"), description: t("description") }),
    // The home title already contains the company name; skip the "%s · Kumokage GmbH" template.
    title: { absolute: t("title") },
  };
}

const SERVICES = ["landing", "security", "platforms", "ai", "leadership"] as const;
const RECORD = ["zones", "accounts", "archive", "domains"] as const;
const WORK = ["gaming", "iot", "fintech", "reevo", "institution"] as const;
const ENGAGE = ["assess", "build", "run", "workshops"] as const;
const HOW = ["code", "change", "privilege", "resilience", "docs"] as const;
const GLANCE = ["principal", "company", "platforms", "languages", "serving"] as const;

const STACKS: Record<(typeof WORK)[number], string[]> = {
  gaming: ["Terraform", "EKS", "Aurora", "CloudFront", "WAFv2", "Shield Advanced", "Valkey", "AWS Backup", "Amazon MQ"],
  iot: ["Bedrock AgentCore", "Lambda", "EventBridge", "DynamoDB", "AWS CDK", "GitLab OIDC", "Cognito", "Entra ID"],
  fintech: ["Control Tower", "IAM Identity Center", "ECS", "AppSync", "S3 Object Lock", "KMS", "Managed Grafana", "Route 53"],
  reevo: ["EKS", "ArgoCD", "Karpenter", "Transit Gateway", "Direct Connect", "Network Firewall", "Terraform"],
  institution: ["AWS Backup", "Network Firewall", "Security Hub", "Config", "StackSets", "CDK", "Step Functions"],
};

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "!text-washi/70" : ""}`}>{children}</p>;
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
    </svg>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations();
  const certifications = CREDENTIALS.filter((c) => c.kind === "certification");
  const roles = CREDENTIALS.filter((c) => c.kind === "badge");
  const mailto = `mailto:${FOUNDER.email}`;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <span className="rule-accent" aria-hidden="true" />
            <p className="eyebrow mt-4">{t("hero.eyebrow")}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-sumi sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">{t("hero.lead")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={mailto}
                className="inline-flex items-center rounded-md bg-sumi px-6 py-3 text-sm font-medium text-washi transition-colors hover:bg-aizome-dark"
              >
                {t("hero.ctaContact")}
              </a>
              <a
                href={CAPABILITY_STATEMENT}
                className="inline-flex items-center gap-2 rounded-md border border-rule px-6 py-3 text-sm font-medium text-sumi transition-colors hover:border-aizome hover:text-aizome"
              >
                <DownloadIcon />
                {t("hero.ctaPdf")}
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Mark alt={t("hero.markAlt")} className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* What we do + at a glance */}
      <section id="services" className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Eyebrow>{t("services.eyebrow")}</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">{t("services.title")}</h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((key) => (
              <div key={key} className="border-t border-rule pt-5">
                <h3 className="text-base font-semibold text-sumi">{t(`services.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink">{t(`services.items.${key}.text`)}</p>
              </div>
            ))}
            <aside className="rounded-lg bg-panel p-6">
              <Eyebrow>{t("glance.eyebrow")}</Eyebrow>
              <dl className="mt-4 space-y-3 text-sm">
                {GLANCE.map((key) => (
                  <div key={key}>
                    <dt className="font-semibold text-sumi">{t(`glance.${key}Label`)}</dt>
                    <dd className="text-ink">{t(`glance.${key}`)}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section id="record" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Eyebrow>{t("record.eyebrow")}</Eyebrow>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECORD.map((key) => (
              <li key={key} className="rounded-lg bg-panel p-6">
                <p className="text-4xl font-semibold tracking-tight text-sumi">{t(`record.items.${key}.value`)}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{t(`record.items.${key}.text`)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate">{t("record.drill")}</p>
        </div>
      </section>

      {/* Selected engagements */}
      <section id="work" className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Eyebrow>{t("work.eyebrow")}</Eyebrow>
          <p className="mt-3 max-w-3xl text-sm text-slate">{t("work.note")}</p>
          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {WORK.map((key) => (
              <li key={key} className="grid gap-3 py-8 md:grid-cols-[11rem_1fr] md:gap-8">
                <p className="text-sm text-slate">{t(`work.items.${key}.period`)}</p>
                <div>
                  <h3 className="text-lg font-semibold text-sumi">{t(`work.items.${key}.title`)}</h3>
                  <p className="mt-1 text-sm text-slate">{t(`work.items.${key}.client`)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink">{t(`work.items.${key}.text`)}</p>
                  <p className="mt-4 font-mono text-xs text-slate">{STACKS[key].join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we engage / how we work */}
      <section id="engage" className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div>
            <Eyebrow>{t("engage.eyebrow")}</Eyebrow>
            <dl className="mt-6 space-y-4 text-sm leading-relaxed">
              {ENGAGE.map((key) => (
                <div key={key}>
                  <dt className="inline font-semibold text-sumi">{t(`engage.items.${key}.title`)}: </dt>
                  <dd className="inline text-ink">{t(`engage.items.${key}.text`)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Eyebrow>{t("how.eyebrow")}</Eyebrow>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
              {HOW.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aizome" aria-hidden="true" />
                  {t(`how.items.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="border-t border-rule bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>{t("founder.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t("founder.name")}</h2>
            <p className="mt-1 text-sm font-medium text-aizome">{t("founder.role")}</p>
            <p className="mt-6 leading-relaxed text-ink">{t("founder.bio")}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="text-aizome hover:text-aizome-dark">
                {t("founder.linkedin")} ↗
              </a>
              <a href={FOUNDER.website} target="_blank" rel="noopener noreferrer" className="text-aizome hover:text-aizome-dark">
                {t("founder.website")} ↗
              </a>
              <a href={FOUNDER.credly} target="_blank" rel="noopener noreferrer" className="text-aizome hover:text-aizome-dark">
                {t("founder.credly")} ↗
              </a>
            </div>
          </div>
          <div className="rounded-lg bg-panel p-6 text-sm">
            <Eyebrow>{t("founder.certsTitle")}</Eyebrow>
            <ul className="mt-4 space-y-2">
              {certifications.map((c) => (
                <li key={c.badgeId}>
                  <a href={badgeUrl(c)} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-aizome">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Eyebrow>{t("founder.rolesTitle")}</Eyebrow>
            </div>
            <ul className="mt-4 space-y-2">
              {roles.map((c, i) => (
                <li key={c.badgeId}>
                  <a href={badgeUrl(c)} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-aizome">
                    {c.name}
                  </a>
                  {i === 0 ? <span className="block text-xs text-slate">{t("founder.smeNote")}</span> : null}
                </li>
              ))}
            </ul>
            <a href={FOUNDER.credly} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-xs text-slate hover:text-aizome">
              {t("founder.verify")} ↗
            </a>
          </div>
        </div>
      </section>

      {/* The name */}
      <section className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:gap-12 sm:px-8">
          <p className="shrink-0 text-5xl font-light tracking-[0.3em] text-slate" lang="ja" aria-hidden="true">
            雲影
          </p>
          <div>
            <Eyebrow>{t("name.eyebrow")}</Eyebrow>
            <p className="mt-2 text-lg leading-relaxed text-ink">{t("name.text")}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-sumi text-washi">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Eyebrow light>{t("contact.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">{t("contact.title")}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-washi/80">{t("contact.text")}</p>
            <p className="mt-6 text-sm text-washi/60">
              {t("contact.languages")} {t("contact.serving")}
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-washi/60">{t("contact.email")}</p>
              <a href={mailto} className="text-lg font-medium text-washi underline decoration-washi/30 underline-offset-4 hover:decoration-washi">
                {FOUNDER.email}
              </a>
            </div>
            <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="block text-washi/80 hover:text-washi">
              {t("contact.linkedin")} ↗
            </a>
            <a href={CAPABILITY_STATEMENT} className="flex items-center gap-2 text-washi/80 hover:text-washi">
              <DownloadIcon />
              {t("contact.pdf")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
