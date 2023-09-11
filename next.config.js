/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: true
    // },
    images: {
        domains: ["www.themancompany.com", "dsitestsa.blob.core.windows.net"],
        formats: ['image/webp']
    }
}

module.exports = nextConfig
