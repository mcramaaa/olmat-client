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
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.api.olmat.web.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.olmat.web.id",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
