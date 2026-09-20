import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teslimat ve İade Politikası',
  description: 'Lyra On Earth dijital ürünler teslimat, iptal ve iade politikası.',
};

export default function TeslimatVeIadePage() {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[0.65rem] font-bold tracking-[0.4em] text-[#A39B94] uppercase mb-3 block">Politikalarımız</span>
        <h1 className="font-serif text-3xl md:text-5xl text-wine font-bold mb-4 tracking-wide">
          Teslimat, İptal ve İade Politikası
        </h1>
        <p className="text-sm text-taupe/60 font-medium uppercase tracking-[0.2em]">Son Güncelleme: 17 Eylül 2026</p>
      </div>

      <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-12 text-charcoal/80 leading-loose text-sm md:text-base">
        
        {/* Teslimat Politikası */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-wine font-bold border-b border-gold/10 pb-4">1. Teslimat Koşulları</h2>
          <p>
            Lyra On Earth ("Satıcı") üzerinden sunulan tüm ürünler ve hizmetler (Masterclass eğitimleri, danışmanlık seansları, dijital içerikler, rehberler ve PDF dokümanlar) tamamen dijital niteliktedir. Bu sebeple herhangi bir fiziksel kargo gönderimi yapılmamaktadır.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Dijital İçerikler ve Dokümanlar:</strong> Satın alma işleminizin ödeme onayı alındıktan hemen sonra, ilgili dijital ürüne erişim bağlantısı veya ürün dosyasının kendisi, sipariş sırasında belirtmiş olduğunuz e-posta adresine otomatik olarak gönderilir.
            </li>
            <li>
              <strong>Danışmanlık ve Birebir Seanslar:</strong> Satın alma işleminden sonra, randevu saatinizi ve görüşme bağlantısını (Zoom, Google Meet vb.) içeren bir bilgilendirme e-postası tarafınıza iletilir. Görüşme, önceden mutabık kalınan gün ve saatte dijital ortamda gerçekleştirilir.
            </li>
          </ul>
          <p>
            E-posta kutunuza teslimatla ilgili herhangi bir bilgilendirme ulaşmaması halinde, lütfen gereksiz (spam) klasörünüzü kontrol ediniz. Sorun yaşamanız durumunda bizimle iletişime geçebilirsiniz.
          </p>
        </section>

        {/* İptal Politikası */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-wine font-bold border-b border-gold/10 pb-4">2. İptal Koşulları</h2>
          <p>
            Alıcı, satın aldığı danışmanlık veya canlı eğitim hizmetlerini (Masterclass vb.) belirli şartlar dahilinde iptal etme veya erteleme hakkına sahiptir:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Birebir Seanslar:</strong> Planlanan bireysel çevrimiçi oturumlar, randevu saatinden en az 24 saat öncesine kadar iptal edilebilir veya ertelenebilir. 24 saatten daha az bir süre kala yapılan iptallerde veya seansa haber verilmeksizin katılım sağlanmaması durumunda, hizmet ifa edilmiş sayılır ve ücret iadesi yapılmaz.
            </li>
            <li>
              <strong>Grup Eğitimleri (Masterclass):</strong> Canlı yayınlanacak olan eğitimler için, eğitimin başlama saatine kadar iptal talebinde bulunulamaz. Katılım sağlanmaması durumunda hizmet bedeli iade edilmez, ancak (varsa) eğitimin kayıt linki katılımcı ile paylaşılır.
            </li>
          </ul>
        </section>

        {/* İade ve Cayma Hakkı */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-wine font-bold border-b border-gold/10 pb-4">3. İade ve Cayma Hakkı İstisnaları</h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği'nin <strong>15. maddesinin (ğ) bendi</strong> uyarınca, <em>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler"</em> cayma hakkının istisnaları arasında yer almaktadır.
          </p>
          <p>
            Satın alınan ürünler dijital içerik olduğu ve ödeme onayı ile birlikte Alıcı'nın erişimine anında açıldığı için, bu ürünlerde <strong>cayma hakkı ve ücret iadesi bulunmamaktadır.</strong>
          </p>
          <p>
            Satın alma işlemini tamamlayan her kullanıcı, dijital içeriklere anında erişim sağladığını ve bu nedenle cayma hakkını kaybedeceğini bildiğini peşinen kabul ve beyan eder.
          </p>
        </section>

      </div>

      {/* Back Link */}
      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gold/20 hover:border-wine hover:bg-wine hover:text-white text-wine text-xs font-bold uppercase tracking-widest transition-all"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
