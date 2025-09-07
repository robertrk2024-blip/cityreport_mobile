
'use client';

import { useEffect, useState } from 'react';

interface UniversalNotification {
  id: string;
  type: 'app_update' | 'admin_change' | 'emergency' | 'service_alert';
  title: string;
  message: string;
  timestamp: Date;
  channels: ('push' | 'sms' | 'email')[];
  targetAudience: 'all_citizens' | 'app_users' | 'non_app_users' | 'admins';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function UniversalNotificationSystem() {
  const [notifications, setNotifications] = useState<UniversalNotification[]>([]);
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

  useEffect(() => {
    // Attendre que le Service Worker soit prêt
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log('📡 Service Worker prêt pour les notifications');
        setServiceWorkerReady(true);
      });
    }

    // Simulation des notifications universelles
    const mockNotifications: UniversalNotification[] = [
      {
        id: '1',
        type: 'app_update',
        title: '✨ Nouvelle version disponible !',
        message: 'Découvrez les nouvelles fonctionnalités de signalement et les améliorations de sécurité.',
        timestamp: new Date(),
        channels: ['push', 'sms', 'email'],
        targetAudience: 'all_citizens',
        priority: 'medium'
      },
      {
        id: '2',
        type: 'admin_change',
        title: 'Nouvel administrateur ajouté',
        message: 'Un nouveau responsable technique rejoint l\'équipe pour améliorer nos services.',
        timestamp: new Date(Date.now() - 1800000),
        channels: ['push', 'sms'],
        targetAudience: 'all_citizens',
        priority: 'low'
      },
      {
        id: '3',
        type: 'emergency',
        title: '🚨 ALERTE MÉTÉO - Vigilance orange',
        message: 'Fortes pluies prévues cette nuit. Évitez les déplacements non essentiels.',
        timestamp: new Date(Date.now() - 3600000),
        channels: ['push', 'sms', 'email'],
        targetAudience: 'all_citizens',
        priority: 'critical'
      }
    ];

    setNotifications(mockNotifications);

    // Envoyer les notifications seulement quand le SW est prêt
    if (serviceWorkerReady) {
      mockNotifications.forEach(notification => {
        sendUniversalNotification(notification);
      });
    }
  }, [serviceWorkerReady]);

  const sendUniversalNotification = async (notification: UniversalNotification) => {
    console.log('📱 Envoi notification universelle:', notification);

    // 1. Notification Push via Service Worker
    if (notification.channels.includes('push')) {
      await sendPushNotification(notification);
    }

    // 2. Notification SMS (tous les citoyens)
    if (notification.channels.includes('sms')) {
      sendSMSNotification(notification);
    }

    // 3. Notification Email
    if (notification.channels.includes('email')) {
      sendEmailNotification(notification);
    }
  };

  const sendPushNotification = async (notification: UniversalNotification) => {
    try {
      if (!('Notification' in window)) {
        console.log('❌ Notifications non supportées');
        return;
      }

      let permission = Notification.permission;
      
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission !== 'granted') {
        console.log('❌ Permission de notification refusée');
        return;
      }

      // Utiliser le Service Worker si disponible
      if ('serviceWorker' in navigator && serviceWorkerReady) {
        const registration = await navigator.serviceWorker.ready;
        
        if (registration.showNotification) {
          await registration.showNotification(notification.title, {
            body: notification.message,
            icon: '/icon-192x192.png',
            badge: '/icon-72x72.png',
            tag: notification.id,
            requireInteraction: notification.priority === 'critical',
            silent: notification.priority === 'low',
            data: {
              id: notification.id,
              type: notification.type,
              timestamp: notification.timestamp
            },
            actions: [
              {
                action: 'view',
                title: 'Voir détails'
              },
              {
                action: 'dismiss',
                title: 'Ignorer'
              }
            ]
          });
          console.log('✅ Notification push envoyée via SW');
          return;
        }
      }

      // Fallback simple si Service Worker non disponible
      console.log('📱 Notification simulée (SW non disponible)');
      
    } catch (error) {
      console.error('❌ Erreur notification push:', error);
    }
  };

  const sendSMSNotification = (notification: UniversalNotification) => {
    console.log('📱 SMS envoyé à tous les citoyens:', {
      message: `${notification.title}\n${notification.message}`,
      recipients: 'all_registered_citizens',
      urgency: notification.priority
    });

    // Simulation d'appel API SMS
    fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `${notification.title}: ${notification.message}`,
        priority: notification.priority,
        type: notification.type
      })
    }).catch(error => {
      console.log('Service SMS non disponible (mode démo):', error.message);
    });
  };

  const sendEmailNotification = (notification: UniversalNotification) => {
    console.log('📧 Email envoyé:', {
      subject: notification.title,
      body: notification.message,
      recipients: notification.targetAudience,
      priority: notification.priority
    });

    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: notification.title,
        message: notification.message,
        audience: notification.targetAudience,
        priority: notification.priority
      })
    }).catch(error => {
      console.log('Service Email non disponible (mode démo):', error.message);
    });
  };

  return (
    <div className="hidden">
      {/* Système de notification invisible qui fonctionne en arrière-plan */}
      {notifications.map(notification => (
        <div key={notification.id} className="notification-processor">
          <div className="channels-processor">
            {notification.channels.map(channel => (
              <div key={`${notification.id}-${channel}`} className={`channel-${channel}`}>
                {/* Chaque canal de notification est traité */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
