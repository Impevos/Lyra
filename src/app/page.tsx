'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getProducts, 
  ProductItem, 
  defaultProducts, 
  getVideos, 
  FeaturedVideoItem,
  defaultVideos,
  getProfile,
  ProfileData,
  defaultProfile,
  getSiteContent,
  SiteContent,
  defaultSiteContent
} from '@/data/defaults';
import ProductCard from '@/components/ProductCard';
import CountdownTimer from '@/components/CountdownTimer';
import ValuesTicker from '@/components/ValuesTicker';
import { 
  FaInstagram, 
  FaYoutube, 
  FaSpotify, 
  FaEnvelope, 
  FaTiktok 
} from 'react-icons/fa';
import { 
  HiOutlineArrowRight, 
  HiOutlineChevronDown, 
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineLockClosed
} from 'react-icons/hi';

const socialIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  instagram: { icon: FaInstagram, label: 'Instagram' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
  spotify: { icon: FaSpotify, label: 'Spotify' },
  email: { icon: FaEnvelope, label: 'E-posta' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
};

export default function HomePage() {
  const [products, setProducts] = useState<ProductItem[]>(defaultProducts);
  const [videos, setVideos] = useState<FeaturedVideoItem[]>(defaultVideos);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const [fetchedProducts, fetchedProfile, fetchedVideos, fetchedContent] = await Promise.all([
        getProducts(),
        getProfile(),
        getVideos(),
        getSiteContent(),
      ]);
      if (fetchedProducts && fetchedProducts.length > 0) setProducts(fetchedProducts);
      if (fetchedProfile) setProfile(fetchedProfile);
      if (fetchedVideos && fetchedVideos.length > 0) setVideos(fetchedVideos);
      if (fetchedContent) setSiteContent(fetchedContent);
    } catch (e) {
      console.warn('HomePage loadData warning:', e);
    }
  };

  useEffect(() => {
    loadData();

    // Re-sync when tab gains focus so changes made by another admin show immediately
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const eyeAmNova = products.find(p => p.id === 'eye-am-nova');
  const mastersoul = products.find(p => p.id === 'mastersoul');
  const otherPaidProducts = products.filter(p => p.priceType !== 'free' && p.id !== 'eye-am-nova' && p.id !== 'mastersoul');
  const freeProducts = products.filter(p => p.priceType === 'free');

  const activeSocials = Object.entries(profile.socials).filter(([, url]) => url);
  const currentFaqs = siteContent.faqSection?.items && siteContent.faqSection.items.length > 0
    ? siteContent.faqSection.items
    : defaultSiteContent.faqSection.items;

  return (
    <div className="w-full flex flex-col items-center">
      {/* ─────────────────────────────────────────────────────────────
          TOP ANNOUNCEMENT BAR (Optional CMS banner)
      ───────────────────────────────────────────────────────────── */}
      {siteContent.announcement?.enabled && (
        <aside aria-label="Duyuru" className="w-full bg-wine text-ivory py-2.5 px-4 text-center border-b border-gold/30 text-xs tracking-wider flex items-center justify-center gap-3">
          {siteContent.announcement.badge && (
            <span className="bg-gold/20 text-gold-light px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-widest border border-gold/40">
              {siteContent.announcement.badge}
            </span>
          )}
          <span className="font-medium text-xs text-ivory/90">{siteContent.announcement.text}</span>
          {siteContent.announcement.linkText && (
            <a 
              href={siteContent.announcement.linkUrl || '#portallar'} 
              className="font-bold underline text-gold hover:text-white transition-colors"
            >
              {siteContent.announcement.linkText} →
            </a>
          )}
        </aside>
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (EDITORIAL & REBORN MASTERCLASS URGENCY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-10 pb-16 px-4 sm:px-8 text-center overflow-hidden">
        {/* Subtle decorative architectural crosshairs */}
        <div className="absolute top-10 left-8 text-gold/40 font-mono text-xs hidden lg:block select-none font-bold">
          + 01 // SOUL BLUEPRINT & BİLİNÇ
        </div>
        <div className="absolute top-10 right-8 text-gold/40 font-mono text-xs hidden lg:block select-none font-bold">
          {siteContent.hero.editionText || 'EDITION 2026 // LIVE +'}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Center Text & Conversion Core */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Top Urgency Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border-2 border-wine/30 bg-white/80 shadow-xs mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-burgundy opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-burgundy"></span>
              </span>
              <span className="font-cinzel text-[0.62rem] sm:text-[0.68rem] tracking-[0.28em] text-wine font-bold uppercase">
                {siteContent.hero.badge || 'LYRA ON EARTH • 2026 DÖNÜŞÜM DÖNEMİ KAYITLARI'}
              </span>
            </div>

            {/* Bold, Sert & Editorial Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-wine font-light tracking-[0.03em] leading-[1.12] mb-6 uppercase">
              {siteContent.hero.titleLine1 || 'Kendi Gerçekliğini'} <br />
              <span className="italic font-bold font-serif text-burgundy">{siteContent.hero.titleAccent || 'İddia ve İlan'}</span> {siteContent.hero.titleLine2 || 'Et.'}
            </h1>

            {/* Structured High-Impact Philosophy (Scannable Points) */}
            <div className="space-y-3 mb-8 max-w-xl text-left">
              <div className="p-3.5 bg-white/70 border-l-4 border-burgundy border-y border-r border-gold/15 text-xs sm:text-sm text-taupe/85 leading-relaxed">
                {siteContent.hero.philosophyQuote || (
                  <><strong className="text-wine font-bold">Eye</strong> (Bilincin Gözü) ile <strong className="text-wine font-bold">Nova</strong> (Durdurulamaz Enerji) birleştiğinde; Matrix&apos;in kalıpları hükümsüz kalır ve gerçek içsel egemenlik başlar.</>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-[0.68rem] text-wine font-bold tracking-wider uppercase">
                {(siteContent.hero.pills || ['✦ KUANTUM & ZİHİN YAPISI', '✦ ERİL & DİŞİL DENGE', '✦ SOUL BLUEPRINT']).map((pill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/90 border border-wine/20">{pill}</span>
                ))}
              </div>
            </div>

            {/* Live Countdown Timer (Reborn Masterclass Style) */}
            <div className="w-full max-w-md mb-8">
              <CountdownTimer 
                title={siteContent.countdown?.title} 
                targetDate={siteContent.countdown?.targetDate} 
              />
            </div>

            {/* Dual Sharp CTAs with Pulsing Glow Ring */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={siteContent.hero.primaryButtonLink || '#portallar'}
                className="btn-reborn-sharp w-full sm:w-auto text-center"
              >
                {siteContent.hero.primaryButtonText || 'YERİNİ ŞİMDİ AYIRT →'}
              </a>
              <a
                href={siteContent.hero.secondaryButtonLink || '#kimler-icin'}
                className="btn-luxury-outline w-full sm:w-auto text-center"
              >
                {siteContent.hero.secondaryButtonText || 'BU YOLCULUK SANA UYGUN MU?'}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-[0.65rem] tracking-[0.18em] text-taupe/70 uppercase font-semibold">
              {(siteContent.hero.trustBadges || ['BDDK Onaylı Güvenli Ödeme', '256-Bit SSL', 'Sınırlı 12 Kişilik Grup']).map((badge, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx === 0 && <HiOutlineShieldCheck className="text-base text-burgundy" />}
                  {idx === 1 && <HiOutlineLockClosed className="text-base text-burgundy" />}
                  {idx > 1 && <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />}
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Deniz Bayraktar Editorial Awakening Portrait (deniz4.jpeg) */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Subtle ambient light aura */}
              <div className="absolute -inset-4 bg-radial from-gold/15 via-wine/5 to-transparent blur-2xl pointer-events-none -z-10" />

              {/* Museum Passe-Partout Gallery Frame */}
              <div className="relative p-3.5 sm:p-5 bg-white/75 backdrop-blur-md border border-wine/20 shadow-[0_25px_60px_-15px_rgba(42,9,19,0.12)]">
                {/* Architectural Corner Crosshairs */}
                <span className="absolute top-2 left-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute top-2 right-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute bottom-2 left-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute bottom-2 right-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>

                {/* Inner Image Canvas */}
                <div className="relative aspect-[4/5] overflow-hidden border border-wine/15 bg-charcoal">
                  <Image
                    src={profile.avatar || '/deniz4.jpeg'}
                    alt="Deniz Bayraktar — Lyra On Earth"
                    fill
                    sizes="(max-width: 640px) 288px, 420px"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/65 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Insight Box */}
                  <div className="absolute bottom-3 left-3 right-3 bg-ivory/95 backdrop-blur-md p-3 border border-gold/40 text-center shadow-md">
                    <span className="font-cinzel text-[0.62rem] tracking-[0.25em] text-wine font-bold uppercase block mb-0.5">
                      {siteContent.hero.founderCardTitle || `${profile.name.toUpperCase()} // ${profile.brandName}`}
                    </span>
                    <p className="font-serif italic text-[0.72rem] text-taupe leading-tight">
                      &ldquo;{siteContent.hero.founderCardQuote || profile.bio}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CONTINUOUS LUXURY VALUES TICKER (REBORN STYLE)
      ───────────────────────────────────────────────────────────── */}
      <ValuesTicker items={siteContent.tickerItems} />

      {/* ─────────────────────────────────────────────────────────────
          3. QUANTITATIVE IMPACT STATS BAR (SHARP & BOLD / "SERT")
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {(siteContent.stats || defaultSiteContent.stats).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="sharp-card-light p-6 sm:p-8 flex flex-col justify-between text-left relative group"
            >
              <div className="absolute top-2 right-2 text-gold/30 font-mono text-[0.6rem] font-bold">
                0{idx + 1}
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight block mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </span>
                <span className="font-cinzel text-[0.65rem] tracking-[0.25em] text-wine font-bold uppercase block mb-1.5">
                  {stat.label}
                </span>
              </div>
              <p className="text-[0.72rem] text-taupe/70 leading-relaxed font-normal">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. DENİZ BAYRAKTAR EDITORIAL FEATURE (deniz7.jpeg & deniz6.jpeg)
      ───────────────────────────────────────────────────────────── */}
      <section id="rehber" className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column (Deniz in Black Suit Power Pose - deniz7.jpeg) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="relative group/avatar max-w-sm sm:max-w-md w-full">
              {/* Subtle ambient light aura */}
              <div className="absolute -inset-4 bg-radial from-gold/15 via-wine/5 to-transparent blur-2xl pointer-events-none -z-10" />

              {/* Museum Passe-Partout Gallery Frame */}
              <div className="relative p-3.5 sm:p-5 bg-white/75 backdrop-blur-md border border-wine/20 shadow-[0_25px_60px_-15px_rgba(42,9,19,0.12)]">
                {/* Architectural Corner Crosshairs */}
                <span className="absolute top-2 left-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute top-2 right-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute bottom-2 left-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                <span className="absolute bottom-2 right-2 text-[0.65rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>

                {/* Inner Image Canvas */}
                <div className="relative aspect-[4/5] overflow-hidden border border-wine/15 bg-charcoal">
                  <Image
                    src="/deniz7.jpeg"
                    alt={profile.name}
                    fill
                    sizes="(max-width: 640px) 288px, 420px"
                    className="object-cover object-[center_28%] transition-transform duration-1000 group-hover/avatar:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 border border-gold/40 shadow-sm">
                    <span className="font-cinzel text-[0.62rem] tracking-[0.3em] text-wine font-bold uppercase">
                      {profile.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative & Scannable Manifesto Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-burgundy" />
              <span className="font-cinzel text-[0.68rem] tracking-[0.35em] text-burgundy font-bold uppercase">
                {siteContent.founder.eyebrow || 'REHBER & KURUCU'}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-wine font-light leading-tight tracking-[0.03em] uppercase mb-6">
              {siteContent.founder.titleLine1 || 'Egonun Kafesinden'} <br />
              <span className="italic font-bold text-burgundy font-serif">{siteContent.founder.titleAccent || 'Kaderinin Hakikatine'}</span> {siteContent.founder.titleLine2 || 'Geçiş.'}
            </h2>

            {/* Highlighted Core Quote from Curriculum */}
            <div className="p-5 bg-white border-l-4 border-burgundy border-y border-r border-wine/15 shadow-xs mb-6">
              <p className="font-serif italic text-base sm:text-lg text-wine leading-relaxed">
                &ldquo;{siteContent.founder.quote || 'Geçmişin seni açıklayabilir, ama tanımlamak zorunda değil.'}&rdquo;
              </p>
            </div>

            {/* Scannable Key Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {(siteContent.founder.principles || defaultSiteContent.founder.principles).map((p, i) => (
                <div key={i} className="p-3.5 bg-white/70 border border-wine/15">
                  <span className="font-cinzel text-[0.62rem] text-burgundy font-bold uppercase block mb-1">
                    {p.number}. {p.title}
                  </span>
                  <p className="text-[0.75rem] text-taupe/80 leading-normal">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-gold/15 flex flex-wrap items-center gap-3">
              <span className="text-[0.62rem] tracking-[0.25em] text-burgundy uppercase font-bold mr-2">
                BAĞLANTIDA KAL:
              </span>
              {activeSocials.map(([key, url]) => {
                const social = socialIcons[key];
                if (!social) return null;
                const IconComp = social.icon;
                return (
                  <a
                    key={key}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-wine/20 bg-white/80 flex items-center justify-center text-wine hover:text-white hover:bg-wine hover:border-wine transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComp className="text-sm" />
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE 3 SACRED GATES OF TRANSFORMATION (MASTERSOUL CURRICULUM)
      ───────────────────────────────────────────────────────────── */}
      <section id="donusum-kapilari" className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-cinzel text-[0.68rem] tracking-[0.35em] text-burgundy font-bold uppercase block mb-3">
            {siteContent.gatesSection.eyebrow || '90 GÜNLÜK MASTER DÖNÜŞÜM STRÜKTÜRÜ'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase mb-4">
            {siteContent.gatesSection.titleLine1 || 'Dönüşümün'} <span className="italic font-bold text-burgundy font-serif">{siteContent.gatesSection.titleAccent || 'Üç Kadim'}</span> Kapısı
          </h2>
          <div className="w-16 h-0.5 bg-burgundy mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-taupe/80 leading-relaxed font-normal">
            {siteContent.gatesSection.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {(siteContent.gatesSection.gates || defaultSiteContent.gatesSection.gates).map((gate, gIdx) => (
            <motion.div
              key={gIdx}
              className={`sharp-card-light p-7 sm:p-8 flex flex-col justify-between ${gIdx === 1 ? 'border-burgundy bg-burgundy/5' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: gIdx * 0.15 }}
            >
              <div>
                <div className={`flex items-center justify-between border-b-2 pb-4 mb-5 ${gIdx === 1 ? 'border-burgundy/20' : 'border-wine/10'}`}>
                  <span className={`font-cinzel text-xl font-bold ${gIdx === 1 ? 'text-burgundy' : 'text-wine'}`}>
                    {gate.gateNumber}
                  </span>
                  <span className={`text-[0.62rem] font-bold tracking-[0.25em] uppercase px-2.5 py-1 ${
                    gIdx === 1 ? 'text-white bg-burgundy' : 'text-burgundy bg-burgundy/10'
                  }`}>
                    {gate.phaseBadge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-wine font-bold uppercase tracking-wider mb-2">
                  {gate.title}
                </h3>
                <p className="font-cinzel text-[0.65rem] text-burgundy font-bold tracking-wider uppercase mb-4">
                  {gate.subtitle}
                </p>

                <div className={`p-3 border-l-2 border-burgundy mb-5 text-[0.78rem] text-taupe/85 leading-relaxed ${
                  gIdx === 1 ? 'bg-white' : 'bg-wine/5'
                }`}>
                  {gate.description}
                </div>

                <ul className={`space-y-2 text-[0.72rem] text-wine font-semibold border-t pt-4 ${
                  gIdx === 1 ? 'border-burgundy/20' : 'border-wine/10'
                }`}>
                  {gate.topics.map((t, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2">
                      <span className="text-burgundy">✦</span> {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-6 pt-4 border-t-2 text-[0.65rem] font-bold uppercase ${
                gIdx === 1 ? 'border-burgundy/20 text-burgundy' : 'border-wine/10 text-taupe/60'
              }`}>
                {gate.resultText}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CORE REBORN COMPARISON: "KİMLER İÇİN / KİMLER İÇİN UYGUN DEĞİL?"
      ───────────────────────────────────────────────────────────── */}
      <section id="kimler-icin" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-gold/15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-cinzel text-[0.68rem] tracking-[0.35em] text-burgundy font-bold uppercase block mb-3">
            {siteContent.alignmentSection.eyebrow || 'HİZALANMA & UYGUNLUK TESTİ'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.04em] uppercase mb-4">
            {siteContent.alignmentSection.titleLine1 || 'Bu Yolculuk'} <span className="italic font-bold text-burgundy font-serif">{siteContent.alignmentSection.titleAccent || 'Kimin İçin?'}</span>
          </h2>
          <div className="w-16 h-0.5 bg-burgundy mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-taupe/75 leading-relaxed font-normal">
            {siteContent.alignmentSection.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: THIS IS FOR YOU IF */}
          <motion.div
            className="lg:col-span-6 sharp-card-light p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-burgundy" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 border-2 border-burgundy bg-burgundy/10 flex items-center justify-center text-burgundy">
                  <HiOutlineCheck className="text-xl" />
                </div>
                <div>
                  <span className="text-[0.6rem] font-mono tracking-widest text-burgundy uppercase font-bold block">
                    {siteContent.alignmentSection.forYou.badge || 'UYGUN ADAY'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-wine font-bold uppercase tracking-wide">
                    {siteContent.alignmentSection.forYou.title || 'Bu Yolculuk Sizin İçin, Eğer:'}
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-taupe/85 leading-relaxed font-medium">
                {siteContent.alignmentSection.forYou.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-none bg-burgundy text-white flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-wine/10">
              <span className="text-xs text-burgundy font-bold uppercase tracking-widest block">
                {siteContent.alignmentSection.forYou.conclusion || '✓ Doğru yerdesiniz. Portallara katılarak ilk adımı atın.'}
              </span>
            </div>
          </motion.div>

          {/* Card 2: THIS IS NOT FOR YOU IF */}
          <motion.div
            className="lg:col-span-6 sharp-card-dark p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 border-2 border-gold/40 bg-black/30 flex items-center justify-center text-rose">
                  <HiOutlineX className="text-xl" />
                </div>
                <div>
                  <span className="text-[0.6rem] font-mono tracking-widest text-gold uppercase font-bold block">
                    {siteContent.alignmentSection.notForYou.badge || 'UYGUN DEĞİL'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-bold uppercase tracking-wide">
                    {siteContent.alignmentSection.notForYou.title || 'Bu Yolculuk Size Göre Değil, Eğer:'}
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-ivory/85 leading-relaxed font-medium">
                {siteContent.alignmentSection.notForYou.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-none bg-rose/20 border border-rose/40 text-rose flex items-center justify-center text-xs mt-0.5">
                      ✗
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gold/20">
              <span className="text-xs text-gold font-bold uppercase tracking-widest block">
                {siteContent.alignmentSection.notForYou.conclusion || '✗ Bu frekans ve disipline hazır hissetmiyorsanız başvurmayınız.'}
              </span>
            </div>
          </motion.div>

        </div>

        {/* Center Banner with Direct Call to Action */}
        <div className="mt-12 sharp-card-light p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-wine/30">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border border-wine/25 shadow-md bg-charcoal">
              <Image
                src="/deniz6.jpeg"
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover object-center"
              />
            </div>
            <div className="text-left">
              <span className="font-cinzel text-[0.62rem] text-burgundy font-bold tracking-[0.25em] uppercase block">
                {siteContent.alignmentSection.banner.eyebrow || 'DOĞRUDAN REHBERLİK & DENETİM'}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-wine font-bold uppercase">
                &ldquo;{siteContent.alignmentSection.banner.quote || 'Dönüşüm cesur bir karar ile başlar.'}&rdquo;
              </h4>
              <p className="text-xs text-taupe/70 font-normal">
                {siteContent.alignmentSection.banner.desc || 'Eğer yukarıdaki kriterlerle hizalanıyorsan, kontenjanlar dolmadan yerini ayırt.'}
              </p>
            </div>
          </div>

          <a
            href={siteContent.alignmentSection.banner.buttonLink || '#portallar'}
            className="btn-reborn-sharp shrink-0 w-full md:w-auto text-center"
          >
            {siteContent.alignmentSection.banner.buttonText || 'PORTALLARI İNCELE & BAŞVUR →'}
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SIGNATURE TRANSFORMATION PORTALS (EYE AM NOVA & MASTERSOUL)
      ───────────────────────────────────────────────────────────── */}
      <section id="portallar" className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-cinzel text-[0.65rem] tracking-[0.4em] text-burgundy font-bold uppercase block mb-3">
              {siteContent.portalsHeader.eyebrow || 'BAŞYAPIT EĞİTİMLER'}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase">
              {siteContent.portalsHeader.titleLine1 || 'Dönüşüm'} <span className="italic font-bold text-burgundy font-serif">{siteContent.portalsHeader.titleAccent || 'Portalları'}</span>
            </h2>
          </div>
          <Link
            href="/offers"
            className="text-[0.68rem] font-bold tracking-[0.25em] text-wine hover:text-burgundy uppercase flex items-center gap-2 group transition-colors"
          >
            {siteContent.portalsHeader.viewAllText || 'TÜM TEKLİFLERİ GÖR'}
            <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-12">
          
          {/* Featured Portal 1: EYE AM NOVA */}
          {eyeAmNova && (
            <motion.div
              className="sharp-card-light p-8 sm:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-[4/5] p-2.5 bg-white/70 backdrop-blur-md border border-wine/25 shadow-xl">
                    <span className="absolute top-1.5 left-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute top-1.5 right-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute bottom-1.5 left-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute bottom-1.5 right-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>

                    <div className="relative w-full h-full overflow-hidden border border-wine/15 bg-charcoal">
                      <Image
                        src={eyeAmNova.image || '/deniz5.jpeg'}
                        alt={eyeAmNova.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-[center_30%] transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/20 text-white text-[0.6rem] font-cinzel tracking-widest uppercase font-bold">
                        {eyeAmNova.badgeText || '3 AYLIK PORTAL'}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 border border-wine text-wine font-bold text-xs tracking-widest uppercase shadow-md">
                        {eyeAmNova.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-cinzel text-[0.68rem] tracking-[0.3em] text-burgundy font-bold uppercase">
                        {eyeAmNova.badgeText || '3 AYLIK İNİSİYASYON'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-burgundy animate-ping" />
                      <span className="text-[0.62rem] text-burgundy tracking-widest uppercase font-mono font-bold">
                        SINIRLI KONTENJAN
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-wine font-bold tracking-wide uppercase mb-3">
                      {eyeAmNova.title}
                    </h3>

                    <p className="font-serif italic text-base text-taupe font-semibold mb-4">
                      &ldquo;{eyeAmNova.tagline}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
                      <div className="p-3 bg-white border border-wine/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">01. MODÜL</span>
                        <strong className="text-xs text-wine uppercase block mb-1">Egoyu Çözmek</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Gölge kimlikler, içsel çocuklar ve quasarları keşfetme, öz sabotajı yok etme.
                        </p>
                      </div>

                      <div className="p-3 bg-white border border-wine/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">02. MODÜL</span>
                        <strong className="text-xs text-wine uppercase block mb-1">İçsel Egemenlik</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Eril & dişil prensipleri, kral-kraliçe kadim öğretileri ve güvenli alan yaratımı.
                        </p>
                      </div>

                      <div className="p-3 bg-white border border-wine/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">03. MODÜL</span>
                        <strong className="text-xs text-wine uppercase block mb-1">Dragon Ride</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Paralel hayatlarla bağ kurma, solucan delikleri ve insan olmayı onurlandırma.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-[0.68rem] text-wine font-bold uppercase tracking-wider text-center">
                      <div className="p-2.5 bg-wine/5 border border-wine/15">18 Grup Dersi</div>
                      <div className="p-2.5 bg-wine/5 border border-wine/15">3 Bireysel Seans</div>
                      <div className="p-2.5 bg-wine/5 border border-wine/15">Entegrasyon Alanı</div>
                      <div className="p-2.5 bg-wine/5 border border-wine/15">Özel Topluluk</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-wine/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-taupe/70 font-semibold">
                      * Canlı oturumlar Zoom üzerinden gerçekleştirilmektedir.
                    </span>
                    <Link
                      href={`/p/${eyeAmNova.id}`}
                      className="btn-reborn-sharp w-full sm:w-auto text-center"
                    >
                      {eyeAmNova.buttonText || 'PORTALA KATIL'} →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Featured Portal 2: MASTERSOUL */}
          {mastersoul && (
            <motion.div
              className="sharp-card-light p-8 sm:p-10 relative overflow-hidden border-burgundy"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-[4/5] p-2.5 bg-white/70 backdrop-blur-md border border-burgundy/25 shadow-xl">
                    <span className="absolute top-1.5 left-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute top-1.5 right-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute bottom-1.5 left-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>
                    <span className="absolute bottom-1.5 right-1.5 text-[0.6rem] text-gold/60 font-mono select-none pointer-events-none font-bold">+</span>

                    <div className="relative w-full h-full overflow-hidden border border-burgundy/15 bg-charcoal">
                      <Image
                        src={mastersoul.image || '/deniz8.jpeg'}
                        alt={mastersoul.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-[center_40%] transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 bg-burgundy px-3 py-1 text-white text-[0.6rem] font-cinzel tracking-widest uppercase font-bold shadow-xs">
                        {mastersoul.badgeText || 'KAPALI GRUP'}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 border border-burgundy text-burgundy font-bold text-xs tracking-widest uppercase shadow-md">
                        {mastersoul.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-cinzel text-[0.68rem] tracking-[0.3em] text-burgundy font-bold uppercase">
                        {mastersoul.badgeText || '90 GÜNLÜK MASTER DÖNÜŞÜM'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-burgundy animate-ping" />
                      <span className="text-[0.62rem] text-burgundy tracking-widest uppercase font-mono font-bold">
                        SON KONTENJANLAR
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-wine font-bold tracking-wide uppercase mb-3">
                      {mastersoul.title}
                    </h3>

                    <p className="font-serif italic text-base text-taupe font-semibold mb-4">
                      &ldquo;{mastersoul.tagline}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
                      <div className="p-3 bg-burgundy/5 border border-burgundy/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">KAPI 01</span>
                        <strong className="text-xs text-wine uppercase block mb-1">Masumiyete Dönüş</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Kalple temas, affetmek, utanç ve suçluluk yüklerini dönüştürmek, içsel çocuk ile sıfır noktası.
                        </p>
                      </div>

                      <div className="p-3 bg-burgundy/5 border border-burgundy/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">KAPI 02</span>
                        <strong className="text-xs text-wine uppercase block mb-1">Gerçeklikle Oynamak</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Kuantum prensipleri, Akaşik anlaşmalar, aura anatomisi ve kutsal geometri.
                        </p>
                      </div>

                      <div className="p-3 bg-burgundy/5 border border-burgundy/20">
                        <span className="font-cinzel text-[0.6rem] text-burgundy font-bold block mb-1">KAPI 03</span>
                        <strong className="text-xs text-wine uppercase block mb-1">Kendini Kazanmak</strong>
                        <p className="text-[0.7rem] text-taupe/70 leading-tight">
                          Koşulsuz öz-sevgi, self-sabotajı bitirme, atalar bağı ve ışık frekansına adanma.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-[0.68rem] text-wine font-bold uppercase tracking-wider text-center">
                      <div className="p-2.5 bg-white border border-burgundy/20">3 Kadim Kapı</div>
                      <div className="p-2.5 bg-white border border-burgundy/20">Aylık 8 Canlı Ders</div>
                      <div className="p-2.5 bg-white border border-burgundy/20">Bireysel Seanslar</div>
                      <div className="p-2.5 bg-white border border-burgundy/20">10-15 Kişilik Alan</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-wine/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-taupe/70 font-semibold">
                      * Katılımcılarla başlamadan önce kısa bir tanışma görüşmesi yapılmaktadır.
                    </span>
                    <Link
                      href={`/p/${mastersoul.id}`}
                      className="btn-reborn-sharp w-full sm:w-auto text-center"
                    >
                      {mastersoul.buttonText || 'GRUPTA YERİNİ AYIRT'} →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Additional Paid Products */}
          {otherPaidProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {otherPaidProducts.map((prod, idx) => (
                <ProductCard key={prod.id} product={prod} index={idx + 2} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SACRED LIBRARY / FREE TRANSMISSIONS (DARK MOTHER KALI & SORU CEVAP)
      ───────────────────────────────────────────────────────────── */}
      {freeProducts.length > 0 && (
        <section id="kutuphane" className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-cinzel text-[0.65rem] tracking-[0.4em] text-burgundy font-bold uppercase block mb-3">
              {siteContent.libraryHeader.eyebrow || 'KADİM KÜTÜPHANE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase mb-4">
              {siteContent.libraryHeader.titleLine1 || 'Ücretsiz'} <span className="italic font-bold text-burgundy font-serif">{siteContent.libraryHeader.titleAccent || 'Rehberler & Metinler'}</span>
            </h2>
            <div className="w-16 h-0.5 bg-burgundy mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-taupe/70 leading-relaxed font-normal">
              {siteContent.libraryHeader.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freeProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="sharp-card-light p-7 sm:p-8 flex flex-col justify-between"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div>
                  <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-wine/20 mb-6 bg-charcoal">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine/50 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[0.58rem] font-cinzel tracking-widest uppercase text-wine font-bold border border-wine/20">
                      ÜCRETSİZ DİJİTAL REHBER
                    </div>

                    <div className="absolute bottom-3 right-3 bg-burgundy text-white text-[0.62rem] font-bold tracking-widest px-3 py-1 uppercase">
                      HEMEN İNDİR
                    </div>
                  </div>

                  <span className="font-cinzel text-[0.62rem] tracking-[0.3em] text-burgundy font-bold uppercase block mb-2">
                    {product.badgeText || 'PDF REHBER'}
                  </span>

                  <h3 className="font-serif text-2xl text-wine font-bold uppercase tracking-wider mb-3">
                    {product.title}
                  </h3>

                  <p className="text-xs sm:text-[0.82rem] text-taupe/75 leading-relaxed font-normal mb-6">
                    {product.tagline || product.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-wine/10">
                  <Link
                    href={`/p/${product.id}`}
                    className="btn-luxury-outline w-full text-center"
                  >
                    {product.buttonText || 'ÜCRETSİZ OKU & İNDİR →'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. THE AUDIO-VISUAL SANCTUARY (YOUTUBE & FREKANS YAYINLARI)
      ───────────────────────────────────────────────────────────── */}
      {videos.length > 0 && (
        <section id="yayinlar" className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-cinzel text-[0.65rem] tracking-[0.4em] text-burgundy font-bold uppercase block mb-3">
                {siteContent.mediaHeader.eyebrow || 'FREKANS YAYINLARI'}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase">
                {siteContent.mediaHeader.titleLine1 || 'Seçkin'} <span className="italic font-bold text-burgundy font-serif">{siteContent.mediaHeader.titleAccent || 'Video İnisiyasyonları'}</span>
              </h2>
            </div>
            <a
              href={siteContent.mediaHeader.youtubeChannelUrl || 'https://www.youtube.com/@denizzbayraktar'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.68rem] font-bold tracking-[0.25em] text-wine hover:text-burgundy uppercase flex items-center gap-2 group transition-colors"
            >
              {siteContent.mediaHeader.youtubeButtonText || 'YOUTUBE KANALINA GİT'} 
              <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {videos.map((video, idx) => (
              <motion.a
                key={video.id || idx}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sharp-card-light p-4 group block transition-all"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="relative aspect-video w-full overflow-hidden border-2 border-wine/20 bg-charcoal mb-4">
                  <Image
                    src={video.thumbnail || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600'}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-12 h-12 bg-white/95 border-2 border-wine flex items-center justify-center text-wine shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/85 px-2 py-0.5 text-[0.62rem] font-bold text-white font-mono tracking-wider">
                      {video.duration}
                    </div>
                  )}
                </div>

                <span className="font-cinzel text-[0.62rem] tracking-[0.3em] text-burgundy font-bold uppercase block mb-1.5">
                  BÖLÜM 0{idx + 1}
                </span>

                <h3 className="font-serif text-lg text-wine font-bold uppercase leading-snug line-clamp-2 mb-3 group-hover:text-burgundy transition-colors">
                  {video.title}
                </h3>

                <p className="text-[0.68rem] font-bold tracking-[0.2em] text-burgundy uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  ŞİMDİ İZLE 
                  <HiOutlineArrowRight className="text-xs" />
                </p>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10. SACRED TESTIMONIALS / PROOF (KATILIMCI DENEYİMLERİ)
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-[0.65rem] tracking-[0.4em] text-burgundy font-bold uppercase block mb-3">
            {siteContent.testimonialsSection.eyebrow || 'HAKİKİ DÖNÜŞÜMLER'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase mb-4">
            {siteContent.testimonialsSection.titleLine1 || 'Ruhun'} <span className="italic font-bold text-burgundy font-serif">{siteContent.testimonialsSection.titleAccent || 'Aynasından'}</span> Yankılar
          </h2>
          <div className="w-16 h-0.5 bg-burgundy mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-taupe/70 leading-relaxed font-normal">
            {siteContent.testimonialsSection.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {(siteContent.testimonialsSection.items || defaultSiteContent.testimonialsSection.items).map((item, idx) => (
            <motion.div 
              key={item.id || idx}
              className={`sharp-card-light p-8 flex flex-col justify-between ${idx === 1 ? 'border-burgundy bg-burgundy/5' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div>
                <div className="flex items-center gap-1 text-burgundy mb-4 text-xs">
                  {'★'.repeat(item.rating || 5)}
                </div>
                <p className="font-serif italic text-base sm:text-lg text-wine/90 leading-relaxed mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
              <div className={`border-t-2 pt-4 ${idx === 1 ? 'border-burgundy/20' : 'border-wine/10'}`}>
                <span className={`font-cinzel text-xs tracking-widest font-bold uppercase block ${idx === 1 ? 'text-burgundy' : 'text-wine'}`}>
                  {item.author}
                </span>
                <span className="text-[0.6rem] text-burgundy tracking-wider uppercase font-bold">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FREQUENTLY ASKED QUESTIONS (AKIL & RUH REHBERİ)
      ───────────────────────────────────────────────────────────── */}
      <section id="sss" className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-20 border-t border-gold/15">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-[0.65rem] tracking-[0.4em] text-burgundy font-bold uppercase block mb-3">
            {siteContent.faqSection.eyebrow || 'MERAK EDİLENLER'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-wine font-light tracking-[0.05em] uppercase mb-4">
            {siteContent.faqSection.titleLine1 || 'Sıkça Sorulan'} <span className="italic font-bold text-burgundy font-serif">{siteContent.faqSection.titleAccent || 'Sorular'}</span>
          </h2>
          <div className="w-16 h-0.5 bg-burgundy mx-auto" />
        </div>

        <div className="space-y-4">
          {currentFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="sharp-card-light overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl text-wine font-bold tracking-wide">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-none border-2 border-wine flex items-center justify-center text-wine transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-wine text-white' : ''}`}>
                    <HiOutlineChevronDown className="text-sm" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden border-t-2 border-wine/10"
                    >
                      <div className="p-5 sm:p-6 pt-3 font-sans text-xs sm:text-sm text-taupe/80 leading-relaxed font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
