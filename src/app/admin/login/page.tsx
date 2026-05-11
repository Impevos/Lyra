'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '12345678') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre.');
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply flex items-center justify-center">
        <img src="/angel_wings_line_art_1778181127578.png" alt="" className="w-full max-w-[800px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card w-full max-w-md p-10 bg-white/60 backdrop-blur-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-burgundy to-wine flex items-center justify-center text-ivory font-serif text-2xl shadow-lg mx-auto mb-6">
            L
          </div>
          <h1 className="font-serif text-3xl text-wine mb-2">Admin Girişi</h1>
          <p className="text-taupe/50 text-sm tracking-widest uppercase">Lyra On Earth Yönetim</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2 ml-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2 ml-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-burgundy text-xs text-center font-medium animate-shake">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full !rounded-2xl py-5 shadow-xl hover:shadow-burgundy/20">
            GİRİŞ YAP
          </button>
        </form>
      </motion.div>
    </div>
  );
}
