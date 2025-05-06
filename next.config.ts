import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3.5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.olmat.web.id",
        pathname: "/**", // support semua path
      },
    ],
  },
};

export default nextConfig;
