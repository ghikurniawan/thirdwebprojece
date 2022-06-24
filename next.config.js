/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud', 'gateway.thirdweb.dev'],
  },
}

module.exports = nextConfig
