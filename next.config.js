const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Ensure this is set for standalone builds
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '89.111.140.69',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.matalex.team',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'api.matalex.team',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'matalex.team',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's3.timeweb.cloud',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'gas-kvas.com',
        pathname: '**',
      },
      // Add other domains as needed
    ],
  },
};

module.exports = withSentryConfig(
  nextConfig,
  {
    // Sentry Webpack plugin options
    org: "matalex",
    project: "matalex-nextjs",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
