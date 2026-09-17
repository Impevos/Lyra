'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HiOutlineArrowLeft, 
  HiOutlineShieldCheck, 
  HiOutlineMail, 
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineX,
  HiOutlineExclamationCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getProducts, 
  ProductItem, 
  saveAppointment, 
  getAppointments,
  checkDuplicateFreeRegistration,
  getScheduledEmails,
  getSmtpSettings
} from '@/data/defaults';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<ProductItem | null>(null);

  // Multi-step form: 1=info, 2=calendar(call only), 3=payment, 4=success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    expectations: '',
    aboutSelf: '',
  });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  // Payment form state (UI only)
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Lightbox for testimonials
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await getProducts();
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
      } else {
        router.push('/');
      }
    };
    loadProduct();
  }, [id, router]);

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
      </div>
    );
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Format expiry: MM/YY
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  const completeOrder = async () => {
    if (product?.type === 'call' && selectedDate && selectedTime) {
      const dateStr = selectedDate.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      saveAppointment({
        productId: product.id,
        productTitle: product.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        instagram: formData.instagram,
        date: dateStr,
        time: selectedTime,
        expectations: formData.expectations,
        aboutSelf: formData.aboutSelf,
      });
    } else if (product) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      saveAppointment({
        productId: product.id,
        productTitle: product.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        instagram: formData.instagram,
        date: dateStr,
        time: timeStr,
        expectations: formData.expectations,
        aboutSelf: formData.aboutSelf,
      });
    }

    // Google Calendar API'ye kaydet (Geçici olarak devre dışı bırakıldı)
    /* 
    if (product?.type === 'call' && selectedDate && selectedTime) {
      try {
        const dateStr = selectedDate.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        await fetch('/api/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productTitle: product.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            instagram: formData.instagram,
            expectations: formData.expectations,
            aboutSelf: formData.aboutSelf,
            date: dateStr,
            time: selectedTime,
          })
        });
      } catch (e) {
        console.error('Failed to add to Google Calendar:', e);
      }
    }
    */

    // Trigger Sales Automation Email
    try {
      const automations = getScheduledEmails();
      const onPurchaseAutomations = automations.filter(e => e.triggerType === 'on_purchase' && e.status === 'active');
      const smtpSettings = getSmtpSettings();

      for (const auto of onPurchaseAutomations) {
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: auto.subject,
            text: auto.body,
            smtpConfig: smtpSettings
          })
        });
      }
    } catch (e) {
      console.error('Failed to trigger sales automation:', e);
    }

    setStep(4);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDuplicateError(null);

    // Check duplicate for free products
    if (product.priceType === 'free') {
      // For free digital products, enforce one registration per person
      const isDuplicate = await checkDuplicateFreeRegistration(
        formData.email,
        formData.phone,
        formData.instagram
      );
      if (isDuplicate) {
        setDuplicateError('Daha önce ücretsiz eğitim hakkınızı kullandınız. Her kişi yalnızca 1 ücretsiz eğitim alabilir.');
        return;
      }
    }

    if (product.type === 'call') {
      setStep(2);
    } else {
      if (product.priceType === 'free' || product.price === 'Görüşme ile' || product.price === 'İletişime Geçin') {
        completeOrder();
      } else {
        setStep(3);
      }
    }
  };

  const handleBookingConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    if (product.price === 'Görüşme ile' || product.price === 'İletişime Geçin') {
      completeOrder();
    } else {
      setStep(3);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOrder();
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) {
      if (product.type === 'call') setStep(2);
      else setStep(1);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];
    const shiftedStartDay = startDay === 0 ? 6 : startDay - 1;
    for (let i = 0; i < shiftedStartDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  };

  const calendarDays = getDaysInMonth(currentMonth);
  const weekdays = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
  const timeSlots = ['10:00', '11:15', '13:30', '14:45', '16:00', '17:15', '18:30'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    if (currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()) return;
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isDateInPast = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isFreeProduct = product.priceType === 'free';
  const isCallProduct = product.type === 'call';
  const testimonials = product.testimonialImages || [];

  return (
    <main className="min-h-screen bg-ivory">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-gold/[0.03] to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-t from-burgundy/[0.02] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-wine/60 hover:text-wine uppercase tracking-widest mb-6 transition-colors group"
        >
          <HiOutlineArrowLeft className="text-base transition-transform group-hover:-translate-x-1" />
          Geri Dön
        </Link>

        {step === 4 ? (
          /* ─── SUCCESS STATE ─── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white/80 border border-gold/15 rounded-none p-1 shadow-2xl shadow-gold/3 backdrop-blur-md">
              <div className="border border-gold/5 p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-none bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shadow-lg shadow-gold/5">
                  <HiOutlineMail className="text-4xl animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h1 className="font-serif text-2xl text-wine font-bold uppercase tracking-wider">TALEBİNİZ ALINDI</h1>
                  <p className="text-xs text-gold font-bold uppercase tracking-[0.2em]">
                    {isCallProduct ? 'RANDEVU KAYDEDİLDİ' : isFreeProduct ? 'ÜCRETSİZ KAYDINIZ TAMAMLANDI' : 'SATIN ALMA TAMAMLANDI'}
                  </p>
                </div>

                <div className="w-full h-px bg-gold/15" />

                <div className="bg-white/50 border border-gold/10 rounded-none p-5 text-xs text-taupe/70 leading-relaxed font-medium space-y-3 max-w-xs relative">
                  <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  <p>
                    Sevgili <strong>{formData.name}</strong>, başvuru detaylarınız <strong>{formData.email}</strong> adresine gönderildi.
                  </p>
                  
                  {isCallProduct && selectedDate && selectedTime && (
                    <div className="p-3 bg-burgundy/5 rounded-none border border-gold/15 text-wine font-semibold flex flex-col gap-1 items-center mt-2 relative">
                      <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineCalendar className="text-gold" />
                        <span>
                          {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineClock className="text-gold" />
                        <span>Saat {selectedTime}</span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-[0.68rem] text-taupe/40 font-semibold italic">
                    {isCallProduct
                      ? 'Görüşme linki (Google Meet) ve hazırlık notları mail kutunuzda olacaktır.'
                      : 'Erişim bilgileri ve içerikler mail kutunuza gönderilecektir.'
                    }
                  </p>
                </div>

                {/* Google Calendar Button */}
                {(() => {
                  let startDt: Date;
                  const durationMin = 60;

                  if (isCallProduct && selectedDate && selectedTime) {
                    const [h, m] = selectedTime.split(':').map(Number);
                    startDt = new Date(selectedDate);
                    startDt.setHours(h, m, 0, 0);
                  } else {
                    startDt = new Date();
                    startDt.setDate(startDt.getDate() + 1);
                    startDt.setHours(10, 0, 0, 0);
                  }

                  const endDt = new Date(startDt.getTime() + durationMin * 60 * 1000);
                  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                  const calUrl = `https://www.google.com/calendar/render?action=TEMPLATE` +
                    `&text=${encodeURIComponent(product.title + ' – Lyra On Earth')}` +
                    `&dates=${fmt(startDt)}/${fmt(endDt)}` +
                    `&details=${encodeURIComponent('Lyra On Earth ile ' + product.title + ' seansı.\n\nGörüşme linki mail kutunuza gönderilecektir.\n\n' + formData.name)}` +
                    `&location=${encodeURIComponent('Online – Google Meet')}` +
                    `&sf=true&output=xml`;

                  return (
                    <a
                      href={calUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-none bg-wine/90 hover:bg-wine text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-wine/20"
                    >
                      <HiOutlineCalendar className="text-base" />
                      Google Takvime Ekle
                    </a>
                  );
                })()}

                <Link
                  href="/"
                  className="px-6 py-3 rounded-none border border-gold/30 hover:border-wine hover:bg-wine hover:text-white text-wine text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Ana Sayfaya Dön
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── MAIN CONTENT ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT COLUMN — Product Info & Testimonials */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Detail Card */}
              <div className="bg-white/80 border border-gold/15 rounded-none overflow-hidden shadow-2xl shadow-gold/3 backdrop-blur-md relative p-1">
                <div className="absolute inset-2 border border-gold/5 pointer-events-none" />

                {/* Main Image */}
                <div className="relative w-full aspect-video border border-gold/10">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  
                  {product.price && (
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-gold/20 px-4 py-1.5 rounded-none text-xs font-bold tracking-widest text-wine uppercase shadow-md z-10">
                      {product.price}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 relative z-10">
                  <span className="text-[0.6rem] tracking-[0.3em] text-gold font-bold uppercase block mb-2">
                    {product.badgeText || (isCallProduct ? 'GÖRÜŞME & SEANS' : isFreeProduct ? 'ÜCRETSİZ KAYNAK' : 'EĞİTİM & PROGRAM')}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl text-wine font-light tracking-[0.1em] uppercase mb-3">
                    {product.title}
                  </h1>
                  
                  <p className="text-[0.8rem] text-gold-dark font-semibold tracking-widest uppercase mb-5">
                    {product.tagline}
                  </p>

                  <div className="w-full h-px bg-gold/15 mb-5" />

                  <p className="text-[0.9rem] text-taupe/75 leading-relaxed font-medium whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Testimonial Screenshots */}
              {testimonials.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-wine font-semibold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-8 h-px bg-gold/30" />
                    Kullanıcı Deneyimleri
                    <span className="w-8 h-px bg-gold/30" />
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {testimonials.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-[3/4] rounded-none overflow-hidden border border-gold/15 hover:border-gold/40 transition-all group cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Kullanıcı deneyimi ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-wine/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — Form / Steps */}
            <div className="lg:col-span-5 lg:sticky lg:top-8 self-start">
              <div className="bg-white/80 border border-gold/15 rounded-none p-1 shadow-xl shadow-gold/3 backdrop-blur-md relative">
                <div className="absolute inset-1.5 border border-gold/5 pointer-events-none z-0" />

                {/* Step Indicator */}
                {(step as number) !== 4 && (
                  <div className="px-5 pt-4 relative z-10">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const isPaymentDisabled = product.priceType === 'free' || product.price === 'Görüşme ile' || product.price === 'İletişime Geçin';
                        const visibleSteps = [];
                        visibleSteps.push({ s: 1, label: 'Bilgiler', stepNumber: 1 });
                        if (isCallProduct) visibleSteps.push({ s: 2, label: 'Tarih', stepNumber: 2 });
                        if (!isPaymentDisabled) visibleSteps.push({ s: 3, label: 'Ödeme', stepNumber: isCallProduct ? 3 : 2 });

                        return visibleSteps.map((stepItem, idx) => {
                          const isActive = step >= stepItem.s;
                          const isCurrent = step === stepItem.s;
                          const hasNext = idx < visibleSteps.length - 1;

                          return (
                            <div key={stepItem.s} className="flex items-center gap-1 flex-1">
                              <div className={`flex items-center gap-1.5 ${isCurrent ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`w-5 h-5 flex items-center justify-center text-[0.6rem] font-bold border transition-all ${
                                  isActive
                                    ? 'bg-wine border-wine text-white'
                                    : 'bg-white border-gold/20 text-taupe/40'
                                }`}>
                                  {stepItem.stepNumber}
                                </div>
                                <span className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/60 hidden sm:inline">
                                  {stepItem.label}
                                </span>
                              </div>
                              {hasNext && (
                                <div className={`flex-1 h-px mx-1 ${isActive ? 'bg-wine/30' : 'bg-gold/10'}`} />
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* Step Content */}
                <div className="p-5 sm:p-6 relative z-10">
                  {/* STEP 1: INFO FORM */}
                  {step === 1 && (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <h3 className="font-serif text-base text-wine font-semibold uppercase tracking-wider text-center mb-3">
                        {isCallProduct ? 'Başvuru Bilgileri' : isFreeProduct ? 'Ücretsiz Kayıt' : 'Satın Alma Bilgileri'}
                      </h3>

                      {/* Duplicate Error */}
                      <AnimatePresence>
                        {duplicateError && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 bg-red-50 border border-red-200 text-red-700 text-[0.75rem] font-semibold flex items-start gap-2 rounded-none"
                          >
                            <HiOutlineExclamationCircle className="text-lg shrink-0 mt-0.5" />
                            {duplicateError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Adınız Soyadınız</label>
                        <input
                          type="text"
                          required
                          placeholder="Ad Soyad"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">E-posta Adresiniz</label>
                        <input
                          type="email"
                          required
                          placeholder="eposta@adresiniz.com"
                          value={formData.email}
                          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setDuplicateError(null); }}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Telefon Numarası</label>
                        <input
                          type="tel"
                          required
                          placeholder="05xx xxx xx xx"
                          value={formData.phone}
                          onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setDuplicateError(null); }}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Instagram Kullanıcı Adı</label>
                        <input
                          type="text"
                          required
                          placeholder="@kullaniciadi"
                          value={formData.instagram}
                          onChange={(e) => { setFormData({ ...formData, instagram: e.target.value }); setDuplicateError(null); }}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium"
                        />
                      </div>

                      {/* Extra fields for free consultations and all products */}
                      <div className="w-full h-px bg-gold/10 my-1" />
                      
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Beklentiniz Nedir?</label>
                        <textarea
                          rows={3}
                          placeholder="Bu çalışmadan beklentilerinizi kısaca paylaşın..."
                          value={formData.expectations}
                          onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium leading-relaxed resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Kendinizi Kısaca Tanıtın</label>
                        <textarea
                          rows={3}
                          placeholder="Kendiniz hakkında kısaca bilgi verin (yaş, ilgi alanları, mevcut durumunuz vb.)"
                          value={formData.aboutSelf}
                          onChange={(e) => setFormData({ ...formData, aboutSelf: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium leading-relaxed resize-none"
                        />
                      </div>

                      {/* Free product notice */}
                      {isFreeProduct && (
                        <div className="p-3 bg-gold/5 border border-gold/15 text-[0.7rem] text-wine/70 font-semibold flex items-start gap-2">
                          <HiOutlineExclamationCircle className="text-gold text-lg shrink-0 mt-0.5" />
                          Her kişi yalnızca 1 ücretsiz eğitim alabilir. Aynı e-posta, telefon veya Instagram ile tekrar kayıt yapılamaz.
                        </div>
                      )}

                      {/* KVKK Consent */}
                      <div className="flex items-start gap-2.5 p-3 bg-white/50 border border-gold/10 mt-2">
                        <input
                          type="checkbox"
                          id="kvkk-consent"
                          required
                          checked={kvkkConsent}
                          onChange={(e) => setKvkkConsent(e.target.checked)}
                          className="mt-0.5 accent-wine w-4 h-4 shrink-0 cursor-pointer"
                        />
                        <label htmlFor="kvkk-consent" className="text-[0.65rem] text-taupe/60 leading-relaxed cursor-pointer">
                          <Link href="/sozlesmeler" target="_blank" className="text-gold-dark hover:text-wine font-bold underline underline-offset-2 transition-colors">Hizmet Sözleşmesi</Link>,{' '}
                          <Link href="/kvkk" target="_blank" className="text-gold-dark hover:text-wine font-bold underline underline-offset-2 transition-colors">KVKK Aydınlatma Metni</Link>{' '}
                          ve{' '}
                          <Link href="/sozlesmeler" target="_blank" className="text-gold-dark hover:text-wine font-bold underline underline-offset-2 transition-colors">Açık Rıza Beyanı</Link>&apos;nı okudum, kabul ediyorum.
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={!kvkkConsent}
                        className={`w-full py-3.5 rounded-none text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 mt-4 border ${
                          kvkkConsent
                            ? 'bg-wine hover:bg-wine/90 border-wine hover:shadow-lg hover:shadow-wine/10 hover:scale-[1.01] active:scale-98 cursor-pointer'
                            : 'bg-taupe/30 border-taupe/20 cursor-not-allowed'
                        }`}
                      >
                        {isCallProduct ? 'Görüşme Zamanı Seç →' : isFreeProduct ? 'Ücretsiz Kaydı Tamamla →' : (product.price === 'Görüşme ile' || product.price === 'İletişime Geçin' ? 'Başvuruyu Tamamla →' : 'Ödeme Adımına Geç →')}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[0.58rem] text-taupe/40 font-semibold pt-1">
                        <HiOutlineShieldCheck className="text-sm" />
                        Bilgileriniz güvenle saklanır.
                      </div>
                    </form>
                  )}

                  {/* STEP 2: CALENDAR (call only) */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <button onClick={handleBack} className="flex items-center gap-1 text-[0.7rem] font-bold text-wine/50 hover:text-wine uppercase tracking-wider transition-colors">
                        <HiOutlineChevronLeft className="text-sm" /> Bilgilere Dön
                      </button>

                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-wine font-bold uppercase tracking-wider">Görüşme Gününü Seçin</h4>
                        <p className="text-[0.7rem] text-taupe/50 font-medium">Lütfen takvim üzerinden sizin için en uygun tarihi belirtin.</p>
                      </div>

                      {/* Calendar Widget */}
                      <div className="bg-white/70 border border-gold/15 p-4 rounded-none shadow-inner relative">
                        <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                        
                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <button onClick={prevMonth} className="p-1.5 border border-gold/10 hover:bg-gold/5 text-wine transition-all rounded-none">
                            <HiOutlineChevronLeft className="text-sm" />
                          </button>
                          <span className="font-serif text-sm text-wine font-bold uppercase tracking-widest">
                            {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                          </span>
                          <button onClick={nextMonth} className="p-1.5 border border-gold/10 hover:bg-gold/5 text-wine transition-all rounded-none">
                            <HiOutlineChevronRight className="text-sm" />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2 relative z-10">
                          {weekdays.map((day) => (
                            <span key={day} className="text-[0.65rem] font-bold text-gold tracking-wider uppercase">{day}</span>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1.5 text-center relative z-10">
                          {calendarDays.map((day, idx) => {
                            if (!day) return <div key={`empty-${idx}`} />;
                            const isPast = isDateInPast(day);
                            const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                            return (
                              <button
                                key={day.toISOString()}
                                disabled={isPast}
                                onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                                className={`aspect-square w-full rounded-none flex items-center justify-center text-xs font-bold transition-all border ${
                                  isPast
                                    ? 'text-taupe/20 cursor-not-allowed font-medium border-transparent'
                                    : isSelected
                                      ? 'bg-burgundy border-burgundy text-white shadow-md'
                                      : 'text-wine hover:bg-gold/10 border-transparent hover:border-gold/20'
                                }`}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                          <h5 className="font-serif text-sm text-wine font-semibold flex items-center gap-1.5 border-b border-gold/15 pb-1.5 uppercase tracking-wider">
                            <HiOutlineClock className="text-gold" /> Müsait Saat Dilimleri
                          </h5>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 rounded-none text-xs font-bold transition-all border ${
                                  selectedTime === time
                                    ? 'bg-gold border-gold text-white shadow-md'
                                    : 'bg-white border-gold/10 text-wine hover:border-gold/30 hover:bg-gold/5'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <button
                        onClick={handleBookingConfirm}
                        disabled={!selectedDate || !selectedTime}
                        className={`w-full py-3.5 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 mt-4 border ${
                          selectedDate && selectedTime
                            ? 'bg-wine hover:bg-wine/90 border-wine text-white cursor-pointer hover:scale-[1.01] active:scale-98 shadow-md'
                            : 'bg-taupe/10 border-taupe/10 text-taupe/30 cursor-not-allowed'
                        }`}
                      >
                        {product.price === 'Görüşme ile' || product.price === 'İletişime Geçin' ? 'Başvuruyu Tamamla →' : 'Ödeme Adımına Geç →'}
                      </button>
                    </div>
                  )}

                  {/* STEP 3: PAYMENT */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <button onClick={handleBack} className="flex items-center gap-1 text-[0.7rem] font-bold text-wine/50 hover:text-wine uppercase tracking-wider transition-colors">
                        <HiOutlineChevronLeft className="text-sm" /> Geri Dön
                      </button>

                      {/* Order Summary */}
                      <div className="bg-white/60 border border-gold/15 p-4 rounded-none relative">
                        <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-none overflow-hidden border border-gold/10 shrink-0">
                            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="56px" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif text-sm text-wine font-bold uppercase tracking-wide truncate">{product.title}</h4>
                            <p className="text-[0.6rem] text-taupe/50 font-bold uppercase tracking-wider mt-0.5">
                              {formData.name} • {formData.email}
                            </p>
                          </div>
                          {product.price && (
                            <div className="ml-auto text-right shrink-0">
                              <span className="text-sm font-bold text-wine">{product.price}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Payment Form */}
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <h5 className="font-serif text-sm text-wine font-semibold border-b border-gold/15 pb-1.5 mb-2 uppercase tracking-wider flex items-center gap-2">
                          <HiOutlineCreditCard className="text-gold text-base" />
                          Kart Bilgileri
                        </h5>

                        <div className="flex items-center gap-3 pb-2">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/10 text-[0.6rem] font-bold text-taupe/50 uppercase tracking-wider">
                            <span className="text-base">💳</span> Visa
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/10 text-[0.6rem] font-bold text-taupe/50 uppercase tracking-wider">
                            <span className="text-base">💳</span> Mastercard
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/10 text-[0.6rem] font-bold text-taupe/50 uppercase tracking-wider">
                            <span className="text-base">💳</span> Troy
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Kart Üzerindeki İsim</label>
                          <input
                            type="text"
                            required
                            placeholder="AD SOYAD"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium uppercase"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Kart Numarası</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="0000 0000 0000 0000"
                              value={paymentData.cardNumber}
                              onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
                              maxLength={19}
                              className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium tracking-widest pr-10"
                            />
                            <HiOutlineCreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/40 text-lg" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Son Kullanma Tarihi</label>
                            <input
                              type="text"
                              required
                              placeholder="AA/YY"
                              value={paymentData.expiry}
                              onChange={(e) => setPaymentData({ ...paymentData, expiry: formatExpiry(e.target.value) })}
                              maxLength={5}
                              className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium tracking-widest"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">CVV / CVC</label>
                            <div className="relative">
                              <input
                                type="password"
                                required
                                placeholder="•••"
                                value={paymentData.cvv}
                                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                maxLength={4}
                                className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium tracking-widest"
                              />
                              <HiOutlineLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/40 text-sm" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-white/50 border border-gold/10 mt-2">
                          <HiOutlineLockClosed className="text-gold text-lg shrink-0" />
                          <p className="text-[0.6rem] text-taupe/50 font-semibold leading-relaxed">
                            Ödeme bilgileriniz SSL 256-bit şifreleme ile korunmaktadır.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-none bg-wine hover:bg-wine/90 text-white text-xs font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-wine/10 hover:scale-[1.01] active:scale-98 transition-all duration-300 mt-4 border border-wine flex items-center justify-center gap-2"
                        >
                          <HiOutlineLockClosed className="text-sm" />
                          {product.price && product.price !== 'Ücretsiz' && product.price !== 'Görüşme ile' && product.price !== 'İletişime Geçin'
                            ? `${product.price} — Ödemeyi Tamamla`
                            : 'Satın Almayı Tamamla'
                          }
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Testimonial Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all z-10"
            >
              <HiOutlineX className="text-xl" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightboxImage} alt="Kullanıcı deneyimi" className="w-full h-full object-contain rounded-none border border-white/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
