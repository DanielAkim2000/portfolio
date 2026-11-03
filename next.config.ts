import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
// Spécifier le chemin du fichier de configuration des requêtes
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost", "http://192.168.1.10"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx", "json"],
  images: {
    qualities: [75, 100],
  },
};

export default withNextIntl(withMDX(nextConfig));
