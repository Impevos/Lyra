'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Reduce particle count on mobile for better performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 20 : 40;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;
    let isVisible = true;

    const animate = () => {
      if (!isVisible || !canvasRef.current) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;

        ctx.fillStyle = `rgba(184, 149, 106, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Only animate when section is visible in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />

      {/* Subtle Light Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(218,193,124,0.1),transparent_70%)]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[10%] w-4 h-4 bg-gold/30 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[15%] w-6 h-6 bg-gold/20 rounded-full blur-md"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[40%] left-[20%] w-3 h-3 bg-gold/40 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.span 
            className="label-line mb-8 text-gold-dark !tracking-[0.6em] drop-shadow-sm"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
          >
            Spiritüel Bilincin Kapısı
          </motion.span>
          
          <motion.h1 
            className="heading-display mb-10 text-balance"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
            }}
          >
            Ruhsal Yolculuğunuzda <br />
            <span className="gradient-text font-light drop-shadow-sm">Işığa Dönün</span>
          </motion.h1>

          <motion.p 
            className="body-lg max-w-2xl mb-14 text-[#2A2A2A] text-balance leading-relaxed font-medium"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
          >
            Lyra On Earth, kadim bilgiler ve modern farkındalık teknikleriyle içsel huzura ve gerçek potansiyelinize ulaşmanız için yanınızda.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
            }}
          >
            <Link href="/iletisim" className="btn-primary group !px-12 !py-5 !rounded-full shadow-lg shadow-[#a79d99]/20">
              <span>YOLCULUĞA BAŞLA</span>
              <HiOutlineArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
            <Link href="/hizmetler" className="btn-secondary group !px-12 !py-5 !rounded-full !border-gold/30 hover:!bg-gold/5">
              <span>HİZMETLERİ KEŞFET</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory via-ivory/50 to-transparent pointer-events-none" />
    </section>
  );
}
