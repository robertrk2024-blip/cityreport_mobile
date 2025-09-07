'use client';

import { useState } from 'react';

export default function AlertsManagement() {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [alertZone, setAlertZone] = useState('city');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const alerts = [
    {
      id: 1,
      title: 'Coupure d\'eau programmée',
      message: 'Intervention sur le réseau d\'eau potable demain de 8h à 16h dans le quartier Centre-ville',
      type: 'warning',
      zone: 'local',
      status: 'sent',
      sentAt: '2024-01-15 14:30',
      recipients: 1250,
      author: 'Agent Municipal'
    },
    {
      id: 2,
      title: 'Route fermée - Travaux',
      message: 'La route départementale D123 est fermée à la circulation jusqu\'à nouvel ordre suite aux intempéries',
      type: 'danger',
      zone: 'city',
      status: 'scheduled',
      scheduledFor: '2024-01-16 08:00',
      recipients: 8500,
      author: 'Service Voirie'
    },
    {
      id: 3,
      title: 'Marché hebdomadaire',
      message: 'Le marché hebdomadaire aura lieu demain Place de la République de 8h à 13h. Stationnement interdit.',
      type: 'info',
      zone: 'local',
      status: 'draft',
      recipients: 650,
      author: 'Vous'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'danger': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'danger': return 'ri-error-warning-line';
      case 'warning': return 'ri-alert-line';
      case 'success': return 'ri-checkbox-circle-line';
      default: return 'ri-information-line';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'sent': return 'Envoyée';
      case 'scheduled': return 'Programmée';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  const handleCreateAlert = () => {
    if (alertTitle.trim() && alertMessage.trim()) {
      console.log('Nouvelle alerte créée:', {
        title: alertTitle,
        message: alertMessage,
        type: alertType,
        zone: alertZone,
        scheduledDate,
        scheduledTime
      });
      
      setAlertTitle('');
      setAlertMessage('');
      setAlertType('info');
      setAlertZone('city');
      setScheduledDate('');
      setScheduledTime('');
      setShowCreateAlert(false);
      
      alert('Alerte créée avec succès !');
    }
  };

  return (
    <div className="space-y-4">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Gestion des alertes</h1>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Nouvelle alerte
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-600">Alertes ce mois</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">8,524</div>
          <div className="text-sm text-gray-600">Citoyens alertés</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">95%</div>
          <div className="text-sm text-gray-600">Taux de lecture</div>
        </div>
      </div>

      {/* Liste des alertes */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(alert.type)}`}>
                  <i className={`${getTypeIcon(alert.type)} mr-1`}></i>
                  {alert.type === 'danger' ? 'Urgent' : 
                   alert.type === 'warning' ? 'Attention' :
                   alert.type === 'success' ? 'Résolu' : 'Info'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                  {getStatusText(alert.status)}
                </span>
              </div>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-more-line"></i>
              </button>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{alert.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-3">
              <div>
                <span className="block">Zone :</span>
                <span className="font-medium">
                  {alert.zone === 'local' ? 'Quartier' : 
                   alert.zone === 'city' ? 'Ville entière' : 'Région'}
                </span>
              </div>
              <div>
                <span className="block">Destinataires :</span>
                <span className="font-medium">{alert.recipients.toLocaleString()} citoyens</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Par {alert.author}</span>
              <span>
                {alert.status === 'sent' ? `Envoyée le ${alert.sentAt}` :
                 alert.status === 'scheduled' ? `Programmée pour le ${alert.scheduledFor}` :
                 'Brouillon'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de création d'alerte */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Créer une alerte</h3>
                <button 
                  onClick={() => setShowCreateAlert(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Type d'alerte */}
              <div>
                <label className="block text-sm font-medium mb-2">Type d'alerte</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAlertType('info')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'info' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-information-line"></i>
                    Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('warning')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'warning' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-alert-line"></i>
                    Attention
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('danger')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'danger' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-error-warning-line"></i>
                    Urgent
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('success')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-checkbox-circle-line"></i>
                    Résolu
                  </button>
                </div>
              </div>

              {/* Zone */}
              <div>
                <label className="block text-sm font-medium mb-2">Zone de diffusion</label>
                <select 
                  value={alertZone}
                  onChange={(e) => setAlertZone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="local">Quartier local</option>
                  <option value="city">Toute la ville</option>
                  <option value="region">Région entière</option>
                </select>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  placeholder="Titre de l'alerte..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  maxLength={100}
                />
                <div className="text-xs text-gray-500 mt-1">{alertTitle.length}/100</div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  placeholder="Contenu détaillé de l'alerte..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm h-24"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 mt-1">{alertMessage.length}/300</div>
              </div>

              {/* Programmation (optionnel) */}
              <div>
                <label className="block text-sm font-medium mb-2">Programmation (optionnel)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Laissez vide pour envoyer immédiatement
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateAlert}
                  disabled={!alertTitle.trim() || !alertMessage.trim()}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300"
                >
                  {scheduledDate ? 'Programmer' : 'Envoyer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}