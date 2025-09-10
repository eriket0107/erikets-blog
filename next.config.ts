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
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
