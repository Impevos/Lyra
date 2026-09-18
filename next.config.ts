import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "xxkodkthhccenfoikjpa.supabase.co",
      }
    ],
  },
  // Safari cross-origin & security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow Safari to load fonts and resources cross-origin
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Cache static assets properly on Safari
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
