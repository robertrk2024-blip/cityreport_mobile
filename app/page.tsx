
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ReportForm from '../components/ReportForm';
import NotificationSystem from '../components/NotificationSystem';
import AdminLoginModal from '../components/AdminLoginModal';

export default function Home() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Signaler un problème" />
      <NotificationSystem />
      
      {/* Bouton Admin dans le header */}
      <button
        onClick={() => setShowAdminLogin(true)}
        className="fixed top-3 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors md:top-4 md:right-8"
      >
        <i className="ri-admin-line text-white text-lg"></i>
      </button>

      <main className="pt-16 pb-32 md:pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <ReportForm />
          
          {/* Section informations en bas */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center space-y-4">
              <div className="space-y-2">
                <div className="text-xl md:text-2xl font-bold text-blue-600">CityReport</div>
                <div className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Signalement Citoyen - Améliorons notre ville ensemble
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <i className="ri-global-line text-blue-500"></i>
                  <a href="https://cityreport.ville.fr" className="text-blue-600 hover:underline">
                    cityreport.ville.fr
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="ri-mail-line text-blue-500"></i>
                  <a href="mailto:contact@ville.fr" className="text-blue-600 hover:underline">
                    contact@ville.fr
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 md:col-span-1">
                  <i className="ri-map-pin-line text-blue-500"></i>
                  <span className="text-center md:text-left">12 Place de la Mairie, 31000 Toulouse</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="text-xs md:text-sm text-gray-400">
                  Version 2.1.0 • Développé avec ❤️ pour nos citoyens
                </div>
                
                {/* URL du site en bas */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Accès web :</div>
                  <div className="font-mono text-sm text-blue-600 bg-white px-3 py-2 rounded border">
                    https://cityreport.ville.fr
                  </div>
                </div>

                {/* Crédit développeur */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="text-xs text-gray-500 text-center">
                    Cette application a été développée par le groupe UMOJA
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">RK</span>
                    </div>
                    <div className="text-sm font-bold text-purple-600 font-[\'Pacifico\']">
                      Ir Robert Kitenge RK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
      
      {/* Modal de connexion admin */}
      <AdminLoginModal 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />
    </div>
  );
}
