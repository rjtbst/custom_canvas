import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: false,
  images: {
   remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bzzgtontsdiwwyfoadqf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**', // allow any path under storage
      },
    ],
  },
};

export default nextConfig;
