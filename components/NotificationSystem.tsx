
'use client';

import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  type: 'approved' | 'resolved' | 'alert' | 'info' | 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  location?: string;
  category?: string;
  timestamp: Date;
  isRead: boolean;
  zone?: 'local' | 'city' | 'region';
  author?: string;
  image?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  url?: string; // URL de redirection
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    // Charger les alertes publiques depuis Supabase
    loadPublicAlerts();

    // Écouter les nouvelles alertes en temps réel
    const interval = setInterval(loadPublicAlerts, 30000); // Vérifier toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Traiter la file d'attente des notifications
    if (notificationQueue.length > 0 && !isShowing) {
      const nextNotification = notificationQueue[0];
      showPhoenixNotification(nextNotification);
      setNotificationQueue(prev => prev.slice(1));
    }
  }, [notificationQueue, isShowing]);

  const loadPublicAlerts = async () => {
    try {
      // Simuler les alertes publiques du super-admin
      const mockAlerts: Notification[] = [
        {
          id: 'alert_1',
          type: 'danger',
          title: '🚨 ALERTE MÉTÉO CRITIQUE',
          message: 'Vigilance orange - Fortes pluies et inondations possibles. Évitez les déplacements.',
          timestamp: new Date(),
          isRead: false,
          zone: 'region',
          author: 'Services d\'Urgence',
          priority: 'critical',
          url: 'https://cityreport.readdy.ai/alertes',
          image: 'https://readdy.ai/api/search-image?query=Emergency%20weather%20alert%2C%20heavy%20rain%2C%20flooding%20warning%2C%20dramatic%20storm%20clouds%2C%20urgent%20notification%20banner%2C%20realistic&width=400&height=200&seq=weather_alert&orientation=landscape'
        },
        {
          id: 'alert_2',
          type: 'warning',
          title: '🚧 Fermeture de route - Centre-ville',
          message: 'Avenue principale fermée pour travaux d\'urgence jusqu\'à 18h.',
          timestamp: new Date(Date.now() - 300000),
          isRead: false,
          zone: 'city',
          author: 'Services Techniques',
          priority: 'high',
          url: 'https://cityreport.readdy.ai/alertes'
        },
        {
          id: 'alert_3',
          type: 'success',
          title: '✨ Nouveau service disponible',
          message: 'Le nouveau système de signalement en ligne est maintenant actif !',
          timestamp: new Date(Date.now() - 600000),
          isRead: false,
          zone: 'local',
          author: 'Mairie',
          priority: 'medium',
          url: 'https://cityreport.readdy.ai'
        }
      ];

      // Ajouter seulement les nouvelles alertes à la file
      const existingIds = notifications.map(n => n.id);
      const newAlerts = mockAlerts.filter(alert => !existingIds.includes(alert.id));

      if (newAlerts.length > 0) {
        setNotifications(prev => [...newAlerts, ...prev]);
        setNotificationQueue(prev => [...prev, ...newAlerts]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des alertes:', error);
    }
  };

  const showPhoenixNotification = async (notification: Notification) => {
    setCurrentNotification(notification);
    setIsShowing(true);

    // Gestion sécurisée des notifications navigateur avec redirection
    await sendBrowserNotification(notification);

    // Durée d'affichage selon la priorité
    const displayDuration = notification.priority === 'critical' ? 15000 :
                           notification.priority === 'high' ? 10000 :
                           notification.priority === 'medium' ? 7000 : 5000;

    setTimeout(() => {
      hideNotification();
    }, displayDuration);
  };

  const sendBrowserNotification = async (notification: Notification) => {
    try {
      // Vérifier si les notifications sont supportées
      if (!( 'Notification' in window)) {
        console.log('❌ Notifications non supportées par ce navigateur');
        return;
      }

      // Demander l'autorisation si nécessaire
      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission !== 'granted') {
        console.log('❌ Permission de notification refusée');
        return;
      }

      // Essayer d'utiliser le Service Worker en premier
      if ( 'serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;

          if (registration && registration.showNotification) {
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
                timestamp: notification.timestamp,
                url: notification.url || 'https://cityreport.readdy.ai/alertes'
              },
              actions: [
                {
                  action: 'open_site',
                  title: 'Voir sur le site',
                  icon: '/icon-72x72.png'
                },
                {
                  action: 'dismiss',
                  title: 'Fermer'
                }
              ]
            });
            console.log('✅ Notification envoyée via Service Worker avec redirection');
            return;
          }
        } catch (swError) {
          console.log('⚠️ Service Worker non disponible, utilisation du fallback');
        }
      }

      // Fallback avec l'API Notification classique (uniquement si sécurisé)
      try {
        const browserNotification = new Notification(notification.title, {
          body: notification.message,
          icon: '/icon-192x192.png',
          tag: notification.id,
          requireInteraction: notification.priority === 'critical',
          data: {
            url: notification.url || 'https://cityreport.readdy.ai/alertes'
          }
        });

        // Gérer le clic sur la notification
        browserNotification.onclick = function(event) {
          event.preventDefault();
          console.log('🔗 Clic sur notification - Redirection vers:', this.data?.url || notification.url);

          // Ouvrir le site dans un nouvel onglet
          window.open(this.data?.url || notification.url || 'https://cityreport.readdy.ai/alertes', '_blank');

          // Fermer la notification
          this.close();

          // Focus sur la fenêtre si elle existe déjà
          window.focus();
        };

        // Auto-fermeture pour les notifications non critiques
        if (notification.priority !== 'critical') {
          setTimeout(() => {
            browserNotification.close();
          }, 8000);
        }

        console.log('✅ Notification envoyée via API classique avec redirection');
      } catch (notifError) {
        console.log('⚠️ Impossible d\'envoyer la notification navigateur:', notifError.message);
      }

    } catch (error) {
      console.error('❌ Erreur générale dans sendBrowserNotification:', error);
    }
  };

  const hideNotification = () => {
    setIsShowing(false);
    setTimeout(() => {
      setCurrentNotification(null);
    }, 300); // Attendre la fin de l'animation
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDismiss = () => {
    if (currentNotification) {
      markAsRead(currentNotification.id);
    }
    hideNotification();
  };

  const handleViewDetails = () => {
    hideNotification();
    // Rediriger vers l'URL spécifique de la notification ou vers la page des alertes
    const targetUrl = currentNotification?.url || '/alertes';

    if (targetUrl.startsWith('http')) {
      // URL externe - ouvrir dans un nouvel onglet
      window.open(targetUrl, '_blank');
    } else {
      // URL interne - navigation normale
      window.location.href = targetUrl;
    }
  };

  const handleNotificationClick = () => {
    // Clic sur toute la notification pour rediriger
    handleViewDetails();
  };

  const getNotificationStyle = (type: string, priority: string) => {
    if (priority === 'critical') {
      return {
        bg: 'bg-gradient-to-r from-red-600 to-red-700',
        border: 'border-red-500',
        text: 'text-white',
        icon: 'text-red-200',
        animation: 'animate-pulse'
      };
    }

    switch (type) {
      case 'danger':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-orange-600',
          border: 'border-red-400',
          text: 'text-white',
          icon: 'text-red-100',
          animation: ''
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-500 to-yellow-600',
          border: 'border-orange-400',
          text: 'text-white',
          icon: 'text-orange-100',
          animation: ''
        };
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
          border: 'border-green-400',
          text: 'text-white',
          icon: 'text-green-100',
          animation: ''
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          border: 'border-blue-400',
          text: 'text-white',
          icon: 'text-blue-100',
          animation: ''
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return 'ri-error-warning-fill';
      case 'warning':
        return 'ri-alert-fill';
      case 'success':
        return 'ri-checkbox-circle-fill';
      default:
        return 'ri-information-fill';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Badge de notifications non lues */}
      {unreadCount > 0 && (
        <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        </div>
      )}

      {/* Notification Phoenix-style en haut de l'écran */}
      {isShowing && currentNotification && (
        <div className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ${
          isShowing ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div 
            className={`${getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').bg} ${
              getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').animation
            } shadow-2xl border-b-4 ${getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').border} cursor-pointer hover:opacity-95 transition-opacity`}
            onClick={handleNotificationClick}
          >

            {/* Barre de progression pour les alertes critiques */}
            {currentNotification.priority === 'critical' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-300">
                <div className="h-full bg-white animate-progress-bar"></div>
              </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-start gap-4">
                {/* Icône */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <i className={`${getTypeIcon(currentNotification.type)} text-2xl ${
                      getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').icon
                    }`}></i>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold leading-tight ${
                        getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').text
                      }`}>
                        {currentNotification.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        getNotificationStyle(currentNotification.type, currentNotification.priority || 'medium').text
                      } opacity-90`}>
                        {currentNotification.message}
                      </p>

                      {/* Indication de redirection */}
                      <div className="flex items-center gap-2 mt-2 text-xs opacity-75">
                        <i className="ri-external-link-line"></i>
                        <span>Cliquez pour voir sur le site officiel</span>
                      </div>

                      {/* Métadonnées */}
                      <div className="flex items-center gap-4 mt-2 text-xs opacity-75">
                        {currentNotification.author && (
                          <div className="flex items-center gap-1">
                            <i className="ri-user-line"></i>
                            <span>{currentNotification.author}</span>
                          </div>
                        )}
                        {currentNotification.location && (
                          <div className="flex items-center gap-1">
                            <i className="ri-map-pin-line"></i>
                            <span>{currentNotification.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          <span>À l'instant</span>
                        </div>
                      </div>
                    </div>

                    {/* Image (si disponible) */}
                    {currentNotification.image && (
                      <div className="ml-4 flex-shrink-0">
                        <img
                          src={currentNotification.image}
                          alt="Illustration"
                          className="w-16 h-16 rounded-lg object-cover border-2 border-white/30"
                        />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails();
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <i className="ri-external-link-line"></i>
                      Voir sur le site
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>

                {/* Bouton fermer */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="flex-shrink-0 w-8 h-8 text-white/70 hover:text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles pour l'animation de la barre de progression */}
      <style jsx>{`
        @keyframes progress-bar {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-progress-bar {
          animation: progress-bar 15s linear forwards;
        }
      `}</style>
    </>
  );
}
