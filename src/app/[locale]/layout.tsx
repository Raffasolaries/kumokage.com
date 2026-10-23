import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { COMPANY, FOUNDER, FOUNDER_ID, ORG_ID, SITE_URL, WEBSITE_ID, isLocale } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

/** Site-wide defaults. Canonical, hreflang and OpenGraph are set per page via pageMetadata(). */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: t("template") },
    description: t("description"),
    applicationName: COMPANY.name,
    authors: [{ name: COMPANY.name, url: SITE_URL }],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

/** Organization entity shared by every localized page. */
const orgGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: COMPANY.name,
      legalName: COMPANY.name,
      alternateName: [...COMPANY.alternateNames],
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og-image.png`,
      email: COMPANY.email,
      foundingDate: COMPANY.foundingDate,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${COMPANY.careOf}, ${COMPANY.street}`,
        postalCode: COMPANY.postalCode,
        addressLocality: COMPANY.locality,
        addressRegion: "ZH",
        addressCountry: "CH",
      },
      identifier: [
        { "@type": "PropertyValue", propertyID: "CH-UID", value: COMPANY.uid },
        { "@type": "PropertyValue", propertyID: "Handelsregister Zürich", value: COMPANY.registerNumber },
      ],
      areaServed: [
        { "@type": "Country", name: "Switzerland" },
        { "@type": "Place", name: "Europe" },
      ],
      knowsLanguage: ["en", "it"],
      knowsAbout: [
        "Amazon Web Services",
        "Cloud architecture",
        "Cloud security",
        "Information security",
        "AWS landing zones",
        "Disaster recovery",
        "Amazon EKS",
        "Infrastructure as code",
        "Amazon Bedrock",
        "Agentic AI",
      ],
      founder: {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: FOUNDER.name,
        url: FOUNDER.website,
        sameAs: [FOUNDER.linkedin, FOUNDER.credly],
      },
      sameAs: [COMPANY.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: COMPANY.name,
      inLanguage: [...locales],
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd data={orgGraph} />
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
