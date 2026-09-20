import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sözleşmeler',
  description: 'Lyra On Earth hizmet sözleşmeleri, KVKK aydınlatma metni, masterclass sözleşmesi ve onay formu.',
};

// Contract data extracted from docx files
const contracts = [
  {
    id: 'mesafeli',
    title: 'Mesafeli Satış Sözleşmesi',
    icon: '⚖️',
  },
  {
    id: 'hizmet',
    title: 'İçerik Hizmetleri Sözleşmesi',
    icon: '📜',
  },
  {
    id: 'masterclass',
    title: 'Masterclass Hizmet Sözleşmesi',
    icon: '🎓',
  },
  {
    id: 'kvkk',
    title: 'KVKK Aydınlatma & Açık Rıza Metni',
    icon: '🔒',
  },
  {
    id: 'onay',
    title: 'Görüşme Öncesi Bilgilendirme ve Onay Formu',
    icon: '✅',
  },
];

export default function SozlesmelerPage() {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[0.65rem] font-bold tracking-[0.4em] text-[#A39B94] uppercase mb-3 block">Hukuki Metinler</span>
        <h1 className="font-serif text-3xl md:text-5xl text-wine font-bold mb-4 tracking-wide">
          Sözleşmeler & Yasal Metinler
        </h1>
        <p className="text-sm text-taupe/60 font-medium uppercase tracking-[0.2em]">Lyra On Earth Hizmet Sözleşmeleri</p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {contracts.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-gold/15 hover:border-gold/40 hover:bg-white/90 transition-all text-xs font-bold tracking-widest text-wine uppercase"
          >
            <span>{c.icon}</span>
            <span className="hidden sm:inline">{c.title}</span>
            <span className="sm:hidden">{c.title.split(' ').slice(0, 2).join(' ')}</span>
          </a>
        ))}
      </div>

      <div className="space-y-16">

        {/* ===== 0. MESAFELİ SATIŞ SÖZLEŞMESİ ===== */}
        <section id="mesafeli" className="scroll-mt-28">
          <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center border-b border-gold/10 pb-8">
              <span className="text-4xl mb-4 block">⚖️</span>
              <h2 className="font-serif text-2xl md:text-3xl text-wine font-bold tracking-wide">MESAFELİ SATIŞ SÖZLEŞMESİ</h2>
            </div>

            <div className="space-y-8 text-charcoal/80 leading-loose text-sm md:text-base">
              {/* Madde 1: Taraflar */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 1 – TARAFLAR</h3>
                <div className="col-span-2 space-y-3">
                  <p><strong>1.1. SATICI BİLGİLERİ</strong></p>
                  <p>Unvanı: DENİZ BAYRAKTAR (Bundan böyle SATICI olarak anılacaktır.)</p>
                  <p>Adres: Göztepe Mah. Batışehir Cad. Batışehir K Blok No: 2/2 İç Kapı No: 115 Bağcılar/ İstanbul</p>
                  <p>E-posta: info@lyraonearth.com</p>
                  
                  <p className="mt-4"><strong>1.2. ALICI BİLGİLERİ</strong></p>
                  <p>İşbu sözleşmede ALICI, www.lyraonearth.com internet sitesinden hizmet satın alan kişidir. ALICI'nın üye olurken veya sipariş verirken kullandığı adres ve iletişim bilgileri esas alınır.</p>
                </div>
              </div>

              {/* Madde 2: Konu */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 2 – KONU</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı dijital içerik, eğitim veya danışmanlık hizmetinin satışı ve ifası ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
                </div>
              </div>

              {/* Madde 3: Sözleşme Konusu Ürün/Hizmet */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 3 – SÖZLEŞME KONUSU ÜRÜN/HİZMET</h3>
                <div className="col-span-2 space-y-3">
                  <p>Ürünlerin/Hizmetlerin cinsi ve türü, miktarı, marka/modeli, rengi, vergiler dâhil satış bedeli (adet x birim fiyat olarak) www.lyraonearth.com adlı internet sitesinde belirtildiği gibidir. SATICI tarafından sunulan tüm hizmetler dijital mahiyettedir ve fiziki bir ürün teslimatı yapılmamaktadır.</p>
                </div>
              </div>

              {/* Madde 4: Teslimat Şekli */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 4 – TESLİMAT ŞEKLİ</h3>
                <div className="col-span-2 space-y-3">
                  <p>Ürün/Hizmet dijital olduğu için, satın alma işlemi başarıyla tamamlandıktan ve ödeme onaylandıktan sonra ALICI'ya elektronik ortamda (e-posta yoluyla veya sistem üzerinden doğrudan erişim hakkı tanınarak) anında teslim edilir / ifa sürecine başlanır. Fiziksel bir kargo gönderimi yoktur.</p>
                </div>
              </div>

              {/* Madde 5: Cayma Hakkı */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 5 – CAYMA HAKKI VE İSTİSNALARI</h3>
                <div className="col-span-2 space-y-3">
                  <p>Mesafeli Sözleşmeler Yönetmeliği Madde 15 (ğ) bendi uyarınca, <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler"</strong> cayma hakkının istisnaları kapsamındadır.</p>
                  <p>SATICI tarafından satışı yapılan ürünler (online masterclass eğitimleri, dijital PDF dokümanları, e-kitaplar ve görüntülü seanslar) elektronik ortamda anında ifa edilen hizmetler veya anında teslim edilen dijital içerikler olduğundan, ALICI'nın işbu sözleşme kapsamında <strong>CAYMA HAKKI BULUNMAMAKTADIR.</strong> Satın alınan ürünler için ücret iadesi yapılamaz.</p>
                </div>
              </div>

              {/* Madde 6: Genel Hükümler */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 6 – GENEL HÜKÜMLER</h3>
                <div className="col-span-2 space-y-3">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
                    <li>ALICI, bu sözleşmeyi elektronik ortamda teyit etmekle, mesafeli sözleşmelerin akdinden önce, SATICI tarafından ALICI'ya verilmesi gereken adres, siparişi verilen ürünlere ait temel özellikler, ürünlerin vergiler dâhil fiyatı, ödeme ve teslimat bilgilerini de doğru ve eksiksiz olarak edindiğini teyit etmiş olur.</li>
                  </ul>
                </div>
              </div>

              {/* Madde 7: Uyuşmazlıkların Çözümü */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">MADDE 7 – UYUŞMAZLIKLARIN ÇÖZÜMÜ</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu Sözleşme'nin uygulanmasında, Gümrük ve Ticaret Bakanlığınca ilan edilen değere kadar Alıcının Mal veya Hizmeti satın aldığı ve ikametgahının bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.</p>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* ===== 1. İÇERİK HİZMETLERİ SÖZLEŞMESİ ===== */}
        <section id="hizmet" className="scroll-mt-28">
          <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center border-b border-gold/10 pb-8">
              <span className="text-4xl mb-4 block">📜</span>
              <h2 className="font-serif text-2xl md:text-3xl text-wine font-bold tracking-wide">İÇERİK HİZMETLERİ SÖZLEŞMESİ</h2>
            </div>

            <div className="space-y-8 text-charcoal/80 leading-loose text-sm md:text-base">
              {/* I- Taraflar */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">I- Taraflar</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu İçerik Hizmetleri Sözleşmesi &ldquo;Sözleşme&rdquo;;</p>
                  <p>1- Bir tarafta <strong>DENİZ BAYRAKTAR</strong> (işbu sözleşmede bundan böyle kısaca &ldquo;Hizmet Sağlayıcı&rdquo; olarak anılacaktır) ile,</p>
                  <p>2- Diğer tarafta ……………….. (işbu sözleşmede bundan böyle kısaca &ldquo;KATILIMCI&rdquo; olarak anılacaktır.) arasında, aşağıdaki hususlarda mutabık kalınarak imzalanmıştır.</p>
                  <p>Hizmet Sağlayıcı ile Katılımcı bundan böyle ayrı ayrı &ldquo;Taraf&rdquo; birlikte &ldquo;Taraflar&rdquo; olarak anılacaktır.</p>
                </div>
              </div>

              {/* II- Konu ve Süre */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">II- Sözleşmenin Konusu ve Süresi</h3>
                <div className="col-span-2 space-y-3">
                  <p>Hizmet Sağlayıcı, oluşturduğu program kapsamında aşağıdaki hizmetlerden birini veya birkaçını sunabilir;</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Bireysel çevrimiçi oturumlar</li>
                    <li>Çalışma dokümanları</li>
                    <li>Canlı çevrimiçi buluşmalar</li>
                    <li>Ses veya video kayıtları</li>
                    <li>Soru-cevap oturumları</li>
                  </ul>
                  <p>İşbu Sözleşme, Katılımcı&apos;nın ödemiş olduğu hizmet bedeline göre 1 ay / 3 ay olarak belirlenmiştir.</p>
                </div>
              </div>

              {/* III- Hizmet Kapsamı */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">III- Hizmet Kapsamı</h3>
                <div className="col-span-2">
                  <p>Hizmet kapsamında yürütülen çalışmalar, Katılımcı&apos;nın bireysel farkındalığını desteklemeyi amaçlayan içerikler içerebilir. Ancak sunulan hizmetler, hiçbir şekilde tıbbi teşhis veya tedavi, psikolojik ya da psikiyatrik değerlendirme, hukuki, mali veya benzeri uzmanlık hizmeti niteliğinde değildir ve bu hizmetlerin yerine geçmez.</p>
                </div>
              </div>

              {/* IV- Ücret ve Ödeme */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">IV- Ücret ve Ödeme</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu Sözleşme&apos;ye ilişkin ücretlendirme, aşağıdaki şartlarda Katılımcı&apos;ya fatura edilecektir;</p>
                  <p>Katılımcı, Hizmet Sağlayıcı&apos;ya birebir görüşmenin planlandığı ve ilk randevunun alındığı gün sonuna kadar Hizmet Sağlayıcı&apos;nın banka hesabına belirlenen tutarda ödeme yapacaktır. Ödemenin belirtilen vakit içerisinde yapılmaması halinde Hizmet Sağlayıcı görüşmeye katılmama ve içerik paylaşmama hakkını saklı tutar.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Katılımcı&apos;nın 1 aylık hizmet alması halinde Hizmet Sağlayıcı ilk birebir görüşme sonrasında fatura düzenleyecektir. 1 aylık hizmet bedelinin ödenmesi sonrası Katılımcı&apos;nın Sözleşme&apos;den çekilmeyi talep etmesi halinde ise yapılan ödeme Taraflarca aksi kararlaştırılmadıkça iade edilmez.</li>
                    <li>Katılımcı&apos;nın 3 aylık hizmet alması halinde Hizmet Sağlayıcı ilk hizmet ayı sonrasında fatura düzenleyecektir. Katılımcı tarafından ödeme yapılması akabinde Katılımcı&apos;nın Sözleşme&apos;den çekilmeyi talep etmesi halinde ise yapılan ödeme Taraflarca aksi kararlaştırılmadıkça iade edilmez.</li>
                    <li>Hizmet Sağlayıcı ve Katılımcı arasında yapılan ve sona eren görüşmelerin ücretleri iade edilmez.</li>
                  </ul>
                </div>
              </div>

              {/* VI- Hak ve Yükümlülükler */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VI- Tarafların Hak ve Yükümlülükleri</h3>
                <div className="col-span-2 space-y-3">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>İşbu Sözleşme kapsamında Hizmet Sağlayıcı, sunulan içeriklerin kullanımından doğabilecek sonuçlara ilişkin herhangi bir garanti ve/veya taahhüt vermez.</li>
                    <li>Katılımcı, Hizmet Sağlayıcı tarafından sunulan tüm içerikleri kendi sorumluluğunda değerlendirdiğini kabul eder.</li>
                    <li>Hizmet Sağlayıcı&apos;nın sağladığı tüm hizmetler tıbbi, psikolojik, hukuki veya finansal danışmanlık niteliği taşımamaktadır.</li>
                    <li>Katılımcı&apos;nın planlanan bireysel çevrimiçi oturumun yapılacağı gün içerisinde görüşmeyi iptal etmesi halinde ilgili görüşme kapsamında yapılan ödeme iade edilmez. Bireysel çevrimiçi oturumlar, Katılımcı tarafından en az 24 saat öncesinden iptal edilebilir.</li>
                    <li>Katılımcı tarafından herhangi bir görüşme 3 defa üst üste ertelenirse/iptal edilirse bu bireysel çevrimiçi oturum yapılmış sayılır.</li>
                    <li>Tüm bireysel çevrimiçi oturumlar, ilk oturumun yapıldığı tarih itibarıyla 3 ay içerisinde yapılacaktır.</li>
                    <li>Planlanan oturumlar dışında Katılımcı, Hizmet Sağlayıcı&apos;nın kişisel telefon numarası üzerinden soru içerikli mesaj göndermeyecektir. Sorular Instagram (<strong>@lyraswisdom</strong>) veya e-posta (<strong>denizbayraktar.lyra@gmail.com</strong>) üzerinden yöneltilecektir.</li>
                    <li>İşbu Sözleşme&apos;de belirtilen hizmet, Katılımcıların karar alma süreçlerinde yön verme amacı taşımaz.</li>
                  </ul>
                </div>
              </div>

              {/* VII- Fesih */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VII- Fesih</h3>
                <div className="col-span-2 space-y-3">
                  <p>Hizmet Sağlayıcı, gerekli gördüğü hallerde, mücbir sebepler veya zorunlu durumlar nedeniyle hizmeti durdurabilir, sonlandırabilir veya erteleyebilir.</p>
                  <p>Aşağıdaki durumlarda Hizmet Sağlayıcı derhal fesih hakkına sahiptir:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Katılımcı&apos;nın saygı sınırlarını aşan davranışlarda bulunması</li>
                    <li>Hizmetin amacına aykırı kullanımı</li>
                    <li>Yanıltıcı, eksik veya gerçeğe aykırı beyan verilmesi</li>
                    <li>Hizmet Sağlayıcı&apos;nın çalışma düzenini bozacak davranışlar</li>
                  </ul>
                  <p>Bu hallerde hizmet derhal durdurulabilir ve kalan seanslara ilişkin ücret iadesi yapılmayabilir.</p>
                  <p>Katılımcı, hizmeti dilediği zaman sonlandırabilir; ancak tamamlanan hizmetlere ilişkin ücret iadesi talep edemez.</p>
                </div>
              </div>

              {/* VIII- Gizlilik */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VIII- Gizlilik ve Kişisel Verilerin Korunması</h3>
                <div className="col-span-2 space-y-3">
                  <p>Katılımcı, kendisine ait kişisel verilerin Hizmet Sağlayıcı tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu ve ilgili mevzuata uygun olarak, yalnızca hizmetin sunulması, iletişim kurulması, ödeme ve faturalandırma süreçlerinin yürütülmesi ile yasal yükümlülüklerin yerine getirilmesi amacıyla işlenebileceğini kabul eder.</p>
                  <p>Taraflar, hizmet kapsamında edindikleri ve kamuya açık olmayan bilgi ve içerikleri gizli tutmayı, üçüncü kişilerle paylaşmamayı kabul eder.</p>
                </div>
              </div>

              {/* IX- Fikri Mülkiyet */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">IX- Fikri Mülkiyet Hakları</h3>
                <div className="col-span-2 space-y-3">
                  <p>Hizmet Sağlayıcı tarafından sunulan tüm içerikler; çalışma dokümanları, görseller, ses kayıtları, video içerikleri, dijital dokümanlar ve benzeri tüm içeriklerin tüm fikri mülkiyet hakları münhasıran Hizmet Sağlayıcı&apos;ya aittir.</p>
                  <p>Katılımcı, kendisine sunulan içerikleri yalnızca kişisel kullanım amacıyla kullanabilir. Bu içerikler:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Kopyalanamaz</li>
                    <li>Kaydedilemez</li>
                    <li>Çoğaltılamaz</li>
                    <li>Yayınlanamaz</li>
                    <li>Üçüncü kişilerle paylaşılamaz</li>
                    <li>Ticari amaçla kullanılamaz</li>
                  </ul>
                </div>
              </div>

              {/* X- Diğer */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">X- Diğer Hususlar</h3>
                <div className="col-span-2 space-y-3">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>İşbu Sözleşme, Taraflar arasında akdedilen hizmet ilişkisinin tamamını kapsar.</li>
                    <li>Taraflardan birinin sözleşmeden doğan herhangi bir hakkını kullanmaması, bu haktan feragat ettiği anlamına gelmez.</li>
                    <li>Sözleşme&apos;nin herhangi bir hükmünün geçersiz veya uygulanamaz hale gelmesi, diğer hükümlerin geçerliliğini etkilemez.</li>
                    <li>Katılımcı, işbu Sözleşme kapsamındaki hak ve yükümlülüklerini Hizmet Sağlayıcı&apos;nın onayı olmaksızın üçüncü kişilere devredemez.</li>
                    <li>Katılımcı, hizmeti satın alarak ve/veya kullanarak işbu Sözleşme hükümlerini okuduğunu, anladığını ve kabul ettiğini beyan eder.</li>
                    <li>İşbu Sözleşme&apos;den doğabilecek uyuşmazlıklarda <strong>İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> yetkilidir.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. MASTERCLASS HİZMET SÖZLEŞMESİ ===== */}
        <section id="masterclass" className="scroll-mt-28">
          <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center border-b border-gold/10 pb-8">
              <span className="text-4xl mb-4 block">🎓</span>
              <h2 className="font-serif text-2xl md:text-3xl text-wine font-bold tracking-wide">MASTERCLASS HİZMET SÖZLEŞMESİ</h2>
            </div>

            <div className="space-y-8 text-charcoal/80 leading-loose text-sm md:text-base">
              {/* I- Taraflar */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">I- Taraflar</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu Masterclass Hizmet Sözleşmesi &ldquo;Sözleşme&rdquo;;</p>
                  <p>1- Bir tarafta <strong>DENİZ BAYRAKTAR</strong> (işbu sözleşmede bundan böyle kısaca &ldquo;Hizmet Sağlayıcı&rdquo; olarak anılacaktır) ile,</p>
                  <p>2- Diğer tarafta ……………….. (işbu sözleşmede bundan böyle kısaca &ldquo;KATILIMCI&rdquo; olarak anılacaktır.) arasında, aşağıdaki hususlarda mutabık kalınarak imzalanmıştır.</p>
                </div>
              </div>

              {/* II- Konu ve Süre */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">II- Sözleşmenin Konusu ve Süresi</h3>
                <div className="col-span-2 space-y-3">
                  <p>Hizmet Sağlayıcı, oluşturduğu Masterclass programı kapsamında aşağıdaki hizmetlerden birini veya birkaçını sunabilir;</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Çevrimiçi grup oturumları</li>
                    <li>Çalışma dokümanları</li>
                    <li>Canlı çevrimiçi buluşmalar</li>
                    <li>Ses veya video kayıtları</li>
                    <li>Soru-cevap oturumları</li>
                  </ul>
                </div>
              </div>

              {/* III- Hizmet Kapsamı */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">III- Hizmet Kapsamı</h3>
                <div className="col-span-2">
                  <p>Hizmet kapsamında yürütülen çalışmalar, Katılımcı&apos;nın bireysel farkındalığını desteklemeyi amaçlayan içerikler içerebilir. Ancak sunulan hizmetler, hiçbir şekilde tıbbi teşhis veya tedavi, psikolojik ya da psikiyatrik değerlendirme, hukuki, mali veya benzeri uzmanlık hizmeti niteliğinde değildir ve bu hizmetlerin yerine geçmez.</p>
                </div>
              </div>

              {/* IV- Ücret ve Ödeme */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">IV- Ücret ve Ödeme</h3>
                <div className="col-span-2 space-y-3">
                  <p>İşbu Sözleşme&apos;ye ilişkin ücretlendirme, aşağıdaki şartlarda Katılımcı&apos;ya fatura edilecektir;</p>
                  <p>Katılımcı, Hizmet Sağlayıcı&apos;ya tarafların yazılı olarak belirlediği ödeme planı doğrultusunda Hizmet Sağlayıcı tarafından belirlenecek tutarda ödeme yapacaktır.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Peşin ödemelerde hizmet bedeline KDV dahildir.</li>
                    <li>Taksitli ödemelerde hizmet bedeline yürürlükteki oran ayrıca eklenecektir.</li>
                    <li>Hizmet Sağlayıcı, belirlenen hizmet bedeli faturasını işbu Sözleşme&apos;nin yürürlük tarihi itibarıyla 1 ay sonunda düzenleyecektir.</li>
                    <li>Faturanın düzenlenmesi sonrası Katılımcı&apos;nın Sözleşme&apos;den çekilmeyi talep etmesi halinde ise yapılan ödeme Taraflarca aksi kararlaştırılmadıkça iade edilmez.</li>
                  </ul>
                </div>
              </div>

              {/* VI- Hak ve Yükümlülükler */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VI- Tarafların Hak ve Yükümlülükleri</h3>
                <div className="col-span-2 space-y-3">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Hizmet Sağlayıcı, sunulan içeriklerin kullanımından doğabilecek sonuçlara ilişkin herhangi bir garanti vermez.</li>
                    <li>Katılımcı, sunulan tüm içerikleri kendi sorumluluğunda değerlendirdiğini kabul eder.</li>
                    <li>Hizmetler tıbbi, psikolojik, hukuki veya finansal danışmanlık niteliği taşımamaktadır.</li>
                    <li>Katılımcı&apos;nın planlanan oturum günü içerisinde oturuma katılmaması halinde ücret iade edilmez. Hizmet Sağlayıcı oturum kaydını paylaşacaktır.</li>
                    <li>Oturumların süresi satın alınan hizmetin kapsamına göre belirlenecektir.</li>
                    <li>Planlanan oturumlar dışında sorular Instagram (<strong>@lyraswisdom</strong>) veya e-posta (<strong>denizbayraktar.lyra@gmail.com</strong>) üzerinden yöneltilecektir.</li>
                    <li>İşbu Sözleşme&apos;de belirtilen hizmet, Katılımcıların karar alma süreçlerinde yön verme amacı taşımaz.</li>
                  </ul>
                </div>
              </div>

              {/* VII- Fesih */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VII- Fesih</h3>
                <div className="col-span-2 space-y-3">
                  <p>Hizmet Sağlayıcı, gerekli gördüğü hallerde hizmeti durdurabilir, sonlandırabilir veya erteleyebilir. Aşağıdaki durumlarda derhal fesih hakkına sahiptir:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Saygı sınırlarını aşan davranışlar</li>
                    <li>Hizmetin amacına aykırı kullanım</li>
                    <li>Yanıltıcı veya gerçeğe aykırı beyanlar</li>
                    <li>Çalışma düzenini bozacak davranışlar</li>
                  </ul>
                  <p>Katılımcı hizmeti dilediği zaman sonlandırabilir; ancak tamamlanan hizmetlere ilişkin ücret iadesi talep edemez.</p>
                </div>
              </div>

              {/* VIII - Gizlilik */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">VIII- Gizlilik ve Kişisel Verilerin Korunması</h3>
                <div className="col-span-2 space-y-3">
                  <p>Katılımcı, kendisine ait kişisel verilerin 6698 sayılı KVKK ve ilgili mevzuata uygun olarak işlenebileceğini kabul eder.</p>
                  <p>Taraflar, hizmet kapsamında edindikleri bilgileri gizli tutmayı kabul eder. Grup çalışmalarının kayıt altına alınacağı durumlarda katılımcılar önceden bilgilendirilir.</p>
                </div>
              </div>

              {/* IX - Fikri Mülkiyet */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">IX- Fikri Mülkiyet Hakları</h3>
                <div className="col-span-2 space-y-3">
                  <p>Tüm fikri mülkiyet hakları münhasıran Hizmet Sağlayıcı&apos;ya aittir. Katılımcı içerikleri yalnızca kişisel kullanım amacıyla kullanabilir. İçerikler kopyalanamaz, çoğaltılamaz, yayınlanamaz, üçüncü kişilerle paylaşılamaz ve ticari amaçla kullanılamaz.</p>
                </div>
              </div>

              {/* X - Diğer */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">X- Diğer Hususlar</h3>
                <div className="col-span-2 space-y-3">
                  <p>Uyuşmazlıklarda <strong>İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> yetkilidir.</p>
                  <p>İşbu Sözleşme, Katılımcı&apos;nın onayı ile yürürlüğe girer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3. KVKK AYDINLATMA & AÇIK RIZA METNİ ===== */}
        <section id="kvkk" className="scroll-mt-28">
          <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center border-b border-gold/10 pb-8">
              <span className="text-4xl mb-4 block">🔒</span>
              <h2 className="font-serif text-2xl md:text-3xl text-wine font-bold tracking-wide">KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ</h2>
            </div>

            <div className="space-y-8 text-charcoal/80 leading-loose text-sm md:text-base">
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">Aydınlatma Metni</h3>
                <div className="col-span-2 space-y-4">
                  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, tarafınıza sunulan hizmetin yürütülmesi amacıyla ad-soyad, iletişim, ödeme ve fatura bilgileri ile hizmet kapsamında paylaşmayı tercih ettiğiniz kişisel verileriniz, hizmetin sunulması, iletişim faaliyetlerinin yürütülmesi, ödeme ve faturalandırma işlemlerinin gerçekleştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</p>
                  <p>Kişisel verileriniz, yalnızca hizmetin yürütülmesi için gerekli olduğu ölçüde ilgili hizmet sağlayıcıları, hizmetin sunulması amacıyla kullanılan çevrimiçi toplantı platformları ile kanunen yetkili kurum ve kuruluşlarla paylaşılabilir.</p>
                  <p>KVKK kapsamındaki haklarınıza ilişkin taleplerinizi Hizmet Sağlayıcısına yazılı olarak iletebilirsiniz.</p>
                </div>
              </div>

              {/* Açık Rıza Beyanı */}
              <div className="bg-ivory/50 rounded-xl p-6 md:p-8 border border-gold/5 mt-6">
                <h3 className="font-serif text-xl md:text-2xl text-wine font-bold text-center mb-6 tracking-wide">AÇIK RIZA BEYANI</h3>
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gold/5">
                    <input type="checkbox" className="mt-1" disabled />
                    <label className="text-sm text-charcoal/70">Yalnızca kayıt alınan grup çalışmaları bakımından, görüntü ve/veya sesimin programın yürütülmesi ve programa katılamayan katılımcılarla paylaşılması amacıyla kayıt altına alınmasına ve bu kapsamda işlenmesine açık rıza veriyorum.</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-taupe/50">
                Detaylı KVKK metnimiz için{' '}
                <Link href="/kvkk" className="text-[#A39B94] hover:text-wine font-bold underline underline-offset-2 transition-colors">
                  KVKK Sayfası
                </Link>
                &apos;nı ziyaret edebilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* ===== 4. ONAY FORMU ===== */}
        <section id="onay" className="scroll-mt-28">
          <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center border-b border-gold/10 pb-8">
              <span className="text-4xl mb-4 block">✅</span>
              <h2 className="font-serif text-2xl md:text-3xl text-wine font-bold tracking-wide">GÖRÜŞME ÖNCESİ BİLGİLENDİRME VE ONAY FORMU</h2>
            </div>

            <div className="space-y-8 text-charcoal/80 leading-loose text-sm md:text-base">
              <div className="text-center text-xs text-taupe/50 font-semibold uppercase tracking-widest">
                Hizmet Sağlayıcı: <strong className="text-wine">Deniz Bayraktar</strong>
              </div>

              {/* 1. Hizmetin Niteliği */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">1. Hizmetin Niteliği</h3>
                <div className="col-span-2 space-y-3">
                  <p>Tarafıma sunulacak hizmetin;</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tıbbi</li>
                    <li>Psikolojik terapi</li>
                    <li>Hukuki</li>
                    <li>Finansal danışmanlık</li>
                  </ul>
                  <p>kapsamında olmadığı konusunda bilgilendirildim.</p>
                </div>
              </div>

              {/* 2. Sorumluluk */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">2. Sorumluluk ve Karar Mekanizması</h3>
                <div className="col-span-2 space-y-3">
                  <p>Seans sırasında paylaşılan bilgi ve yorumların:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Kesinlik içermediğini</li>
                    <li>Geleceğe yönelik garanti taşımadığını</li>
                  </ul>
                  <p>kabul ediyorum.</p>
                </div>
              </div>

              {/* 3. Sonuç Garantisi */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">3. Sonuç Garantisi</h3>
                <div className="col-span-2">
                  <p>Hizmet sağlayıcının herhangi bir sonuç, fayda veya başarı garantisi vermediğini kabul ediyorum.</p>
                </div>
              </div>

              {/* 4. Görüşme ve İptal */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">4. Görüşme ve İptal Koşulları</h3>
                <div className="col-span-2 space-y-3">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Randevumu en az 24 saat önceden iptal etmem gerektiğini biliyorum.</li>
                    <li>Süresinde yapılmayan iptallerde ücret iadesi yapılmayacağını kabul ediyorum.</li>
                    <li>Seansa katılmamam durumunda ücret iadesi talep etmeyeceğimi kabul ederim.</li>
                  </ul>
                </div>
              </div>

              {/* 5. Gizlilik */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">5. Gizlilik</h3>
                <div className="col-span-2">
                  <p>Seans sırasında paylaşılan bilgilerin gizli tutulacağını biliyorum.</p>
                </div>
              </div>

              {/* 6. Kayıt Onayı */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">6. Görüşme Kaydı Onayı</h3>
                <div className="col-span-2 space-y-3">
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gold/5">
                    <input type="checkbox" className="mt-1" disabled />
                    <label className="text-sm text-charcoal/70">Görüşmenin kayıt altına alınmasına izin veriyorum.</label>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gold/5">
                    <input type="checkbox" className="mt-1" disabled />
                    <label className="text-sm text-charcoal/70">Görüşmenin kayıt altına alınmasına izin vermiyorum.</label>
                  </div>
                </div>
              </div>

              {/* 7. Beyan */}
              <div className="border-t border-gold/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <h3 className="text-lg font-bold text-wine tracking-wide">7. Beyan ve Onay</h3>
                <div className="col-span-2">
                  <p className="font-semibold text-wine">Bu formu okuyup anladığımı, kabul ettiğimi beyan ederim.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Back to top */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gold/20 hover:border-wine hover:bg-wine hover:text-white text-wine text-xs font-bold uppercase tracking-widest transition-all"
        >
          ↑ Sayfanın Başına Dön
        </a>
      </div>
    </div>
  );
}
