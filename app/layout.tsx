
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PWAInstallPrompt from '../components/PWAInstallPrompt'
import UniversalNotificationSystem from '../components/UniversalNotificationSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CityReport - Signalement Citoyen',
  description: 'Application de signalement des problèmes urbains pour améliorer notre ville ensemble',
  keywords: 'signalement, citoyen, ville, problème urbain, mairie, administration',
  authors: [{ name: 'Groupe UMOJA - Ir Robert Kitenge RK' }],
  creator: 'Groupe UMOJA - Ir Robert Kitenge RK',
  publisher: 'Ville',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cityreport.ville.fr'
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cityreport.ville.fr',
    title: 'CityReport - Signalement Citoyen',
    description: 'Signalez facilement les problèmes urbains et aidez à améliorer votre ville',
    siteName: 'CityReport',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'CityReport Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CityReport - Signalement Citoyen',
    description: 'Application de signalement des problèmes urbains',
    creator: '@cityreport',
    images: ['/icons/icon-512x512.png']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CityReport'
  },
  applicationName: 'CityReport',
  referrer: 'origin-when-cross-origin',
  category: 'government'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
  colorScheme: 'light'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="shortcut icon" href="/icons/icon-72x72.png" />
        
        {/* Preconnect aux domaines externes */}
        <link rel="preconnect" href="https://readdy.ai" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Préchargement des ressources critiques */}
        <link rel="preload" href="/icons/icon-192x192.png" as="image" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <PWAInstallPrompt />
        <UniversalNotificationSystem />
      </body>
    </html>
  )
}
