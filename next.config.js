/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  publicRuntimeConfig: {
    RESOURCE_BASE_URL: process.env.RESOURCE_BASE_URL || "http://1.10.143.146:1034",
    RESOURCE_NAME: process.env.RESOURCE_NAME || "empty",
    MEMBERS:[
      "สังกัด 1",
      "สังกัด 2",
      "สังกัด 3"
    ]
  },
}
