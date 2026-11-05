import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind v4 is compiled through PostCSS (see postcss.config.mjs), which
  // works for both the webpack and Turbopack builders.
  // Allow the sandbox preview proxy (and localhost aliases) to use dev assets.
  allowedDevOrigins: ["*.e2b.app", "127.0.0.1", "localhost"],
  images: {
    // Poster/cover artwork in /public is first-party SVG; the optimizer
    // rejects SVG unless this is enabled explicitly.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
