'use client';

import AnimatedSection from './AnimatedSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineCalendar, HiOutlinePlay, HiOutlineArrowRight } from 'react-icons/hi';

import { useState, useEffect } from 'react';
import { defaultPageContent, getFeaturedItems } from '@/data/defaults';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  HiOutlinePlay,
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineArrowRight
};

export default function FeaturedContent() {
  const [content, setContent] = useState(defaultPageContent);
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    const savedContent = localStorage.getItem('custom_page_content');
    if (savedContent) {
      setContent({ ...defaultPageContent, ...JSON.parse(savedContent) });
    }
    setFeatured(getFeaturedItems());
  }, []);

  return (
    <section id="one-cikanlar" className="py-40 relative bg-cream/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <AnimatedSection className="max-w-3xl">
            <span className="text-gold font-bold tracking-[0.4em] text-[0.6rem] uppercase mb-6 block">{content.featuredLabel}</span>
            <h2 className="font-serif text-5xl md:text-7xl text-wine mb-8 leading-[1.1]">
              {content.featuredTitleLine1} <br />
              <span className="gradient-text">{content.featuredTitleLine2}</span>
            </h2>
            <p className="body-md text-left text-taupe/60 leading-loose max-w-xl">
              {content.featuredDescription}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="hidden lg:block">
            <Link href="/blog" className="btn-secondary !border-gold/20 !px-12">
              TÜMÜNÜ GÖR
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {featured.map((item, index) => {
            const IconComponent = iconMap[item.icon as string] || HiOutlineStar;
            return (
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
                      <IconComponent className="text-xl" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
