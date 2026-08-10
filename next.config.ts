import type { NextConfig } from "next";

const isSitesHostingBuild = process.env.SITES_HOSTING_BUILD === "1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isSitesHostingBuild ? "" : "/portfolio",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
