import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Face Aux Risques SA - Expert Sécurité Incendie & Risques Industriels Cameroun',
  description: '22 ans d\'expertise en sécurité incendie, gestion des risques industriels et formations QHSE au Cameroun. Intervention rapide, conformité OHADA garantie. +237 699 699 522',
  keywords: 'sécurité incendie Cameroun, audit risques industriels Douala, formation SSI Yaoundé, maintenance extincteurs, inspection cuves pression, conformité OHADA, ENEO, Face Aux Risques',
  authors: [{ name: 'Face Aux Risques SA' }],
  openGraph: {
    title: 'Face Aux Risques SA - Leader Sécurité Industrielle Cameroun',
    description: 'Intervention sous 24h partout au Cameroun. Plus de 500 sites industriels sécurisés depuis 2003.',
    url: 'https://faceauxrisques.com',
    siteName: 'Face Aux Risques SA',
    locale: 'fr_CM',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}