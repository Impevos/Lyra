'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-ivory pt-12 pb-8 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-center mb-2 group">
              <div className="w-56 h-56 transition-transform duration-500 group-hover:scale-110">
                <img 
                  src="/Lyra-Logo.png" 
                  alt="Lyra Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center -mt-4">
                <span className="font-serif text-lg tracking-[0.1em] text-wine font-bold leading-tight text-center">LYRA</span>
                <span className="text-[0.5rem] tracking-[0.4em] text-gold font-bold -mt-0.5 uppercase text-center">On Earth</span>
              </div>
            </Link>
            <p className="text-taupe/60 text-sm leading-loose max-w-xs mb-4 italic text-center mx-auto">
              "Ruhsal farkındalık ve dönüşüm yolculuğunuzda ışığınızı keşfetmeniz için rehberlik ediyoruz."
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.4em] text-gold uppercase mb-4">Keşfet</h4>
            <ul className="space-y-4">
              {['Hakkımızda', 'Hizmetler', 'Ürünler', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace('ı', 'i')}`} className="text-wine/60 hover:text-burgundy text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-0 h-px bg-gold group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.4em] text-gold uppercase mb-4">Hizmetler</h4>
            <ul className="space-y-4">
              {['Birebir Yayın', 'Grup Yayınları', 'Spiritüel Danışmanlık', 'Eğitimler'].map((item) => (
                <li key={item}>
                  <Link href="/hizmetler" className="text-wine/60 hover:text-burgundy text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-0 h-px bg-gold group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-bold tracking-[0.4em] text-gold uppercase mb-4">İletişim</h4>
            <ul className="space-y-4">
              {['İletişim Formu', 'WhatsApp', 'E-posta'].map((item) => (
                <li key={item}>
                  <Link href="/iletisim" className="text-wine/60 hover:text-burgundy text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-0 h-px bg-gold group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.65rem] text-taupe/40 tracking-[0.2em] font-medium uppercase">
            © 2026 LYRA ON EARTH. TÜM HAKLARI SAKLIDIR.
          </p>
          <div className="flex gap-8">
            <span className="text-[0.65rem] text-gold/60 tracking-widest cursor-pointer hover:text-gold transition-colors">KVKK</span>
            <span className="text-[0.65rem] text-gold/60 tracking-widest cursor-pointer hover:text-gold transition-colors">ÇEREZ POLİTİKASI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
