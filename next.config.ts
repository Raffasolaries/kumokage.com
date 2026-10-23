import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No trailing slashes: /privacy must stay exactly where the Google OAuth branding points.
  trailingSlash: false,
};

export default withNextIntl(nextConfig);
