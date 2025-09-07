
'use client';

import { useState } from 'react';

export default function ReportDetail({ report, onBack, onLocate }) {
  const [status, setStatus] = useState(report.status);
  const [priority, setPriority] = useState(report.priority);
  const [assignedTo, setAssignedTo] = useState('');
  const [response, setResponse] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [alertZone, setAlertZone] = useState('local');

  const statusOptions = [
    { value: 'nouveau', label: 'Nouveau', color: 'bg-blue-600' },
    { value: 'en-cours', label: 'En cours', color: 'bg-yellow-600' },
    { value: 'resolu', label: 'Résolu', color: 'bg-green-600' },
    { value: 'rejete', label: 'Rejeté', color: 'bg-red-600' }
  ];

  const priorityOptions = [
    { value: 'basse', label: 'Basse', color: 'bg-green-500' },
    { value: 'moyenne', label: 'Moyenne', color: 'bg-orange-500' },
    { value: 'haute', label: 'Haute', color: 'bg-red-500' }
  ];

  const agents = [
    'Agent Dupont',
    'Agent Martin', 
    'Agent Durand',
    'Service Technique'
  ];

  const handleLocate = () => {
    const mapUrl = `https://www.google.com/maps?q=${report.latitude},${report.longitude}`;
    window.open(mapUrl, '_blank');
  };

  const handleSendAlert = () => {
    if (alertTitle.trim() && alertMessage.trim()) {
      console.log('Alerte envoyée:', {
        title: alertTitle,
        message: alertMessage,
        type: alertType,
        zone: alertZone,
        location: report.location || 'Position partagée'
      });

      setAlertTitle('');
      setAlertMessage('');
      setAlertType('info');
      setAlertZone('local');
      setShowAlertModal(false);

      alert('Alerte diffusée à la population !');
    }
  };

  return (
    <div className="space-y-4">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
        <div>
          <h1 className="text-xl font-bold">Signalement #{report.id}</h1>
          <p className="text-sm text-gray-600">{report.type}</p>
        </div>
      </div>

      {/* Informations principales */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{report.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Position partagée</h3>
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center text-green-700">
              <i className="ri-map-pin-fill mr-2"></i>
              <span className="text-sm font-medium">Position exacte disponible</span>
            </div>
            <button
              onClick={handleLocate}
              className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
            >
              Voir sur la carte
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Signalé par:</span>
            <div className="font-medium">{report.citizen}</div>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <div className="font-medium">{report.date}</div>
          </div>
        </div>
      </div>

      {/* Photos */}
      {report.photos > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Pièces jointes ({report.photos})</h3>
          <div className="grid grid-cols-2 gap-2">
            <img 
              src="https://readdy.ai/api/search-image?query=Street%20damage%2C%20pothole%20on%20road%2C%20urban%20infrastructure%20problem%2C%20daylight%20photography%2C%20realistic%20documentation%20style%2C%20clear%20detail%20focus%2C%20municipal%20maintenance%20issue%2C%20asphalt%20crack%20visible%2C%20safety%20concern%20evident%2C%20city%20street%20environment&width=150&height=150&seq=photo1&orientation=squarish"
              alt="Photo signalement"
              className="w-full h-24 object-cover rounded-lg"
            />
            <img 
              src="https://readdy.ai/api/search-image?query=Close%20up%20view%20of%20damaged%20street%20lamp%2C%20broken%20lighting%20fixture%2C%20urban%20infrastructure%20failure%2C%20evening%20shot%2C%20technical%20documentation%20style%2C%20maintenance%20required%2C%20public%20safety%20equipment%2C%20city%20street%20lighting%20system&width=150&height=150&seq=photo2&orientation=squarish"
              alt="Photo signalement"
              className="w-full h-24 object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Actions de gestion */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <h3 className="font-semibold">Gestion du signalement</h3>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium mb-2">Statut</label>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatus(option.value)}
                className={`p-2 rounded-lg text-sm font-medium ${
                  status === option.value
                    ? `${option.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priorité */}
        <div>
          <label className="block text-sm font-medium mb-2">Priorité</label>
          <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPriority(option.value)}
                className={`p-2 rounded-lg text-sm font-medium ${
                  priority === option.value
                    ? `${option.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attribution */}
        <div>
          <label className="block text-sm font-medium mb-2">Assigner à</label>
          <select 
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionner un agent</option>
            {agents.map((agent) => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
        </div>

        {/* Réponse */}
        <div>
          <label className="block text-sm font-medium mb-2">Réponse au citoyen</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Message de réponse..."
            className="w-full p-3 border border-gray-300 rounded-lg h-24 text-sm"
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1">{response.length}/500 caractères</div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
          Mettre à jour
        </button>
        <button 
          onClick={handleLocate}
          className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
        >
          Localiser
        </button>
      </div>

      {/* Nouveau bouton pour les alertes */}
      <button 
        onClick={() => setShowAlertModal(true)}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
      >
        <i className="ri-alarm-warning-line"></i>
        Diffuser une alerte à la population
      </button>

      {/* Modal d'alerte */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Diffuser une alerte</h3>
                <button 
                  onClick={() => setShowAlertModal(false)}
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
                      alertType === 'info' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-information-line"></i>
                    Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('warning')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'warning' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-alert-line"></i>
                    Attention
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('danger')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'danger' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-error-warning-line"></i>
                    Urgent
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertType('success')}
                    className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      alertType === 'success' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="ri-checkbox-circle-line"></i>
                    Résolu
                  </button>
                </div>
              </div>

              {/* Zone de diffusion */}
              <div>
                <label className="block text-sm font-medium mb-2">Zone de diffusion</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setAlertZone('local')}
                    className={`w-full p-3 rounded-lg text-sm font-medium text-left flex items-center gap-3 ${
                      alertZone === 'local' 
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-800' 
                        : 'bg-gray-50 border border-gray-200 text-gray-600'
                    }`}
                  >
                    <i className="ri-map-pin-line"></i>
                    <div>
                      <div className="font-medium">Zone locale</div>
                      <div className="text-xs text-gray-500">Quartier concerné par le signalement</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertZone('city')}
                    className={`w-full p-3 rounded-lg text-sm font-medium text-left flex items-center gap-3 ${
                      alertZone === 'city' 
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-800' 
                        : 'bg-gray-50 border border-gray-200 text-gray-600'
                    }`}
                  >
                    <i className="ri-building-line"></i>
                    <div>
                      <div className="font-medium">Toute la ville</div>
                      <div className="text-xs text-gray-500">Tous les habitants de la commune</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertZone('region')}
                    className={`w-full p-3 rounded-lg text-sm font-medium text-left flex items-center gap-3 ${
                      alertZone === 'region' 
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-800' 
                        : 'bg-gray-50 border border-gray-200 text-gray-600'
                    }`}
                  >
                    <i className="ri-earth-line"></i>
                    <div>
                      <div className="font-medium">Région</div>
                      <div className="text-xs text-gray-500">Toute la région administrative</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Titre de l'alerte */}
              <div>
                <label className="block text-sm font-medium mb-2">Titre de l'alerte</label>
                <input
                  type="text"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  placeholder="Ex: Coupure d'eau programmée, Route fermée..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  maxLength={100}
                />
                <div className="text-xs text-gray-500 mt-1">{alertTitle.length}/100 caractères</div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  placeholder="Détails de l'alerte, instructions pour les citoyens..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm h-24"
                  maxLength={300}
                />
                <div className="text-xs text-gray-500 mt-1">{alertMessage.length}/300 caractères</div>
              </div>

              {/* Aperçu de l'alerte */}
              {alertTitle && alertMessage && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-2">Aperçu de la notification :</div>
                  <div className={`p-3 rounded-lg ${
                    alertType === 'danger' ? 'bg-red-100 border-l-4 border-red-500' :
                    alertType === 'warning' ? 'bg-orange-100 border-l-4 border-orange-500' :
                    alertType === 'success' ? 'bg-green-100 border-l-4 border-green-500' :
                    'bg-blue-100 border-l-4 border-blue-500'
                  }`}>
                    <div className="font-medium text-sm">{alertTitle}</div>
                    <div className="text-xs mt-1">{alertMessage}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendAlert}
                  disabled={!alertTitle.trim() || !alertMessage.trim()}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  <i className="ri-send-plane-line"></i>
                  Diffuser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historique */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3">Historique</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-medium">Signalement créé</div>
              <div className="text-gray-500">15/01/2024 à 14:30 - Par {report.citizen}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="font-medium">Pris en charge</div>
              <div className="text-gray-500">15/01/2024 à 15:45 - Par Agent Dupont</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
