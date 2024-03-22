/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable client-side rendering for specific pages
    async generateStaticParams() {
      return {
        '/links': { page: '/links', asPath: '/links' },
        // Add more paths here if needed
      };
    },
  
    // Optional: Add your webpack configurations if needed
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //   // Add your webpack configurations here.
    //   return config;
    // },
  
    // Add other Next.js configurations as needed
  };
export default nextConfig;
