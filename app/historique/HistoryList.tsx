'use client';

export default function HistoryList() {
  const reports = [
    {
      id: 1,
      category: 'Routes',
      description: 'Nid-de-poule important sur la rue de la République',
      date: '15 Nov 2024',
      status: 'En cours',
      statusColor: 'bg-orange-500',
      icon: 'ri-road-line',
      iconColor: 'bg-orange-500'
    },
    {
      id: 2,
      category: 'Éclairage',
      description: 'Lampadaire défaillant Place du Marché',
      date: '12 Nov 2024',
      status: 'Résolu',
      statusColor: 'bg-green-500',
      icon: 'ri-lightbulb-line',
      iconColor: 'bg-yellow-500'
    },
    {
      id: 3,
      category: 'Propreté',
      description: 'Dépôt sauvage de déchets près du parc municipal',
      date: '08 Nov 2024',
      status: 'Traité',
      statusColor: 'bg-green-500',
      icon: 'ri-delete-bin-line',
      iconColor: 'bg-green-500'
    },
    {
      id: 4,
      category: 'Sécurité',
      description: 'Panneau de signalisation endommagé après tempête',
      date: '05 Nov 2024',
      status: 'En attente',
      statusColor: 'bg-gray-500',
      icon: 'ri-shield-line',
      iconColor: 'bg-red-500'
    }
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Vos signalements</h2>
        <p className="text-sm text-gray-600">{reports.length} signalement(s) au total</p>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${report.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <i className={`${report.icon} text-white`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">{report.category}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${report.statusColor}`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">{report.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{report.date}</span>
                  <button className="text-xs text-blue-600 font-medium">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-history-line text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun signalement</h3>
          <p className="text-gray-600 text-sm">Vos signalements apparaîtront ici</p>
        </div>
      )}
    </div>
  );
}