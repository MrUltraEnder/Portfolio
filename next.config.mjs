/** @type {import('next').NextConfig} */
const repoName = "Portfolio"

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : undefined,
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repoName}/` : undefined,
}

export default nextConfig
