import { supabase } from '@/lib/supabase';

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
  downloadUrl?: string;
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
    id: 'eye-am-nova',
    title: 'EYE AM NOVA',
    tagline: 'Dişil ve eril enerjilerin birleşimine dayanan, kişinin kendisini iddia ve ilan etmesini destekleyen, Antik Mısır öğretileri ışığında tasarlanmış 3 aylık dönüşüm portalı.',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600',
    buttonText: 'Dönüşüm Yolculuğuna Başla',
    link: '/p/eye-am-nova',
    price: '2.500 TL',
    priceType: 'paid',
    section: 'main',
    type: 'digital',
    description: 'Eye am Nova, bilincin gözü (Eye) ile durdurulamaz enerjiyi (Nova) birleştiren 3 aylık bir dönüşüm programıdır. Kendini var etme, görünür olabilme ve görünmez zincirleri kırabilme üzerine çalışmalar içerir. Program 3 modülden oluşur: 1) Egoyu Çözmek — gölge kimlikler, içsel çocuklar, öz sabotaj, 2) İçsel Egemenlik — eril ve dişil prensipler, kral ve kraliçe öğretileri, güvenli alan yaratma, 3) Dragon Ride — paralel hayatlarla bağ kurma, biliç parçalarını bütünleme, insan olmayı onurlandırma. Haftada 1 Zoom grup dersi, 2 haftada 1 entegrasyon pratiği, 4 haftada 1 bireysel görüşme/seans. Toplam 18 grup dersi ve 3 bireysel görüşme.',
    badgeText: '3 Aylık Program · 17 Ağustos',
  },
  {
    id: 'mastersoul',
    title: 'MASTERSOUL',
    tagline: '90 günde, yavaş yavaş değil derinlemesine. Sıkıştığını hissediyorsan, Mastersoul tam da o nokta için tasarlandı.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600',
    buttonText: 'Özel Grupta Yerini Ayırt',
    link: '/p/mastersoul',
    price: '2.500 TL',
    priceType: 'paid',
    section: 'main',
    type: 'digital',
    description: 'Mastersoul, 90 günlük yapılandırılmış bir master içsel dönüşüm programıdır. 3 Kapı\'dan oluşur: 1. Kapı — Masumiyete Dönüş: Kalp ve öz otorite, gölge yönleri görme, affetme, utanç simyası, içsel çocuk, adet kanı mistisizmi, kutsal öfke ve cinsel ateş. 2. Kapı — Gerçeklikle Oynamak: Kuantum evren prensipleri, akaşik kayıtlar, aura anatomisi, yüksek benlik rehberliği, paralel hayat etkisi, kutsal geometri, demonoloji, manifest ilkeleri. 3. Kapı — Kendini Kazanmak: Koşulsuz kendini sevme, ego saygısı, self sabotage döngüleri, atalarla bağlantı, derin empati, bırakma sanatı, yeniden doğuş. Her ay 8 ders (4 bilgi + 4 entegrasyon) ve bireysel seanslar. 10–15 kişilik kontenjan.',
    badgeText: 'Sınırlı Kontenjan · 10-15 Kişi',
  },
  {
    id: 'dark-mother-kali',
    title: 'GODDESS KALI: DARK MOTHER',
    tagline: 'Kali yalnızca mitolojik bir figür değil, dünyanın şu an en çok ihtiyaç duyduğu bilinç düzeyidir. İçinizdeki kozmik dişil gücü uyandırın.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    buttonText: 'Ücretsiz İndir',
    link: '/p/dark-mother-kali',
    price: 'Ücretsiz',
    priceType: 'free',
    section: 'main',
    type: 'digital',
    description: 'Kali, varolan en düşük boyutta uyandırılmış dişil enerjiyi simgeler — tüm kadınların ve erkeklerin içindeki ultimate form shakti. Kali Yuga çağında gerçeğin önündeki yalanların yıkıldığı bu dönemde, Kali sizin müttefiğinizdir. Egoyu eritir, gerçek ruh kimliğinizle uyumlu yeni bir yapı inşa etmenize yardımcı olur. Yıkım tanrıçası olduğu kadar yeniden doğuş tanrıçasıdır. Mantra pratikleri (Om Krim Kali Namaha, Jai Kali Ma) ve Kali ile çalışma rehberi içerir. Teslimiyet, güven, saygı ve mütevazilik ile bu kozmik güce kapı açın.',
    downloadUrl: '/dark-mother-kali.pdf',
    badgeText: 'Ücretsiz Rehber',
  },
  {
    id: 'soru-cevap',
    title: 'SORU CEVAP: BİLİNÇ VE YARATIM',
    tagline: 'Birlik bilinci, ruhun özgünlüğü ve "Ol der ve olur" prensipleri üzerine derinlikli sorular ve şeffaf yanıtlar.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    buttonText: 'Ücretsiz İndir',
    link: '/p/soru-cevap',
    price: 'Ücretsiz',
    priceType: 'free',
    section: 'main',
    type: 'digital',
    description: 'Lyra On Earth bakış açısıyla hazırlanmış aydınlatıcı soru-cevap serisi. "Hepimiz tek bir öze bağlıysak, gerçekten var mıyız?" sorusundan "Yaradan neden deneyimlemek istiyor?" ve "Ol derim ve olur mu?" gibi derin sorulara yanıtlar. Ruhun parmak izi (soul blueprint), shared consciousness, co-creation, tanrıyla ortak yaratım, paralel hayatlar ve bilinçaltı blokajları üzerine samimi ve pratik bir rehber. Deniz Bayraktar\'ın kendi deneyimlerinden yola çıkarak hazırladığı bu kaynak, merakla başlayan ve huzurla biten bir farkındalık yolculuğu sunar.',
    downloadUrl: '/soru-cevap.pdf',
    badgeText: 'Ücretsiz Rehber',
  }
];

export const getProfile = async (): Promise<ProfileData> => {
  try {
    const { data, error } = await supabase.from('profile').select('*').eq('id', 'default').single();
    if (error && error.code !== 'PGRST116') {
      console.warn('Supabase getProfile error:', error);
      return defaultProfile;
    }
    if (data) {
      return { ...defaultProfile, ...data };
    }
  } catch (err) {
    console.warn(err);
  }
  return defaultProfile;
};

export const saveProfile = async (profile: ProfileData) => {
  try {
    const sanitizedProfile = {
      id: 'default',
      name: profile.name,
      brandName: profile.brandName,
      bio: profile.bio,
      avatar: profile.avatar,
      socials: profile.socials
    };
    const { error } = await supabase.from('profile').upsert(sanitizedProfile);
    if (error) {
      console.error('Supabase saveProfile error:', error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const saveProduct = async (prod: ProductItem) => {
  try {
    const sanitizedProd = {
      id: prod.id || Math.random().toString(36).substr(2, 9),
      title: prod.title || 'İsimsiz Ürün',
      tagline: prod.tagline || '',
      image: prod.image || '',
      buttonText: prod.buttonText || '',
      link: prod.link || `/p/${prod.id}`,
      price: prod.price || '',
      section: prod.section || 'main',
      description: prod.description || '',
      type: prod.type || 'digital',
      priceType: prod.priceType || 'paid',
      testimonialImages: prod.testimonialImages || [],
      badgeText: prod.badgeText || (prod as any).badge || null,
      downloadUrl: prod.downloadUrl || null
    };
    const { error } = await supabase.from('products').upsert(sanitizedProd);
    if (error) {
      console.error('Supabase saveProduct error on item:', prod.id, error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const saveProducts = async (products: ProductItem[]) => {
  try {
    for (const prod of products) {
      if (!prod) continue;
      await saveProduct(prod);
    }
  } catch (err) {
    console.error('saveProducts error:', err);
    throw err;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteProduct error on item:', id, error);
      throw error;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProducts = async (): Promise<ProductItem[]> => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.warn('Supabase getProducts error:', error);
      return defaultProducts;
    }
    if (data && data.length > 0) {
      const paid = data.filter((p: ProductItem) => p.priceType !== 'free');
      const free = data.filter((p: ProductItem) => p.priceType === 'free');
      return [...paid, ...free];
    }
    // If Supabase products table is empty (0 rows), auto-seed with defaultProducts
    if (data && data.length === 0) {
      console.log('Supabase products empty, auto-seeding defaultProducts...');
      await saveProducts(defaultProducts);
      return defaultProducts;
    }
  } catch (err) {
    console.warn(err);
  }
  return defaultProducts;
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

export const getAppointments = async (): Promise<AppointmentData[]> => {
  let list: AppointmentData[] = [];

  // 1. Try fetching from Supabase appointments table
  try {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      list = data.map((d: any) => ({
        id: d.id,
        productId: d.product_id,
        productTitle: d.product_title,
        name: d.name,
        email: d.email,
        phone: d.phone,
        instagram: d.instagram,
        date: d.date,
        time: d.time,
        createdAt: d.created_at,
        expectations: d.expectations,
        aboutSelf: d.about_self
      }));
    }
  } catch (err) {
    // Non-blocking fallback
  }

  // 2. Also include registrations from Supabase orders table
  try {
    const { data: orderData, error: orderError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!orderError && orderData && orderData.length > 0) {
      const existingIds = new Set(list.map(a => a.id));
      const existingEmailAndProduct = new Set(list.map(a => `${a.email}_${a.productId}`));

      for (const ord of orderData) {
        const key = `${ord.customer_email}_${ord.product_id}`;
        if (!existingIds.has(ord.merchant_oid) && !existingEmailAndProduct.has(key)) {
          list.push({
            id: ord.merchant_oid || ord.id,
            productId: ord.product_id || '',
            productTitle: ord.product_title || 'Sipariş / Kayıt',
            name: ord.customer_name || '',
            email: ord.customer_email || '',
            phone: ord.customer_phone || '',
            instagram: '',
            date: new Date(ord.created_at).toLocaleDateString('tr-TR'),
            time: new Date(ord.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            createdAt: ord.created_at,
          });
          existingEmailAndProduct.add(key);
        }
      }
    }
  } catch (err) {
    // Non-blocking fallback
  }

  // 3. Merge with localStorage appointments to ensure nothing is missed
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('custom_appointments');
      if (saved) {
        const localList: AppointmentData[] = JSON.parse(saved);
        const existingKeys = new Set(list.map(a => `${a.email}_${a.productId}`));
        for (const item of localList) {
          if (!existingKeys.has(`${item.email}_${item.productId}`)) {
            list.push(item);
          }
        }
      }
    } catch (e) {
      console.warn('localStorage getAppointments failed', e);
    }
  }

  return list;
};

export const saveAppointment = async (appointment: Omit<AppointmentData, 'id' | 'createdAt'>) => {
  const newAppointment: AppointmentData = {
    ...appointment,
    id: 'ap_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };

  // 1. Save to localStorage for instant local availability
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('custom_appointments');
      const currentList = saved ? JSON.parse(saved) : [];
      localStorage.setItem('custom_appointments', JSON.stringify([...currentList, newAppointment]));
    } catch (e) {
      console.warn('localStorage saveAppointment failed', e);
    }
  }

  // 2. Persist customer registration to Supabase orders table
  try {
    const { error: orderError } = await supabase.from('orders').insert({
      merchant_oid: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      product_id: appointment.productId,
      product_title: appointment.productTitle,
      customer_name: appointment.name,
      customer_email: appointment.email,
      customer_phone: appointment.phone || appointment.instagram || '',
      amount: 0,
      status: 'completed'
    });
    if (orderError) console.warn('Supabase orders lead insert warning:', orderError);
  } catch (err) {
    console.warn('Could not save customer to orders table:', err);
  }

  // 3. Persist to Supabase appointments table if created
  try {
    const { error: apptError } = await supabase.from('appointments').insert({
      id: newAppointment.id,
      product_id: newAppointment.productId,
      product_title: newAppointment.productTitle,
      name: newAppointment.name,
      email: newAppointment.email,
      phone: newAppointment.phone,
      instagram: newAppointment.instagram,
      date: newAppointment.date,
      time: newAppointment.time,
      expectations: newAppointment.expectations || null,
      about_self: newAppointment.aboutSelf || null,
    });
    if (apptError && !apptError.message.includes('Could not find')) {
      console.warn('Supabase appointments insert warning:', apptError);
    }
  } catch (err) {
    // Graceful fallback if table is not yet created in Supabase
  }

  return newAppointment;
};

export const checkDuplicateFreeCall = async (email: string, phone: string, instagram: string): Promise<boolean> => {
  const normalizeIg = (ig: string) => ig ? ig.replace(/^@/, '').toLowerCase().trim() : '';
  const normalizePhone = (ph: string) => ph ? ph.replace(/\s+/g, '').replace(/[^0-9+]/g, '').trim() : '';
  const normalizeEmail = (em: string) => em ? em.toLowerCase().trim() : '';

  const cleanEmail = normalizeEmail(email);
  const cleanPhone = normalizePhone(phone);
  const cleanIg = normalizeIg(instagram);

  const products = await getProducts();
  const freeCallProductIds = new Set(
    products
      .filter(p => p.priceType === 'free' && p.type === 'call')
      .map(p => p.id)
  );

  // If there are no free call products configured, nothing is blocked
  if (freeCallProductIds.size === 0) {
    return false;
  }

  // 1. Check Supabase orders table
  try {
    const { data: orders } = await supabase.from('orders').select('*');
    if (orders && orders.length > 0) {
      const hasDuplicateOrder = orders.some((ord: any) => {
        if (!freeCallProductIds.has(ord.product_id)) return false;
        if (cleanEmail && ord.customer_email && normalizeEmail(ord.customer_email) === cleanEmail) return true;
        if (cleanPhone && ord.customer_phone && normalizePhone(ord.customer_phone) === cleanPhone) return true;
        return false;
      });
      if (hasDuplicateOrder) return true;
    }
  } catch (err) {
    console.warn('Supabase checkDuplicateFreeCall order check warning:', err);
  }

  // 2. Check Supabase appointments table
  try {
    const { data: appts } = await supabase.from('appointments').select('*');
    if (appts && appts.length > 0) {
      const hasDuplicateAppt = appts.some((a: any) => {
        if (!freeCallProductIds.has(a.product_id)) return false;
        if (cleanEmail && a.email && normalizeEmail(a.email) === cleanEmail) return true;
        if (cleanPhone && a.phone && normalizePhone(a.phone) === cleanPhone) return true;
        if (cleanIg && a.instagram && normalizeIg(a.instagram) === cleanIg) return true;
        return false;
      });
      if (hasDuplicateAppt) return true;
    }
  } catch (err) {
    // Non-blocking
  }

  // 3. Check localStorage appointments
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('custom_appointments');
      if (saved) {
        const localAppts: AppointmentData[] = JSON.parse(saved);
        const hasDuplicateLocal = localAppts.some(a => {
          if (!freeCallProductIds.has(a.productId)) return false;
          if (cleanEmail && a.email && normalizeEmail(a.email) === cleanEmail) return true;
          if (cleanPhone && a.phone && normalizePhone(a.phone) === cleanPhone) return true;
          if (cleanIg && a.instagram && normalizeIg(a.instagram) === cleanIg) return true;
          return false;
        });
        if (hasDuplicateLocal) return true;
      }
    } catch (e) {}
  }

  return false;
};

// Kept as alias for backwards compatibility
export const checkDuplicateFreeRegistration = checkDuplicateFreeCall;

export const deleteAppointment = async (id: string) => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('custom_appointments');
      if (saved) {
        const appointments: AppointmentData[] = JSON.parse(saved);
        localStorage.setItem('custom_appointments', JSON.stringify(appointments.filter((a) => a.id !== id)));
      }
    } catch (e) {}
  }
  try {
    await supabase.from('appointments').delete().eq('id', id);
  } catch (e) {}
  try {
    await supabase.from('orders').delete().or(`merchant_oid.eq.${id},id.eq.${id}`);
  } catch (e) {}
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
      subject: 'Kaydınız Alındı ✨ - Lyra On Earth',
      body: 'Merhaba,\n\nLyra On Earth bünyesindeki program ve eğitimlerimize kaydınız başarıyla tamamlanmıştır.\n\nSürecin sonraki adımları, canlı oturum bağlantıları, ilgili çalışma dokümanları ve erişim detayları en kısa sürede bu e-posta adresiniz üzerinden sizinle paylaşılacaktır.\n\nHerhangi bir sorunuz veya danışmak istediğiniz bir husus olursa @lyra.onearth Instagram hesabımızdan veya info@lyraonearth.com üzerinden bize dilediğiniz an ulaşabilirsiniz.\n\nIşık ve sevgiyle,\nDeniz Bayraktar — Lyra On Earth',
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
