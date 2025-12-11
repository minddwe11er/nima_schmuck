/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nima.crazy-internet.ch/team3-backend/api/:path*',
      },
    ];
  },
  images: {
    unoptimized: true, // Вимикаємо оптимізацію глобально — фото з бекенду йде як є
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nima.crazy-internet.ch',
        port: '',
        pathname: '/team3-backend/images/**',
      },
    ],
  },
};

export default nextConfig;