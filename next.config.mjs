/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // To handle github pages basePath if nested repo, assuming it's the root or will run under its repo name.
  // We'll skip basePath configuration until we know the exact repo name, or use relative paths.
};

export default nextConfig;
