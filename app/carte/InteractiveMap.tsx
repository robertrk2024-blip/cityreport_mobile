'use client';

import { useState } from 'react';

export default function InteractiveMap() {
  const [selectedFilter, setSelectedFilter] = useState('tous');

  const filters = [
    { id: 'tous', name: 'Tous', color: 'bg-blue-600' },
    { id: 'securite', name: 'Sécurité', color: 'bg-red-500' },
    { id: 'routes', name: 'Routes', color: 'bg-orange-500' },
    { id: 'proprete', name: 'Propreté', color: 'bg-green-500' }
  ];

  const reports = [
    { id: 1, type: 'routes', lat: 48.8566, lng: 2.3522, status: 'En cours' },
    { id: 2, type: 'securite', lat: 48.8606, lng: 2.3376, status: 'Résolu' },
    { id: 3, type: 'proprete', lat: 48.8529, lng: 2.3499, status: 'Traité' }
  ];

  return (
    <div className="h-full relative">
      {/* Filtres */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  selectedFilter === filter.id 
                    ? `${filter.color} text-white` 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h3 className="text-sm font-semibold mb-3">Légende</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Sécurité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Propreté</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Éclairage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton géolocalisation */}
      <button className="absolute bottom-24 right-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
        <i className="ri-navigation-fill"></i>
      </button>
    </div>
  );
}