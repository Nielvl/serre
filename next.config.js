/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        request: false,
      };
    }
    
    // Add this line to support Chart.js
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];

    return config;
  },
}

module.exports = nextConfig