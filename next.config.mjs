import { basePath } from './lib/public-path.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath,
}

export default nextConfig
