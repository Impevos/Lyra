export interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  buttonText: string;
  link: string;
  price?: string;
  section?: string;
  description?: string;
  type?: 'digital' | 'call' | 'external';
  priceType?: 'paid' | 'free';
  testimonialImages?: string[];
  badgeText?: string;
}

export interface ProfileData {
  name: string;
  brandName: string;
  bio: string;
  avatar: string;
  socials: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    email?: string;
    tiktok?: string;
  };
}

export const defaultProfile: ProfileData = {
  name: 'Deniz Bayraktar',
  brandName: 'LYRA ON EARTH',
  bio: 'Spiritüel farkındalık ve kişisel dönüşüm araçları.',
  avatar: '/deniz_bayraktar.jpeg',
  socials: {
    instagram: 'https://instagram.com/lyraonearth',
    youtube: 'https://www.youtube.com/@denizzbayraktar',
    spotify: 'https://open.spotify.com/',
    email: 'mailto:info@lyraonearth.com',
  },
};

export const defaultProducts: ProductItem[] = [
  {
    id: '1',
    title: 'Eye Am Nova',
    tagline: 'Bilinçaltı yeniden kodlama ve frekans yükseltme portalı.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Portala Giriş Yap',
    link: '/p/1',
    price: 'Görüşme ile',
    priceType: 'paid',
    section: 'main',
    type: 'call',
    description: 'Zihnin ötesine geçmek, egonun sınırlarını aşmak ve kendi öz frekansınızla uyumlanmak için tasarlanmış derinlemesine bir dönüşüm portalı. Bilinçaltı yeniden kodlama pratikleri, galaktik frekans meditasyonları ve yüksek benliğinizle doğrudan temas kurma çalışmaları.',
  },
  {
    id: '2',
    title: 'MasterSoul',
    tagline: 'Kendi realitenizin yaratıcısı olmayı öğrenin.',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Kendi Ustalığına Adım At',
    link: '/p/2',
    price: 'Görüşme ile',
    priceType: 'paid',
    section: 'main',
    type: 'call',
    description: 'Kendi realitenizin yaratıcısı olmayı öğrenmek ve bilinç evrelerinde profesyonel düzeyde derinleşmek isteyenler için hazırlanan uzun soluklu akademi programı. Zihinsel kodlamalardan spiritüel yasalara, enerji mekaniklerinden kanal bilgilerine kadar en derin öğretiler.',
  },
  {
    id: '3',
    title: 'Lyra Starseed',
    tagline: 'Yıldız tohumu kökeninizi ve galaktik kontratınızı keşfedin.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Galaktik Kökenini Keşfet',
    link: '/p/3',
    price: '1.200 ₺',
    priceType: 'paid',
    section: 'main',
    type: 'digital',
    description: 'Yıldız tohumu (Starseed) kimliğinizi, ruhunuzun dünya dışı enkarnasyon geçmişini ve bu yaşamdaki galaktik yaşam misyonunuzu keşfetmeye yönelik özel bir çalışma. Hangi galaktik sistemlerle (Sirius, Pleiades, Arcturus vb.) rezonans halinde olduğunuzu ve bu enerjiyi dünyada nasıl tezahür ettireceğinizi öğrenin.',
  },
  {
    id: '4',
    title: '1:1 Çalışma',
    tagline: 'Birebir seanslarla blokajları aşın ve yüksek bilincinizle hizalanın.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Birebir Çalışma Başvurusu',
    link: '/p/4',
    price: 'Görüşme ile',
    priceType: 'paid',
    section: 'main',
    type: 'call',
    description: 'Hayatınızın herhangi bir alanında yaşadığınız tıkanıklıklar, enerjisel blokajlar ve uyanış süreçleriniz üzerine birebir danışmanlık ve derin frekans çalışması. Tamamen sizin hızınıza ve ihtiyaçlarınıza göre şekillenen özel meditasyonlar ve bilinçaltı rehberliği seansları.',
  },
  {
    id: '5',
    title: '1 Saat',
    tagline: '60 dakikalık yoğunlaştırılmış ruhsal analiz ve yönlendirmeli seans.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Seans Planla',
    link: '/p/5',
    price: 'Görüşme ile',
    priceType: 'paid',
    section: 'main',
    type: 'call',
    description: 'Deniz Bayraktar ile 60 dakika boyunca canlı görüntülü olarak gerçekleştireceğiniz ruhsal analiz seansı. Hayatınızda tıkanmış hissettiğiniz alanlar, karar anları veya spiritüel sorgulamalarınız için doğrudan sorularınıza yanıt bulabileceğiniz, enerjisel dengelenme sağlayan özel bir çalışma.',
  },
  {
    id: '6',
    title: 'Aylık Paket',
    tagline: '4 hafta boyunca yakın takipli, özel frekans ve ödev programlı değişim süreci.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Aylık Pakete Başvur',
    link: '/p/6',
    price: 'İletişime Geçin',
    priceType: 'paid',
    section: 'main',
    type: 'call',
    description: '4 hafta süren, her hafta canlı seanslar, günlük motivasyon takibi, özel ödevler ve size özel meditasyon/frekans programları içeren premium dönüşüm süreci. Hayatınızda köklü bir kuantum sıçraması yapmanızı hedefler.',
  },
  {
    id: '7',
    title: '7 Günlük Bilinç Günlüğü',
    tagline: 'Zihinsel kodlarınızı fark edin ve serbest bırakın.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Hemen İndir',
    link: '/p/7',
    price: 'Ücretsiz',
    priceType: 'free',
    section: 'main',
    type: 'digital',
    description: 'Bilinçaltınızdaki sınırlayıcı inanç kalıplarını ve zihinsel blokajları 7 günlük pratik yazma egzersizleriyle açığa çıkarın. Kendinizle daha derin bir dürüstlük bağı kurmanızı sağlayacak farkındalık sorularını içeren ücretsiz çalışma kitabı.',
  },
  {
    id: '8',
    title: 'Temel Aura Arındırma Ritüeli',
    tagline: 'Negatif enerjileri şifalandıran günlük pratikler.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    buttonText: 'Ritüeli İndir',
    link: '/p/8',
    price: 'Ücretsiz',
    priceType: 'free',
    section: 'main',
    type: 'digital',
    description: 'Günlük yaşamda auranızda biriken yabancı enerjileri arındırmak, enerji sınırlarınızı güçlendirmek ve çakralarınızı hizalamak için uygulayabileceğiniz basit ama son derece etkili nefes ve görselleştirme ritüelleri.',
  }
];

export const getProfile = (): ProfileData => {
  if (typeof window === 'undefined') return defaultProfile;
  const saved = localStorage.getItem('custom_profile');
  if (saved) return { ...defaultProfile, ...JSON.parse(saved) };
  return defaultProfile;
};

export const saveProfile = (profile: ProfileData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_profile', JSON.stringify(profile));
  }
};

export const getProducts = (): ProductItem[] => {
  if (typeof window === 'undefined') return defaultProducts;
  const saved = localStorage.getItem('custom_products');
  let products: ProductItem[] = saved ? JSON.parse(saved) : defaultProducts;
  
  // Force clean old mock products if they exist in localStorage cache
  const hasOldProducts = products.some(p => p.title === 'Birebir Yayınlar' || p.title === 'Grup Yayınlar');
  if (hasOldProducts) {
    localStorage.removeItem('custom_products');
    products = defaultProducts;
  }
  
  // Make sure new default products are also present
  const savedIds = new Set(products.map(p => p.id));
  const missingDefaults = defaultProducts.filter(p => !savedIds.has(p.id));
  if (missingDefaults.length > 0) {
    products = [...products, ...missingDefaults];
  }
  
  // Sort products: paid offers first, free offers at the end
  const paid = products.filter((p) => p.priceType !== 'free');
  const free = products.filter((p) => p.priceType === 'free');
  return [...paid, ...free];
};

export const saveProducts = (products: ProductItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_products', JSON.stringify(products));
  }
};

export interface FeaturedVideoItem {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  duration?: string;
}

export const defaultVideos: FeaturedVideoItem[] = [
  {
    id: 'v1',
    title: 'Ruhsal Uyanışın Belirtileri: Aydınlanma Yolculuğu',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=400',
    youtubeUrl: 'https://www.youtube.com/@denizzbayraktar',
    duration: '14:22',
  },
  {
    id: 'v2',
    title: 'Günlük Meditasyon Ritüeli ve Çakra Dengeleme',
    thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
    youtubeUrl: 'https://www.youtube.com/@denizzbayraktar',
    duration: '08:45',
  },
  {
    id: 'v3',
    title: 'Bilinçaltı Blokajları Nasıl Çözülür?',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    youtubeUrl: 'https://www.youtube.com/@denizzbayraktar',
    duration: '18:10',
  },
];

export const getVideos = (): FeaturedVideoItem[] => {
  if (typeof window === 'undefined') return defaultVideos;
  const saved = localStorage.getItem('custom_videos');
  if (saved) return JSON.parse(saved);
  return defaultVideos;
};

export const saveVideos = (videos: FeaturedVideoItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_videos', JSON.stringify(videos));
  }
};

export interface AppointmentData {
  id: string;
  productId: string;
  productTitle: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  date: string;
  time: string;
  createdAt: string;
  expectations?: string;
  aboutSelf?: string;
}

export const getAppointments = (): AppointmentData[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('custom_appointments');
  if (saved) return JSON.parse(saved);
  return [];
};

export const saveAppointment = (appointment: Omit<AppointmentData, 'id' | 'createdAt'>) => {
  if (typeof window !== 'undefined') {
    const appointments = getAppointments();
    const newAppointment: AppointmentData = {
      ...appointment,
      id: 'ap_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('custom_appointments', JSON.stringify([...appointments, newAppointment]));
  }
};

export const checkDuplicateFreeRegistration = (email: string, phone: string, instagram: string): boolean => {
  if (typeof window === 'undefined') return false;
  const appointments = getAppointments();
  const products = getProducts();
  const freeProductIds = new Set(products.filter(p => p.priceType === 'free').map(p => p.id));
  
  const freeAppointments = appointments.filter(a => freeProductIds.has(a.productId));
  
  const normalizeIg = (ig: string) => ig.replace(/^@/, '').toLowerCase().trim();
  const normalizePhone = (ph: string) => ph.replace(/\s+/g, '').replace(/[^0-9+]/g, '').trim();
  const normalizeEmail = (em: string) => em.toLowerCase().trim();
  
  return freeAppointments.some(a => {
    if (email && a.email && normalizeEmail(a.email) === normalizeEmail(email)) return true;
    if (phone && a.phone && normalizePhone(a.phone) === normalizePhone(phone)) return true;
    if (instagram && a.instagram && normalizeIg(a.instagram) === normalizeIg(instagram)) return true;
    return false;
  });
};

export const deleteAppointment = (id: string) => {
  if (typeof window !== 'undefined') {
    const appointments = getAppointments();
    localStorage.setItem('custom_appointments', JSON.stringify(appointments.filter((a) => a.id !== id)));
  }
};

export interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password?: string;
}

export interface ScheduledEmail {
  id: string;
  targetType: 'all' | 'product' | 'specific';
  targetValue: string;
  subject: string;
  body: string;
  scheduleType: 'one-time' | 'recurring';
  scheduleValue: string;
  status: 'active' | 'paused' | 'sent';
  createdAt: string;
  triggerType?: 'manual' | 'on_purchase';
}

export interface SentEmailLog {
  id: string;
  to: string;
  subject: string;
  sentAt: string;
  status: 'success' | 'failed';
  error?: string;
}

export const getSmtpSettings = (): SmtpSettings => {
  const defaultSettings: SmtpSettings = {
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    user: 'info@lyraonearth.com',
  };
  if (typeof window === 'undefined') return defaultSettings;
  const saved = localStorage.getItem('custom_smtp_settings');
  if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  return defaultSettings;
};

export const saveSmtpSettings = (settings: SmtpSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_smtp_settings', JSON.stringify(settings));
  }
};

export const getScheduledEmails = (): ScheduledEmail[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('custom_scheduled_emails');
  if (saved) return JSON.parse(saved);
  return [
    {
      id: 'se_1',
      targetType: 'all',
      targetValue: 'all',
      subject: 'Lyra On Earth: Uyanış Yolculuğuna Hoş Geldiniz ✨',
      body: 'Merhaba,\n\nLyra On Earth uyanış portalına katıldığınız için teşekkür ederiz. Sizin için en doğru enerjisel yol haritasını çizmek ve hayatınızdaki tıkanıklıkları açmak üzere buradayız.\n\nİlk seans hazırlığı olarak son YouTube videomu izlemeyi ve sakinleşme meditasyonunu yapmayı unutmayın.\n\nSevgiler,\nDeniz Bayraktar',
      scheduleType: 'recurring',
      scheduleValue: 'Her Pazartesi 09:00',
      status: 'active',
      createdAt: new Date().toISOString(),
      triggerType: 'manual'
    },
    {
      id: 'se_2',
      targetType: 'all',
      targetValue: 'all',
      subject: 'Siparişiniz Alındı - Lyra On Earth ✨',
      body: 'Merhaba,\n\nSatın alma işleminiz başarıyla tamamlanmıştır. Hizmet/Eğitim detaylarına erişim bilgileriniz ve ilgili dökümanlar yakında sizinle paylaşılacaktır.\n\nIşık ve sevgiyle,\nLyra On Earth',
      scheduleType: 'one-time',
      scheduleValue: 'Anında',
      status: 'active',
      createdAt: new Date().toISOString(),
      triggerType: 'on_purchase'
    }
  ];
};

export const saveScheduledEmails = (emails: ScheduledEmail[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_scheduled_emails', JSON.stringify(emails));
  }
};

export const deleteScheduledEmail = (id: string) => {
  if (typeof window !== 'undefined') {
    const emails = getScheduledEmails();
    saveScheduledEmails(emails.filter((e) => e.id !== id));
  }
};

export const getSentEmailLogs = (): SentEmailLog[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('custom_sent_email_logs');
  if (saved) return JSON.parse(saved);
  return [];
};

export const saveSentEmailLog = (log: Omit<SentEmailLog, 'id' | 'sentAt'>) => {
  if (typeof window !== 'undefined') {
    const logs = getSentEmailLogs();
    const newLog: SentEmailLog = {
      ...log,
      id: 'log_' + Math.random().toString(36).substr(2, 9),
      sentAt: new Date().toISOString()
    };
    localStorage.setItem('custom_sent_email_logs', JSON.stringify([newLog, ...logs]));
  }
};

export const clearSentEmailLogs = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('custom_sent_email_logs');
  }
};
