/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // matches any Supabase project
      },
    ],
  },
};

export default nextConfig;
