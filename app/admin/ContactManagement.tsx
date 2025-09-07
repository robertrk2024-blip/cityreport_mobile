
'use client';

import { useState, useEffect } from 'react';

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    title: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    icon: 'ri-building-line',
    color: 'bg-blue-600'
  });

  const colors = [
    'bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-purple-600',
    'bg-yellow-600', 'bg-pink-600', 'bg-indigo-600', 'bg-gray-600'
  ];

  const icons = [
    'ri-government-line', 'ri-shield-line', 'ri-tools-line', 'ri-phone-line',
    'ri-building-line', 'ri-hospital-line', 'ri-fire-line', 'ri-user-line'
  ];

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
          color: 'bg-blue-600',
          is_active: true
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
          color: 'bg-red-600',
          is_active: true
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
          color: 'bg-green-600',
          is_active: true
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
          color: 'bg-red-500',
          is_active: true
        }
      ]);
    }
    setIsLoading(false);
  };

  const handleSaveContact = async () => {
    try {
      const method = editingContact ? 'PUT' : 'POST';
      const body = editingContact 
        ? { ...newContact, id: editingContact.id, is_active: true }
        : newContact;

      const response = await fetch('/api/functions/v1/emergency-contacts', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await loadContacts();
        
        if (editingContact) {
          setEditingContact(null);
        } else {
          setIsAddingContact(false);
        }
        
        setNewContact({
          title: '',
          name: '',
          phone: '',
          email: '',
          address: '',
          hours: '',
          icon: 'ri-building-line',
          color: 'bg-blue-600'
        });

        alert('Contact sauvegardé avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du contact');
    }
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
    setEditingContact(contact);
    setIsAddingContact(true);
  };

  const handleDeleteContact = async (contactId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        const response = await fetch('/api/functions/v1/emergency-contacts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: contactId }),
        });

        if (response.ok) {
          await loadContacts();
          alert('Contact supprimé avec succès !');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du contact');
      }
    }
  };

  const toggleContactStatus = async (contact) => {
    try {
      const response = await fetch('/api/functions/v1/emergency-contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...contact, 
          is_active: !contact.is_active 
        }),
      });

      if (response.ok) {
        await loadContacts();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setNewContact({
      title: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      hours: '',
      icon: 'ri-building-line',
      color: 'bg-blue-600'
    });
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
    <div className="space-y-4">
      {/* En-tête */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <i className="ri-contacts-line text-blue-600"></i>
              Gestion des contacts d'urgence
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Personnalisez les contacts officiels visibles par les citoyens
            </p>
          </div>
          <button
            onClick={() => setIsAddingContact(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <i className="ri-add-line"></i>
            Ajouter
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout/modification */}
      {isAddingContact && (
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">
              {editingContact ? 'Modifier le contact' : 'Nouveau contact d\'urgence'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Titre du service</label>
              <input
                type="text"
                value={newContact.title}
                onChange={(e) => setNewContact(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Ex: Mairie, Police, Urgences..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nom du service</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Description du service"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                <i className="ri-phone-line mr-1 text-red-500"></i>
                Numéro d'urgence *
              </label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="112, 15, 17, 18..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="contact@exemple.fr"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Adresse</label>
            <textarea
              value={newContact.address}
              onChange={(e) => setNewContact(prev => ({ ...prev, address: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
              rows="2"
              placeholder="Adresse complète"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Horaires de disponibilité</label>
            <input
              type="text"
              value={newContact.hours}
              onChange={(e) => setNewContact(prev => ({ ...prev, hours: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="24h/24 - 7j/7, Lun-Ven: 8h30-17h30..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Icône</label>
              <div className="grid grid-cols-4 gap-2">
                {icons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewContact(prev => ({ ...prev, icon }))}
                    className={`p-2 rounded border text-center ${
                      newContact.icon === icon ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <i className={`${icon} text-lg`}></i>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Couleur</label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewContact(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded ${color} ${
                      newContact.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-lg mb-4 border border-red-200">
            <div className="flex items-start gap-2">
              <i className="ri-alarm-warning-line text-red-600 mt-0.5"></i>
              <div className="text-sm text-red-700">
                <div className="font-medium">Numéros d'urgence importants</div>
                <div className="mt-1">
                  <strong>15</strong> - SAMU (urgences médicales) •
                  <strong>17</strong> - Police/Gendarmerie •
                  <strong>18</strong> - Pompiers •
                  <strong>112</strong> - Numéro d'urgence européen
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveContact}
              disabled={!newContact.title || !newContact.phone}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingContact ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* Liste des contacts */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center`}>
                    <i className={`${contact.icon} text-lg text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{contact.title}</h3>
                    <p className="text-sm text-gray-600">{contact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleContactStatus(contact)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      contact.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <i className={contact.is_active ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                  </button>
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-phone-line text-red-500"></i>
                  <span className="font-semibold text-red-600">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-mail-line text-gray-400"></i>
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-start gap-2 col-span-2">
                  <i className="ri-map-pin-line text-gray-400 mt-0.5"></i>
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <i className="ri-time-line text-gray-400"></i>
                  <span>{contact.hours}</span>
                </div>
              </div>
            </div>

            {!contact.is_active && (
              <div className="bg-gray-50 px-4 py-2 border-t">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <i className="ri-eye-off-line"></i>
                  Contact masqué aux citoyens
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <i className="ri-contacts-line text-4xl text-gray-300 mb-4"></i>
          <h3 className="font-medium text-gray-900 mb-2">Aucun contact configuré</h3>
          <p className="text-sm text-gray-600 mb-4">
            Ajoutez des contacts d'urgence pour que les citoyens puissent vous joindre rapidement
          </p>
          <button
            onClick={() => setIsAddingContact(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Ajouter le premier contact
          </button>
        </div>
      )}
    </div>
  );
}
