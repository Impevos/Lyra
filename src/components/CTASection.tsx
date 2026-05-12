'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';

export default function CTASection() {
  return (
    <section className="py-24 relative bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="premium-card p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12" style={{ background: 'linear-gradient(135deg, #a79d99, #8a7f7b)' }}>
          {/* Subtle Background Wings in CTA */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen">
            <img 
              src="/majestic_wings.png" 
              alt="" 
              className="w-full h-full object-cover scale-150 grayscale invert"
            />
          </div>

          {/* Glowing Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 bg-gold/20 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-60 h-60 bg-gold/10 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <AnimatedSection>
              <span className="inline-block text-gold font-bold tracking-[0.4em] text-[0.6rem] uppercase mb-6">Dönüşüm Vakti</span>
              <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6 leading-tight">
                Ruhsal Yolculuğunuza <br />
                <span className="font-light text-gold-light">Birlikte Adım Atalım</span>
              </h2>
              <p className="text-ivory/60 text-sm md:text-base leading-relaxed max-w-md">
                Size en uygun spiritüel yolu bulmak ve içsel huzura ve gerçek potansiyelinize ulaşmanız için ilk adımı bugün atın.
              </p>
            </AnimatedSection>
          </div>

          <motion.div 
            className="relative z-10 flex flex-col sm:flex-row items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link href="/iletisim" className="btn-primary !bg-gold !text-wine hover:!bg-ivory hover:!text-wine !px-10 !py-4 !text-[0.7rem] !tracking-[0.2em] shadow-2xl">
              SEANS OLUŞTUR
              <HiOutlineArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link href="/hizmetler" className="text-ivory/80 hover:text-ivory text-[0.7rem] font-bold tracking-[0.3em] uppercase transition-colors flex items-center gap-3 group">
              EĞİTİMLERİ GÖR <div className="w-8 h-px bg-gold/50 group-hover:w-12 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
