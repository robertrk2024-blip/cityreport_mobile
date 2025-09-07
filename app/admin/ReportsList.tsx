'use client';

import { useState } from 'react';

export default function ReportsList({ onSelectReport }) {
  const [filter, setFilter] = useState('tous');

  const reports = [
    {
      id: 1,
      type: 'Sécurité',
      description: 'Éclairage public défaillant dans la rue Victor Hugo',
      address: '12 Rue Victor Hugo, 75001 Paris',
      status: 'nouveau',
      priority: 'haute',
      date: '2024-01-15 14:30',
      citizen: 'Marie D.',
      photos: 2
    },
    {
      id: 2,
      type: 'Routes',
      description: 'Nid de poule important sur l\'avenue principale',
      address: '45 Avenue de la République, 75011 Paris',
      status: 'en-cours',
      priority: 'moyenne',
      date: '2024-01-14 09:15',
      citizen: 'Pierre L.',
      photos: 1
    },
    {
      id: 3,
      type: 'Propreté',
      description: 'Dépôt sauvage de déchets près du parc',
      address: '8 Place du Marché, 75012 Paris',
      status: 'resolu',
      priority: 'basse',
      date: '2024-01-13 16:45',
      citizen: 'Sophie M.',
      photos: 0
    }
  ];

  const filterOptions = [
    { id: 'tous', name: 'Tous', count: 15 },
    { id: 'nouveau', name: 'Nouveaux', count: 5 },
    { id: 'en-cours', name: 'En cours', count: 7 },
    { id: 'urgent', name: 'Urgent', count: 3 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-orange-100 text-orange-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'en-cours': return 'bg-yellow-100 text-yellow-800';
      case 'resolu': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'en-cours': return 'En cours';
      case 'resolu': return 'Résolu';
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-red-600">15</div>
          <div className="text-sm text-gray-600">Signalements actifs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-green-600">28</div>
          <div className="text-sm text-gray-600">Résolus ce mois</div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                filter === option.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {option.name}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                filter === option.id
                  ? 'bg-red-700'
                  : 'bg-gray-200'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des signalements */}
      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => onSelectReport(report)}
            className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusText(report.status)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
              </div>
              <div className="text-xs text-gray-500">#{report.id}</div>
            </div>

            <div className="mb-2">
              <div className="font-medium text-gray-900 mb-1">{report.type}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{report.description}</div>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-2">
              <i className="ri-map-pin-line mr-1"></i>
              {report.address}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span>Par {report.citizen}</span>
                <span>{report.date}</span>
              </div>
              {report.photos > 0 && (
                <div className="flex items-center gap-1">
                  <i className="ri-image-line"></i>
                  <span>{report.photos}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}