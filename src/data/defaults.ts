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

export interface FeaturedVideoItem {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  duration?: string;
}

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

export interface SiteContent {
  // 1. Üst Duyuru Çubuğu
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkUrl: string;
  };

  // 2. Hero Bölümü
  hero: {
    badge: string;
    editionText: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    philosophyQuote: string;
    pills: string[];
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    trustBadges: string[];
    founderCardTitle: string;
    founderCardQuote: string;
  };

  // 3. Sayaç (Countdown)
  countdown: {
    enabled: boolean;
    title: string;
    targetDate: string; // ISO veya gün sayısı
    subtitle: string;
  };

  // 4. Kayan Yazı (Values Ticker)
  tickerItems: string[];

  // 5. İstatistikler (4'lü Kart)
  stats: Array<{
    number: string;
    label: string;
    desc: string;
  }>;

  // 6. Deniz Bayraktar / Kurucu & Rehber Bölümü
  founder: {
    eyebrow: string;
    name: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    quote: string;
    principles: Array<{
      number: string;
      title: string;
      desc: string;
    }>;
  };

  // 7. Dönüşümün Üç Kadim Kapısı
  gatesSection: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    desc: string;
    gates: Array<{
      gateNumber: string;
      phaseBadge: string;
      title: string;
      subtitle: string;
      description: string;
      topics: string[];
      resultText: string;
    }>;
  };

  // 8. Hizalanma / Kimler İçin Uygun?
  alignmentSection: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    desc: string;
    forYou: {
      badge: string;
      title: string;
      items: string[];
      conclusion: string;
    };
    notForYou: {
      badge: string;
      title: string;
      items: string[];
      conclusion: string;
    };
    banner: {
      eyebrow: string;
      quote: string;
      desc: string;
      buttonText: string;
      buttonLink: string;
    };
  };

  // 9. Portallar Başlığı
  portalsHeader: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    viewAllText: string;
  };

  // 10. Ücretsiz Kütüphane Başlığı
  libraryHeader: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    desc: string;
  };

  // 11. Medya & Yayınlar Başlığı
  mediaHeader: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    youtubeChannelUrl: string;
    youtubeButtonText: string;
  };

  // 12. Katılımcı Yorumları
  testimonialsSection: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    desc: string;
    items: Array<{
      id: string;
      rating: number;
      text: string;
      author: string;
      title: string;
    }>;
  };

  // 13. SSS (Sıkça Sorulan Sorular)
  faqSection: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };

  // 14. Footer Bilgileri
  footer: {
    brandName: string;
    brandSub: string;
    companyTitle: string;
    address: string;
    email: string;
    copyright: string;
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
    tagline: 'Dişil ve eril enerjilerin birleşimine dayanan, potansiyelin bilinç ile buluşup durdurulamaz bir güç oluşturduğu, kişinin kendini iddia ve ilan etmesini sağlayan 3 aylık dönüşüm portalı.',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600',
    buttonText: 'Dönüşüm Yolculuğuna Başla',
    link: '/p/eye-am-nova',
    price: '2.500 TL',
    priceType: 'paid',
    section: 'main',
    type: 'digital',
    description: 'Eye am Nova, bilincin gözü (Eye) ile durdurulamaz enerjiyi (Nova) birleştiren 3 aylık bir dönüşüm programıdır. Potansiyel ile Bilinç birleştiğinde Matrix\'in kodları hükümsüz kalır ve gerçek egemenlik başlar. Program 3 modülden oluşur: 1) Egoyu Çözmek — gölge kimlikler, içsel çocuklar, içsel karadelikler ve quasarlar, öz sabotajı yok etme, 2) İçsel Egemenlik — eril ve dişil prensipler, kral ve kraliçe kadim öğretileri, güvenli alan yaratma, 3) Dragon Ride — paralel hayatlarla bağ kurma, içsel solucan delikleri, bilinç parçalarını bütünleme, insan olmayı onurlandırma. Haftada 1 Zoom grup dersi, 2 haftada 1 entegrasyon pratiği, 4 haftada 1 bireysel görüşme/seans. Toplam 18 grup dersi ve 3 bireysel görüşme.',
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
    description: 'Mastersoul, 90 günlük yapılandırılmış bir master içsel dönüşüm programıdır. Compassion, Knowledge, Peace felsefesiyle 3 Kapı\'dan oluşur: 1. Kapı — Masumiyete Dönüş: Kalp ve öz otorite, gölge yönleri görmek, affetmek, utanç ve suçluluk yüklerini dönüştürmek, içsel çocuk, kutsal öfke ve cinsel ateşi öz-değere akıtmak, sensual beden ve özgürlük, sıfır noktası. 2. Kapı — Gerçeklikle Oynamak: Kuantum evren prensipleri, akaşik kayıtlara etki etmek ve anlaşma yazmak, aura anatomisi, yüksek benlik rehberliği, kutsal geometri (üçgen pratiği), şahitlik bilinci, şükür, manifest ilkeleri, dualite ötesi. 3. Kapı — Kendini Kazanmak: Koşulsuz performanssız kendini sevme, egoya saygı, self sabotage döngülerini kırmak, atalarla bağlantı ve yükleri bırakma, derin empati ve sınır koruma, kendini taşıyabilmek, bırakma sanatı, ışık frekansına adanmak, toprak ana bilinci. Her ay 8 ders (4 bilgi + 4 entegrasyon) ve bireysel seanslar. 10–15 kişilik kontenjan.',
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

export const defaultSiteContent: SiteContent = {
  announcement: {
    enabled: false,
    badge: 'YENİ',
    text: 'Yeni dönem dönüşüm programları kayıtları başlamıştır.',
    linkText: 'İncele',
    linkUrl: '#portallar'
  },
  hero: {
    badge: 'LYRA ON EARTH • 2026 DÖNÜŞÜM DÖNEMİ KAYITLARI',
    editionText: 'EDITION 2026 // LIVE +',
    titleLine1: 'Kendi Gerçekliğini',
    titleAccent: 'İddia ve İlan',
    titleLine2: 'Et.',
    philosophyQuote: 'Eye (Bilincin Gözü) ile Nova (Durdurulamaz Enerji) birleştiğinde; Matrix\'in kalıpları hükümsüz kalır ve gerçek içsel egemenlik başlar.',
    pills: [
      '✦ KUANTUM & ZİHİN YAPISI',
      '✦ ERİL & DİŞİL DENGE',
      '✦ SOUL BLUEPRINT'
    ],
    primaryButtonText: 'YERİNİ ŞİMDİ AYIRT →',
    primaryButtonLink: '#portallar',
    secondaryButtonText: 'BU YOLCULUK SANA UYGUN MU?',
    secondaryButtonLink: '#kimler-icin',
    trustBadges: [
      'BDDK Onaylı Güvenli Ödeme',
      '256-Bit SSL',
      'Sınırlı 12 Kişilik Grup'
    ],
    founderCardTitle: 'DENİZ BAYRAKTAR // LYRA ON EARTH',
    founderCardQuote: '“Potansiyel, Bilinç ile birleştiğinde Matrix\'in kodları hükümsüz kalır.”'
  },
  countdown: {
    enabled: true,
    title: 'KAYITLARIN KAPANMASINA KALAN SÜRE',
    targetDate: '',
    subtitle: 'Erken kayıt avantajları sınırlı kontenjan ile sunulmaktadır.'
  },
  tickerItems: [
    '90 GÜNLÜK MASTER DÖNÜŞÜM',
    '18+ CANLI İNİSİYASYON',
    'SOUL BLUEPRINT (RUH KİMLİĞİ)',
    'MASUMİYETE DÖNÜŞ & SIFIR NOKTASI',
    'GERÇEKLİKLE OYNAMAK & KUANTUM',
    'KENDİNİ KAZANMAK & BEDENLENME',
    'ERİL & DİŞİL PRENSİPLERİ',
    'DRAGON RIDE İNİSİYASYONU',
    'CO-CREATION (ORTAK YARATIM)',
    'COMPASSION • KNOWLEDGE • PEACE',
    'SINIRLI 12 KİŞİLİK KONTENJAN',
    'VİPASSANA & ŞAHİTLİK BİLİNCİ'
  ],
  stats: [
    { number: '90 GÜN', label: 'MASTER DÖNÜŞÜM DÖNEMİ', desc: 'Hücresel düzeyde kalıcı dönüşüm mimarisi' },
    { number: '18+', label: 'CANLI İNİSİYASYON', desc: 'Haftalık Zoom oturumları & interaktif alan' },
    { number: '12 KİŞİ', label: 'SINIRLI KONTENJAN', desc: 'Birebir ilgi ve yüksek frekans uyumu' },
    { number: '%100', label: 'ÖZGÜN RUHSAL MİMARİ', desc: 'Kuantum & Soul Blueprint hizalanması' }
  ],
  founder: {
    eyebrow: 'REHBER & KURUCU',
    name: 'DENİZ BAYRAKTAR',
    titleLine1: 'Egonun Kafesinden',
    titleAccent: 'Kaderinin Hakikatine',
    titleLine2: 'Geçiş.',
    quote: '“Geçmişin seni açıklayabilir, ama tanımlamak zorunda değil. Sen çırılçıplak ve kanlar içindeyken dahi, hala benim kutsal kadınımsın/erkeğimsin. Seni reddetmem, gerçek sen olmayan her şeyi yok ederim.”',
    principles: [
      {
        number: '01',
        title: 'EGONUN DÖNÜŞÜMÜ',
        desc: 'Ego bir düşman değil; soul blueprint ile uyumlandığında en sadık yol arkadaşıdır.'
      },
      {
        number: '02',
        title: 'KALBİN OTORİTESİ',
        desc: 'Kalp sadece hisseden değil; bilen ve liderlik eden gerçek varoluş merkezimizdir.'
      },
      {
        number: '03',
        title: 'ORTAK YARATIM',
        desc: 'Yüzeysel olumlamalar değil; tanrıyla co-creation ve bilinçli teslimiyet bilinci.'
      }
    ]
  },
  gatesSection: {
    eyebrow: '90 GÜNLÜK MASTER DÖNÜŞÜM STRÜKTÜRÜ',
    titleLine1: 'Dönüşümün',
    titleAccent: 'Üç Kadim',
    desc: 'Mastersoul ve Eye Am Nova müfredatlarında rastgele değil; zihinsel, hücresel ve enerjisel olarak yapılandırılmış 3 aşamalı inisiyasyon mimarisi.',
    gates: [
      {
        gateNumber: 'KAPI 01',
        phaseBadge: '1. AY · TEMEL',
        title: 'Masumiyete Dönüş',
        subtitle: 'Kalp & Öz Otorite — Kırık Kodları Temizlemek',
        description: 'Yüzeydeki olumlamalar bilinçaltına ulaşmaz. Artık iyileşmeye layık olmadığınızı düşündüren utancın ve geçmişin yüklerini sıfır noktasında eritiyoruz.',
        topics: [
          'Kalple Temas: AFFETMEK',
          'Utancı Dönüştürmek & Yükleri Bırakmak',
          'Kolektif Eril ve Dişili Affetmek',
          'Kutsal Öfkeyi Öz-Değere Akıtmak',
          'Sensual Beden & Masumiyet Güvenliği'
        ],
        resultText: 'Sonuç: İçsel gürültü susar, sıfır noktası deneyimlenir.'
      },
      {
        gateNumber: 'KAPI 02',
        phaseBadge: '2. AY · AKTİVASYON',
        title: 'Gerçeklikle Oynamak',
        subtitle: 'Kuantum & Zihin Yapısı — Gerçekliği Bilinçli Seçmek',
        description: 'İnsan olmanın bir zayıflık değil, büyük bir güç olduğunu keşfediyoruz. Kuantum evren mantığını somut fizik, matematik ve kutsal geometriyle zihne işliyoruz.',
        topics: [
          'Akaşik Kayıtlara Etki Etmek',
          'Kutsal Geometri & Üçgen Pratiği',
          'Aura Anatomisi & Yüksek Benlik',
          'Paralel Hayatlar & Manifestasyon',
          'Dualite Ötesi: İki Dünyada Var Olmak'
        ],
        resultText: 'Sonuç: Rastlantı illüzyonu biter, bilinçli yaratım başlar.'
      },
      {
        gateNumber: 'KAPI 03',
        phaseBadge: '3. AY · HÜKÜMRANLIK',
        title: 'Kendini Kazanmak',
        subtitle: 'Bedenlenme & Sürdürülebilirlik — Kalıcı Dönüşüm',
        description: 'Ego bir engel olmaktan çıkıp yol arkadaşına dönüşür. Kendinizi sabote etme döngüleri son bulur; bilginiz ve ışığınız günlük hayatın içine köklenir.',
        topics: [
          'Koşulsuz, Performanssız Kendini Sevmek',
          'Self-Sabotage Döngülerini Kırmak',
          'Atalarla Bağ & Taşımaya Yemin Ettiklerin',
          'Dragon Ride & Bilinç Bütünlüğü',
          'Bırakma Sanatı & Yeniden Doğuş'
        ],
        resultText: 'Sonuç: Kendinle savaş biter, tam egemenlik bedene oturur.'
      }
    ]
  },
  alignmentSection: {
    eyebrow: 'HİZALANMA & UYGUNLUK TESTİ',
    titleLine1: 'Bu Yolculuk',
    titleAccent: 'Kimin İçin?',
    desc: 'Lyra On Earth kapalı inisiyasyonları herkes için değil; yalnızca kendi hakikatini yaşamaya ve sorumluluk almaya hazır olanlar içindir.',
    forYou: {
      badge: 'UYGUN ADAY',
      title: 'Bu Yolculuk Sizin İçin, Eğer:',
      items: [
        'İçinizde çok daha büyük bir potansiyel olduğunu biliyor, ancak bunu hayatınıza ve üretiminize nasıl dökeceğinizi netleştirmek istiyorsanız.',
        'Yüzeysel olumlamalar veya geçici motivasyonlar yerine, köklü bilinçaltı çözülümü ve frekans sıçraması arıyorsanız.',
        'Egonun kurban, yetersizlik ve kendini erteleme döngülerinden çıkıp hayatınızın tam egemenliğini üstlenmeye hazırsanız.',
        'Deniz Bayraktar’ın 1-on-1 ve kapalı grup alanındaki güçlü inisiyasyonlarına açık, derin ve dönüştürücü bir rehberlik istiyorsanız.',
        'Ruhsal derinliğinizi dünyevi başarı, sağlıklı sınırlar ve bolluk akışıyla birleştirip görünür olmaya niyetliyseniz.'
      ],
      conclusion: '✓ Doğru yerdesiniz. Portallara katılarak ilk adımı atın.'
    },
    notForYou: {
      badge: 'UYGUN DEĞİL',
      title: 'Bu Yolculuk Size Göre Değil, Eğer:',
      items: [
        'İçsel çalışma ve yüzleşme sürecini tamamen atlayıp sihirli bir hap veya anlık dışsal formüller arıyorsanız.',
        'Kendi korkularınız, bastırılmış gölgeleriniz ve bilinçaltı sabotajlarınızla dürüstçe yüzleşmeye hazır değilseniz.',
        'Sadece dışarıdan ruhsal veya başarılı görünmek isteyip gerçek bir karakter devrimi yapmaya niyetli değilseniz.',
        'Dönüşümün emek, cesaret, süreklilik ve net kararlar gerektirdiğini kabul etmeye direnç gösteriyorsanız.',
        'Kendi yaşamınızın sorumluluğunu almak yerine sürekli dış koşulları ve geçmişi suçlamayı tercih ediyorsanız.'
      ],
      conclusion: '✗ Bu frekans ve disipline hazır hissetmiyorsanız başvurmayınız.'
    },
    banner: {
      eyebrow: 'DOĞRUDAN REHBERLİK & DENETİM',
      quote: '“Dönüşüm cesur bir karar ile başlar.”',
      desc: 'Eğer yukarıdaki kriterlerle hizalanıyorsan, kontenjanlar dolmadan yerini ayırt.',
      buttonText: 'PORTALLARI İNCELE & BAŞVUR →',
      buttonLink: '#portallar'
    }
  },
  portalsHeader: {
    eyebrow: 'BAŞYAPIT EĞİTİMLER',
    titleLine1: 'Dönüşüm',
    titleAccent: 'Portalları',
    viewAllText: 'TÜM TEKLİFLERİ GÖR'
  },
  libraryHeader: {
    eyebrow: 'KADİM KÜTÜPHANE',
    titleLine1: 'Ücretsiz',
    titleAccent: 'Rehberler & Metinler',
    desc: 'Ruhsal farkındalık ve kozmik bilgelik yolculuğunuzun ilk adımlarında size eşlik edecek ücretsiz rehber ve pratikler.'
  },
  mediaHeader: {
    eyebrow: 'FREKANS YAYINLARI',
    titleLine1: 'Seçkin',
    titleAccent: 'Video İnisiyasyonları',
    youtubeChannelUrl: 'https://www.youtube.com/@denizzbayraktar',
    youtubeButtonText: 'YOUTUBE KANALINA GİT'
  },
  testimonialsSection: {
    eyebrow: 'HAKİKİ DÖNÜŞÜMLER',
    titleLine1: 'Ruhun',
    titleAccent: 'Aynasından',
    desc: 'Deniz Bayraktar ile dönüşüm portalından geçen katılımcıların içsel sıçrama deneyimleri.',
    items: [
      {
        id: 't1',
        rating: 5,
        text: '“Eye am Nova ile hayatımda ilk kez sınır koymayı değil, sınırlarımın ötesindeki asıl gücümü ilan etmeyi öğrendim. Kurban bilincinden egemenlik bilincine geçiş paha biçilemezdi.”',
        author: 'ZEYNEP K.',
        title: 'EYE AM NOVA KATILIMCISI'
      },
      {
        id: 't2',
        rating: 5,
        text: '“Mastersoul 90 gün boyunca içimdeki tüm dirençleri, utancı ve sahte kimlikleri dönüştüren derin bir alan oldu. Deniz’in alanı tutuşu, kalbin otoritesini hatırlatışı ve bilgeliği Türkiye’de eşsiz.”',
        author: 'MELİSA A.',
        title: 'MASTERSOUL MASTERCLASS'
      },
      {
        id: 't3',
        rating: 5,
        text: '“Kali rehberini ve soru-cevap dosyasını okuduğum andan itibaren eril-dişil dengem ve olaylara tepkim kökten değişti. Hayatımda ilk defa kendimle savaşı bıraktım.”',
        author: 'BERRİN T.',
        title: 'KÜTÜPHANE OKUYUCUSU'
      }
    ]
  },
  faqSection: {
    eyebrow: 'MERAK EDİLENLER',
    titleLine1: 'Sıkça Sorulan',
    titleAccent: 'Sorular',
    items: [
      {
        q: 'Dönüşüm programlarına katılmak için önceden spiritüel bir deneyim gerekir mi?',
        a: 'Hayır, gerekmez. Gerek Eye Am Nova gerekse Mastersoul; egoyu bir düşman olmaktan çıkarıp Soul Blueprint ile uyumlu bir yol arkadaşına dönüştürmeyi, sinir sistemi dirençlerini aşmayı ve kuantum zihin yapısıyla gerçekliği bilinçli seçmeyi adım adım öğretir. İhtiyacınız olan tek şey; sürece açık olmak ve kendi potansiyelinizi iddia ve ilan etmeye niyet etmektir.'
      },
      {
        q: 'Oturumlar ve dersler nasıl gerçekleşiyor? Kaçırırsam kayıtları izleyebilir miyim?',
        a: 'Tüm grup dersleri ve inisiyasyon oturumları canlı olarak Zoom üzerinden gerçekleştirilir. Canlı yayına katılamasanız dahi tüm derslerin ses ve video kayıtları özel katılımcı portalına yüklenir ve program süresince sınırsız erişiminize sunulur.'
      },
      {
        q: 'Birebir seanslar ve randevular nasıl planlanıyor?',
        a: 'Program kapsamında veya bağımsız olarak alınan bireysel görüşmeler; sitemizdeki akıllı takvim üzerinden size ve rehberimize en uygun gün ve saat seçilerek otomatik olarak oluşturulur. Randevu onayınız ve Google Meet bağlantınız anında e-posta adresinize iletilir.'
      },
      {
        q: 'Ücretsiz rehberleri nasıl indirebilirim?',
        a: 'Kütüphanemizde bulunan "Dark Mother Kali" ve "Soru-Cevap & Bilinç" rehberlerine tıklayıp formunuzu doldurduğunuzda, PDF indirme bağlantısı hem ekranda belirir hem de anında e-posta adresinize gönderilir.'
      },
      {
        q: 'Ödeme altyapısı güvenli mi ve taksit imkanı var mı?',
        a: 'Tüm ödemeler BDDK lisanslı ve 256-bit SSL güvenlik sertifikalı PayTR altyapısı üzerinden güvenle gerçekleştirilir. Kredi kartı ile tek çekim veya anlaşmalı bankaların kartlarına taksit seçeneklerinden yararlanabilirsiniz.'
      }
    ]
  },
  footer: {
    brandName: 'LYRA',
    brandSub: 'ON EARTH',
    companyTitle: 'DENİZ BAYRAKTAR',
    address: 'Göztepe Mah. Batışehir Cad. Batışehir K Blok No: 2/2 İç Kapı No: 115 Bağcılar / İstanbul',
    email: 'info@lyraonearth.com',
    copyright: '© 2026 LYRA ON EARTH. TÜM HAKLARI SAKLIDIR.'
  }
};

// ============================================================================
// PROFILE API
// ============================================================================
export const getProfile = async (): Promise<ProfileData> => {
  try {
    const { data, error } = await supabase.from('profile').select('*').eq('id', 'default').single();
    if (error && error.code !== 'PGRST116') {
      console.warn('Supabase getProfile error:', error);
      return defaultProfile;
    }
    if (data) {
      return { 
        ...defaultProfile, 
        ...data,
        socials: data.socials ? { ...defaultProfile.socials, ...data.socials } : defaultProfile.socials
      };
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

// ============================================================================
// SITE CONTENT / CMS API (Supabase Persistent)
// ============================================================================
export const getSiteContent = async (): Promise<SiteContent> => {
  // 1. Try local cache first for instant layout render
  let cached: SiteContent | null = null;
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('lyra_site_content');
      if (local) cached = JSON.parse(local);
    } catch (e) {}
  }

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', 'site_content')
      .single();

    if (!error && data) {
      let parsedContent: Partial<SiteContent> = {};
      if (data.socials && typeof data.socials === 'object') {
        parsedContent = data.socials as any;
      } else if (data.bio) {
        try {
          parsedContent = JSON.parse(data.bio);
        } catch (e) {}
      }

      // Merge with defaults so no fields are ever missing
      const merged: SiteContent = {
        announcement: { ...defaultSiteContent.announcement, ...(parsedContent.announcement || {}) },
        hero: { 
          ...defaultSiteContent.hero, 
          ...(parsedContent.hero || {}),
          pills: parsedContent.hero?.pills || defaultSiteContent.hero.pills,
          trustBadges: parsedContent.hero?.trustBadges || defaultSiteContent.hero.trustBadges,
        },
        countdown: { ...defaultSiteContent.countdown, ...(parsedContent.countdown || {}) },
        tickerItems: parsedContent.tickerItems || defaultSiteContent.tickerItems,
        stats: parsedContent.stats || defaultSiteContent.stats,
        founder: {
          ...defaultSiteContent.founder,
          ...(parsedContent.founder || {}),
          principles: parsedContent.founder?.principles || defaultSiteContent.founder.principles
        },
        gatesSection: {
          ...defaultSiteContent.gatesSection,
          ...(parsedContent.gatesSection || {}),
          gates: parsedContent.gatesSection?.gates || defaultSiteContent.gatesSection.gates
        },
        alignmentSection: {
          ...defaultSiteContent.alignmentSection,
          ...(parsedContent.alignmentSection || {}),
          forYou: { ...defaultSiteContent.alignmentSection.forYou, ...(parsedContent.alignmentSection?.forYou || {}) },
          notForYou: { ...defaultSiteContent.alignmentSection.notForYou, ...(parsedContent.alignmentSection?.notForYou || {}) },
          banner: { ...defaultSiteContent.alignmentSection.banner, ...(parsedContent.alignmentSection?.banner || {}) },
        },
        portalsHeader: { ...defaultSiteContent.portalsHeader, ...(parsedContent.portalsHeader || {}) },
        libraryHeader: { ...defaultSiteContent.libraryHeader, ...(parsedContent.libraryHeader || {}) },
        mediaHeader: { ...defaultSiteContent.mediaHeader, ...(parsedContent.mediaHeader || {}) },
        testimonialsSection: {
          ...defaultSiteContent.testimonialsSection,
          ...(parsedContent.testimonialsSection || {}),
          items: parsedContent.testimonialsSection?.items || defaultSiteContent.testimonialsSection.items
        },
        faqSection: {
          ...defaultSiteContent.faqSection,
          ...(parsedContent.faqSection || {}),
          items: parsedContent.faqSection?.items || defaultSiteContent.faqSection.items
        },
        footer: { ...defaultSiteContent.footer, ...(parsedContent.footer || {}) },
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('lyra_site_content', JSON.stringify(merged));
      }
      return merged;
    }

    // Auto-seed if not yet saved in Supabase
    if (error && error.code === 'PGRST116') {
      await saveSiteContent(defaultSiteContent);
      return defaultSiteContent;
    }
  } catch (err) {
    console.warn('getSiteContent error:', err);
  }

  return cached || defaultSiteContent;
};

export const saveSiteContent = async (content: SiteContent) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lyra_site_content', JSON.stringify(content));
  }

  try {
    const payload = {
      id: 'site_content',
      name: 'Site Content CMS',
      bio: JSON.stringify(content),
      socials: content as any
    };
    const { error } = await supabase.from('profile').upsert(payload);
    if (error) {
      console.error('saveSiteContent Supabase error:', error);
      throw error;
    }
  } catch (err) {
    console.error('saveSiteContent failed:', err);
    throw err;
  }
};

// ============================================================================
// PRODUCTS API (Supabase Persistent with resilient downloadUrl fallback)
// ============================================================================
const getProductMeta = async (): Promise<Record<string, { downloadUrl?: string }>> => {
  try {
    const { data } = await supabase.from('profile').select('*').eq('id', 'product_meta').single();
    if (data && data.socials) {
      return data.socials as any;
    }
  } catch (e) {}
  return {};
};

const saveProductMeta = async (meta: Record<string, { downloadUrl?: string }>) => {
  try {
    await supabase.from('profile').upsert({
      id: 'product_meta',
      name: 'Product Metadata',
      socials: meta as any
    });
  } catch (e) {}
};

export const saveProduct = async (prod: ProductItem) => {
  try {
    const sanitizedProd: any = {
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
    };

    // If downloadUrl is present, try inserting with it; if column missing in DB, fallback gracefully
    if (prod.downloadUrl) {
      const { error: errWithDownload } = await supabase.from('products').upsert({
        ...sanitizedProd,
        downloadUrl: prod.downloadUrl
      });

      if (!errWithDownload) {
        // Success with downloadUrl column
        return;
      }

      // If downloadUrl column does not exist (PGRST204), store downloadUrl in product_meta
      if (errWithDownload.code === 'PGRST204') {
        const { error: errWithout } = await supabase.from('products').upsert(sanitizedProd);
        if (errWithout) throw errWithout;

        const meta = await getProductMeta();
        meta[sanitizedProd.id] = { downloadUrl: prod.downloadUrl };
        await saveProductMeta(meta);
        return;
      }

      throw errWithDownload;
    } else {
      const { error } = await supabase.from('products').upsert(sanitizedProd);
      if (error) {
        console.error('Supabase saveProduct error on item:', prod.id, error);
        throw error;
      }
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
    const meta = await getProductMeta();
    if (meta[id]) {
      delete meta[id];
      await saveProductMeta(meta);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProducts = async (): Promise<ProductItem[]> => {
  try {
    const [{ data, error }, meta] = await Promise.all([
      supabase.from('products').select('*'),
      getProductMeta()
    ]);

    if (error) {
      console.warn('Supabase getProducts error:', error);
      return defaultProducts;
    }

    if (data && data.length > 0) {
      // Merge with metadata downloadUrl
      const mergedList = data.map((p: any) => ({
        ...p,
        downloadUrl: p.downloadUrl || meta[p.id]?.downloadUrl || (
          p.id === 'dark-mother-kali' ? '/dark-mother-kali.pdf' :
          p.id === 'soru-cevap' ? '/soru-cevap.pdf' : undefined
        )
      }));

      const paid = mergedList.filter((p: ProductItem) => p.priceType !== 'free');
      const free = mergedList.filter((p: ProductItem) => p.priceType === 'free');
      return [...paid, ...free];
    }

    // Auto-seed if 0 rows in Supabase products
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

// ============================================================================
// VIDEOS API (Supabase Persistent)
// ============================================================================
export const getVideos = async (): Promise<FeaturedVideoItem[]> => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('custom_videos');
      if (saved) {
        // Return cached while fetching fresh
      }
    } catch (e) {}
  }

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', 'videos')
      .single();

    if (!error && data && data.socials && Array.isArray((data.socials as any).items)) {
      const vids = (data.socials as any).items as FeaturedVideoItem[];
      if (typeof window !== 'undefined') {
        localStorage.setItem('custom_videos', JSON.stringify(vids));
      }
      return vids;
    }

    if (error && error.code === 'PGRST116') {
      await saveVideos(defaultVideos);
      return defaultVideos;
    }
  } catch (err) {
    console.warn('getVideos Supabase error:', err);
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('custom_videos');
    if (saved) return JSON.parse(saved);
  }
  return defaultVideos;
};

export const saveVideos = async (videos: FeaturedVideoItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_videos', JSON.stringify(videos));
  }

  try {
    const { error } = await supabase.from('profile').upsert({
      id: 'videos',
      name: 'Featured Videos',
      socials: { items: videos } as any
    });
    if (error) console.error('saveVideos Supabase error:', error);
  } catch (err) {
    console.error('saveVideos error:', err);
  }
};

// ============================================================================
// APPOINTMENTS & ORDERS API
// ============================================================================
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
  } catch (err) {}

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

// ============================================================================
// SMTP & EMAIL AUTOMATION API (Supabase Persistent + LocalStorage Cache)
// ============================================================================
export const getSmtpSettings = async (): Promise<SmtpSettings> => {
  const defaultSettings: SmtpSettings = {
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    user: 'info@lyraonearth.com',
  };

  try {
    const { data } = await supabase.from('profile').select('*').eq('id', 'smtp_settings').single();
    if (data && data.socials) {
      const settings = { ...defaultSettings, ...(data.socials as any) };
      if (typeof window !== 'undefined') {
        localStorage.setItem('custom_smtp_settings', JSON.stringify(settings));
      }
      return settings;
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('custom_smtp_settings');
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  }
  return defaultSettings;
};

export const saveSmtpSettings = async (settings: SmtpSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_smtp_settings', JSON.stringify(settings));
  }
  try {
    await supabase.from('profile').upsert({
      id: 'smtp_settings',
      name: 'SMTP Settings',
      socials: settings as any
    });
  } catch (e) {
    console.warn('saveSmtpSettings Supabase sync error:', e);
  }
};

export const getScheduledEmails = async (): Promise<ScheduledEmail[]> => {
  const defaultList: ScheduledEmail[] = [
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

  try {
    const { data } = await supabase.from('profile').select('*').eq('id', 'scheduled_emails').single();
    if (data && data.socials && Array.isArray((data.socials as any).items)) {
      const list = (data.socials as any).items as ScheduledEmail[];
      if (typeof window !== 'undefined') {
        localStorage.setItem('custom_scheduled_emails', JSON.stringify(list));
      }
      return list;
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('custom_scheduled_emails');
    if (saved) return JSON.parse(saved);
  }
  return defaultList;
};

export const saveScheduledEmails = async (emails: ScheduledEmail[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('custom_scheduled_emails', JSON.stringify(emails));
  }
  try {
    await supabase.from('profile').upsert({
      id: 'scheduled_emails',
      name: 'Scheduled Emails',
      socials: { items: emails } as any
    });
  } catch (e) {
    console.warn('saveScheduledEmails Supabase sync error:', e);
  }
};

export const deleteScheduledEmail = async (id: string) => {
  const emails = await getScheduledEmails();
  await saveScheduledEmails(emails.filter((e) => e.id !== id));
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
