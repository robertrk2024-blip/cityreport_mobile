'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Appel à l'Edge Function d'authentification
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/admin-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        // Stocker les informations de session
        localStorage.setItem('adminUser', JSON.stringify(result.user));
        localStorage.setItem('adminToken', result.session_token);
        localStorage.setItem('userRole', result.user.role);
        localStorage.setItem('userEmail', result.user.email);

        // Redirection selon le rôle
        if (result.user.role === 'super-admin') {
          router.push('/super-admin');
        } else {
          router.push('/admin');
        }
        
        onClose();
      } else {
        setError(result.error || 'Erreur de connexion');
      }
    } catch (err) {
      console.error('Erreur connexion:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Connexion Admin</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <i className="ri-close-line text-gray-500"></i>
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <i className="ri-error-warning-line text-red-500"></i>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email administrateur
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="admin@ville.fr"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Connexion...
              </>
            ) : (
              <>
                <i className="ri-login-circle-line"></i>
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* Aide */}
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
            <div className="font-medium mb-1">Comptes de test :</div>
            <div>• Admin : admin@ville.fr / admin123</div>
            <div>• Super-Admin : superadmin@ville.fr / super123</div>
          </div>
        </div>
      </div>
    </div>
  );
}