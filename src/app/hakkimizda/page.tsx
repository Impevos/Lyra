'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiOutlineHeart, HiOutlineEye, HiOutlineLightBulb, HiOutlineGlobe } from 'react-icons/hi';

const values = [
  { icon: HiOutlineHeart, title: 'Sevgi & Şefkat', description: 'Her bireyin içsel ışığına saygı ve sevgiyle yaklaşıyoruz.', gradient: 'from-burgundy to-wine' },
  { icon: HiOutlineEye, title: 'Farkındalık', description: 'Bilinçli yaşamın ve spiritüel uyanışın gücüne inanıyoruz.', gradient: 'from-gold to-gold-dark' },
  { icon: HiOutlineLightBulb, title: 'Dönüşüm', description: 'Kişisel gelişim ve ruhsal evrimin sonsuz potansiyelini destekliyoruz.', gradient: 'from-rose to-pink-muted' },
  { icon: HiOutlineGlobe, title: 'Evrensel Bağ', description: 'Tüm varlıkların birbirine bağlı olduğu evrensel bilinci yaşıyoruz.', gradient: 'from-plum to-burgundy-dark' },
];

const timeline = [
  { year: '2019', text: 'Spiritüel yolculuğun başlangıcı ve ilk farkındalık çalışmaları.' },
  { year: '2020', text: 'İlk grup yayınları ve topluluk oluşturma süreci.' },
  { year: '2021', text: 'Lyra On Earth markasının kuruluşu ve birebir seansların başlaması.' },
  { year: '2022', text: 'İlk Mastersoul eğitim programının hayata geçirilmesi.' },
  { year: '2023', text: 'Uluslararası katılımcılarla büyüyen topluluk.' },
  { year: '2024', text: 'Dijital içerik platformunun genişletilmesi.' },
  { year: '2025', text: 'Premium spiritüel deneyim ekosisteminin oluşturulması.' },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-ivory" />
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] orb orb-pink opacity-15" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] orb orb-gold opacity-8" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="label-line justify-center mb-8">Hakkımızda</span>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 className="heading-display mb-7">
              Ruhsal Yolculukta
              <br />
              <span className="gradient-text italic">Rehberiniz</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg text-center text-taupe/70 max-w-2xl mx-auto">
              Lyra On Earth, spiritüel farkındalık ve kişisel dönüşüm alanında
              premium bir rehberlik deneyimi sunmaktadır.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image area */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-beige via-pink/15 to-cream overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-ivory/50 backdrop-blur-sm flex items-center justify-center animate-float-slow">
                        <span className="font-serif text-5xl text-gold/30 italic">L</span>
                      </div>
                      <div className="absolute -inset-6 rounded-full border border-gold/[0.08] animate-breathe" />
                      <div className="absolute -inset-12 rounded-full border border-gold/[0.04] animate-breathe" style={{ animationDelay: '2s' }} />
                    </div>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-burgundy/5 to-transparent" />
                </div>

                {/* Stats card */}
                <div className="absolute -bottom-8 -right-4 lg:-right-8 glass-dark rounded-2xl p-6 w-44">
                  <p className="font-serif text-4xl text-ivory font-light gradient-text">5+</p>
                  <p className="text-[0.72rem] text-ivory/50 mt-1 uppercase tracking-wider font-medium">Yıllık Deneyim</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection direction="right">
              <span className="label-line mb-6">Hikayemiz</span>
              <h2 className="heading-lg mb-6">Deniz Bayraktar</h2>
              <div className="space-y-4 body-md">
                <p>
                  Lyra On Earth, kurucusu Deniz Bayraktar&apos;ın derin spiritüel yolculuğundan
                  doğmuştur. Yıllarca süren kişisel arayış, meditasyon pratikleri ve enerji
                  çalışmaları, bu platformun temellerini oluşturmuştur.
                </p>
                <p>
                  Amacımız, spiritüel gelişimi erişilebilir ve modern bir dille sunmak;
                  insanların içsel potansiyellerini keşfetmelerine yardımcı olmaktır.
                  Her bir seans, her bir eğitim, sevgi ve farkındalıkla tasarlanmıştır.
                </p>
                <p className="italic text-charcoal/50 border-l-2 border-gold/30 pl-5 mt-6">
                  &ldquo;Spiritüel ama kitsch olmayan, lüks ama boğucu olmayan, minimal
                  ama hissiz olmayan&rdquo; — Lyra On Earth Manifestosu
                </p>
              </div>
              <div className="mt-8">
                <Link href="/iletisim" className="btn-primary">
                  <span>İletişime Geç</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream/30 to-ivory" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20 max-w-xl mx-auto">
            <span className="label-line justify-center mb-6">Değerlerimiz</span>
            <h2 className="heading-lg mb-5">
              Yolumuzu Aydınlatan
              <br />
              <span className="gradient-text italic">Değerler</span>
            </h2>
            <div className="section-divider mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="premium-card p-7 text-center group h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-5 transition-all duration-600 group-hover:shadow-lg group-hover:scale-105`}>
                    <value.icon className="text-2xl text-ivory" />
                  </div>
                  <h3 className="heading-sm !text-[1.1rem] mb-2.5 text-center">{value.title}</h3>
                  <p className="body-md text-[0.84rem] text-center">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <span className="label-line justify-center mb-6">Yolculuğumuz</span>
            <h2 className="heading-lg">
              Zaman <span className="gradient-text italic">Çizelgesi</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/10 via-gold/30 to-gold/10 transform md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <AnimatedSection key={item.year} delay={index * 0.08} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className={`relative flex items-start mb-14 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gradient-to-br from-gold to-gold-dark rounded-full transform -translate-x-1/2 z-10 ring-4 ring-ivory shadow-sm" />
                  <div className={`ml-14 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                    <span className="font-serif text-2xl text-gold font-medium">{item.year}</span>
                    <p className="body-md text-[0.85rem] mt-2">{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-pink-light/8 to-ivory" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="label-line justify-center mb-8">Manifestomuz</span>
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[10rem] leading-none text-gold/[0.04] pointer-events-none select-none">
                &ldquo;
              </div>
              <blockquote className="font-serif text-[1.8rem] md:text-[2.2rem] text-wine/75 leading-[1.45] italic font-light relative z-10">
                Spiritüel ama kitsch olmayan,
                <br />
                lüks ama boğucu olmayan,
                <br />
                minimal ama hissiz olmayan.
              </blockquote>
            </div>
            <div className="section-divider mt-10 mb-8" />
            <p className="body-lg text-center text-taupe/60 max-w-xl mx-auto">
              Bu çizgide ilerleyerek, modern spiritüelitenin en premium deneyimini
              yaratmaya devam ediyoruz.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
