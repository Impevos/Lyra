import React from 'react';

export default function KvkkPage() {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[0.65rem] font-bold tracking-[0.4em] text-[#A39B94] uppercase mb-3 block">Hukuki Metinler</span>
        <h1 className="font-serif text-3xl md:text-5xl text-wine font-bold mb-4 tracking-wide">
          Kişisel Verilerin Korunması
        </h1>
        <p className="text-sm text-taupe/60 font-medium uppercase tracking-[0.2em]">Aydınlatma Metni</p>
      </div>

      <div className="bg-white/40 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12 shadow-sm space-y-12">
        {/* Intro */}
        <div className="text-charcoal/80 leading-loose text-base">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla{" "}
            <span className="font-bold text-charcoal">Deniz Bayraktar</span> tarafından kişisel verileriniz aşağıda açıklanan kapsamda işlenmektedir.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-10">
          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Veri Sorumlusu</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>
                Kişisel verileriniz, veri sorumlusu olarak Deniz Bayraktar tarafından 6698 sayılı Kanun kapsamında işlenmektedir.
              </p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">İşlenen Kişisel Veriler</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>
                Ad, soyad, e-posta adresi, telefon numarası, randevu saatleri, görüşme notları ve ödeme işlem kayıtları (kart bilgileri saklanmaz, güvenli ödeme sağlayıcı PayTR altyapısı üzerinden işlenir).
              </p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">İşleme Amaçları</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <ul className="list-disc pl-5 space-y-2">
                <li>Hizmetin sunulması</li>
                <li>Randevu ve iletişim süreçlerinin yürütülmesi</li>
                <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
                <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Hukuki Sebep</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>KVKK m.5 kapsamında sözleşmenin ifası ve veri sorumlusunun meşru menfaatleri.</p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Aktarım</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>Verileriniz yalnızca ödeme sağlayıcıları ve yasal zorunluluklar kapsamında yetkili kurumlarla paylaşılabilir.</p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Toplama Yöntemi</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>WhatsApp, e-posta, online görüşme platformları ve formlar aracılığıyla.</p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Haklarınız</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>KVKK m.11 kapsamında veri işlenip işlenmediğini öğrenme, düzeltme, silme ve itiraz etme haklarına sahipsiniz.</p>
            </div>
          </div>

          {/* Section */}
          <div className="border-t border-gold/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <h2 className="text-lg font-bold text-wine tracking-wide">Başvurularınız</h2>
            </div>
            <div className="col-span-2 text-charcoal/80 leading-loose text-sm md:text-base">
              <p>
                Başvurularınızı{" "}
                <a href="mailto:denizbayraktar.lyra@gmail.com" className="text-[#A39B94] hover:text-wine font-medium transition-colors">
                  denizbayraktar.lyra@gmail.com
                </a>{" "}
                adresine iletebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Açık Rıza Beyanı */}
        <div className="bg-ivory/50 rounded-xl p-6 md:p-8 border border-gold/5 mt-16">
          <h2 className="font-serif text-xl md:text-2xl text-wine font-bold text-center mb-6 tracking-wide">
            AÇIK RIZA BEYANI
          </h2>
          <p className="mb-4 text-charcoal/80 leading-loose text-sm md:text-base text-center">
            Tarafıma sunulan KVKK Aydınlatma Metni kapsamında;
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-charcoal/80 leading-loose text-sm md:text-base max-w-2xl mx-auto">
            <li>Kişisel verilerimin hizmetin sunulması amacıyla işlenmesine,</li>
            <li>İletişim bilgilerim üzerinden benimle iletişime geçilmesine,</li>
            <li>Online platformlar (WhatsApp, Zoom vb.) aracılığıyla görüşme yapılmasına</li>
          </ul>
          <p className="font-bold text-charcoal text-center mb-6">açık rıza veriyorum.</p>

          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gold/5">
              <input type="checkbox" className="mt-1" disabled />
              <label className="text-sm text-charcoal/70">Onaylıyorum</label>
            </div>
            <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gold/5">
              <input type="checkbox" className="mt-1" disabled />
              <label className="text-sm text-charcoal/70">(Varsa ek): Görüşmenin kayıt altına alınmasına açık rıza veriyorum.</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
