import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-avatar'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/:locale/blog',
        destination: '/:locale/blog/1',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX()

export default withMDX(withNextIntl(nextConfig));
