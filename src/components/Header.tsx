'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PORTALLAR', href: '/#portallar' },
    { label: 'DÖNÜŞÜM KAPILARI', href: '/#donusum-kapilari' },
    { label: 'DENİZ BAYRAKTAR', href: '/#rehber' },
    { label: 'UYGUNLUK', href: '/#kimler-icin' },
    { label: 'KÜTÜPHANE', href: '/#kutuphane' },
    { label: 'YAYINLAR', href: '/#yayinlar' },
    { label: 'TEKLİFLER', href: '/offers' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-ivory/95 backdrop-blur-md border-b-2 border-wine/15 shadow-sm py-3' 
          : 'bg-ivory/90 backdrop-blur-md border-b border-gold/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/Lyra-Logo.png"
              alt="Lyra Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col items-start select-none">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.22em] text-wine leading-none">
              LYRA
            </span>
            <span className="font-sans text-[0.52rem] font-bold tracking-[0.4em] text-taupe/60 uppercase mt-0.5">
              ON EARTH
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation (Clean, Balanced, Orderly) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="text-[0.68rem] font-bold tracking-[0.2em] text-taupe/80 hover:text-wine uppercase transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right: Direct High-Ticket Action Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/#portallar"
            className="px-5 py-2.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white bg-wine hover:bg-burgundy transition-all duration-300 border-2 border-wine hover:border-burgundy shadow-xs"
          >
            KAYIT OL →
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-none border-2 border-wine/20 text-wine hover:bg-wine/5 transition-all cursor-pointer"
          aria-label="Menü"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t-2 border-wine/15 bg-ivory px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-cinzel text-xs font-bold tracking-[0.2em] text-wine hover:text-burgundy uppercase py-1 border-b border-gold/15"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#portallar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-reborn-sharp text-center mt-2"
              >
                KAYIT OL →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
