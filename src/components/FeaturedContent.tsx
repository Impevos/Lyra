'use client';

import AnimatedSection from './AnimatedSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineCalendar, HiOutlinePlay, HiOutlineArrowRight } from 'react-icons/hi';

const featured = [
  {
    icon: HiOutlinePlay,
    tag: 'Son Yayın',
    title: 'Enerji Temizliği ve Farkındalık Çalışması',
    description: 'Haftalık enerji temizliği seansımızda kolektif bilinç çalışması gerçekleştirdik. Yayın kaydına erişebilirsiniz.',
    date: '3 Mayıs 2026',
    color: 'from-burgundy to-wine',
    link: '/blog',
  },
  {
    icon: HiOutlineStar,
    tag: 'Öne Çıkan Eğitim',
    title: 'Mastersoul Eğitimi — Bilinç Dönüşümü',
    description: 'Kapsamlı spiritüel gelişim programımız ile derinlemesine bilinç çalışması. Sınırlı kontenjan.',
    date: 'Kayıtlar Açık',
    color: 'from-gold to-gold-dark',
    link: '/hizmetler',
  },
  {
    icon: HiOutlineCalendar,
    tag: 'Yaklaşan Etkinlik',
    title: 'Yeni Ay Meditasyonu — Haziran 2026',
    description: 'Yeni ay enerjisiyle niyet belirleme ve manifestasyon çalışması. Toplu meditasyon deneyimi.',
    date: '15 Haziran 2026',
    color: 'from-rose to-pink-muted',
    link: '/iletisim',
  },
];

export default function FeaturedContent() {
  return (
    <section id="one-cikanlar" className="py-40 relative bg-cream/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <AnimatedSection className="max-w-3xl">
            <span className="text-gold font-bold tracking-[0.4em] text-[0.6rem] uppercase mb-6 block">Kolektif Bilinç</span>
            <h2 className="font-serif text-5xl md:text-7xl text-wine mb-8 leading-[1.1]">
              Güncel <span className="font-light text-[#a79d99]">İçerikler</span> & <br />
              <span className="gradient-text">Etkinlikler</span>
            </h2>
            <p className="body-md text-left text-taupe/60 leading-loose max-w-xl">
              Spiritüel yolculuğunuzu destekleyecek en yeni yayınlarımızı ve gelecek etkinliklerimizi buradan takip edebilirsiniz.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="hidden lg:block">
            <Link href="/blog" className="btn-secondary !border-gold/20 !px-12">
              TÜMÜNÜ GÖR
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {featured.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.15}>
              <motion.div 
                className="group relative h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="premium-card p-12 h-full flex flex-col bg-white/40 border-gold/10 group-hover:border-gold/30 transition-all duration-700 overflow-hidden hover:shadow-2xl hover:shadow-gold/5">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />

                  {/* Decorative background number */}
                  <span className="absolute -right-4 -bottom-10 text-[10rem] font-serif text-gold/5 pointer-events-none select-none group-hover:text-gold/10 transition-all duration-700">
                    0{index + 1}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-ivory shadow-inner flex items-center justify-center text-gold group-hover:bg-wine group-hover:text-ivory transition-all duration-500">
                      <item.icon className="text-xl" />
                    </div>
                    <span className="text-[0.65rem] tracking-[0.2em] font-bold text-gold uppercase">{item.tag}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-wine mb-6 leading-relaxed group-hover:text-burgundy transition-colors relative z-10">
                    {item.title}
                  </h3>
                  
                  <p className="text-[0.95rem] leading-[1.85] text-taupe/70 mb-10 flex-grow relative z-10">
                    {item.description}
                  </p>

                  <div className="pt-8 border-t border-gold/5 flex items-center justify-between relative z-10">
                    <span className="text-[0.7rem] font-bold text-taupe/30 tracking-widest uppercase">{item.date}</span>
                    <Link
                      href={item.link}
                      className="text-gold group-hover:text-burgundy transition-colors"
                    >
                      <HiOutlineArrowRight className="text-xl transition-transform duration-500 group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
