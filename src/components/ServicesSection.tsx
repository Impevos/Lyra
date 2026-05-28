'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineUserGroup, HiOutlineBookOpen, HiOutlineMoon } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';
import { defaultServices, defaultPageContent } from '@/data/defaults';
import { motion } from 'framer-motion';

interface ServiceItem {
  title: string;
  description: string;
  icon: string | React.ComponentType<{ className?: string }>;
  link: string;
  tag?: string;
  image?: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  HiOutlineMoon: HiOutlineMoon,
  HiOutlineUserGroup: HiOutlineUserGroup,
  HiOutlineSparkles: HiOutlineSparkles,
  HiOutlineBookOpen: HiOutlineBookOpen,
};

interface MappedService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  tag?: string;
  image?: string;
}

const mappedDefaults: MappedService[] = defaultServices.map((item) => ({
  ...item,
  icon: iconMap[item.icon] || HiOutlineSparkles,
}));

export default function ServicesSection() {
  const [services, setServices] = useState<MappedService[]>(mappedDefaults);
  const [content, setContent] = useState(defaultPageContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('custom_page_content');
    if (savedContent) {
      setContent({ ...defaultPageContent, ...JSON.parse(savedContent) });
    }

    const saved = localStorage.getItem('custom_services');
    if (saved) {
      const custom = JSON.parse(saved);
      const mappedCustom = custom.map((item: ServiceItem) => ({
        ...item,
        icon: iconMap[item.icon as string] || HiOutlineSparkles,
      }));
      setServices(mappedCustom);
    }
  }, []);

  return (
    <section id="hizmetler" className="py-40 relative bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold/40" />
              <span className="text-gold font-bold tracking-[0.4em] text-[0.65rem] uppercase">{content.servicesLabel}</span>
              <div className="w-12 h-px bg-gold/40" />
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl text-wine leading-[1.1] mb-8">
              {content.servicesTitleLine1} <br />
              <span className="font-light text-[#7d7572]">{content.servicesTitleLine2}</span>
            </h2>
            
            <p className="body-md text-center text-taupe/50 leading-relaxed mx-auto max-w-2xl">
              {content.servicesDescription}
            </p>
          </AnimatedSection>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch -space-y-6 lg:-space-y-0 lg:-space-x-12 max-w-6xl mx-auto mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ zIndex: 10, scale: 1.03, translateY: -5 }}
              className="relative flex-1 max-w-sm"
              style={{ zIndex: 1 }}
            >
              <div className="premium-card group h-full flex flex-col p-1 bg-white/90 backdrop-blur-3xl border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gold/10 overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />

                {service.image && (
                  <div className="relative h-40 overflow-hidden rounded-t-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  </div>
                )}

                <div className="flex-grow p-8 flex flex-col items-start text-left relative overflow-hidden">
                  {/* Large Number */}
                  <div className="absolute top-4 right-6 font-serif text-7xl text-gold/5 font-bold pointer-events-none group-hover:text-gold/10 transition-colors duration-500">
                    0{index + 1}
                  </div>

                  <div className="relative w-14 h-14 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold to-burgundy rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                    <div className="relative w-full h-full rounded-2xl bg-ivory border border-gold/10 flex items-center justify-center group-hover:bg-wine transition-all duration-500">
                      <service.icon className="text-xl text-gold group-hover:text-ivory" />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl text-wine mb-3 group-hover:text-burgundy transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[0.85rem] leading-[1.7] text-taupe/60 mb-6 font-medium">
                    {service.description}
                  </p>
                </div>
                
                <Link
                  href={service.link}
                  className="w-full py-5 px-8 flex items-center justify-between text-[0.65rem] font-bold tracking-[0.2em] text-gold uppercase hover:bg-gold/5 transition-all rounded-b-[2.5rem] relative z-10"
                >
                  KEŞFET
                  <HiOutlineArrowRight className="text-xs transition-transform duration-500 group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
