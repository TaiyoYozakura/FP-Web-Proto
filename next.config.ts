import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['tse3.mm.bing.net', 'www.dnyanasadhanacollege.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;