'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent, defaultSiteContent } from '@/data/defaults';

export default function Footer() {
  const [footerData, setFooterData] = useState(defaultSiteContent.footer);

  useEffect(() => {
    getSiteContent().then((content) => {
      if (content?.footer) setFooterData(content.footer);
    });
  }, []);

  return (
    <footer className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-14 mt-12 border-t border-gold/20">
      <div className="flex flex-col items-center gap-8">
        
        {/* Brand Monogram */}
        <Link href="/" className="flex flex-col items-center group select-none">
          <div className="w-14 h-14 transition-transform duration-500 group-hover:scale-105 relative mb-3">
            <Image
              src="/Lyra-Logo.png"
              alt="Lyra Logo"
              fill
              sizes="56px"
              className="object-contain"
              loading="lazy"
            />
          </div>
          <span className="font-cinzel text-lg sm:text-xl tracking-[0.28em] text-wine font-bold uppercase">
            {footerData.brandName || 'LYRA'}
          </span>
          <span className="text-[0.55rem] tracking-[0.45em] text-[#A39B94] font-semibold uppercase mt-0.5">
            {footerData.brandSub || 'ON EARTH'}
          </span>
        </Link>

        {/* Navigation & Legal Links */}
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-2xl text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-taupe/70">
            <Link href="/offers" className="hover:text-wine transition-colors">
              Teklifler
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/offers/paid" className="hover:text-wine transition-colors">
              Ücretli Programlar
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/offers/free" className="hover:text-wine transition-colors">
              Ücretsiz Kaynaklar
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/sozlesmeler" className="hover:text-wine transition-colors">
              Sözleşmeler
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/sozlesmeler#mesafeli" className="hover:text-wine transition-colors">
              Mesafeli Satış
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/teslimat-ve-iade" className="hover:text-wine transition-colors">
              İptal & İade
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/kvkk" className="hover:text-wine transition-colors">
              KVKK
            </Link>
          </div>

          <div className="w-16 h-px bg-gold/30" />

          {/* Adres Bilgisi (PayTR için zorunlu yasal gereksinim) */}
          <div className="text-center space-y-1.5 max-w-md mx-auto">
            <p className="text-[0.62rem] text-taupe/80 font-bold tracking-[0.25em] uppercase">
              {footerData.companyTitle || 'DENİZ BAYRAKTAR'}
            </p>
            <p className="text-[0.58rem] text-taupe/60 tracking-[0.15em] uppercase leading-relaxed">
              {footerData.address || 'Göztepe Mah. Batışehir Cad. Batışehir K Blok No: 2/2 İç Kapı No: 115 Bağcılar / İstanbul'}
            </p>
            <p className="text-[0.58rem] text-taupe/60 tracking-[0.15em] uppercase">
              {footerData.email || 'info@lyraonearth.com'}
            </p>
          </div>

          <p className="text-[0.58rem] text-taupe/45 tracking-[0.25em] font-semibold uppercase text-center mt-2">
            {footerData.copyright || '© 2026 LYRA ON EARTH. TÜM HAKLARI SAKLIDIR.'}
          </p>

          <div className="flex flex-col items-center gap-1.5 mt-4 pt-4 border-t border-gold/10">
            <span className="text-[0.6rem] text-taupe/50 tracking-[0.25em] uppercase font-bold">Design & Architecture</span>
            <Link href="https://impevos.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Image src="/impevossiyahseffaf.png" alt="impevos" width={110} height={110} className="h-12 w-auto opacity-65 hover:opacity-100 transition-opacity" loading="lazy" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
