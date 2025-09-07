'use client';

import { useState } from 'react';

interface Contact {
  id: number;
  title: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  icon: string;
  color: string;
  is_active: boolean;
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Initialisation avec des données par défaut
  const loadDefaultContacts = () => {
    setContacts([
      {
        id: 1,
        title: 'Mairie',
        name: 'Services municipaux',
        phone: '0123456789',
        email: 'mairie@example.com',
        address: 'Rue de la République, 123',
        hours: '08:00 - 17:00',
        icon: 'ri-building-line',
        color: 'blue',
        is_active: true,
      },
      {
        id: 2,
        title: 'Police',
        name: 'Commissariat central',
        phone: '0123456790',
        email: 'police@example.com',
        address: 'Avenue de la Liberté, 45',
        hours: '24h/24',
        icon: 'ri-police-car-line',
        color: 'red',
        is_active: true,
      },
      {
        id: 3,
        title: 'Pompiers',
        name: 'Caserne principale',
        phone: '0123456791',
        email: 'pompiers@example.com',
        address: 'Boulevard du Feu, 12',
        hours: '24h/24',
        icon: 'ri-fire-line',
        color: 'orange',
        is_active: true,
      },
    ]);
  };

  // Charger les contacts par défaut au premier rendu
  if (contacts.length === 0) loadDefaultContacts();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Gestion des contacts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`bg-white p-4 rounded-lg shadow-sm border-l-4 border-${contact.color}-500`}
          >
            <div className="flex items-center gap-2 mb-2">
              <i className={`${contact.icon} text-${contact.color}-500 text-xl`}></i>
              <h2 className="text-lg font-semibold">{contact.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{contact.name}</p>
            <p className="text-sm text-gray-600">Téléphone: {contact.phone}</p>
            <p className="text-sm text-gray-600">Email: {contact.email}</p>
            <p className="text-sm text-gray-600">Adresse: {contact.address}</p>
            <p className="text-sm text-gray-600">Horaires: {contact.hours}</p>
            <p className="text-sm font-medium mt-2">
              Statut: {contact.is_active ? 'Actif' : 'Inactif'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
