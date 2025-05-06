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
        pathname: "/imgs/**",
      },
      {
        protocol: "https",
        hostname: "api.olmat.web.id",
        pathname: "/attachments/**",
      },
    ],
  },
};

export default nextConfig;
