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
    domains:["photo-editor-uploads.s3.us-east-1.amazonaws.com"]
  },
};

export default nextConfig;
