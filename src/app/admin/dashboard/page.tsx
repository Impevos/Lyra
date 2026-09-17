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
  HiCheck,
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
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-ivory text-burgundy">Yükleniyor...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'profile' | 'videos' | 'appointments' | 'emails' | 'purchases'>('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'products', 'profile', 'videos', 'appointments', 'emails', 'purchases'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);
  const [emailSubTab, setEmailSubTab] = useState<'send' | 'contacts' | 'automations' | 'hostinger'>('send');
  const [contactSearch, setContactSearch] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [videos, setVideos] = useState<FeaturedVideoItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  const [orders, setOrders] = useState<any[]>([]);

  // Email States
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings | null>(null);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [sentLogs, setSentLogs] = useState<SentEmailLog[]>([]);

  useEffect(() => {
    // Fetch all needed data
    fetchData();
  }, []);

  const fetchData = async () => {
    const productsData = await getProducts();
    const profileData = await getProfile();
    const videosData = await getVideos();
    const appointmentsData = await getAppointments();
    
    // Fetch Email Data
    const smtpData = await getSmtpSettings();
    const scheduledData = await getScheduledEmails();
    const logsData = await getSentEmailLogs();

    // Fetch orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    setProducts(productsData || []);
    setProfile(profileData);
    setVideos(videosData || []);
    setAppointments(appointmentsData || []);
    if (ordersData) setOrders(ordersData);
    
    if (smtpData) setSmtpSettings(smtpData);
    setScheduledEmails(scheduledData || []);
    setSentLogs(logsData || []);
  };

  // Email Form State
  const [mailForm, setMailForm] = useState({
    targetType: 'all' as 'all' | 'product' | 'specific',
    targetValue: 'all',
    subject: '',
    body: '',
    scheduleType: 'one-time' as 'one-time' | 'recurring',
    scheduleValue: '',
    triggerType: 'manual' as 'manual' | 'on_purchase',
  });

  const [smtpForm, setSmtpForm] = useState<SmtpSettings>({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    user: 'info@lyraonearth.com',
    password: '',
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
    priceType: 'paid',
    testimonialImages: [],
    badgeText: '',
    downloadUrl: ''
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

    const loadData = async () => {
      setProducts(await getProducts());
      setProfile(await getProfile());
      setVideos(getVideos());
      setAppointments(getAppointments());
    };
    loadData();
    
    // Load email database properties
    const smtp = getSmtpSettings();
    setSmtpSettings(smtp);
    if (smtp) setSmtpForm(smtp);
    setScheduledEmails(getScheduledEmails());
    setSentLogs(getSentEmailLogs());
  }, []);

  // Migration Function
  const handleMigrateToSupabase = async () => {
    if (!window.confirm("DİKKAT: Bilgisayarınızdaki (Local Storage) tüm veriler Supabase veritabanına aktarılacaktır. Devam etmek istiyor musunuz?")) return;
    
    showNotification("Aktarım başlatıldı, lütfen bekleyin...", "success");
    
    try {
      // Migrate Products from Local Storage
      const savedProducts = localStorage.getItem('custom_products');
      if (savedProducts) {
        const localProducts: ProductItem[] = JSON.parse(savedProducts);
        for (const prod of localProducts) {
          if (!prod) continue;
          const sanitizedProd = {
            id: prod.id || Math.random().toString(36).substr(2, 9),
            title: prod.title || 'İsimsiz Ürün',
            tagline: prod.tagline || '',
            image: prod.image || '',
            buttonText: prod.buttonText || '',
            link: prod.link,
            price: prod.price,
            section: prod.section,
            description: prod.description,
            type: prod.type,
            priceType: prod.priceType,
            testimonialImages: prod.testimonialImages,
            badgeText: prod.badgeText || (prod as any).badge || null,
            downloadUrl: prod.downloadUrl || ''
          };
          const { error } = await supabase.from('products').upsert(sanitizedProd);
          if (error) throw error;
        }
      }
      
      // Migrate Profile from Local Storage
      const savedProfile = localStorage.getItem('custom_profile');
      if (savedProfile) {
        const localProfile: ProfileData = JSON.parse(savedProfile);
        const sanitizedProfile = {
          id: 'default',
          name: localProfile.name,
          brandName: localProfile.brandName,
          bio: localProfile.bio,
          avatar: localProfile.avatar,
          socials: localProfile.socials
        };
        const { error } = await supabase.from('profile').upsert(sanitizedProfile);
        if (error) throw error;
      }

      showNotification("VERİLER BAŞARIYLA SUPABASE'E AKTARILDI! Lütfen sayfayı yenileyin.", "success");
    } catch (err: any) {
      console.error(err);
      showNotification(`Hata: ${err.message}`, "error");
    }
  };

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
      priceType: 'paid',
      testimonialImages: [],
      badgeText: '',
      downloadUrl: ''
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
      priceType: product.priceType || 'paid',
      testimonialImages: product.testimonialImages || [],
      badgeText: product.badgeText || '',
      downloadUrl: product.downloadUrl || ''
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
      triggerType: mailForm.triggerType,
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

  const handleSendEmailManually = async (email: ScheduledEmail | { targetType: string; targetValue: string; subject: string; body: string }) => {
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

    showNotification('E-postalar gönderiliyor...', 'success');

    for (const toEmail of recipients) {
      try {
        const response = await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: toEmail,
            subject: email.subject,
            text: email.body,
            smtpConfig: smtpSettings
          })
        });

        if (response.ok) {
          saveSentEmailLog({
            to: toEmail,
            subject: email.subject,
            status: 'success'
          });
        } else {
          saveSentEmailLog({
            to: toEmail,
            subject: email.subject,
            status: 'failed',
            error: 'API Hatası'
          });
        }
      } catch (err: any) {
        saveSentEmailLog({
          to: toEmail,
          subject: email.subject,
          status: 'failed',
          error: err.message
        });
      }
    }

    // Refresh sent logs state
    setSentLogs(getSentEmailLogs());
    showNotification('Gönderim işlemi tamamlandı.');

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
                <button
                  onClick={handleMigrateToSupabase}
                  className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md shadow-black/20 hover:scale-105"
                >
                  SUPABASE'E AKTAR
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

                      {/* Beklenti & Kişisel Bilgi */}
                      {(appointment.expectations || appointment.aboutSelf) && (
                        <div className="mt-3 pt-3 border-t border-gold/10 space-y-2">
                          {appointment.expectations && (
                            <div>
                              <span className="text-taupe/40 font-bold uppercase text-[0.55rem] tracking-wider block mb-0.5">Beklentisi</span>
                              <p className="text-xs text-wine/70 leading-relaxed font-medium bg-gold/[0.03] p-2 border border-gold/8">{appointment.expectations}</p>
                            </div>
                          )}
                          {appointment.aboutSelf && (
                            <div>
                              <span className="text-taupe/40 font-bold uppercase text-[0.55rem] tracking-wider block mb-0.5">Kişisel Bilgi</span>
                              <p className="text-xs text-wine/70 leading-relaxed font-medium bg-gold/[0.03] p-2 border border-gold/8">{appointment.aboutSelf}</p>
                            </div>
                          )}
                        </div>
                      )}
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
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Görsel Seçimi (Avatar)</label>
                <div className="flex flex-wrap items-center gap-4">
                  {['/deniz1.jpeg', '/deniz2.jpeg', '/deniz3.jpeg', '/deniz4.jpeg', '/deniz5.jpeg', '/deniz_bayraktar.jpeg'].map((imgSrc) => (
                    <div 
                      key={imgSrc}
                      onClick={() => setProfile({ ...profile, avatar: imgSrc })}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shrink-0 ${profile.avatar === imgSrc ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : 'border-transparent hover:border-gold/50'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt="Avatar" className="w-full h-full object-cover" />
                      {profile.avatar === imgSrc && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <HiCheck className="text-white text-2xl drop-shadow-md" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Özel yüklenen resim önizlemesi */}
                  {profile.avatar && !['/deniz1.jpeg', '/deniz2.jpeg', '/deniz3.jpeg', '/deniz4.jpeg', '/deniz5.jpeg', '/deniz_bayraktar.jpeg'].includes(profile.avatar) && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={profile.avatar} alt="Custom Avatar" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <HiCheck className="text-white text-2xl drop-shadow-md" />
                      </div>
                    </div>
                  )}

                  {/* Fotoğraf Yükle Butonu */}
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 flex flex-col items-center justify-center cursor-pointer transition-all shrink-0">
                    <HiOutlinePlus className="text-2xl text-gold mb-1" />
                    <span className="text-[0.55rem] font-bold text-wine">YÜKLE</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setProfile({ ...profile, avatar: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
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
                <HiOutlineMail className="text-base" /> Yeni E-posta / Otomasyon
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
                <HiOutlineServer className="text-base" /> SMTP Ayarları
              </button>
            </div>

            {/* Alt Sekme İçerikleri */}
            <div className="min-h-[400px]">
              
              {/* SUBTAB 1: YENİ E-POSTA / OTOMASYON */}
              {emailSubTab === 'send' && (
                <div className="max-w-4xl bg-white/60 border border-gold/15 p-6 space-y-5">
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
                          <label className="text-[0.6rem] font-bold uppercase tracking-wider text-taupe/50">Tetikleyici Türü</label>
                          <select
                            value={mailForm.triggerType}
                            onChange={(e) => setMailForm(prev => ({ ...prev, triggerType: e.target.value as any }))}
                            className="w-full px-3.5 py-2 bg-ivory border border-gold/15 text-xs text-wine font-semibold focus:outline-none focus:border-gold/30"
                          >
                            <option value="manual">Manuel veya Belirli Zamanda</option>
                            <option value="on_purchase">Satın Alma İşlemi Sonrası (Otomatik)</option>
                          </select>
                        </div>

                        {mailForm.triggerType === 'manual' && (
                          <>
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
                      </>
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
                                  email.triggerType === 'on_purchase' ? 'bg-green-500/10 border-green-500/20 text-green-700' :
                                  email.scheduleType === 'recurring' ? 'bg-burgundy/5 border-burgundy/10 text-burgundy' : 'bg-wine/5 border-wine/10 text-wine'
                                }`}>
                                  {email.triggerType === 'on_purchase' ? 'SATIŞ OTOMASYONU' : 
                                   email.scheduleType === 'recurring' ? 'Periyodik' : 'Tek Seferlik'}
                                </span>
                                <span className="text-[0.55rem] text-taupe/40 font-mono">
                                  {email.triggerType === 'on_purchase' ? 'Otomatik Tetiklenir' : email.scheduleValue}
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

              {/* SUBTAB 4: SMTP AYARLARI */}
              {emailSubTab === 'hostinger' && (
                  <form onSubmit={handleSmtpSave} className="max-w-xl bg-white/60 border border-gold/15 p-6 space-y-4">
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
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-wine hover:bg-wine/90 text-white py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      SMTP Ayarlarını Kaydet
                    </button>
                  </form>
              )}

            </div>

          </div>
        )}
      </div>

      {/* PANEL: PURCHASES */}
      {activeTab === 'purchases' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white/60 border border-gold/15 p-6 space-y-6">
            <h3 className="font-serif text-2xl text-wine border-b border-gold/15 pb-4">
              Satın Alımlar
            </h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-10 text-taupe/60">
                <p>Henüz satın alım bulunmuyor.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-taupe/80">
                  <thead className="bg-gold/5 text-wine uppercase text-xs tracking-wider border-b border-gold/15">
                    <tr>
                      <th className="px-4 py-4 font-bold">Müşteri</th>
                      <th className="px-4 py-4 font-bold">Ürün</th>
                      <th className="px-4 py-4 font-bold">Tutar</th>
                      <th className="px-4 py-4 font-bold">Durum</th>
                      <th className="px-4 py-4 font-bold">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 bg-white/40">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gold/5 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-bold text-wine">{order.customer_name}</div>
                          <div className="text-xs text-taupe/60">{order.customer_email}</div>
                          <div className="text-xs text-taupe/60">{order.customer_phone}</div>
                        </td>
                        <td className="px-4 py-4 font-medium text-wine">
                          {order.product_title}
                        </td>
                        <td className="px-4 py-4">
                          ₺{(order.amount / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            order.status === 'success' 
                              ? 'bg-green-100 text-green-700' 
                              : order.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status === 'success' ? 'Başarılı' : order.status === 'failed' ? 'Başarısız' : 'Bekliyor'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs">
                          {new Date(order.created_at).toLocaleString('tr-TR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

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

                  <div className="flex flex-col gap-3 sm:col-span-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Görsel Seçimi (Ürün / Hizmet)</label>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1528569937393-ee892b976859?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?auto=format&fit=crop&q=80&w=400',
                        '/angel_wings.png',
                        '/ethereal_wings.png',
                        '/majestic_wings.png',
                        '/wings_golden_fire.png',
                        '/flaming_wings.png',
                        '/flaming_wings_subtle.png'
                      ].map((imgSrc) => (
                        <div 
                          key={imgSrc}
                          onClick={() => setProductForm({ ...productForm, image: imgSrc })}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shrink-0 ${productForm.image === imgSrc ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : 'border-transparent hover:border-gold/50'}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgSrc} alt="Product" className="w-full h-full object-cover" />
                          {productForm.image === imgSrc && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <HiCheck className="text-white text-xl sm:text-2xl drop-shadow-md" />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Özel yüklenen resim önizlemesi */}
                      {productForm.image && !productForm.image.includes('images.unsplash.com') && (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={productForm.image} alt="Custom Product" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <HiCheck className="text-white text-xl sm:text-2xl drop-shadow-md" />
                          </div>
                        </div>
                      )}

                      {/* Fotoğraf Yükle Butonu */}
                      <label className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 flex flex-col items-center justify-center cursor-pointer transition-all shrink-0">
                        <HiOutlinePlus className="text-xl sm:text-2xl text-gold mb-1" />
                        <span className="text-[0.45rem] sm:text-[0.55rem] font-bold text-wine">YÜKLE</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  setProductForm({ ...productForm, image: reader.result });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
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

                {productForm.type === 'digital' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">İndirme Linki (Download URL)</label>
                    <input
                      type="text"
                      placeholder="Örn: /dark-mother-kali.pdf"
                      value={productForm.downloadUrl || ''}
                      onChange={(e) => setProductForm({ ...productForm, downloadUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                    />
                  </div>
                )}

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

                {/* Badge / Etiket Yazısı */}
                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Kart Etiket Yazısı (Badge)</label>
                  <input
                    type="text"
                    placeholder="Örn: ÖZEL EĞİTİM & SEANS, ÜCRETSİZ KAYNAK, PREMIUM PROGRAM..."
                    value={productForm.badgeText || ''}
                    onChange={(e) => setProductForm({ ...productForm, badgeText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-none bg-ivory border border-gold/10 focus:border-gold/30 focus:outline-none text-xs text-wine font-medium"
                  />
                  <span className="text-[0.55rem] text-taupe/40 font-medium">Boş bırakırsanız varsayılan etiket kullanılır.</span>
                </div>

                {/* Testimonial / Kullanıcı Yorum Fotoğrafları */}
                <div className="flex flex-col gap-2 pt-2 border-t border-gold/10">
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-taupe/50">Kullanıcı Deneyimi Fotoğrafları (SS / Yorumlar)</label>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {(productForm.testimonialImages || []).map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden border border-gold/20 group shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Yorum ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(productForm.testimonialImages || [])];
                            updated.splice(idx, 1);
                            setProductForm({ ...productForm, testimonialImages: updated });
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-[0.6rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Fotoğraf Yükle Butonu */}
                    <label className="w-16 h-16 sm:w-20 sm:h-20 rounded-none border-2 border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 flex flex-col items-center justify-center cursor-pointer transition-all shrink-0">
                      <HiOutlinePlus className="text-xl sm:text-2xl text-gold mb-0.5" />
                      <span className="text-[0.45rem] sm:text-[0.5rem] font-bold text-wine">SS EKLE</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                setProductForm({ 
                                  ...productForm, 
                                  testimonialImages: [...(productForm.testimonialImages || []), reader.result] 
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <span className="text-[0.55rem] text-taupe/40 font-medium">Kullanıcıların eğitim hakkındaki yorum ekran görüntülerini yükleyin. Eğitim detay sayfasında galeri olarak görünecek.</span>
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
