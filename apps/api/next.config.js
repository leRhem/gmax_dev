/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Rewrite requests from /api/:path* to /:path*
  // This makes http://localhost:3001/api/public/bookings resolve to your actual 'app/public/bookings' folder
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/:path*',
      },
    ]
  },

  // 2. Add CORS headers to allow localhost:3000 to fetch data
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, // Change this to your production domain in prod
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
};

export default nextConfig;