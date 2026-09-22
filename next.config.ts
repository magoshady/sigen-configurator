import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Sigen finder lives at the root; /sigenergy is the canonical
      // brand path so nav links and direct URLs both resolve.
      { source: "/sigenergy", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
