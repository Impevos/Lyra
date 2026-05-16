'use client';

import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { HiOutlineSparkles, HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineBookOpen, HiCheckCircle, HiOutlineArrowRight } from 'react-icons/hi';

const services = [
  {
    id: 'birebir',
    icon: HiOutlineSparkles,
    title: 'Birebir Yayınlar',
    subtitle: 'Kişisel Spiritüel Danışmanlık',
    description: 'Tam size özel hazırlanan birebir seanslarda, enerji okumaları, farkındalık çalışmaları ve kişisel rehberlik ile derin bir dönüşüm deneyimi yaşayın.',
    features: ['Kişiye özel seans planlaması', 'Enerji analizi ve okuma', 'Online veya yüz yüze seçeneği', 'Seans sonrası takip desteği'],
    gradient: 'from-burgundy to-wine',
    accentOrb: 'orb-pink',
    number: '01',
  },
  {
    id: 'grup',
    icon: HiOutlineUserGroup,
    title: 'Grup Yayınları',
    subtitle: 'Kolektif Bilinç Deneyimi',
    description: 'Topluluk gücüyle gerçekleştirilen enerji çalışmaları ve meditasyon seanslarında kolektif bilinç yükselmesini deneyimleyin.',
    features: ['Haftalık canlı yayınlar', 'Topluluk bağı ve destek', 'Kayıt erişimi', 'Soru-cevap seansları'],
    gradient: 'from-gold to-gold-dark',
    accentOrb: 'orb-gold',
    number: '02',
  },
  {
    id: 'egitim',
    icon: HiOutlineAcademicCap,
    title: 'Eğitimler & Mastersoul',
    subtitle: 'Derinlemesine Spiritüel Eğitim',
    description: 'Kapsamlı müfredat ve uygulamalı çalışmalarla spiritüel yolculuğunuzu profesyonel seviyeye taşıyın.',
    features: ['Sertifikalı programlar', 'Uygulamalı çalışmalar', 'Mentorluk desteği', 'Kapsamlı müfredat'],
    gradient: 'from-rose to-pink-muted',
    accentOrb: 'orb-pink',
    number: '03',
  },
  {
    id: 'icerik',
    icon: HiOutlineBookOpen,
    title: 'İçerik & Ürünler',
    subtitle: 'Dijital Spiritüel Kütüphane',
    description: 'Özenle hazırlanmış PDF rehberler, video eğitimler ve yayın kayıtlarıyla istediğiniz zaman spiritüel gelişiminize katkıda bulunun.',
    features: ['PDF rehberler', 'Video eğitim kayıtları', 'Yayın arşivi', 'Sürekli güncellenen içerik'],
    gradient: 'from-plum to-burgundy-dark',
    accentOrb: 'orb-burgundy',
    number: '04',
  },
];

export default function HizmetlerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-ivory to-ivory" />
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] orb orb-gold opacity-10" />
        <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] orb orb-pink opacity-12" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <AnimatedSection>
            <span className="label-line justify-center mb-8">Hizmetlerimiz</span>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 className="heading-display mb-7">
              Dönüşüm Yolculuğunuz
              <br />
              <span className="gradient-text">Burada Başlıyor</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg text-center text-taupe/70 max-w-2xl mx-auto">
              Her bireyin ruhsal yolculuğu benzersizdir. Size en uygun hizmeti keşfedin
              ve ilk adımı bugün atın.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detailed */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-28">
          {services.map((service, index) => (
            <AnimatedSection key={service.id}>
              <div id={service.id} className="scroll-mt-32">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                  {/* Visual */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[5/4] rounded-2xl bg-gradient-to-br from-beige/50 via-cream to-beige/30 overflow-hidden">
                      {/* Accent orb */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] orb ${service.accentOrb} opacity-15 animate-breathe`} />

                      {/* Central icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl animate-float`}>
                            <service.icon className="text-4xl text-ivory" />
                          </div>
                          <div className="absolute -inset-6 rounded-full border border-gold/[0.06] animate-breathe" />
                          <div className="absolute -inset-12 rounded-full border border-gold/[0.04] animate-breathe" style={{ animationDelay: '2s' }} />
                        </div>
                      </div>

                      {/* Number watermark */}
                      <span className="absolute bottom-4 right-6 font-serif text-[6rem] font-light text-gold/[0.04] select-none">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="label-line mb-5">{service.subtitle}</span>
                    <h2 className="heading-lg mb-5">{service.title}</h2>
                    <p className="body-md mb-8">{service.description}</p>

                    <ul className="space-y-3.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-[0.88rem] text-charcoal/65">
                          <HiCheckCircle className="text-gold text-lg flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/iletisim" className="btn-primary">
                      <span>Bilgi Al</span>
                      <HiOutlineArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-pink-light/8 to-ivory" />
          <div className="relative z-10">
            <AnimatedSection>
              <span className="label-line justify-center mb-8">Başlayın</span>
              <h2 className="heading-lg mb-6">
                Hangi Hizmet Size<br />
                <span className="gradient-text">Uygun?</span>
              </h2>
              <p className="body-lg text-taupe/70 max-w-lg mx-auto mb-10 text-center">
                Size en uygun hizmeti birlikte belirleyelim. İlk görüşme ücretsizdir.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/iletisim" className="btn-primary">
                  <span>Ücretsiz Görüşme</span>
                </Link>
                <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span>WhatsApp</span>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
