/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'devapi.deventiatech.com',
      },
      {
        protocol: 'https',
        hostname: 'api.deventiatech.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
    domains: [
      "i.ibb.co",
      "l-ldesign.com.au",
      "res.cloudinary.com",
      "devapi.deventiatech.com",
      "api.deventiatech.com",
      "localhost",
      "127.0.0.1",
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "assets/videos",
            publicPath: "/_next/assets/videos",
            esModule: false,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
