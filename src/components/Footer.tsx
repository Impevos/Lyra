'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-5 py-8 mt-4">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent mb-6" />

      <div className="flex flex-col items-center gap-4">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-center group">
          <div className="w-12 h-12 transition-transform duration-500 group-hover:scale-110 relative">
            <Image
              src="/Lyra-Logo.png"
              alt="Lyra Logo"
              fill
              sizes="48px"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Copyright & Links */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-md">
            <Link href="/offers" className="text-[0.6rem] text-gold/60 tracking-widest hover:text-wine transition-colors uppercase">
              Teklifler
            </Link>
            <span className="w-px h-2.5 bg-gold/20" />
            <Link href="/offers/paid" className="text-[0.6rem] text-gold/60 tracking-widest hover:text-wine transition-colors uppercase">
              Ücretli Programlar
            </Link>
            <span className="w-px h-2.5 bg-gold/20" />
            <Link href="/offers/free" className="text-[0.6rem] text-gold/60 tracking-widest hover:text-wine transition-colors uppercase">
              Ücretsiz Kaynaklar
            </Link>
            <span className="w-px h-2.5 bg-gold/20" />
            <Link href="/kvkk" className="text-[0.6rem] text-gold/60 tracking-widest hover:text-wine transition-colors uppercase">
              KVKK
            </Link>
          </div>

          <div className="w-12 h-px bg-gold/20" />

          <p className="text-[0.6rem] text-taupe/35 tracking-[0.2em] font-medium uppercase text-center">
            © 2026 LYRA ON EARTH. TÜM HAKLARI SAKLIDIR.
          </p>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[0.55rem] text-taupe/30 tracking-[0.15em] uppercase">Made by</span>
            <Link href="https://impevos.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Image src="/impevossiyahseffaf.png" alt="impevos" width={48} height={48} className="h-10 w-auto opacity-40 hover:opacity-60 transition-opacity" loading="lazy" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
