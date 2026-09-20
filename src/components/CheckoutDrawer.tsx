'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HiOutlineX, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineMail, 
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineLockClosed
} from 'react-icons/hi';
import { ProductItem, saveAppointment, getScheduledEmails, getSmtpSettings } from '@/data/defaults';

interface CheckoutDrawerProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function CheckoutDrawer({ product, onClose }: CheckoutDrawerProps) {
  // Steps: 1=info, 2=calendar(call only), 3=payment, 4=success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
  });
  const [kvkkConsent, setKvkkConsent] = useState(false);

  // Payment form state (UI only, not connected)
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

  useEffect(() => {
    if (product) {
      setStep(1);
      setFormData({ name: '', email: '', phone: '', instagram: '' });
      setKvkkConsent(false);
      setPaymentData({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [product]);

  if (!product) return null;

  // Format card number with spaces: 1234 5678 9012 3456
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
      });
    }

    // Send branded thank you email
    try {
      const smtpSettings = getSmtpSettings();

      const dateInfo = product?.type === 'call' && selectedDate && selectedTime
        ? `<tr><td style="padding: 16px 24px; background-color: #FBF8F4; border: 1px solid #EAD8C0; text-align: center;"><p style="margin: 0 0 4px 0; font-size: 11px; color: #A39B94; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">RANDEVU TARİHİNİZ</p><p style="margin: 0; font-size: 16px; color: #3E0A16; font-weight: bold; font-family: Georgia, serif;">${selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} — Saat ${selectedTime}</p></td></tr>`
        : '';

      const thankYouHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Teşekkür Ederiz ✨</title></head>
<body style="background-color: #FDFCF7; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FDFCF7; padding: 40px 10px;">
    <tr><td align="center">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #DFC15D; box-shadow: 0 10px 30px rgba(91, 28, 42, 0.06); overflow: hidden;">
        
        <!-- HEADER -->
        <tr><td align="center" style="background: linear-gradient(135deg, #4A121E 0%, #5B1C2A 100%); background-color: #5B1C2A; padding: 45px 20px; border-bottom: 2px solid #DFC15D;">
          <img src="https://lyraonearth.com/Lyra-Logo-White.png" alt="Lyra On Earth" style="height: 60px; width: auto; display: block; margin-bottom: 16px;" />
          <p style="margin: 0; font-size: 11px; color: #DFC15D; letter-spacing: 0.3em; text-transform: uppercase; font-weight: bold;">TEŞEKKÜR EDERİZ</p>
        </td></tr>
        
        <!-- GOLDEN ACCENT LINE -->
        <tr><td style="height: 3px; background: linear-gradient(90deg, #DFC15D, #A39B94, #DFC15D);"></td></tr>
        
        <!-- CONTENT -->
        <tr><td style="padding: 45px 35px 20px 35px; color: #3A3530; font-size: 15px;">
          <h1 style="margin: 0 0 8px 0; font-size: 22px; color: #3E0A16; font-family: Georgia, serif; font-weight: bold; text-align: center;">Sevgili ${formData.name},</h1>
          <p style="margin: 0 0 24px 0; text-align: center; font-size: 13px; color: #A39B94; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">KAYDINIZ BAŞARIYLA ALINDI</p>
          
          <!-- PRODUCT INFO BOX -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
            <tr><td style="padding: 20px 24px; background-color: #FBF8F4; border: 1px solid #EAD8C0;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #A39B94; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">SATIN ALINAN</p>
              <p style="margin: 0; font-size: 18px; color: #3E0A16; font-weight: bold; font-family: Georgia, serif;">${product.title}</p>
            </td></tr>
            ${dateInfo}
          </table>
          
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">Bu yolculuğa adım attığınız için çok mutluyuz. Sizinle birlikte çalışmak bizim için büyük bir onur.</p>
          
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">${product.type === 'call' 
            ? 'Görüşme detaylarınız, Google Meet linki ve hazırlık notlarınız en kısa sürede ayrı bir e-posta ile paylaşılacaktır.' 
            : 'Eğitim programınıza dair tüm bilgiler, erişim detayları ve içerikler en kısa sürede ayrı bir e-posta ile paylaşılacaktır.'}</p>
          
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">Herhangi bir sorunuz olursa bize Instagram üzerinden <strong>@lyra.onearth</strong> hesabından veya <strong>info@lyraonearth.com</strong> adresinden ulaşabilirsiniz.</p>
        </td></tr>
        
        <!-- DIVIDER -->
        <tr><td align="center" style="padding: 0 35px 30px 35px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0;"><tr><td align="center">
            <div style="display: inline-block; width: 50px; height: 1px; background-color: #DFC15D; vertical-align: middle;"></div>
            <span style="color: #DFC15D; font-size: 14px; margin: 0 10px; vertical-align: middle;">✦</span>
            <div style="display: inline-block; width: 50px; height: 1px; background-color: #DFC15D; vertical-align: middle;"></div>
          </td></tr></table>
          <p style="margin: 16px 0 0 0; font-size: 15px; color: #3E0A16; font-family: Georgia, serif; font-style: italic; text-align: center;">Işığınız yolunuzu aydınlatsın. ✨</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #A39B94; font-weight: bold; letter-spacing: 0.05em;">Deniz Bayraktar</p>
          <p style="margin: 2px 0 0 0; font-size: 11px; color: #9A9590; letter-spacing: 0.1em;">LYRA ON EARTH</p>
        </td></tr>
        
        <!-- FOOTER -->
        <tr><td align="center" style="background-color: #FAF8F5; border-top: 1px solid #EAD8C0; padding: 30px 20px; color: #7A7570; font-size: 12px;">
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;"><tr><td align="center">
            <a href="https://lyraonearth.com" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 11px; margin: 0 12px; letter-spacing: 0.05em;">Web Sitesi</a>
            <span style="color: #DFC15D;">•</span>
            <a href="https://www.instagram.com/lyra.onearth/" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 11px; margin: 0 12px; letter-spacing: 0.05em;">Instagram</a>
            <span style="color: #DFC15D;">•</span>
            <a href="https://www.youtube.com/@denizzbayraktar" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 11px; margin: 0 12px; letter-spacing: 0.05em;">YouTube</a>
          </td></tr></table>
          <p style="margin: 0; font-size: 10px; color: #9A9590;">Bu e-posta Lyra On Earth tarafından otomatik olarak gönderilmiştir.<br>© 2026 Lyra On Earth. Tüm Hakları Saklıdır.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: `✨ Teşekkürler ${formData.name} — ${product.title} Kaydınız Alındı`,
          html: thankYouHtml,
          text: `Sevgili ${formData.name}, ${product.title} kaydınız başarıyla alınmıştır. Detaylar en kısa sürede e-posta ile paylaşılacaktır. Sevgiler, Lyra On Earth`,
          smtpConfig: smtpSettings
        })
      });
    } catch (e) {
      console.error('Failed to send thank you email:', e);
    }

    // Also trigger any sales automation emails
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.type === 'call') {
      setStep(2); // Go to calendar scheduler
    } else {
      if (product.id === '1' || product.id === '2') {
        completeOrder();
      } else {
        setStep(3);
      }
    }
  };

  const handleBookingConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    if (product.id === '1' || product.id === '2') {
      completeOrder();
    } else {
      // Go to payment step after calendar
      setStep(3);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOrder();
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Shift Sunday to the end of the week (Monday-based layout)
    const shiftedStartDay = startDay === 0 ? 6 : startDay - 1;

    // Empty spaces for previous month's days
    for (let i = 0; i < shiftedStartDay; i++) {
      days.push(null);
    }

    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = getDaysInMonth(currentMonth);
  const weekdays = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    if (currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()) {
      return; // Can't go back past current month
    }
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isDateInPast = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const timeSlots = ['10:00', '11:15', '13:30', '14:45', '16:00', '17:15', '18:30'];

  // Back button logic
  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) {
      if (product.type === 'call') setStep(2);
      else setStep(1);
    }
  };

  // Header title
  const getHeaderTitle = () => {
    if (step === 4) return 'TAMAMLANDI!';
    if (step === 3) return 'ÖDEME BİLGİLERİ';
    return product.title;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-wine/30 backdrop-blur-[3px]"
        />

        {/* Drawer container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="relative w-full max-w-md h-full bg-ivory border-l border-gold/20 flex flex-col shadow-2xl z-10 p-1"
        >
          {/* Inner double border frame */}
          <div className="absolute inset-1.5 border border-gold/5 pointer-events-none z-20" />

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gold/10 bg-white/40 relative z-10">
            <div className="flex items-center gap-2">
              {(step === 2 || step === 3) && (
                <button 
                  onClick={handleBack}
                  className="p-1 border border-gold/10 hover:bg-gold/5 text-taupe/50 hover:text-wine transition-all rounded-none"
                >
                  <HiOutlineChevronLeft className="text-xl" />
                </button>
              )}
              <h3 className="font-serif text-lg text-wine font-bold uppercase tracking-wider">
                {getHeaderTitle()}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 border border-gold/10 hover:bg-gold/5 text-taupe/40 hover:text-wine transition-all rounded-none"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          {/* Step Indicator */}
          {step !== 4 && (
            <div className="px-6 pt-4 relative z-10">
              <div className="flex items-center gap-1">
                {(() => {
                  const isCallFlow = product.type === 'call';
                  const isPaymentDisabled = product.id === '1' || product.id === '2';
                  
                  const visibleSteps = [];
                  visibleSteps.push({ s: 1, label: 'Bilgiler', stepNumber: 1 });
                  if (isCallFlow) visibleSteps.push({ s: 2, label: 'Tarih', stepNumber: 2 });
                  if (!isPaymentDisabled) visibleSteps.push({ s: 3, label: 'Ödeme', stepNumber: isCallFlow ? 3 : 2 });

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

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 relative z-10">
            
            {/* STEP 1: PRODUCT INFO & BASIC DETAILS FORM */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Product Cover image */}
                <div className="relative w-full aspect-[16/10] rounded-none overflow-hidden border border-gold/15">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  
                  {product.price && (
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-gold/20 px-3.5 py-1.5 rounded-none text-xs font-bold text-wine uppercase tracking-widest shadow-sm">
                      {product.price}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[0.6rem] tracking-[0.3em] text-[#A39B94] font-bold uppercase block">
                    {product.type === 'call' ? 'GÖRÜŞME & SEANS' : 'EĞİTİM & PROGRAM'}
                  </span>
                  <h4 className="font-serif text-xl text-wine font-bold leading-tight uppercase tracking-wide">{product.title}</h4>
                  <p className="text-xs text-taupe/65 leading-relaxed font-medium">{product.tagline}</p>
                </div>

                <div className="w-full h-px bg-gold/15" />

                <p className="text-xs text-taupe/70 leading-relaxed font-medium whitespace-pre-line bg-white/30 p-4 rounded-none border border-gold/10 relative">
                  <span className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  {product.description}
                </p>

                {/* Form fields */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h5 className="font-serif text-sm text-wine font-semibold border-b border-gold/15 pb-1.5 mb-2 uppercase tracking-wider">
                    {product.type === 'call' ? 'Başvuru Bilgileri' : 'Satın Alma Bilgileri'}
                  </h5>

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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9+\s-]/g, '') })}
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
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-white border border-gold/15 focus:border-gold/45 focus:outline-none text-xs text-wine font-medium"
                    />
                  </div>

                  {/* KVKK & Sözleşme Onayı */}
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
                      <Link href="/sozlesmeler" target="_blank" className="text-[#A39B94] hover:text-wine font-bold underline underline-offset-2 transition-colors">Hizmet Sözleşmesi</Link>,{' '}
                      <Link href="/kvkk" target="_blank" className="text-[#A39B94] hover:text-wine font-bold underline underline-offset-2 transition-colors">KVKK Aydınlatma Metni</Link>{' '}
                      ve{' '}
                      <Link href="/sozlesmeler" target="_blank" className="text-[#A39B94] hover:text-wine font-bold underline underline-offset-2 transition-colors">Açık Rıza Beyanı</Link>&apos;nı okudum, kabul ediyorum.
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
                    {product.type === 'call' ? 'Görüşme Zamanı Seç →' : (product.id === '1' || product.id === '2' ? 'Başvuruyu Tamamla →' : 'Ödeme Adımına Geç →')}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[0.58rem] text-taupe/40 font-semibold pt-1">
                    <HiOutlineShieldCheck className="text-sm" />
                    Ödeme adımları ve bilgileriniz 256-bit şifrelenir.
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: INTERACTIVE CALENDAR SCHEDULER (Only for calls) */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-wine font-bold uppercase tracking-wider">Görüşme Gününü Seçin</h4>
                  <p className="text-[0.7rem] text-taupe/50 font-medium">Lütfen takvim üzerinden sizin için en uygun tarihi belirtin.</p>
                </div>

                {/* Calendar Widget */}
                <div className="bg-white/70 border border-gold/15 p-4 rounded-none shadow-inner relative">
                  <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  
                  {/* Calendar Navigation */}
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <button 
                      onClick={prevMonth}
                      className="p-1.5 border border-gold/10 hover:bg-gold/5 text-wine transition-all rounded-none"
                    >
                      <HiOutlineChevronLeft className="text-sm" />
                    </button>
                    <span className="font-serif text-sm text-wine font-bold uppercase tracking-widest">
                      {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                    </span>
                    <button 
                      onClick={nextMonth}
                      className="p-1.5 border border-gold/10 hover:bg-gold/5 text-wine transition-all rounded-none"
                    >
                      <HiOutlineChevronRight className="text-sm" />
                    </button>
                  </div>

                  {/* Weekday columns */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2 relative z-10">
                    {weekdays.map((day) => (
                      <span key={day} className="text-[0.65rem] font-bold text-[#A39B94] tracking-wider uppercase">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7 gap-1.5 text-center relative z-10">
                    {calendarDays.map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`} />;
                      
                      const isPast = isDateInPast(day);
                      const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                      
                      return (
                        <button
                          key={day.toISOString()}
                          disabled={isPast}
                          onClick={() => {
                            setSelectedDate(day);
                            setSelectedTime(null); // Reset selected time
                          }}
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

                {/* Time Slot Selection */}
                {selectedDate && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h5 className="font-serif text-sm text-wine font-semibold flex items-center gap-1.5 border-b border-gold/15 pb-1.5 uppercase tracking-wider">
                      <HiOutlineClock className="text-[#A39B94]" /> Müsait Saat Dilimleri
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isTimeSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 rounded-none text-xs font-bold transition-all border ${
                              isTimeSelected
                                ? 'bg-burgundy border-burgundy text-white shadow-md'
                                : 'bg-white border-gold/10 text-wine hover:border-[#A39B94]/30 hover:bg-[#A39B94]/5'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Confirm Booking Action Button */}
                <button
                  onClick={handleBookingConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3.5 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 mt-4 border ${
                    selectedDate && selectedTime
                      ? 'bg-wine hover:bg-wine/90 border-wine text-white cursor-pointer hover:scale-[1.01] active:scale-98 shadow-md'
                      : 'bg-taupe/10 border-taupe/10 text-taupe/30 cursor-not-allowed'
                  }`}
                >
                  {product.id === '1' || product.id === '2' ? 'Başvuruyu Tamamla →' : 'Ödeme Adımına Geç →'}
                </button>
              </div>
            )}

            {/* STEP 3: PAYMENT INFORMATION */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Order Summary */}
                <div className="bg-white/60 border border-gold/15 p-4 rounded-none relative">
                  <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-none overflow-hidden border border-gold/10 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm text-wine font-bold uppercase tracking-wide truncate">{product.title}</h4>
                      <p className="text-[0.6rem] text-taupe/50 font-bold uppercase tracking-wider mt-0.5">
                        {formData.name} • {formData.email}
                      </p>
                      {product.type === 'call' && selectedDate && selectedTime && (
                        <p className="text-[0.6rem] text-[#A39B94] font-bold mt-1 flex items-center gap-1">
                          <HiOutlineCalendar className="text-xs" />
                          {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} — {selectedTime}
                        </p>
                      )}
                    </div>
                    {product.price && (
                      <div className="ml-auto text-right shrink-0">
                        <span className="text-sm font-bold text-wine">{product.price}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-gold/15" />

                {/* Payment Form */}
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <h5 className="font-serif text-sm text-wine font-semibold border-b border-gold/15 pb-1.5 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <HiOutlineCreditCard className="text-[#A39B94] text-base" />
                    Kart Bilgileri
                  </h5>

                  {/* Card icons */}
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

                  {/* Security Notice */}
                  <div className="flex items-center gap-2 p-3 bg-white/50 border border-gold/10 mt-2">
                    <HiOutlineLockClosed className="text-gold text-lg shrink-0" />
                    <p className="text-[0.6rem] text-taupe/50 font-semibold leading-relaxed">
                      Ödeme bilgileriniz SSL 256-bit şifreleme ile korunmaktadır. Kart bilgileriniz hiçbir şekilde tarafımızca saklanmaz.
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

                  <div className="flex items-center justify-center gap-1.5 text-[0.58rem] text-taupe/40 font-semibold pt-1">
                    <HiOutlineShieldCheck className="text-sm" />
                    Güvenli ödeme altyapısı ile işleminiz korunmaktadır.
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION STATE */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6 space-y-5"
              >
                {/* Animated success icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-none bg-gradient-to-br from-gold/15 to-burgundy/5 border border-gold/30 flex items-center justify-center shadow-lg shadow-gold/10 relative"
                >
                  <div className="absolute inset-0.5 border border-gold/10 pointer-events-none" />
                  <svg className="w-10 h-10 text-[#A39B94]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </motion.div>

                {/* Thank You Title */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <h4 className="font-serif text-2xl text-wine font-bold uppercase tracking-wider">Teşekkür Ederiz ✨</h4>
                  <p className="text-xs text-[#A39B94] font-bold uppercase tracking-[0.2em]">
                    {product.type === 'call' ? 'RANDEVUNUZ KAYDEDİLDİ' : 'KAYDINI BAŞARIYLA ALDIK'}
                  </p>
                </motion.div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                {/* Thank you message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/50 border border-gold/10 rounded-none p-5 text-xs text-taupe/70 leading-relaxed font-medium space-y-4 w-full relative"
                >
                  <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  
                  <p className="text-[0.85rem] text-wine font-semibold font-serif">
                    Sevgili {formData.name},
                  </p>

                  <p className="text-[0.78rem] leading-relaxed">
                    Bu yolculuğa adım attığınız için çok mutluyuz. Sizinle birlikte çalışmak bizim için büyük bir onur.
                  </p>
                  
                  {product.type === 'call' && selectedDate && selectedTime && (
                    <div className="p-3 bg-burgundy/5 rounded-none border border-gold/15 text-wine font-semibold flex flex-col gap-1 items-center relative">
                      <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                      <span className="text-[0.55rem] text-[#A39B94] font-bold tracking-[0.2em] uppercase mb-1">RANDEVU TARİHİNİZ</span>
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineCalendar className="text-[#A39B94]" />
                        <span>
                          {selectedDate.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineClock className="text-[#A39B94]" />
                        <span>Saat {selectedTime}</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Check your email notice */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="w-full bg-gradient-to-br from-wine/[0.04] to-gold/[0.06] border border-gold/20 rounded-none p-5 relative"
                >
                  <div className="absolute inset-0.5 border border-gold/8 pointer-events-none" />
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-none bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <HiOutlineMail className="text-lg text-[#A39B94]" />
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-[0.7rem] text-wine font-bold uppercase tracking-wider">
                        Lütfen E-postanızı Kontrol Edin
                      </p>
                      <p className="text-[0.68rem] text-taupe/60 leading-relaxed font-medium">
                        <strong className="text-wine">{formData.email}</strong> adresine onay ve detay bilgileri içeren bir e-posta gönderdik.
                        {product.type === 'call' 
                          ? ' Görüşme linki (Google Meet) ve hazırlık notları da ayrıca iletilecektir.'
                          : ' Eğitim erişim bilgileri ve içerikler de ayrıca paylaşılacaktır.'
                        }
                      </p>
                      <p className="text-[0.6rem] text-taupe/40 font-semibold italic mt-1">
                        Spam/gereksiz klasörünü de kontrol etmeyi unutmayın.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Google Calendar Button */}
                {(() => {
                  let startDt: Date;
                  let durationMin = 60;

                  if (product.type === 'call' && selectedDate && selectedTime) {
                    const [h, m] = selectedTime.split(':').map(Number);
                    startDt = new Date(selectedDate);
                    startDt.setHours(h, m, 0, 0);
                  } else {
                    startDt = new Date();
                    startDt.setDate(startDt.getDate() + 1);
                    startDt.setHours(10, 0, 0, 0);
                  }

                  const endDt = new Date(startDt.getTime() + durationMin * 60 * 1000);

                  const fmt = (d: Date) =>
                    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                  const calUrl = `https://www.google.com/calendar/render?action=TEMPLATE` +
                    `&text=${encodeURIComponent(product.title + ' – Lyra One Earth')}` +
                    `&dates=${fmt(startDt)}/${fmt(endDt)}` +
                    `&details=${encodeURIComponent('Lyra One Earth ile ' + product.title + ' seansı.\n\nGörüşme linki mail kutunuza gönderilecektir.\n\n' + formData.name)}` +
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

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-none border border-gold/30 hover:border-wine hover:bg-wine hover:text-white text-wine text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Kapat
                </button>

                {/* Signature */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-[0.65rem] text-taupe/30 font-semibold italic pt-2"
                >
                  Işığınız yolunuzu aydınlatsın. — Lyra On Earth
                </motion.p>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
