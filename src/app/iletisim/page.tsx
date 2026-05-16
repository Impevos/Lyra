'use client';

import AnimatedSection from '@/components/AnimatedSection';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone, HiOutlineClock } from 'react-icons/hi';
import { FaInstagram, FaYoutube, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const contactInfo = [
  { icon: HiOutlineMail, label: 'E-posta', value: 'denizbayraktar.lyra@gmail.com', href: 'mailto:denizbayraktar.lyra@gmail.com' },
  { icon: HiOutlinePhone, label: 'Telefon', value: '+90 500 000 00 00', href: 'tel:+905000000000' },
  { icon: HiOutlineLocationMarker, label: 'Konum', value: 'İstanbul, Türkiye', href: null },
  { icon: HiOutlineClock, label: 'Çalışma Saatleri', value: 'Pzt-Cum: 10:00 - 18:00', href: null },
];

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/lyraswisdom', username: '@lyraswisdom' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/@denizzbayraktar', username: '@denizzbayraktar' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/905000000000', username: '+90 500 000 00 00' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com/@lyraswisdom', username: '@lyraswisdom' },
];

export default function IletisimPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] orb orb-pink opacity-10 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] orb orb-gold opacity-10 animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <span className="label-line justify-center mb-6">İletişim</span>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 className="font-serif text-5xl md:text-7xl text-wine mb-6 text-center leading-tight">
              Ruhsal Yolculuğunuzda<br />
              <span className="gradient-text">Sizinle Birlikteyiz</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg text-center text-taupe/70 max-w-2xl mx-auto">
              Sorularınız, randevu talepleriniz veya sadece paylaşmak istedikleriniz için aşağıdaki formu kullanabilir veya doğrudan bize ulaşabilirsiniz.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content: Split Layout without boxes */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h2 className="font-serif text-3xl text-wine mb-10 text-left">Bize Mesaj Gönderin</h2>
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        id="name"
                        className="w-full py-3 bg-transparent border-b border-wine/20 focus:border-gold outline-none transition-colors peer text-wine"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-0 top-3 text-wine/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold"
                      >
                        Ad Soyad
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        className="w-full py-3 bg-transparent border-b border-wine/20 focus:border-gold outline-none transition-colors peer text-wine"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-0 top-3 text-wine/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold"
                      >
                        E-posta
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="tel"
                        id="phone"
                        className="w-full py-3 bg-transparent border-b border-wine/20 focus:border-gold outline-none transition-colors peer text-wine"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-0 top-3 text-wine/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold"
                      >
                        Telefon
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <select 
                        id="subject"
                        className="w-full py-3 bg-transparent border-b border-wine/20 focus:border-gold outline-none transition-colors peer text-wine appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled hidden>Konu Seçin</option>
                        <option value="birebir">Birebir Seans</option>
                        <option value="grup">Grup Yayını</option>
                        <option value="egitim">Eğitim Bilgisi</option>
                        <option value="isbirligi">İşbirliği Teklifi</option>
                        <option value="diger">Diğer</option>
                      </select>
                      <div className="absolute right-0 top-4 pointer-events-none text-wine/30">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full py-3 bg-transparent border-b border-wine/20 focus:border-gold outline-none transition-colors peer text-wine resize-none"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-0 top-3 text-wine/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold"
                    >
                      Mesajınız
                    </label>
                  </div>

                  <button type="submit" className="btn-primary mt-4">
                    <span>Mesaj Gönder</span>
                  </button>
                </form>
              </AnimatedSection>
            </div>

            {/* Right Column: Info & Socials */}
            <div className="lg:col-span-5 space-y-16">
              {/* Contact Info List */}
              <AnimatedSection delay={0.2}>
                <h3 className="font-serif text-2xl text-wine mb-8 text-left">İletişim Bilgileri</h3>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="text-lg text-gold" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-wine/40 mb-1 font-bold">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-wine hover:text-gold transition-colors font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-wine font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Social Media List */}
              <AnimatedSection delay={0.3}>
                <h3 className="font-serif text-2xl text-wine mb-8 text-left">Sosyal Medyada Biz</h3>
                <div className="grid grid-cols-2 gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-wine/5 flex items-center justify-center group-hover:bg-wine transition-colors duration-300">
                        <social.icon className="text-lg text-wine group-hover:text-ivory transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-wine">{social.label}</p>
                        <p className="text-xs text-taupe/60">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section: Large, Non-Boxy */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/istanbul_map.png" 
            alt="Istanbul Map" 
            className="w-full h-full object-cover"
          />
          {/* Soft mask/gradients to blend the edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-transparent to-ivory opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-ivory opacity-90" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <AnimatedSection>
            <div className="text-center bg-ivory/90 backdrop-blur-md px-8 py-5 rounded-3xl border border-gold/20 shadow-2xl max-w-sm mx-auto">
              <HiOutlineLocationMarker className="text-4xl text-burgundy mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-wine mb-1">İstanbul</h3>
              <p className="text-sm text-taupe/70 font-medium">Türkiye</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
