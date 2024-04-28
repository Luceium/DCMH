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
      },
      {
        protocol: "https",
        hostname: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_I-fsOalFcGTCJYuAZQTo6tSFYbzMZmG-v-ViOymwA&s"
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com"
      },
      {
        protocol: "https",
        hostname: "i5.walmartimages.com"
      }
    ],
  },
};

export default nextConfig;
