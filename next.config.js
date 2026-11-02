/** @type {import('next').NextConfig} */
const nextConfig = {
  // cPanel serves the generated files directly; PHP handles enquiries.
  output: 'export',
  trailingSlash: true,
  images: {
    // Static hosting has no Next.js image optimisation server.
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
