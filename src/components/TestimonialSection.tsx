'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    name: 'Merve A.',
    role: 'Mastersoul Eğitim Katılımcısı',
    text: 'Mastersoul eğitimi beklentilerimin çok üzerindeydi. Derinlemesine bilinç çalışmalarıyla kendimi yeniden keşfettim. Bu deneyimi herkese tavsiye ederim.',
    rating: 5,
  },
  {
    name: 'Caner B.',
    role: 'Birebir Yayın Danışanı',
    text: 'Lyra On Earth ile tanıştığımdan beri hayatımdaki farkındalık seviyesi inanılmaz arttı. Enerji temizliği seansları çok etkili.',
    rating: 5,
  },
  {
    name: 'Elif Y.',
    role: 'Grup Yayını Katılımcısı',
    text: 'Her hafta sabırsızlıkla beklediğim bir topluluk. Kolektif bilinç çalışmalarında kendimi çok huzurlu ve dengeli hissediyorum.',
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deneyimler" className="py-40 relative overflow-hidden bg-ivory">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.02] pointer-events-none select-none overflow-hidden whitespace-nowrap">
        <span className="font-serif text-[25vw] leading-none uppercase text-wine">Deneyimler Deneyimler</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-24">
          <span className="text-gold font-bold tracking-[0.5em] text-[0.6rem] uppercase mb-6 block">Referanslar</span>
          <h2 className="font-serif text-5xl md:text-6xl text-wine italic font-light">
            Katılımcılarımız <span className="not-italic font-normal">Ne Diyor?</span>
          </h2>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-8" />
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="premium-card p-16 md:p-24 bg-white/60 backdrop-blur-3xl border-gold/10 relative"
              >
                {/* Elegant Quote Ornament */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-ivory rounded-full border border-gold/10 flex items-center justify-center text-gold text-4xl font-serif">
                  &ldquo;
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center gap-1.5 mb-10">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className="text-lg text-gold" />
                    ))}
                  </div>

                  <p className="font-serif text-2xl md:text-4xl text-wine leading-[1.6] italic mb-16 max-w-3xl">
                    {testimonials[activeIndex].text}
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-burgundy to-wine flex items-center justify-center text-ivory font-serif text-2xl mb-6 shadow-2xl">
                      {testimonials[activeIndex].name[0]}
                    </div>
                    <h4 className="font-serif text-2xl text-wine mb-2">{testimonials[activeIndex].name}</h4>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-gold font-bold">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-6 mt-16">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative py-4 px-2`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div className={`h-[2px] transition-all duration-700 ${
                    index === activeIndex ? 'w-12 bg-burgundy' : 'w-4 bg-gold/30 group-hover:bg-gold/60'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
