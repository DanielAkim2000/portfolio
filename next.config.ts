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
  /* config options here */
  allowedDevOrigins: ["http://localhost", "http://192.168.1.10"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx", "json"],
  // Note: La configuration i18n dans next.config est obsolète avec l'App Router
  // Nous utilisons le middleware et le plugin next-intl à la place
};

export default withNextIntl(withMDX(nextConfig));
