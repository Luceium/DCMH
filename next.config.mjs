/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.propelauth.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      }
    ],
  },
};

export default nextConfig;
