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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-gold/15 shadow-lg shadow-gold/2 py-2.5' 
          : 'bg-transparent py-5 lg:py-7'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative transition-all duration-500 ease-out"
            style={{
              width: isScrolled ? '48px' : '72px',
              height: isScrolled ? '48px' : '72px',
            }}
            layout
          >
            <Image
              src="/Lyra-Logo.png"
              alt="Lyra Logo"
              fill
              sizes="80px"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </motion.div>
          
          <div className="flex flex-col items-start">
            <span className={`font-serif tracking-[0.15em] text-wine font-bold leading-none transition-all ${
              isScrolled ? 'text-lg' : 'text-xl lg:text-2xl'
            }`}>
              LYRA
            </span>
            <span className="text-[0.55rem] tracking-[0.4em] text-gold font-bold uppercase -mt-0.5">
              ON EARTH
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/offers" 
            className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase transition-colors"
          >
            Teklifler
          </Link>
          <Link 
            href="/#products" 
            className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase transition-colors"
          >
            Çalışmalarım
          </Link>
          <Link 
            href="/#videos" 
            className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase transition-colors"
          >
            Videolarım
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-none border border-gold/15 text-wine hover:bg-gold/5 transition-all"
          aria-label="Menü"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold/10 bg-white/95 backdrop-blur-lg overflow-hidden mt-3"
          >
            <div className="px-6 py-5 flex flex-col gap-4 text-center">
              <Link 
                href="/offers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase py-2"
              >
                Teklifler
              </Link>
              <Link 
                href="/#products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase py-2"
              >
                Çalışmalarım
              </Link>
              <Link 
                href="/#videos" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold tracking-widest text-taupe/70 hover:text-wine uppercase py-2"
              >
                Videolarım
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
