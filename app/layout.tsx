
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import NotificationSystem from '../components/NotificationSystem'
import UniversalNotificationSystem from '../components/UniversalNotificationSystem'
import PWAInstallPrompt from '../components/PWAInstallPrompt'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CityReport - Signalement Citoyen',
  description: 'Application de signalement pour les citoyens - Améliorons notre ville ensemble',
  manifest: '/manifest.json',
  keywords: ['signalement', 'citoyen', 'ville', 'municipal', 'problème urbain'],
  authors: [{ name: 'CityReport Team' }],
  creator: 'CityReport',
  publisher: 'CityReport',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon-192x192.png',
    shortcut: '/icon-72x72.png',
    apple: '/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CityReport',
    startupImage: '/icon-512x512.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: '#ef4444',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('✅ SW enregistré:', registration);

                      // Demander l'autorisation pour les notifications
                      if ('Notification' in window && Notification.permission === 'default') {
                        Notification.requestPermission().then(function(permission) {
                          console.log('🔔 Permission notifications:', permission);
                        });
                      }

                      // Écouter les mises à jour du Service Worker
                      registration.addEventListener('updatefound', function() {
                        console.log('🔄 Mise à jour SW disponible');
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('❌ Échec enregistrement SW:', registrationError);
                    });
                });
              }

              // Système de notifications universelles amélioré
              window.universalNotify = function(title, message, options = {}) {
                const defaultOptions = {
                  channels: ['push', 'sms'],
                  priority: 'medium',
                  type: 'info',
                  ...options
                };

                console.log('📢 Notification universelle:', { title, message, defaultOptions });

                // Push pour les utilisateurs avec l'app via Service Worker
                if (defaultOptions.channels.includes('push') && 'serviceWorker' in navigator) {
                  navigator.serviceWorker.ready.then(function(registration) {
                    if (registration.showNotification) {
                      registration.showNotification(title, {
                        body: message,
                        icon: '/icon-192x192.png',
                        badge: '/icon-72x72.png',
                        requireInteraction: defaultOptions.priority === 'critical',
                        tag: 'universal-' + Date.now(),
                        data: defaultOptions
                      });
                    }
                  }).catch(function(error) {
                    console.log('❌ Erreur notification SW:', error);

                    // Fallback avec Notification API classique
                    if ('Notification' in window && Notification.permission === 'granted') {
                      new Notification(title, {
                        body: message,
                        icon: '/icon-192x192.png'
                      });
                    }
                  });
                }

                // SMS pour tous les citoyens (même sans app)
                if (defaultOptions.channels.includes('sms')) {
                  console.log('📱 SMS programmé pour tous les citoyens inscrits');
                  // En production: intégration API SMS
                }

                // Email si nécessaire
                if (defaultOptions.channels.includes('email')) {
                  console.log('📧 Email programmé pour diffusion');
                  // En production: intégration service email
                }
              };

              // Test automatique du système (en développement)
              setTimeout(function() {
                if (typeof window.universalNotify === 'function') {
                  console.log('🧪 Test du système de notifications universelles...');
                }
              }, 3000);
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="w-full min-h-screen bg-gray-50 relative mx-auto max-w-7xl">
          <Header />
          <NotificationSystem />
          <UniversalNotificationSystem />
          <PWAInstallPrompt />
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
