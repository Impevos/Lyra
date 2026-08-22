'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  HiOutlineX, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineMail, 
  HiOutlineShieldCheck 
} from 'react-icons/hi';
import { ProductItem, saveAppointment } from '@/data/defaults';

interface CheckoutDrawerProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function CheckoutDrawer({ product, onClose }: CheckoutDrawerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
  });

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (product) {
      setStep(1);
      setFormData({ name: '', email: '', phone: '', instagram: '' });
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [product]);

  if (!product) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.type === 'call') {
      setStep(2); // Go to calendar scheduler
    } else {
      // Save details for digital/external product immediately
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

      // Digital product success
      setStep(3);
    }
  };

  const handleBookingConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Format date string: "GG.AA.YYYY"
    const dateStr = selectedDate.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Save appointment
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

    setStep(3); // Go to success
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
              {step === 2 && (
                <button 
                  onClick={() => setStep(1)}
                  className="p-1 border border-gold/10 hover:bg-gold/5 text-taupe/50 hover:text-wine transition-all rounded-none"
                >
                  <HiOutlineChevronLeft className="text-xl" />
                </button>
              )}
              <h3 className="font-serif text-lg text-wine font-bold uppercase tracking-wider">
                {step === 3 ? 'TAMAMLANDI!' : product.title}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 border border-gold/10 hover:bg-gold/5 text-taupe/40 hover:text-wine transition-all rounded-none"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

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
                  <span className="text-[0.6rem] tracking-[0.3em] text-gold font-bold uppercase block">
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
                    {product.type === 'call' ? 'Başvuru Bilgileri' : 'Hemen Başlayın'}
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

                  {product.type === 'call' && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Telefon Numarası</label>
                        <input
                          type="tel"
                          required
                          placeholder="05xx xxx xx xx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-none bg-wine hover:bg-wine/90 text-white text-xs font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-wine/10 hover:scale-[1.01] active:scale-98 transition-all duration-300 mt-4 border border-wine"
                  >
                    {product.type === 'call' ? 'Görüşme Zamanı Seç' : product.buttonText}
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
                      <span key={day} className="text-[0.65rem] font-bold text-gold tracking-wider uppercase">
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
                      <HiOutlineClock className="text-gold" /> Müsait Saat Dilimleri
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
                                ? 'bg-gold border-gold text-white shadow-md'
                                : 'bg-white border-gold/10 text-wine hover:border-gold/30 hover:bg-gold/5'
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
                  Randevuyu Tamamla
                </button>
              </div>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION STATE */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8 space-y-6"
              >
                <div className="w-20 h-20 rounded-none bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shadow-lg shadow-gold/5">
                  <HiOutlineMail className="text-4xl animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-wine font-bold uppercase tracking-wider">TALEBİNİZ ALINDI</h4>
                  <p className="text-xs text-gold font-bold uppercase tracking-[0.2em]">
                    {product.type === 'call' ? 'RANDEVU KAYDEDİLDİ' : 'PDF & DOSYA YÖNLENDİRİLDİ'}
                  </p>
                </div>

                <div className="w-full h-px bg-gold/15" />

                <div className="bg-white/50 border border-gold/10 rounded-none p-5 text-xs text-taupe/70 leading-relaxed font-medium space-y-3 max-w-xs relative">
                  <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                  
                  <p>
                    Sevgili <strong>{formData.name}</strong>, başvuru detaylarınız ve ödeme adımları <strong>{formData.email}</strong> adresine gönderildi.
                  </p>
                  
                  {product.type === 'call' && selectedDate && selectedTime && (
                    <div className="p-3 bg-burgundy/5 rounded-none border border-gold/15 text-wine font-semibold flex flex-col gap-1 items-center mt-2 relative">
                      <div className="absolute inset-0.5 border border-gold/5 pointer-events-none" />
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineCalendar className="text-gold" />
                        <span>
                          {selectedDate.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <HiOutlineClock className="text-gold" />
                        <span>Saat {selectedTime}</span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-[0.68rem] text-taupe/40 font-semibold italic">
                    Görüşme linki (Google Meet) ve hazırlık notları mail kutunuzda olacaktır.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-none border border-gold/30 hover:border-wine hover:bg-wine hover:text-white text-wine text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Kapat
                </button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
