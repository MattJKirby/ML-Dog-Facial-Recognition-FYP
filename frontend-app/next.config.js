/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/detection/:path*',
        destination: 'http://localhost:5000/:path*'
      }
    ]
  }
}

module.exports = nextConfig


