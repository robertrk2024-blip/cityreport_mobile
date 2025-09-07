
'use client';

import { useState, useEffect } from 'react';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/functions/v1/emergency-contacts');
      const data = await response.json();
      
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
      // Fallback sur les données par défaut si l'API échoue
      setContacts([
        {
          id: 1,
          title: 'Mairie',
          name: 'Services municipaux',
          phone: '01 23 45 67 89',
          email: 'contact@mairie-ville.fr',
          address: '1 Place de la Mairie, 75001 Paris',
          hours: 'Lun-Ven: 8h30-17h30',
          icon: 'ri-government-line',
          color: 'bg-blue-600'
        },
        {
          id: 2,
          title: 'Police municipale',
          name: 'Commissariat central',
          phone: '01 98 76 54 32',
          email: 'police@mairie-ville.fr',
          address: '15 Avenue de la République, 75001 Paris',
          hours: '24h/24 - 7j/7',
          icon: 'ri-shield-line',
          color: 'bg-red-600'
        },
        {
          id: 3,
          title: 'Services techniques',
          name: 'Voirie et espaces verts',
          phone: '01 11 22 33 44',
          email: 'technique@mairie-ville.fr',
          address: '8 Rue des Jardins, 75001 Paris',
          hours: 'Lun-Ven: 7h00-16h00',
          icon: 'ri-tools-line',
          color: 'bg-green-600'
        },
        {
          id: 4,
          title: 'Urgences',
          name: 'Numéros d\'urgence',
          phone: '112',
          email: 'urgences@secours.fr',
          address: 'Numéro européen d\'urgence',
          hours: 'Disponible 24h/24',
          icon: 'ri-phone-line',
          color: 'bg-red-500'
        }
      ]);
    }
    setIsLoading(false);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2 text-gray-600">
          <i className="ri-loader-4-line animate-spin text-xl"></i>
          Chargement des contacts...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Contactez les autorités</h2>
        <p className="text-sm text-gray-600">Liste des contacts officiels de votre commune</p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <i className={`${contact.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{contact.title}</h3>
                  <p className="text-sm text-gray-600">{contact.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-phone-line text-red-500"></i>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{contact.phone}</span>
                </div>

                {contact.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-mail-line text-gray-400"></i>
                    </div>
                    <span className="text-sm text-gray-700">{contact.email}</span>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <i className="ri-map-pin-line text-gray-400"></i>
                    </div>
                    <span className="text-sm text-gray-700">{contact.address}</span>
                  </div>
                )}

                {contact.hours && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-time-line text-gray-400"></i>
                    </div>
                    <span className="text-sm text-gray-700">{contact.hours}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(contact.phone)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <i className="ri-phone-line"></i>
                  Appeler
                </button>
                {contact.email && (
                  <button
                    onClick={() => handleEmail(contact.email)}
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                  >
                    <i className="ri-mail-line"></i>
                    Email
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-alarm-warning-line text-red-600"></i>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-800 mb-1">Numéros d'urgence nationaux</h3>
            <div className="text-xs text-red-700 space-y-1">
              <div><strong>15</strong> - SAMU (urgences médicales)</div>
              <div><strong>17</strong> - Police/Gendarmerie</div>
              <div><strong>18</strong> - Pompiers</div>
              <div><strong>112</strong> - Numéro d'urgence européen</div>
            </div>
          </div>
        </div>
      </div>

      {contacts.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <i className="ri-phone-off-line text-4xl text-gray-300 mb-4"></i>
          <h3 className="font-medium text-gray-900 mb-2">Aucun contact disponible</h3>
          <p className="text-sm text-gray-600">
            Les contacts d'urgence seront bientôt disponibles
          </p>
        </div>
      )}
    </div>
  );
}
