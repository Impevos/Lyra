'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineSparkles, 
  HiOutlineShoppingBag, 
  HiOutlineUser, 
  HiOutlineVideoCamera, 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlinePencil, 
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineServer,
  HiOutlineCog,
  HiOutlinePause,
  HiOutlinePlay,
  HiOutlineClipboardList
} from 'react-icons/hi';
import { 
  getProducts, 
  saveProducts, 
  getProfile, 
  saveProfile, 
  getVideos, 
  saveVideos, 
  getAppointments,
  deleteAppointment,
  ProductItem, 
  ProfileData, 
  FeaturedVideoItem,
  AppointmentData,
  getSmtpSettings,
  saveSmtpSettings,
  getScheduledEmails,
  saveScheduledEmails,
  deleteScheduledEmail,
  getSentEmailLogs,
  saveSentEmailLog,
  clearSentEmailLogs,
  SmtpSettings,
  ScheduledEmail,
  SentEmailLog
} from '@/data/defaults';

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-ivory text-burgundy">Yükleniyor...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'profile' | 'videos' | 'appointments' | 'emails'>('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'products', 'profile', 'videos', 'appointments', 'emails'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);
  const [emailSubTab, setEmailSubTab] = useState<'send' | 'contacts' | 'automations' | 'hostinger'>('send');
  const [contactSearch, setContactSearch] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [videos, setVideos] = useState<FeaturedVideoItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Email States
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings | null>(null);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [sentLogs, setSentLogs] = useState<SentEmailLog[]>([]);

  // AI Copilot States
  const [aiTopic, setAiTopic] = useState<'welcome' | 'homework' | 'meditation' | 'custom'>('welcome');
  const [aiTone, setAiTone] = useState<'spiritual' | 'friendly' | 'professional'>('spiritual');
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');

  // Email Form State
  const [mailForm, setMailForm] = useState({
    targetType: 'all' as 'all' | 'product' | 'specific',
    targetValue: 'all',
    subject: '',
    body: '',
    scheduleType: 'one-time' as 'one-time' | 'recurring',
    scheduleValue: '',
  });

  const [smtpForm, setSmtpForm] = useState<SmtpSettings>({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    user: 'info@lyraonearth.com',
    password: '',
    enableHostingerAI: true,
    agenticAutoReplies: true,
    kodeeMailboxAssistant: true,
  });
  
  // Notification state
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal / Form states for Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [productForm, setProductForm] = useState<Omit<ProductItem, 'id'>>({
    title: '',
    tagline: '',
    image: '',
    buttonText: 'Detayları Gör',
    link: '',
    price: '',
    section: 'main',
    description: '',
    type: 'digital',
    priceType: 'paid'
  });

  // Modal / Form states for Video
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<FeaturedVideoItem | null>(null);
  const [videoForm, setVideoForm] = useState<Omit<FeaturedVideoItem, 'id'>>({
    title: '',
    thumbnail: '',
    youtubeUrl: '',
    duration: ''
  });

  const [publicImages, setPublicImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then(d => { if (d.images) setPublicImages(d.images) })
      .catch(e => console.error('Error fetching images:', e));

    setProducts(getProducts());
    setProfile(getProfile());
    setVideos(getVideos());
    setAppointments(getAppointments());
    
    // Load email database properties
    const smtp = getSmtpSettings();
    setSmtpSettings(smtp);
    setSmtpForm(smtp);
    setScheduledEmails(getScheduledEmails());
    setSentLogs(getSentEmailLogs());
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Profile Save
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    saveProfile(profile);
    showNotification('Profil ayarları başarıyla kaydedildi.');
  };

  const updateProfileSocial = (key: string, value: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      socials: {
        ...profile.socials,
        [key]: value
      }
    });
  };

  // Product Submit (Add / Edit)
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProducts: ProductItem[] = [];
    if (editingProduct) {
      updatedProducts = products.map((p) => p.id === editingProduct.id ? { ...editingProduct, ...productForm } : p);
      showNotification('Ürün başarıyla güncellendi.');
    } else {
      const nextId = (Math.max(0, ...products.map((p) => parseInt(p.id) || 0)) + 1).toString();
      const newProduct: ProductItem = {
        ...productForm,
        id: nextId,
        link: productForm.link || `/p/${nextId}`
      };
      updatedProducts = [...products, newProduct];
      showNotification('Yeni ürün başarıyla eklendi.');
    }
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductDelete = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
      showNotification('Ürün silindi.');
    }
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      tagline: '',
      image: '',
      buttonText: 'Detayları Gör',
      link: '',
      price: '',
      section: 'main',
      description: '',
      type: 'digital',
      priceType: 'paid'
    });
    setIsProductModalOpen(true);
  };

  const openEditProduct = (product: ProductItem) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title || '',
      tagline: product.tagline || '',
      image: product.image || '',
      buttonText: product.buttonText || 'Detayları Gör',
      link: product.link || '',
      price: product.price || '',
      section: product.section || 'main',
      description: product.description || '',
      type: product.type || 'digital',
      priceType: product.priceType || 'paid'
    });
    setIsProductModalOpen(true);
  };

  // Video Submit (Add / Edit)
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedVideos: FeaturedVideoItem[] = [];
    if (editingVideo) {
      updatedVideos = videos.map((v) => v.id === editingVideo.id ? { ...editingVideo, ...videoForm } : v);
      showNotification('Video başarıyla güncellendi.');
    } else {
      const newVideo: FeaturedVideoItem = {
        ...videoForm,
        id: 'v_' + Math.random().toString(36).substr(2, 9)
      };
      updatedVideos = [...videos, newVideo];
      showNotification('Yeni video başarıyla eklendi.');
    }
    setVideos(updatedVideos);
    saveVideos(updatedVideos);
    setIsVideoModalOpen(false);
    setEditingVideo(null);
  };

  const handleVideoDelete = (id: string) => {
    if (window.confirm('Bu videoyu silmek istediğinize emin misiniz?')) {
      const updatedVideos = videos.filter((v) => v.id !== id);
      setVideos(updatedVideos);
      saveVideos(updatedVideos);
      showNotification('Video silindi.');
    }
  };

  const openAddVideo = () => {
    setEditingVideo(null);
    setVideoForm({
      title: '',
      thumbnail: '',
      youtubeUrl: '',
      duration: ''
    });
    setIsVideoModalOpen(true);
  };

  const openEditVideo = (video: FeaturedVideoItem) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title || '',
      thumbnail: video.thumbnail || '',
      youtubeUrl: video.youtubeUrl || '',
      duration: video.duration || ''
    });
    setIsVideoModalOpen(true);
  };

  // Appointment Delete
  const handleAppointmentDelete = (id: string) => {
    if (window.confirm('Bu randevu başvurusunu silmek istediğinize emin misiniz?')) {
      deleteAppointment(id);
      setAppointments(appointments.filter((a) => a.id !== id));
      showNotification('Başvuru silindi.');
    }
  };

  // SMTP Save
  const handleSmtpSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSmtpSettings(smtpForm);
    setSmtpSettings(smtpForm);
    showNotification('Hostinger SMTP ve AI ayarları kaydedildi.');
  };

  // AI Email Copilot Generator
  const handleGenerateAIEmail = () => {
    let subject = '';
    let body = '';
    
    if (aiTopic === 'welcome') {
      if (aiTone === 'spiritual') {
        subject = 'Kozmik Hizalanma ve Uyanış Portalına Hoş Geldiniz ✨';
        body = `Merhaba {İsim},\n\nLyra On Earth portalına ve uyanış alanımıza adım attığınız için mutluyuz. Ruhsal kontratınızın bu özel evresinde, kendi realitenizi yaratma ve yüksek frekanslarla uyumlanma sürecinizi başlatıyoruz.\n\nİlk adım olarak auranızı arındırmak için hazırladığımız günlük pratikleri uygulayabilir, yüksek benliğinizle olan bağınızı güçlendirebilirsiniz. Bu yolculukta galaktik kökenlerinizi ve galaktik yaşam misyonunuzu hatırlamak için kalbinizin sesine güvenin.\n\nSevgiler ve Işıkla,\nDeniz Bayraktar`;
      } else if (aiTone === 'friendly') {
        subject = 'Lyra Ailesine Hoş Geldiniz! Harika Bir Yolculuk Başlıyor 💛';
        body = `Merhaba {İsim},\n\nAramıza katıldığın için çok heyecanlıyım! Lyra On Earth uyanış topluluğunda senin gibi arayışta olan ve kendini keşfetmek isteyen ruhlarla bir arada olmak harika bir duygu.\n\nSüreç boyunca sana rehberlik edecek tüm içeriklere portal üzerinden ulaşabilirsin. Aklına takılan her şeyde buradayım, çekinmeden bana yazabilirsin.\n\nYakında görüşmek üzere,\nDeniz`;
      } else {
        subject = 'Lyra On Earth Kayıt Onayı ve Bilgilendirme';
        body = `Sayın {İsim},\n\nLyra On Earth sistemine kaydınız başarıyla tamamlanmıştır. Eğitimleriniz ve katılım sağladığınız dijital materyaller profilinize tanımlanmıştır.\n\nHerhangi bir teknik aksaklık veya soru durumunda info@lyraonearth.com adresi üzerinden bizimle iletişime geçebilirsiniz. Gelişim sürecinizde başarılar dileriz.\n\nSaygılarımla,\nDeniz Bayraktar`;
      }
    } else if (aiTopic === 'homework') {
      if (aiTone === 'spiritual') {
        subject = 'Bilinçaltı Blokajlarınızı Fark Etme Zamanı: Haftalık Ödeviniz 🔮';
        body = `Merhaba {İsim},\n\nBu hafta zihninizin derinliklerinde yatan ve sizi geride tutan sınırlayıcı inanç kalıplarını açığa çıkarma vakti. Kuantum alanında sıçrama yapabilmek için egonun direncini sevgiyle kabul edip dönüştürmeliyiz.\n\nLütfen bu haftaki 7 Günlük Bilinç Günlüğü egzersizlerinizi her sabah uyanır uyanmaz, zihniniz henüz uykudayken yazarak tamamlayın. Enerjisel dönüşümünüzü izliyorum.\n\nIşıkla kal,\nDeniz Bayraktar`;
      } else if (aiTone === 'friendly') {
        subject = 'Selam! Bu Haftaki Gelişim Egzersizimiz 😊';
        body = `Merhaba {İsim},\n\nHarika bir hafta geçirmeni dilerim! Bu haftaki gelişim yolculuğumuzda zihinsel kodlarımızı fark etmek için pratik bir ödevimiz var. Günlüğünü eline al ve sana gönderdiğim farkındalık sorularını içtenlikle cevapla.\n\nKendine ayıracağın bu 10 dakika, hayatında çok güzel farkındalık kapıları açacak. Cevaplarını benimle de paylaşabilirsin!\n\nSevgiler,\nDeniz`;
      } else {
        subject = 'Haftalık Eğitim Modülü Ödevi ve Takibi';
        body = `Sayın {İsim},\n\nKatıldığınız eğitim programı kapsamında bu haftaya ait ödev ve pratik uygulamalarınız sisteminize yüklenmiştir. Sürecin verimliliği açısından ödevlerinizi planlanan tarihe kadar tamamlamanız önem arz etmektedir.\n\nÇalışmalarınızı tamamladıktan sonra portal üzerinden geri bildirim yapabilirsiniz.\n\nİyi çalışmalar,\nDeniz Bayraktar`;
      }
    } else if (aiTopic === 'meditation') {
      if (aiTone === 'spiritual') {
        subject = 'Kozmik Portal Aktivasyonu: Frekans Yükseltme Meditasyonu 🌌';
        body = `Merhaba {İsim},\n\nBugün gezegensel enerjilerin en yüksek olduğu hizalanma günlerinden biri. Auranızı yabancı enerjilerden arındırmak, çakralarınızı galaktik merkezle hizalamak için hazırladığımız yeni frekans meditasyonu yayında.\n\nSessiz bir alana geçin, derin nefesler alın ve Lyra Starseed enerjisinin bedeninizi şifalandırmasına izin verin. Akışta kalın.\n\nSevgiler,\nDeniz Bayraktar`;
      } else if (aiTone === 'friendly') {
        subject = 'Harika Bir Meditasyon Hazırladım! Birlikte Frekansımızı Yükseltelim 🧘✨';
        body = `Merhaba {İsim},\n\nBugün kendimizi yorgun veya sıkışmış hissettiğimiz anlar için harika bir meditasyon paylaştım. Auranı temizleyip enerjini tazelemek için sadece 15 dakikanı ayırman yeterli.\n\nHadi, kulaklıklarını tak ve sakin bir köşeye geçip derin bir nefes alarak başla. Nasıl hissettiğini bana yazmayı unutma!\n\nKucak dolusu sevgiler,\nDeniz`;
      } else {
        subject = 'Frekans Yükseltme Meditasyon Duyurusu';
        body = `Sayın {İsim},\n\nLyra On Earth bünyesinde hazırlanan yeni frekans yükseltme meditasyonu portalımıza eklenmiştir. Günlük pratikleriniz arasına ekleyerek enerjisel dengenizi koruyabilirsiniz.\n\nKatılım linki ve detaylar e-postada yer almaktadır.\n\nSaygılarımla,\nDeniz Bayraktar`;
      }
    } else {
      subject = `Yolculuk Bildirimi: ${aiCustomPrompt || 'Lyra On Earth Özel Bildirimi'}`;
      body = `Merhaba {İsim},\n\nUyanış yolculuğunuz hakkında bilgilendirmek istedik. ${aiCustomPrompt || 'Genel gelişim pratikleriniz devam ediyor.'}\n\nSevgiler,\nDeniz Bayraktar`;
    }

    setMailForm(prev => ({
      ...prev,
      subject,
      body
    }));
    showNotification('AI E-posta taslağı başarıyla oluşturuldu.');
  };

  // Schedule / Automation Submit
  const handleScheduleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailForm.subject || !mailForm.body) {
      showNotification('Lütfen konu ve içerik alanlarını doldurun.', 'error');
      return;
    }

    const nextId = 'se_' + Math.random().toString(36).substr(2, 9);
    const newScheduled: ScheduledEmail = {
      id: nextId,
      targetType: mailForm.targetType,
      targetValue: mailForm.targetValue,
      subject: mailForm.subject,
      body: mailForm.body,
      scheduleType: mailForm.scheduleType,
      scheduleValue: mailForm.scheduleValue || (mailForm.scheduleType === 'one-time' ? new Date(Date.now() + 86400000).toISOString().slice(0, 16) : 'Her Pazartesi 09:00'),
      status: 'active',
      createdAt: new Date().toISOString(),
      aiGenerated: aiTopic !== 'custom'
    };

    const updated = [...scheduledEmails, newScheduled];
    setScheduledEmails(updated);
    saveScheduledEmails(updated);
    
    // Clear mail inputs
    setMailForm(prev => ({
      ...prev,
      subject: '',
      body: ''
    }));
    showNotification('E-posta otomasyonu başarıyla zamanlandı.');
  };

  const handleDeleteScheduledEmail = (id: string) => {
    if (window.confirm('Bu zamanlanmış e-posta otomasyonunu silmek istediğinize emin misiniz?')) {
      const updated = scheduledEmails.filter((e) => e.id !== id);
      setScheduledEmails(updated);
      saveScheduledEmails(updated);
      showNotification('Otomasyon silindi.');
    }
  };

  const handleToggleEmailStatus = (id: string) => {
    const updated = scheduledEmails.map((e) => {
      if (e.id === id) {
        const nextStatus: 'active' | 'paused' = e.status === 'active' ? 'paused' : 'active';
        return { ...e, status: nextStatus };
      }
      return e;
    });
    setScheduledEmails(updated);
    saveScheduledEmails(updated);
    showNotification('Otomasyon durumu güncellendi.');
  };

  const handleSendEmailManually = (email: ScheduledEmail | { targetType: string; targetValue: string; subject: string; body: string }) => {
    // Resolve targets to send to
    let recipients: string[] = [];
    if (email.targetType === 'all') {
      recipients = Array.from(new Set(appointments.map(a => a.email))).filter(Boolean);
    } else if (email.targetType === 'product') {
      recipients = appointments.filter(a => a.productTitle === email.targetValue).map(a => a.email);
    } else {
      recipients = [email.targetValue];
    }

    if (recipients.length === 0) {
      showNotification('Gönderilecek e-posta adresi bulunamadı.', 'error');
      return;
    }

    // Save to sent log
    recipients.forEach(toEmail => {
      saveSentEmailLog({
        to: toEmail,
        subject: email.subject,
        status: 'success'
      });
    });

    // Refresh sent logs state
    setSentLogs(getSentEmailLogs());

    // Update status if it was a one-time scheduled email
    if ('id' in email && email.scheduleType === 'one-time') {
      const updated = scheduledEmails.map(e => e.id === email.id ? { ...e, status: 'sent' as const } : e);
      setScheduledEmails(updated);
      saveScheduledEmails(updated);
    }

    showNotification(`${recipients.length} kişiye e-posta başarıyla gönderildi.`);
  };

  const handleClearLogs = () => {
    if (window.confirm('Tüm gönderim geçmişini temizlemek istediğinize emin misiniz?')) {
      clearSentEmailLogs();
      setSentLogs([]);
      showNotification('Gönderim geçmişi temizlendi.');
    }
  };

  return (
    <div className="relative">
      {/* Alert Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-wine border border-gold/30 px-5 py-3.5 rounded-2xl shadow-xl text-ivory text-xs font-bold tracking-wider uppercase"
          >
            <HiOutlineCheckCircle className="text-gold text-lg" />
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-wine mb-1">Hoş Geldiniz</h2>
          <p className="text-taupe/50 text-xs tracking-widest uppercase">LYRA ON EARTH İÇERİK YÖNETİM SİSTEMİ</p>
        </div>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gold/25 px-5 py-2.5 rounded-full hover:bg-gold/5 transition-all text-xs font-bold tracking-widest text-wine uppercase"
        >
          <HiOutlineEye className="text-base" /> SİTEYİ GÖRÜNTÜLE
        </a>
      </header>



      {/* Tab Panels */}
      <div>
        {/* PANEL: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="p-6 bg-white/60 rounded-2xl border border-gold/10 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-gold mb-1">Toplam Ürün</p>
                  <h3 className="text-3xl font-serif text-wine font-semibold">{products.length}</h3>
                </div>
                <div className="p-3 rounded-xl bg-ivory text-burgundy">
                  <HiOutlineShoppingBag className="text-2xl" />
                </div>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl border border-gold/10 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-gold mb-1">Satın Alma / Başvuru</p>
                  <h3 className="text-3xl font-serif text-wine font-semibold">{appointments.length}</h3>
                </div>
                <div className="p-3 rounded-xl bg-ivory text-burgundy">
                  <HiOutlineCalendar className="text-2xl" />
                </div>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl border border-gold/10 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-gold mb-1">Kayıtlı E-postalar</p>
                  <h3 className="text-3xl font-serif text-wine font-semibold">
                    {Array.from(new Set(appointments.map((a) => a.email))).filter(Boolean).length}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-ivory text-gold">
                  <HiOutlineMail className="text-2xl" />
                </div>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl border border-gold/10 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-gold mb-1">Kanal Videoları</p>
                  <h3 className="text-3xl font-serif text-wine font-semibold">{videos.length}</h3>
                </div>
                <div className="p-3 rounded-xl bg-ivory text-gold">
                  <HiOutlineVideoCamera className="text-2xl" />
                </div>
              </div>

              <div className="p-6 bg-white/60 rounded-2xl border border-gold/10 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-gold mb-1">Sosyal Bağlar</p>
                  <h3 className="text-3xl font-serif text-wine font-semibold">
                    {profile ? Object.values(profile.socials).filter(Boolean).length : 0}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-ivory text-wine">
                  <HiOutlineUser className="text-2xl" />
                </div>
              </div>
            </div>

            {/* Quick Actions / Tips */}
            <div className="p-8 bg-white/40 rounded-2xl border border-gold/10 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center mb-4">
                <HiOutlineSparkles className="text-3xl text-gold animate-pulse" />
              </div>
              <h4 className="font-serif text-xl text-wine mb-2">Her Şey Güncel</h4>
              <p className="text-taupe/60 max-w-sm text-sm font-medium mb-4">
                Tüm ürünleriniz, sosyal bağlantılarınız, görüşme başvurularınız ve e-posta otomasyonlarınız sistemde güncel olarak saklanmaktadır.
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md"
                >
                  Randevuları Yönet
                </button>
                <button
                  onClick={() => setActiveTab('emails')}
                  className="bg-wine hover:bg-wine/90 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md"
                >
                  E-Posta & Otomasyon
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="border border-gold/25 hover:bg-gold/5 text-wine px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                >
                  Ürün Listesi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl text-wine font-semibold">Ürünler ve Hizmetler Listesi</h3>
              <button
                onClick={openAddProduct}
                className="flex items-center gap-1.5 bg-wine hover:bg-wine/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all"
              >
                <HiOutlinePlus className="text-base" /> Ürün Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="p-4 bg-white/70 border border-gold/15 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-16 h-16 rounded-none overflow-hidden shadow-sm border border-gold/10 bg-beige shrink-0">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h4 className="font-serif text-base text-wine font-bold truncate">{product.title}</h4>
                        {product.price && (
                          <span className="text-[0.65rem] font-bold bg-gold/10 text-gold-dark px-2 py-0.5 rounded-none border border-gold/20">
                            {product.price}
                          </span>
                        )}
                        <span className={`text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                          product.priceType === 'free' ? 'bg-gold/5 text-gold-dark border-gold/20' : 'bg-wine/5 text-wine border-wine/10'
                        }`}>
                          {product.priceType === 'free' ? 'ÜCRETSİZ' : 'ÜCRETLİ'}
                        </span>
                        <span className="text-[0.55rem] font-bold uppercase tracking-wider bg-burgundy/5 text-burgundy px-2 py-0.5 rounded-none border border-burgundy/10">
                          Tip: {product.type === 'call' ? 'Görüşme' : product.type === 'external' ? 'Dış Link' : 'Dijital İndirme'}
                        </span>
                      </div>
                      <p className="text-xs text-taupe/50 truncate mb-1.5">{product.tagline}</p>
                      <span className="text-[0.6rem] font-bold uppercase tracking-wider text-wine/40 bg-ivory px-2 py-0.5 rounded-none border border-gold/10">
                        Bölüm: {product.section === 'work' ? 'Lyra ile Çalış' : 'Ana Ürünler'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => openEditProduct(product)}
                      className="p-2.5 rounded-none border border-gold/20 hover:bg-gold/5 text-gold-dark transition-all"
                      title="Düzenle"
                    >
                      <HiOutlinePencil className="text-base" />
                    </button>
                    <button
                      onClick={() => handleProductDelete(product.id)}
                      className="p-2.5 rounded-none border border-burgundy/20 hover:bg-burgundy/5 text-burgundy transition-all"
                      title="Sil"
                    >
                      <HiOutlineTrash className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-wine font-semibold">Satın Alma & Başvurular</h3>

            {appointments.length === 0 ? (
              <div className="p-12 bg-white/40 rounded-2xl border border-gold/10 text-center">
                <p className="text-taupe/50 text-sm font-medium">Henüz herhangi bir satın alma veya başvuru yapılmamış.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-5 bg-white/70 border border-gold/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider bg-gold/10 text-gold-dark px-2.5 py-0.5 rounded-full">
                          {appointment.productTitle}
                        </span>
                        <div className="text-xs text-taupe/40 font-bold uppercase tracking-wider flex items-center gap-1">
                          <HiOutlineCalendar /> {appointment.date} @ {appointment.time}
                        </div>
                      </div>
                      
                      <h4 className="font-serif text-lg text-wine font-bold">{appointment.name}</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-taupe/70 font-semibold">
                        <div>
                          <span className="text-taupe/40 font-bold uppercase text-[0.6rem] tracking-wider block">E-posta</span> 
                          {appointment.email}
                        </div>
                        <div>
                          <span className="text-taupe/40 font-bold uppercase text-[0.6rem] tracking-wider block">Telefon</span> 
                          {appointment.phone}
                        </div>
                        <div>
                          <span className="text-taupe/40 font-bold uppercase text-[0.6rem] tracking-wider block">Instagram</span> 
                          <a 
                            href={`https://instagram.com/${appointment.instagram.replace('@', '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gold-dark hover:underline"
                          >
                            {appointment.instagram}
                          </a>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAppointmentDelete(appointment.id)}
                      className="self-end md:self-center p-2.5 rounded-xl border border-burgundy/10 hover:bg-burgundy/5 text-burgundy transition-all shrink-0"
                      title="Sil"
                    >
                      <HiOutlineTrash className="text-base" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PANEL: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl text-wine font-semibold">Öne Çıkan YouTube Videoları</h3>
              <button
                onClick={openAddVideo}
                className="flex items-center gap-1.5 bg-wine hover:bg-wine/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all"
              >
                <HiOutlinePlus className="text-base" /> Video Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="p-4 bg-white/70 border border-gold/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden shadow-sm bg-beige shrink-0">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      {video.duration && (
                        <div className="absolute bottom-0.5 right-0.5 bg-black/75 px-1 rounded text-[0.55rem] text-white font-bold">
                          {video.duration}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-base text-wine font-bold line-clamp-1">{video.title}</h4>
                      <p className="text-[0.65rem] text-taupe/40 truncate font-semibold uppercase tracking-wide">
                        {video.youtubeUrl}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => openEditVideo(video)}
                      className="p-2.5 rounded-xl border border-gold/20 hover:bg-gold/5 text-gold-dark transition-all"
                      title="Düzenle"
                    >
                      <HiOutlinePencil className="text-base" />
                    </button>
                    <button
                      onClick={() => handleVideoDelete(video.id)}
                      className="p-2.5 rounded-xl border border-burgundy/10 hover:bg-burgundy/5 text-burgundy transition-all"
                      title="Sil"
                    >
                      <HiOutlineTrash className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: PROFILE */}
        {activeTab === 'profile' && profile && (
          <form onSubmit={handleProfileSave} className="bg-white/60 border border-gold/10 p-6 rounded-2xl space-y-6">
            <h3 className="font-serif text-xl text-wine font-semibold border-b border-gold/10 pb-3">Profil Detayları</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Görsel (Avatar) URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="flex-1 w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                  />
                  <select 
                    className="w-1/3 px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                    onChange={(e) => {
                      if(e.target.value) setProfile({ ...profile, avatar: `/${e.target.value}` });
                      e.target.value = "";
                    }}
                  >
                    <option value="">Galeriden Seç...</option>
                    {publicImages.map(img => <option key={img} value={img}>{img}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">İsim Soyisim</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Marka Adı (Slogan Üstü)</label>
                <input
                  type="text"
                  required
                  value={profile.brandName}
                  onChange={(e) => setProfile({ ...profile, brandName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Kısa Biyografi (Bio)</label>
                <textarea
                  required
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>
            </div>

            <h4 className="font-serif text-lg text-wine font-semibold border-b border-gold/10 pb-3 pt-4">Sosyal Medya Linkleri</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">YouTube Kanalı</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={profile.socials.youtube || ''}
                  onChange={(e) => updateProfileSocial('youtube', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Instagram</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/..."
                  value={profile.socials.instagram || ''}
                  onChange={(e) => updateProfileSocial('instagram', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Spotify</label>
                <input
                  type="text"
                  placeholder="https://open.spotify.com/..."
                  value={profile.socials.spotify || ''}
                  onChange={(e) => updateProfileSocial('spotify', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">E-posta (Mailto Linki)</label>
                <input
                  type="text"
                  placeholder="mailto:info@..."
                  value={profile.socials.email || ''}
                  onChange={(e) => updateProfileSocial('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">TikTok</label>
                <input
                  type="text"
                  placeholder="https://tiktok.com/..."
                  value={profile.socials.tiktok || ''}
                  onChange={(e) => updateProfileSocial('tiktok', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/10 focus:border-gold/30 focus:outline-none text-sm text-wine font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-wine hover:bg-wine/90 text-white px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-md"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </form>
        )}

        {/* PANEL: EMAILS */}
        {activeTab === 'emails' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Alt Sekme Menüsü (Sade & Anlaşılır) */}
            <div className="flex border-b border-gold/15 mb-6 overflow-x-auto whitespace-nowrap scrollbar-thin bg-white/20 p-1">
              <button
                onClick={() => setEmailSubTab('send')}
                className={`pb-3 pt-2 px-5 text-xs tracking-wider uppercase font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  emailSubTab === 'send' ? 'border-wine text-wine' : 'border-transparent text-taupe/40 hover:text-wine'
                }`}
              >
                <HiOutlineMail className="text-base" /> Yeni E-posta & AI
              </button>
              <button
                onClick={() => setEmailSubTab('contacts')}
                className={`pb-3 pt-2 px-5 text-xs tracking-wider uppercase font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  emailSubTab === 'contacts' ? 'border-wine text-wine' : 'border-transparent text-taupe/40 hover:text-wine'
                }`}
              >
                <HiOutlineClipboardList className="text-base" /> Kayıtlı Kişiler ({Array.from(new Set(appointments.map(a => a.email))).filter(Boolean).length})
              </button>
              <button
                onClick={() => setEmailSubTab('automations')}
                className={`pb-3 pt-2 px-5 text-xs tracking-wider uppercase font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  emailSubTab === 'automations' ? 'border-wine text-wine' : 'border-transparent text-taupe/40 hover:text-wine'
                }`}
              >
                <HiOutlineClock className="text-base" /> Otomasyon & Geçmiş
              </button>
              <button
                onClick={() => setEmailSubTab('hostinger')}
                className={`pb-3 pt-2 px-5 text-xs tracking-wider uppercase font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  emailSubTab === 'hostinger' ? 'border-wine text-wine' : 'border-transparent text-taupe/40 hover:text-wine'
                }`}
              >
                <HiOutlineServer className="text-base" /> Hostinger & Kodee AI
              </button>
            </div>

            {/* Alt Sekme İçerikleri */}
            <div className="min-h-[400px]">
              
              {/* SUBTAB 1: YENİ E-POSTA & AI */}
              {emailSubTab === 'send' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  
                  {/* AI Sihirbazı Modülü (Sol Taraf) */}
                  <div className="xl:col-span-4 bg-white/60 border border-gold/15 p-6 space-y-4">
                    <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2 border-b border-gold/10 pb-2.5">
                      <HiOutlineSparkles className="text-gold text-lg animate-pulse" /> AI Asistanı
                    </h4>
                    <p className="text-[0.65rem] text-taupe/60 leading-relaxed">
                      Göndermek istediğiniz mail konusunu ve tonunu seçin. Yapay zeka, Deniz Bayraktar'ın tarzına uygun uyanış/spiritüel temalı bir taslak hazırlayacaktır.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">E-posta Tipi</label>
                        <select
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value as any)}
                          className="w-full px-3 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                        >
                          <option value="welcome">Hoş Geldin Karşılaması</option>
                          <option value="homework">Haftalık Eğitim Ödevi</option>
                          <option value="meditation">Yeni Meditasyon Duyurusu</option>
                          <option value="custom">Özel AI Promptu</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">İletişim Tonu</label>
                        <select
                          value={aiTone}
                          onChange={(e) => setAiTone(e.target.value as any)}
                          className="w-full px-3 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                        >
                          <option value="spiritual">Spiritüel & Kozmik ✨</option>
                          <option value="friendly">Samimi & Destekleyici 💛</option>
                          <option value="professional">Profesyonel & Net 💼</option>
                        </select>
                      </div>

                      {aiTopic === 'custom' && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">AI Komutu (Prompt)</label>
                          <textarea
                            rows={3}
                            value={aiCustomPrompt}
                            onChange={(e) => setAiCustomPrompt(e.target.value)}
                            placeholder="Örn: MasterSoul üyelerine seans öncesi hazırlık ödevlerini hatırlat..."
                            className="w-full px-3 py-2 bg-ivory border border-gold/15 text-xs text-wine font-medium focus:outline-none"
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleGenerateAIEmail}
                        className="w-full bg-gold hover:bg-gold-dark text-white py-2.5 text-[0.65rem] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <HiOutlineSparkles /> AI Metni Oluştur
                      </button>
                    </div>
                  </div>

                  {/* Mail Düzenleme & Zamanlama Composer (Sağ Taraf) */}
                  <div className="xl:col-span-8 bg-white/60 border border-gold/15 p-6 space-y-5">
                    <h4 className="font-serif text-base text-wine font-semibold border-b border-gold/10 pb-2.5">
                      E-posta İçeriği & Zamanlama
                    </h4>

                    <form onSubmit={handleScheduleEmailSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Gönderilecek Kitle</label>
                          <select
                            value={mailForm.targetType}
                            onChange={(e) => {
                              const type = e.target.value as any;
                              setMailForm(prev => ({
                                ...prev,
                                targetType: type,
                                targetValue: type === 'all' ? 'all' : type === 'product' ? (products[0]?.title || '') : ''
                              }));
                            }}
                            className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                          >
                            <option value="all">Kayıtlı Tüm Kullanıcılar</option>
                            <option value="product">Belirli Bir Eğitim/Çalışmayı Alanlar</option>
                            <option value="specific">Özel Tek Bir E-posta Adresi</option>
                          </select>
                        </div>

                        {mailForm.targetType === 'product' ? (
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Çalışma / Eğitim Seçin</label>
                            <select
                              value={mailForm.targetValue}
                              onChange={(e) => setMailForm(prev => ({ ...prev, targetValue: e.target.value }))}
                              className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                            >
                              {products.map(p => (
                                <option key={p.id} value={p.title}>{p.title}</option>
                              ))}
                            </select>
                          </div>
                        ) : mailForm.targetType === 'specific' ? (
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">E-posta Adresi</label>
                            <input
                              type="email"
                              required
                              value={mailForm.targetValue === 'all' ? '' : mailForm.targetValue}
                              onChange={(e) => setMailForm(prev => ({ ...prev, targetValue: e.target.value }))}
                              placeholder="alıcı@mail.com"
                              className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Alıcı Sayısı</label>
                            <input
                              type="text"
                              disabled
                              value={`Tüm Veritabanı (${Array.from(new Set(appointments.map(a => a.email))).filter(Boolean).length} Kişi)`}
                              className="w-full px-3.5 py-2 bg-ivory/50 border border-gold/10 text-xs text-wine/50 font-semibold focus:outline-none"
                            />
                          </div>
                        )}

                        <div className="flex flex-col gap-1">
                          <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Zamanlama Türü</label>
                          <select
                            value={mailForm.scheduleType}
                            onChange={(e) => setMailForm(prev => ({ ...prev, scheduleType: e.target.value as any }))}
                            className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                          >
                            <option value="one-time">Tek Seferlik (Belirli Saat/Gün)</option>
                            <option value="recurring">Düzenli Periyot (Tekrarlayan)</option>
                          </select>
                        </div>

                        {mailForm.scheduleType === 'one-time' ? (
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Zaman (Tarih & Saat)</label>
                            <input
                              type="datetime-local"
                              required
                              value={mailForm.scheduleValue}
                              onChange={(e) => setMailForm(prev => ({ ...prev, scheduleValue: e.target.value }))}
                              className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Tekrarlama Düzeni</label>
                            <select
                              value={mailForm.scheduleValue}
                              onChange={(e) => setMailForm(prev => ({ ...prev, scheduleValue: e.target.value }))}
                              className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                            >
                              <option value="Her Gün 09:00">Her Gün (Saat 09:00)</option>
                              <option value="Her Pazartesi 09:00">Her Pazartesi (Saat 09:00 - Hoş Geldin)</option>
                              <option value="Her Pazartesi 12:00">Her Pazartesi (Saat 12:00)</option>
                              <option value="Her Cuma 18:00">Her Cuma (Saat 18:00 - Ritüel)</option>
                              <option value="Her Ayın 1'i 10:00">Her Ayın 1'i (Saat 10:00 - Aylık Bülten)</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Konu</label>
                        <input
                          type="text"
                          required
                          value={mailForm.subject}
                          onChange={(e) => setMailForm(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Konu başlığını girin..."
                          className="w-full px-4 py-2.5 bg-ivory border border-gold/15 text-xs text-wine font-bold focus:outline-none focus:border-gold/30"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Mesaj İçeriği</label>
                        <textarea
                          rows={6}
                          required
                          value={mailForm.body}
                          onChange={(e) => setMailForm(prev => ({ ...prev, body: e.target.value }))}
                          placeholder="E-posta gövdesini yazın. Dinamik isim yerleşimi için {İsim} kullanabilirsiniz..."
                          className="w-full px-4 py-2.5 bg-ivory border border-gold/15 text-xs text-wine font-medium leading-relaxed focus:outline-none focus:border-gold/30"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleSendEmailManually({
                            targetType: mailForm.targetType,
                            targetValue: mailForm.targetValue,
                            subject: mailForm.subject,
                            body: mailForm.body
                          })}
                          disabled={!mailForm.subject || !mailForm.body}
                          className="px-4 py-2.5 border border-wine text-wine hover:bg-wine/5 disabled:opacity-40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Şimdi Gönder
                        </button>
                        <button
                          type="submit"
                          className="bg-wine hover:bg-wine/90 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                        >
                          Kampanyayı Zamanla
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: KAYITLI KİŞİLER */}
              {emailSubTab === 'contacts' && (
                <div className="bg-white/60 border border-gold/15 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gold/10 pb-3">
                    <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2">
                      <HiOutlineClipboardList className="text-xl text-gold" /> Aboneler & Eğitim Alanlar
                    </h4>
                    
                    {/* Arama Barı (Sadeleştirilmiş) */}
                    <input
                      type="text"
                      placeholder="İsim veya e-posta ara..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      className="px-4 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-medium focus:outline-none focus:border-gold/30 rounded-none w-full sm:w-64"
                    />
                  </div>

                  {appointments.length === 0 ? (
                    <p className="text-xs text-taupe/50 italic py-6 text-center">Henüz herhangi bir kullanıcı kaydı bulunmuyor.</p>
                  ) : (
                    <div className="overflow-x-auto scrollbar-thin">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-gold/10 text-gold-dark font-bold uppercase tracking-wider text-[0.6rem]">
                            <th className="py-3 px-2">Kişi Bilgisi</th>
                            <th className="py-3 px-2">E-posta</th>
                            <th className="py-3 px-2">Katıldığı Çalışma</th>
                            <th className="py-3 px-2">Telefon / Instagram</th>
                            <th className="py-3 px-2">Kayıt Tarihi</th>
                            <th className="py-3 px-2 text-right">İşlem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/5 font-medium text-wine/80">
                          {appointments
                            .filter(user => 
                              user.name?.toLowerCase().includes(contactSearch.toLowerCase()) || 
                              user.email?.toLowerCase().includes(contactSearch.toLowerCase())
                            )
                            .map((user) => (
                              <tr key={user.id} className="hover:bg-gold/[0.01] transition-colors">
                                <td className="py-3 px-2 font-bold text-wine">{user.name || 'İsimsiz'}</td>
                                <td className="py-3 px-2 font-mono">{user.email}</td>
                                <td className="py-3 px-2">
                                  <span className="bg-gold/5 text-gold-dark border border-gold/15 px-2 py-0.5 text-[0.55rem] font-bold uppercase">
                                    {user.productTitle}
                                  </span>
                                </td>
                                <td className="py-3 px-2 text-taupe/60 text-[0.7rem] font-mono">
                                  {user.phone && <div className="leading-tight">{user.phone}</div>}
                                  {user.instagram && <div className="leading-tight text-wine/50">{user.instagram}</div>}
                                </td>
                                <td className="py-3 px-2 text-taupe/40 text-[0.7rem]">{user.date} {user.time}</td>
                                <td className="py-3 px-2 text-right">
                                  <button
                                    onClick={() => {
                                      setMailForm(prev => ({
                                        ...prev,
                                        targetType: 'specific',
                                        targetValue: user.email
                                      }));
                                      setEmailSubTab('send');
                                      showNotification(`${user.email} seçildi, AI sihirbazı veya mail yazıcıyı kullanabilirsiniz.`);
                                    }}
                                    className="text-[0.6rem] font-bold uppercase tracking-widest text-gold-dark hover:text-white border border-gold/25 hover:bg-wine hover:border-wine px-3 py-1 transition-all cursor-pointer"
                                  >
                                    Seç ve Mail Yaz
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 3: OTOMASYON & GEÇMİŞ */}
              {emailSubTab === 'automations' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  
                  {/* Zamanlanmış Otomasyon Listesi (Sol Taraf) */}
                  <div className="xl:col-span-7 bg-white/60 border border-gold/15 p-6 space-y-4">
                    <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2 border-b border-gold/10 pb-2.5">
                      <HiOutlineClock className="text-gold text-lg" /> Zamanlanmış Otomasyon Kampanyaları
                    </h4>

                    {scheduledEmails.length === 0 ? (
                      <p className="text-xs text-taupe/50 italic py-6 text-center">Aktif bir zamanlanmış otomasyon bulunmamaktadır.</p>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
                        {scheduledEmails.map((email) => (
                          <div
                            key={email.id}
                            className="p-3.5 border border-gold/10 bg-white/40 flex flex-col justify-between gap-3 hover:border-gold/25 transition-all"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-gold/10 text-gold-dark text-[0.55rem] font-bold px-2 py-0.5 uppercase border border-gold/15">
                                  Alıcı: {email.targetType === 'all' ? 'Tüm Kayıtlar' : email.targetValue}
                                </span>
                                <span className={`text-[0.55rem] font-bold px-2 py-0.5 uppercase border ${
                                  email.scheduleType === 'recurring' ? 'bg-burgundy/5 border-burgundy/10 text-burgundy' : 'bg-wine/5 border-wine/10 text-wine'
                                }`}>
                                  {email.scheduleType === 'recurring' ? 'Periyodik' : 'Tek Seferlik'}
                                </span>
                                <span className="text-[0.55rem] text-taupe/40 font-mono">
                                  {email.scheduleValue}
                                </span>
                              </div>
                              <h5 className="text-xs font-serif font-bold text-wine">{email.subject}</h5>
                              <p className="text-[0.65rem] text-taupe/50 line-clamp-2 leading-relaxed">{email.body}</p>
                            </div>

                            <div className="flex justify-end items-center gap-1.5 pt-1.5 border-t border-gold/5">
                              {email.status !== 'sent' && (
                                <button
                                  onClick={() => handleToggleEmailStatus(email.id)}
                                  className={`p-1.5 border transition-all cursor-pointer ${
                                    email.status === 'active' 
                                      ? 'border-gold/30 hover:bg-gold/5 text-gold-dark' 
                                      : 'border-wine/20 hover:bg-wine/5 text-wine'
                                  }`}
                                >
                                  {email.status === 'active' ? <HiOutlinePause className="text-xs" /> : <HiOutlinePlay className="text-xs" />}
                                </button>
                              )}
                              <button
                                onClick={() => handleSendEmailManually(email)}
                                className="text-[0.55rem] border border-gold/30 hover:bg-gold/5 text-gold-dark px-2 py-1 font-bold uppercase tracking-wider transition-all cursor-pointer"
                              >
                                Şimdi Tetikle
                              </button>
                              <button
                                onClick={() => handleDeleteScheduledEmail(email.id)}
                                className="p-1.5 border border-burgundy/10 hover:bg-burgundy/5 text-burgundy transition-all cursor-pointer"
                              >
                                <HiOutlineTrash className="text-xs" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Gönderilen Mailler - Log Geçmişi (Sağ Taraf) */}
                  <div className="xl:col-span-5 bg-white/60 border border-gold/15 p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-gold/10 pb-2.5">
                      <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2">
                        <HiOutlineMail className="text-gold text-lg" /> Gönderim Geçmişi (Logs)
                      </h4>
                      {sentLogs.length > 0 && (
                        <button
                          onClick={handleClearLogs}
                          className="text-[0.55rem] font-bold uppercase tracking-widest text-burgundy hover:underline cursor-pointer"
                        >
                          Temizle
                        </button>
                      )}
                    </div>

                    {sentLogs.length === 0 ? (
                      <p className="text-xs text-taupe/50 italic py-6 text-center">Henüz herhangi bir mail gönderimi yapılmadı.</p>
                    ) : (
                      <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin">
                        {sentLogs.map((log) => (
                          <div key={log.id} className="p-2.5 bg-white/40 border border-gold/10 text-[0.65rem] space-y-1">
                            <div className="flex justify-between text-gold-dark font-bold">
                              <span className="truncate max-w-[70%]">{log.to}</span>
                              <span className="text-taupe/40 font-mono text-[0.55rem]">
                                {new Date(log.sentAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-wine font-bold truncate">{log.subject}</p>
                            <div className="text-[0.55rem] text-emerald-600 font-bold flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" /> Başarıyla İletildi (Hostinger)
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBTAB 4: HOSTINGER & KODEE AI */}
              {emailSubTab === 'hostinger' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                  
                  {/* SMTP Ayarları (Sol Taraf) */}
                  <form onSubmit={handleSmtpSave} className="xl:col-span-5 bg-white/60 border border-gold/15 p-6 space-y-4">
                    <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2 border-b border-gold/10 pb-2.5">
                      <HiOutlineServer className="text-gold text-lg" /> SMTP Sunucu Ayarları
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">SMTP Sunucusu</label>
                        <input
                          type="text"
                          required
                          value={smtpForm.host}
                          onChange={(e) => setSmtpForm(prev => ({ ...prev, host: e.target.value }))}
                          className="w-full px-3 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">Port</label>
                          <input
                            type="number"
                            required
                            value={smtpForm.port}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, port: parseInt(e.target.value) || 465 }))}
                            className="w-full px-3 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">Güvenlik</label>
                          <select
                            value={smtpForm.secure ? 'ssl' : 'none'}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, secure: e.target.value === 'ssl' }))}
                            className="w-full px-3 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                          >
                            <option value="ssl">SSL / TLS</option>
                            <option value="none">Yok</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">E-posta Adresi (Gönderici)</label>
                        <input
                          type="email"
                          required
                          value={smtpForm.user}
                          onChange={(e) => setSmtpForm(prev => ({ ...prev, user: e.target.value }))}
                          className="w-full px-3 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[0.55rem] font-bold uppercase tracking-wider text-taupe/50">SMTP Şifresi</label>
                        <input
                          type="password"
                          placeholder="••••••••••••••"
                          value={smtpForm.password || ''}
                          onChange={(e) => setSmtpForm(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-3 py-1.5 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none"
                        />
                      </div>

                      <div className="w-full h-px bg-gold/10 my-2" />

                      {/* Yapay Zeka Toggles */}
                      <div className="space-y-2.5 pt-1 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-wine">Kodee AI Asistanı</span>
                            <span className="text-[0.5rem] text-taupe/40">Mail özetleme, arama ve asistanlık</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={smtpForm.kodeeMailboxAssistant}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, kodeeMailboxAssistant: e.target.checked }))}
                            className="accent-gold w-3.5 h-3.5"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-wine">Agentic Email (Beta)</span>
                            <span className="text-[0.5rem] text-taupe/40">Otonom uyanış mail sekans takibi</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={smtpForm.agenticAutoReplies}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, agenticAutoReplies: e.target.checked }))}
                            className="accent-gold w-3.5 h-3.5"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-wine">Akıllı Yanıt Taslakları</span>
                            <span className="text-[0.5rem] text-taupe/40">Hostinger AI otomatik taslak oluşturucu</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={smtpForm.enableHostingerAI}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, enableHostingerAI: e.target.checked }))}
                            className="accent-gold w-3.5 h-3.5"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-wine hover:bg-wine/90 text-white py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      SMTP Ayarlarını Kaydet
                    </button>
                  </form>

                  {/* Kodee AI Gelen Kutusu Özetleri (Sağ Taraf) */}
                  {smtpSettings?.kodeeMailboxAssistant && (
                    <div className="xl:col-span-7 bg-white/60 border border-gold/15 p-6 space-y-4">
                      <h4 className="font-serif text-base text-wine font-semibold flex items-center gap-2 border-b border-gold/10 pb-2.5">
                        <HiOutlineSparkles className="text-gold text-lg animate-pulse" /> Kodee Gelen Kutusu AI Özetleri
                      </h4>
                      <p className="text-[0.65rem] text-taupe/65 font-medium">
                        Hostinger Premium AI aracı olan mailbox assistant "Kodee" gelen maillerinizi tarayarak özetledi. Hızlıca akıllı yanıt oluşturabilirsiniz:
                      </p>

                      <div className="space-y-3.5">
                        {[
                          {
                            sender: 'selin.kaya@gmail.com',
                            subject: 'Meditasyon sonrası baş ağrısı ve rüyalar hakkında',
                            summary: 'Pratik sonrası baş ağrısı ve yoğun kozmik rüyalar gördüğünü söylüyor. Deniz Bayraktar\'dan enerji dengelenmesi hakkında rehberlik ve tavsiye istiyor.',
                            reply: 'Selin Hanım, meditasyon sonrası baş ağrısı enerjisel direncin çözülmesiyle ilgilidir. Ritüelleri yavaşlatmasını ve bol su içmesini tavsiye eden bir şablon hazırladım.'
                          },
                          {
                            sender: 'ahmet.yildiz@outlook.com',
                            subject: 'MasterSoul portal giriş hatası alıyorum',
                            summary: 'MasterSoul portalına giriş yaparken teknik hata aldığını, uyanış modüllerine erişemediğini belirtip şifre yenileme linki talep ediyor.',
                            reply: 'Portala kayıtlı e-postası doğrulanıp teknik bir sıfırlama linki gönderilebilir.'
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="p-3 bg-ivory/50 border border-gold/10 space-y-2">
                            <div className="flex justify-between items-center text-[0.6rem] font-bold text-gold-dark border-b border-gold/5 pb-1">
                              <span>Gönderen: {item.sender}</span>
                              <span className="bg-wine/5 text-wine px-1.5 py-0.5 uppercase tracking-wide">Müşteri Talebi</span>
                            </div>
                            <h5 className="text-[0.7rem] font-bold text-wine">{item.subject}</h5>
                            <p className="text-[0.65rem] text-taupe/65 font-medium bg-white/70 p-2 border border-gold/5 leading-relaxed">{item.summary}</p>
                            <button
                              onClick={() => {
                                setMailForm({
                                  targetType: 'specific',
                                  targetValue: item.sender,
                                  subject: `Re: ${item.subject}`,
                                  body: `Merhaba,\n\nSorunuz için teşekkür ederiz. İlettiğiniz konuyu inceledik.\n\n${item.reply}\n\nUyanış yolculuğunuzda size rehberlik etmekten mutluluk duyuyoruz. Akışta kalın.\n\nSevgiler,\nDeniz Bayraktar`,
                                  scheduleType: 'one-time',
                                  scheduleValue: new Date(Date.now() + 600000).toISOString().slice(0, 16)
                                });
                                setEmailSubTab('send');
                                showNotification(`AI Akıllı Yanıtı yeni mail composer'a başarıyla aktarıldı.`);
                              }}
                              className="w-full text-center py-1.5 text-[0.55rem] font-bold uppercase tracking-wider text-wine bg-gold/15 hover:bg-gold/25 transition-all cursor-pointer"
                            >
                              Akıllı AI Yanıtı Hazırla
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-none border border-gold/20 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh] z-10"
            >
              <div className="flex justify-between items-center border-b border-gold/10 pb-4 mb-6">
                <h3 className="font-serif text-xl text-wine font-bold uppercase tracking-wider">
                  {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                </h3>
                <button 
                  onClick={() => setIsProductModalOpen(false)} 
                  className="p-1.5 border border-gold/10 hover:bg-gold/5 text-taupe/40 hover:text-wine transition-all rounded-none"
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Ürün Adı</label>
                    <input
                      type="text"
                      required
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Kısa Etiket/Slogan</label>
                    <input
                      type="text"
                      required
                      value={productForm.tagline}
                      onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Görsel URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="flex-1 w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                      />
                      <select 
                        className="w-1/3 px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                        onChange={(e) => {
                          if(e.target.value) setProductForm({ ...productForm, image: `/${e.target.value}` });
                          e.target.value = "";
                        }}
                      >
                        <option value="">Galeriden Seç...</option>
                        {publicImages.map(img => <option key={img} value={img}>{img}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Ücret Tipi</label>
                    <select
                      value={productForm.priceType || 'paid'}
                      onChange={(e) => {
                        const pType = e.target.value as 'paid' | 'free';
                        setProductForm({ 
                          ...productForm, 
                          priceType: pType,
                          price: pType === 'free' ? 'Ücretsiz' : (productForm.price === 'Ücretsiz' ? '' : productForm.price)
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    >
                      <option value="paid">Ücretli</option>
                      <option value="free">Ücretsiz</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Fiyat (Opsiyonel)</label>
                    <input
                      type="text"
                      placeholder="Örn: 150 ₺ veya Ücretsiz"
                      value={productForm.price || ''}
                      disabled={productForm.priceType === 'free'}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Buton Yazısı</label>
                    <input
                      type="text"
                      required
                      value={productForm.buttonText}
                      onChange={(e) => setProductForm({ ...productForm, buttonText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Bölüm</label>
                    <select
                      value={productForm.section}
                      onChange={(e) => setProductForm({ ...productForm, section: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    >
                      <option value="main">Ana Çalışmalar</option>
                      <option value="work">Lyra ile Çalış (Alt Kısım)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Ürün Tipi</label>
                    <select
                      value={productForm.type}
                      onChange={(e) => setProductForm({ ...productForm, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    >
                      <option value="digital">Dijital İndirme / Başvuru Formu</option>
                      <option value="call">Görüşme (Randevu Takvimli)</option>
                      <option value="external">Dış Linke Yönlendirme</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Özel Yönlendirme Linki (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Boş bırakırsanız otomatik detay sayfası oluşturulur"
                    value={productForm.link}
                    onChange={(e) => setProductForm({ ...productForm, link: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Detaylı Açıklama</label>
                  <textarea
                    rows={4}
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gold/10 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="border border-gold/25 px-5 py-2.5 rounded-none text-xs font-bold tracking-wider text-wine uppercase hover:bg-gold/5 transition-all"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="bg-wine hover:bg-wine/90 text-white px-5 py-2.5 rounded-none text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                  >
                    {editingProduct ? 'Kaydet' : 'Ekle'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gold/10 p-6 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center border-b border-gold/10 pb-3 mb-5">
                <h3 className="font-serif text-lg text-wine font-bold">
                  {editingVideo ? 'Videoyu Düzenle' : 'Yeni Video Ekle'}
                </h3>
                <button 
                  onClick={() => setIsVideoModalOpen(false)} 
                  className="p-1 rounded-lg text-taupe/40 hover:bg-gold/5 hover:text-wine transition-all"
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Video Başlığı</label>
                  <input
                    type="text"
                    required
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Thumbnail Görsel URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={videoForm.thumbnail}
                      onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                      className="flex-1 w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    />
                    <select 
                      className="w-1/3 px-4 py-2.5 rounded-xl bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                      onChange={(e) => {
                        if(e.target.value) setVideoForm({ ...videoForm, thumbnail: `/${e.target.value}` });
                        e.target.value = "";
                      }}
                    >
                      <option value="">Galeriden Seç...</option>
                      {publicImages.map(img => <option key={img} value={img}>{img}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">YouTube Video URL</label>
                  <input
                    type="text"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoForm.youtubeUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Süre (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Örn: 12:45"
                    value={videoForm.duration || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gold/10 mt-5">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="border border-gold/25 px-4 py-2 rounded-xl text-xs font-bold tracking-wider text-wine uppercase hover:bg-gold/5 transition-all"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="bg-wine hover:bg-wine/90 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                  >
                    {editingVideo ? 'Kaydet' : 'Ekle'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
