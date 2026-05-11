'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineSparkles, HiOutlineShoppingBag } from 'react-icons/hi';

export default function AdminDashboard() {
  const [stats] = useState([
    { name: 'Aktif Hizmetler', count: 4, icon: HiOutlineSparkles, color: 'text-gold' },
    { name: 'Toplam Ürünler', count: 12, icon: HiOutlineShoppingBag, color: 'text-burgundy' },
    { name: 'Blog Yazıları', count: 8, icon: HiOutlineDocumentText, color: 'text-wine' },
  ]);

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="font-serif text-4xl text-wine mb-2">Hoş Geldiniz, Admin</h2>
          <p className="text-taupe/50 text-sm tracking-widest uppercase">Bugün her şey yolunda görünüyor.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full border-2 border-gold/20 p-1">
            <div className="w-full h-full rounded-full bg-ivory shadow-inner" />
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="premium-card p-10 flex items-center justify-between bg-white/60"
          >
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-gold mb-3">{stat.name}</p>
              <h3 className="text-4xl font-serif text-wine">{stat.count}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-ivory shadow-inner ${stat.color}`}>
              <stat.icon className="text-3xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for Recent Activity */}
      <div className="premium-card p-12 bg-white/40 h-96 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-gold/5 flex items-center justify-center mb-6">
          <HiOutlineSparkles className="text-4xl text-gold animate-pulse" />
        </div>
        <h4 className="font-serif text-2xl text-wine mb-4">Yeni Bildirim Yok</h4>
        <p className="text-taupe/60 max-w-sm">Tüm sistemler stabil çalışıyor. Yeni içerik eklemek için soldaki menüyü kullanabilirsiniz.</p>
      </div>
    </>
  );
}
