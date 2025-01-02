/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*'
        }
      ];
    },
    // Add this to help with development
    webpack: (config) => {
      config.resolve.fallback = { ...config.resolve.fallback, net: false };
      return config;
    },
  };
  
  export default nextConfig;