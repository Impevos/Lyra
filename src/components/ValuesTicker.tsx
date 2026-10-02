'use client';

import React from 'react';

const tickerItems = [
  '90 GÜNLÜK MASTER DÖNÜŞÜM',
  '18+ CANLI İNİSİYASYON',
  'SOUL BLUEPRINT (RUH KİMLİĞİ)',
  'MASUMİYETE DÖNÜŞ & SIFIR NOKTASI',
  'GERÇEKLİKLE OYNAMAK & KUANTUM',
  'KENDİNİ KAZANMAK & BEDENLENME',
  'ERİL & DİŞİL PRENSİPLERİ',
  'DRAGON RIDE İNİSİYASYONU',
  'CO-CREATION (ORTAK YARATIM)',
  'COMPASSION • KNOWLEDGE • PEACE',
  'SINIRLI 12 KİŞİLİK KONTENJAN',
  'VİPASSANA & ŞAHİTLİK BİLİNCİ',
];

interface ValuesTickerProps {
  items?: string[];
}

export default function ValuesTicker({ items }: ValuesTickerProps) {
  const activeItems = (items && items.length > 0) ? items : tickerItems;

  return (
    <div className="w-full bg-wine text-ivory py-3.5 border-y-2 border-gold/30 overflow-hidden select-none relative">
      {/* Subtle edge fade gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-wine to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-wine to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-infinite flex items-center gap-8">
        {[...activeItems, ...activeItems, ...activeItems].map((item, index) => (
          <div key={index} className="flex items-center gap-8 shrink-0">
            <span className="font-cinzel text-[0.68rem] sm:text-xs tracking-[0.3em] font-semibold text-ivory uppercase">
              {item}
            </span>
            <span className="text-gold/50 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

