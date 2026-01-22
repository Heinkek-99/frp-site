import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Output standalone pour Docker
  output: 'standalone',
  
  // Désactiver telemetry
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // eslint: {
  //   ignoreDuringBuilds: false,
  // },

  // Configuration Turbopack (Next.js 16)
  turbopack: {
    // Configuration vide pour activer Turbopack sans erreur
  },

  // Images optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'customer-assets.emergentagent.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'frp-site-three.vercel.app',  // Ton domaine Vercel
          },
        ],
        destination: 'https://faceauxrisques.com/:path*',
        permanent: true,
      },
    ]
  },
  
  // Packages externes pour serveur (remplace experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['resend'],
}

export default nextConfig