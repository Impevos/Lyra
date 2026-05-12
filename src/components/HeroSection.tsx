'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 40;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(184, 149, 106, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
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
              hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
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
