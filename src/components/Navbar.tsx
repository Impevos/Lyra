'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Ürünler', href: '/urunler' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full h-full flex items-center">
        <div className="flex items-center justify-between w-full relative">
          {/* Logo & Mobile Menu Wrapper */}
          <div className="flex items-center justify-between w-full lg:w-auto relative z-50">
            {/* Logo Image */}
            <Link href="/" className="group">
              <div className="w-24 h-24 lg:w-32 lg:h-32 transition-transform duration-500 group-hover:scale-110 relative">
                <Image
                  src="/Lyra-Logo.png"
                  alt="Lyra Logo"
                  fill
                  sizes="(min-width: 1024px) 128px, 96px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Logo Text - Centered on Mobile, Left on Desktop */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center lg:items-start lg:ml-4 group">
              <span className="font-serif text-xl tracking-[0.1em] text-wine font-bold">LYRA</span>
              <span className="text-[0.55rem] tracking-[0.4em] text-[#a79d99] font-bold -mt-1 uppercase">On Earth</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-wine z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'text-burgundy after:w-full' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Button - Right */}
          <div className="hidden lg:block relative z-50">
            <Link href="/iletisim" className="btn-primary !px-6 !py-2.5 !text-[0.7rem] !tracking-[0.2em]">
              RANDEVU AL
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-ivory flex flex-col items-center justify-center gap-8 p-6"
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #6E1525 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl text-wine hover:text-burgundy transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <Link
                  href="/iletisim"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary"
                >
                  RANDEVU AL
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
