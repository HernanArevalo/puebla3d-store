/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'as2.ftcdn.net',
      },
    ],
  },
  publicRuntimeConfig: {
    metadataBase: 'https://puebla.hernanarevalo.com.ar/', // Cambia esto a la URL de tu producción
  },
};

module.exports = nextConfig;
