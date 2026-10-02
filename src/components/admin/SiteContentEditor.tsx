'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineSparkles, 
  HiOutlineCheckCircle, 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlineEye,
  HiOutlineRefresh,
  HiOutlineDocumentText,
  HiOutlineStar,
  HiOutlineQuestionMarkCircle,
  HiOutlineSpeakerphone,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import { SiteContent, defaultSiteContent, saveSiteContent } from '@/data/defaults';

interface SiteContentEditorProps {
  initialContent: SiteContent;
  onSaveSuccess: (msg: string) => void;
  onSaveError: (msg: string) => void;
}

export default function SiteContentEditor({
  initialContent,
  onSaveSuccess,
  onSaveError
}: SiteContentEditorProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<
    'hero' | 'ticker_stats' | 'founder' | 'gates' | 'alignment' | 'testimonials' | 'faq' | 'announcement_footer'
  >('hero');

  // Input helpers
  const updateNested = (path: string[], value: any) => {
    setContent((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      let curr = clone;
      for (let i = 0; i < path.length - 1; i++) {
        if (!curr[path[i]]) curr[path[i]] = {};
        curr = curr[path[i]];
      }
      curr[path[path.length - 1]] = value;
      return clone;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSiteContent(content);
      onSaveSuccess('Tüm site metinleri başarıyla Supabase veritabanına kaydedildi! Sitedeki tüm ziyaretçiler ve diğer adminler artık bu metinleri görecektir.');
    } catch (err: any) {
      console.error(err);
      onSaveError(`Hata: ${err.message || 'Metinler kaydedilemedi.'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('DİKKAT: Tüm site metinlerini sistemin ilk orijinal fabrika ayarlarına döndürmek istediğinize emin misiniz?')) {
      setContent(defaultSiteContent);
      onSaveSuccess('Metinler varsayılanlara sıfırlandı. Değişiklikleri uygulamak için lütfen "YAYINLA" butonuna basınız.');
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Top Master Action Header ── */}
      <div className="bg-white/80 backdrop-blur-md border-2 border-gold/30 p-6 rounded-2xl shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-wine/10 text-burgundy text-[0.62rem] font-bold tracking-widest uppercase mb-2">
            <HiOutlineDocumentText className="text-sm" /> CMS İÇERİK YÖNETİMİ
          </div>
          <h3 className="font-serif text-2xl text-wine font-bold">
            Sitedeki Bütün Yazıları Düzenle
          </h3>
          <p className="text-xs text-taupe/70 max-w-2xl leading-relaxed mt-1">
            Bu panelden ana sayfadaki tüm başlıkları, felsefe metinlerini, ilkeleri, kapıları, SSS sorularını ve kurucu sözlerini değiştirebilirsiniz. Yapılan değişiklikler Supabase&apos;e işlenir ve sitenize giren tüm kullanıcılara doğrudan yansır.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-wine/20 text-wine hover:bg-wine/5 text-xs font-bold tracking-wider uppercase transition-all"
            title="Varsayılan metinlere dön"
          >
            <HiOutlineRefresh className="text-base" /> Sıfırla
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gold/40 text-wine hover:bg-gold/10 text-xs font-bold tracking-wider uppercase transition-all"
          >
            <HiOutlineEye className="text-base" /> Siteyi Canlı Gör
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-grow lg:flex-grow-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-wine hover:bg-burgundy text-white text-xs font-bold tracking-[0.2em] uppercase shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                KAYDEDİLİYOR...
              </>
            ) : (
              <>
                <HiOutlineCheckCircle className="text-base text-gold" />
                TÜMÜNÜ YAYINLA (SUPABASE)
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex flex-wrap gap-2 border-b border-gold/15 pb-3">
        {[
          { id: 'hero', label: '🌟 Hero & Sayaç' },
          { id: 'ticker_stats', label: '📜 Kayan Şerit & İstatistikler' },
          { id: 'founder', label: '🏛️ Kurucu & İlkeler' },
          { id: 'gates', label: '🗝️ Dönüşümün 3 Kapısı' },
          { id: 'alignment', label: '⚖️ Hizalanma / Kimler İçin?' },
          { id: 'testimonials', label: '💬 Katılımcı Yorumları' },
          { id: 'faq', label: '❓ Sıkça Sorulan Sorular' },
          { id: 'announcement_footer', label: '📢 Duyuru & Footer' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-wine text-white shadow-sm'
                : 'bg-white/60 text-taupe/70 hover:bg-white hover:text-wine'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SUB-TAB 1: HERO & SAYAÇ ── */}
      {activeSubTab === 'hero' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4">
            <h4 className="font-serif text-xl text-wine font-bold">1. Hero Bölümü & Sayaç Metinleri</h4>
            <p className="text-xs text-taupe/60">Sayfanın en üstünde yer alan ana karşılama başlığı ve felsefe metinleri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Üst Rozet Metni (Eyebrow Badge)
              </label>
              <input
                type="text"
                value={content.hero.badge || ''}
                onChange={(e) => updateNested(['hero', 'badge'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: LYRA ON EARTH • 2026 DÖNÜŞÜM DÖNEMİ KAYITLARI"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Sağ Üst Köşe Sürüm Notu
              </label>
              <input
                type="text"
                value={content.hero.editionText || ''}
                onChange={(e) => updateNested(['hero', 'editionText'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: EDITION 2026 // LIVE +"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Ana Başlık 1. Satır
              </label>
              <input
                type="text"
                value={content.hero.titleLine1 || ''}
                onChange={(e) => updateNested(['hero', 'titleLine1'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: Kendi Gerçekliğini"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Vurgulu Başlık (İtalik Bordo Kelime)
              </label>
              <input
                type="text"
                value={content.hero.titleAccent || ''}
                onChange={(e) => updateNested(['hero', 'titleAccent'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none font-bold text-burgundy"
                placeholder="Örn: İddia ve İlan"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Ana Başlık 2. Satır Sonu
              </label>
              <input
                type="text"
                value={content.hero.titleLine2 || ''}
                onChange={(e) => updateNested(['hero', 'titleLine2'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: Et."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Felsefe Alıntı Kutusu
              </label>
              <textarea
                rows={3}
                value={content.hero.philosophyQuote || ''}
                onChange={(e) => updateNested(['hero', 'philosophyQuote'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none leading-relaxed"
                placeholder="Eye (Bilincin Gözü) ile Nova (Durdurulamaz Enerji) birleştiğinde..."
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                1. Buton Metni
              </label>
              <input
                type="text"
                value={content.hero.primaryButtonText || ''}
                onChange={(e) => updateNested(['hero', 'primaryButtonText'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                1. Buton Linki / Çapa
              </label>
              <input
                type="text"
                value={content.hero.primaryButtonLink || ''}
                onChange={(e) => updateNested(['hero', 'primaryButtonLink'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="#portallar"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                2. Buton Metni
              </label>
              <input
                type="text"
                value={content.hero.secondaryButtonText || ''}
                onChange={(e) => updateNested(['hero', 'secondaryButtonText'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                2. Buton Linki / Çapa
              </label>
              <input
                type="text"
                value={content.hero.secondaryButtonLink || ''}
                onChange={(e) => updateNested(['hero', 'secondaryButtonLink'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="#kimler-icin"
              />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-gold/15">
              <h5 className="font-serif text-lg text-wine font-semibold mb-3">Geri Sayım Sayacı (Countdown)</h5>
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Sayaç Üst Başlığı
              </label>
              <input
                type="text"
                value={content.countdown?.title || ''}
                onChange={(e) => updateNested(['countdown', 'title'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: KAYITLARIN KAPANMASINA KALAN SÜRE"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Hedef Tarih (Boş bırakılırsa otomatik 4 gün ileri ayarlanır)
              </label>
              <input
                type="text"
                value={content.countdown?.targetDate || ''}
                onChange={(e) => updateNested(['countdown', 'targetDate'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
                placeholder="Örn: 2026-10-31T23:59:59 veya boş bırakın"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 2: KAYAN ŞERİT & İSTATİSTİKLER ── */}
      {activeSubTab === 'ticker_stats' && (
        <div className="space-y-8">
          {/* Values Ticker Section */}
          <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
            <div className="border-b border-gold/15 pb-4 flex justify-between items-center">
              <div>
                <h4 className="font-serif text-xl text-wine font-bold">Kayan Şerit Metinleri (Values Ticker)</h4>
                <p className="text-xs text-taupe/60">Sayfa ortasında sürekli kayan altın ve bordo şeritteki maddeler.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newItem = prompt('Yeni kayan şerit maddesi giriniz:');
                  if (newItem && newItem.trim()) {
                    setContent({
                      ...content,
                      tickerItems: [...content.tickerItems, newItem.trim().toUpperCase()]
                    });
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine text-white text-xs font-bold uppercase"
              >
                <HiOutlinePlus className="text-base" /> Madde Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.tickerItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-white border border-gold/15 rounded-xl">
                  <span className="text-gold font-bold text-xs shrink-0">✦</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...content.tickerItems];
                      updated[idx] = e.target.value;
                      setContent({ ...content, tickerItems: updated });
                    }}
                    className="flex-grow text-xs font-semibold text-wine bg-transparent focus:outline-none uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.tickerItems.filter((_, i) => i !== idx);
                      setContent({ ...content, tickerItems: updated });
                    }}
                    className="text-rose hover:text-burgundy p-1"
                    title="Sil"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
            <div className="border-b border-gold/15 pb-4">
              <h4 className="font-serif text-xl text-wine font-bold">4 İstatistik Kartı (Stats Bar)</h4>
              <p className="text-xs text-taupe/60">Hero bölümünün hemen altında yer alan 4 ana etki kutucuğu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="p-4 bg-white border border-gold/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold">KART 0{idx + 1}</span>
                  </div>
                  <div>
                    <label className="block text-[0.62rem] font-bold uppercase tracking-wider text-taupe/60 mb-1">
                      Büyük Rakam / İfade
                    </label>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => {
                        const updated = [...content.stats];
                        updated[idx].number = e.target.value;
                        setContent({ ...content, stats: updated });
                      }}
                      className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-lg font-serif font-bold text-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.62rem] font-bold uppercase tracking-wider text-taupe/60 mb-1">
                      Kart Başlığı
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...content.stats];
                        updated[idx].label = e.target.value;
                        setContent({ ...content, stats: updated });
                      }}
                      className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs font-bold text-wine uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.62rem] font-bold uppercase tracking-wider text-taupe/60 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={stat.desc}
                      onChange={(e) => {
                        const updated = [...content.stats];
                        updated[idx].desc = e.target.value;
                        setContent({ ...content, stats: updated });
                      }}
                      className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-taupe/80"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 3: KURUCU & İLKELER ── */}
      {activeSubTab === 'founder' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4">
            <h4 className="font-serif text-xl text-wine font-bold">Kurucu & Rehber Bölümü</h4>
            <p className="text-xs text-taupe/60">Deniz Bayraktar&apos;ın fotoğrafı yanında yer alan manifesto ve 3 temel ilke.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Bölüm Üst Etiketi
              </label>
              <input
                type="text"
                value={content.founder.eyebrow || ''}
                onChange={(e) => updateNested(['founder', 'eyebrow'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Kurucu Adı
              </label>
              <input
                type="text"
                value={content.founder.name || ''}
                onChange={(e) => updateNested(['founder', 'name'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Başlık 1. Satır
              </label>
              <input
                type="text"
                value={content.founder.titleLine1 || ''}
                onChange={(e) => updateNested(['founder', 'titleLine1'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Vurgulu Başlık
              </label>
              <input
                type="text"
                value={content.founder.titleAccent || ''}
                onChange={(e) => updateNested(['founder', 'titleAccent'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none font-bold text-burgundy"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Öne Çıkan Alıntı Metni
              </label>
              <textarea
                rows={3}
                value={content.founder.quote || ''}
                onChange={(e) => updateNested(['founder', 'quote'], e.target.value)}
                className="w-full p-3.5 bg-white border border-gold/20 rounded-xl text-xs text-charcoal focus:border-wine focus:outline-none font-serif italic"
              />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-gold/15">
              <h5 className="font-serif text-lg text-wine font-semibold mb-4">3 Temel Prensip (Kutucuklar)</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.founder.principles.map((pr, pIdx) => (
                  <div key={pIdx} className="p-4 bg-white border border-gold/20 rounded-xl space-y-3">
                    <span className="font-mono text-xs font-bold text-burgundy">İlke 0{pIdx + 1}</span>
                    <input
                      type="text"
                      value={pr.title}
                      onChange={(e) => {
                        const updated = [...content.founder.principles];
                        updated[pIdx].title = e.target.value;
                        setContent({ ...content, founder: { ...content.founder, principles: updated } });
                      }}
                      className="w-full p-2 bg-ivory border border-gold/15 rounded text-xs font-bold text-wine uppercase"
                      placeholder="Başlık"
                    />
                    <textarea
                      rows={3}
                      value={pr.desc}
                      onChange={(e) => {
                        const updated = [...content.founder.principles];
                        updated[pIdx].desc = e.target.value;
                        setContent({ ...content, founder: { ...content.founder, principles: updated } });
                      }}
                      className="w-full p-2 bg-ivory border border-gold/15 rounded text-xs text-taupe/80"
                      placeholder="Açıklama"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 4: DÖNÜŞÜMÜN 3 KAPISI ── */}
      {activeSubTab === 'gates' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4">
            <h4 className="font-serif text-xl text-wine font-bold">Dönüşümün Üç Kadim Kapısı</h4>
            <p className="text-xs text-taupe/60">Mastersoul müfredatındaki 3 kapının başlıkları, alt başlıkları ve konuları.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Bölüm Üst Etiketi
              </label>
              <input
                type="text"
                value={content.gatesSection.eyebrow || ''}
                onChange={(e) => updateNested(['gatesSection', 'eyebrow'], e.target.value)}
                className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Başlık 1. Kelime
              </label>
              <input
                type="text"
                value={content.gatesSection.titleLine1 || ''}
                onChange={(e) => updateNested(['gatesSection', 'titleLine1'], e.target.value)}
                className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                Vurgulu Başlık
              </label>
              <input
                type="text"
                value={content.gatesSection.titleAccent || ''}
                onChange={(e) => updateNested(['gatesSection', 'titleAccent'], e.target.value)}
                className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs text-burgundy font-bold"
              />
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-gold/15">
            {content.gatesSection.gates.map((gate, gIdx) => (
              <div key={gIdx} className="p-5 bg-white border border-gold/20 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                  <span className="font-cinzel text-base font-bold text-wine">{gate.gateNumber}</span>
                  <input
                    type="text"
                    value={gate.phaseBadge}
                    onChange={(e) => {
                      const updated = [...content.gatesSection.gates];
                      updated[gIdx].phaseBadge = e.target.value;
                      setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                    }}
                    className="p-1 px-3 bg-burgundy/10 text-burgundy font-bold text-[0.62rem] uppercase rounded"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Kapı Adı</label>
                    <input
                      type="text"
                      value={gate.title}
                      onChange={(e) => {
                        const updated = [...content.gatesSection.gates];
                        updated[gIdx].title = e.target.value;
                        setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                      }}
                      className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-sm font-serif font-bold text-wine"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Alt Başlık</label>
                    <input
                      type="text"
                      value={gate.subtitle}
                      onChange={(e) => {
                        const updated = [...content.gatesSection.gates];
                        updated[gIdx].subtitle = e.target.value;
                        setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                      }}
                      className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs font-bold text-burgundy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Açıklama</label>
                  <textarea
                    rows={2}
                    value={gate.description}
                    onChange={(e) => {
                      const updated = [...content.gatesSection.gates];
                      updated[gIdx].description = e.target.value;
                      setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-taupe/80"
                  />
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">
                    Konular (Her satıra bir konu yazınız)
                  </label>
                  <textarea
                    rows={4}
                    value={gate.topics.join('\n')}
                    onChange={(e) => {
                      const updated = [...content.gatesSection.gates];
                      updated[gIdx].topics = e.target.value.split('\n').filter(Boolean);
                      setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-wine font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Sonuç Notu</label>
                  <input
                    type="text"
                    value={gate.resultText}
                    onChange={(e) => {
                      const updated = [...content.gatesSection.gates];
                      updated[gIdx].resultText = e.target.value;
                      setContent({ ...content, gatesSection: { ...content.gatesSection, gates: updated } });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-taupe/70 font-bold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SUB-TAB 5: HİZALANMA / KİMLER İÇİN? ── */}
      {activeSubTab === 'alignment' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4">
            <h4 className="font-serif text-xl text-wine font-bold">Hizalanma & Uygunluk Testi</h4>
            <p className="text-xs text-taupe/60">&quot;Bu Yolculuk Sizin İçin Eğer&quot; ve &quot;Size Göre Değil Eğer&quot; kriter listeleri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For You */}
            <div className="p-5 bg-white border-2 border-burgundy/20 rounded-xl space-y-4">
              <h5 className="font-serif text-lg text-wine font-bold">Uygun Aday Kriterleri</h5>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={content.alignmentSection.forYou.title}
                  onChange={(e) => updateNested(['alignmentSection', 'forYou', 'title'], e.target.value)}
                  className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs font-bold text-wine"
                />
              </div>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">
                  Maddeler (Her satıra bir madde)
                </label>
                <textarea
                  rows={6}
                  value={content.alignmentSection.forYou.items.join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(Boolean);
                    updateNested(['alignmentSection', 'forYou', 'items'], lines);
                  }}
                  className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-taupe/90 leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Sonuç Mesajı</label>
                <input
                  type="text"
                  value={content.alignmentSection.forYou.conclusion}
                  onChange={(e) => updateNested(['alignmentSection', 'forYou', 'conclusion'], e.target.value)}
                  className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-burgundy font-bold"
                />
              </div>
            </div>

            {/* Not For You */}
            <div className="p-5 bg-wine/5 border-2 border-wine/20 rounded-xl space-y-4">
              <h5 className="font-serif text-lg text-wine font-bold">Uygun Değil Kriterleri</h5>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Kart Başlığı</label>
                <input
                  type="text"
                  value={content.alignmentSection.notForYou.title}
                  onChange={(e) => updateNested(['alignmentSection', 'notForYou', 'title'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-gold/20 rounded-lg text-xs font-bold text-wine"
                />
              </div>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">
                  Maddeler (Her satıra bir madde)
                </label>
                <textarea
                  rows={6}
                  value={content.alignmentSection.notForYou.items.join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(Boolean);
                    updateNested(['alignmentSection', 'notForYou', 'items'], lines);
                  }}
                  className="w-full p-2.5 bg-white border border-gold/20 rounded-lg text-xs text-taupe/90 leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Sonuç Mesajı</label>
                <input
                  type="text"
                  value={content.alignmentSection.notForYou.conclusion}
                  onChange={(e) => updateNested(['alignmentSection', 'notForYou', 'conclusion'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-gold/20 rounded-lg text-xs text-rose font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 6: KATILIMCI YORUMLARI ── */}
      {activeSubTab === 'testimonials' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4 flex justify-between items-center">
            <div>
              <h4 className="font-serif text-xl text-wine font-bold">Katılımcı Deneyimleri & Yorumlar</h4>
              <p className="text-xs text-taupe/60">Sayfada yer alan katılımcı görüşleri ve değerlendirmeleri.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newTestimonial = {
                  id: 't_' + Math.random().toString(36).substr(2, 6),
                  rating: 5,
                  text: 'Yeni katılımcı deneyim metni...',
                  author: 'YENİ KATILIMCI',
                  title: 'DÖNÜŞÜM PORTALI'
                };
                setContent({
                  ...content,
                  testimonialsSection: {
                    ...content.testimonialsSection,
                    items: [...content.testimonialsSection.items, newTestimonial]
                  }
                });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine text-white text-xs font-bold uppercase"
            >
              <HiOutlinePlus className="text-base" /> Yorum Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonialsSection.items.map((item, idx) => (
              <div key={item.id || idx} className="p-5 bg-white border border-gold/20 rounded-xl space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => {
                    const updated = content.testimonialsSection.items.filter((_, i) => i !== idx);
                    setContent({
                      ...content,
                      testimonialsSection: {
                        ...content.testimonialsSection,
                        items: updated
                      }
                    });
                  }}
                  className="absolute top-3 right-3 text-rose hover:text-burgundy p-1"
                  title="Yorumu Sil"
                >
                  <HiOutlineTrash className="text-base" />
                </button>

                <div className="text-burgundy text-xs font-bold">
                  {'★'.repeat(item.rating || 5)}
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Yorum Metni</label>
                  <textarea
                    rows={4}
                    value={item.text}
                    onChange={(e) => {
                      const updated = [...content.testimonialsSection.items];
                      updated[idx].text = e.target.value;
                      setContent({
                        ...content,
                        testimonialsSection: { ...content.testimonialsSection, items: updated }
                      });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/15 rounded-lg text-xs italic text-wine"
                  />
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Katılımcı Adı</label>
                  <input
                    type="text"
                    value={item.author}
                    onChange={(e) => {
                      const updated = [...content.testimonialsSection.items];
                      updated[idx].author = e.target.value;
                      setContent({
                        ...content,
                        testimonialsSection: { ...content.testimonialsSection, items: updated }
                      });
                    }}
                    className="w-full p-2 bg-ivory border border-gold/15 rounded-lg text-xs font-bold text-wine uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Eğitim / Ünvan</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...content.testimonialsSection.items];
                      updated[idx].title = e.target.value;
                      setContent({
                        ...content,
                        testimonialsSection: { ...content.testimonialsSection, items: updated }
                      });
                    }}
                    className="w-full p-2 bg-ivory border border-gold/15 rounded-lg text-xs font-bold text-burgundy uppercase"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SUB-TAB 7: SIKÇA SORULAN SORULAR ── */}
      {activeSubTab === 'faq' && (
        <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="border-b border-gold/15 pb-4 flex justify-between items-center">
            <div>
              <h4 className="font-serif text-xl text-wine font-bold">Sıkça Sorulan Sorular (SSS / FAQ)</h4>
              <p className="text-xs text-taupe/60">Ziyaretçilerin en çok sorduğu sorular ve detaylı yanıtları.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFaq = {
                  q: 'Yeni Soru Başlığı?',
                  a: 'Detaylı ve aydınlatıcı cevap metni buraya yazılacaktır.'
                };
                setContent({
                  ...content,
                  faqSection: {
                    ...content.faqSection,
                    items: [...content.faqSection.items, newFaq]
                  }
                });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-wine text-white text-xs font-bold uppercase"
            >
              <HiOutlinePlus className="text-base" /> Soru Ekle
            </button>
          </div>

          <div className="space-y-4">
            {content.faqSection.items.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white border border-gold/20 rounded-xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const updated = content.faqSection.items.filter((_, i) => i !== idx);
                    setContent({
                      ...content,
                      faqSection: { ...content.faqSection, items: updated }
                    });
                  }}
                  className="absolute top-4 right-4 text-rose hover:text-burgundy p-1"
                  title="Soruyu Sil"
                >
                  <HiOutlineTrash className="text-base" />
                </button>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">
                    Soru 0{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const updated = [...content.faqSection.items];
                      updated[idx].q = e.target.value;
                      setContent({
                        ...content,
                        faqSection: { ...content.faqSection, items: updated }
                      });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-sm font-serif font-bold text-wine pr-10"
                  />
                </div>

                <div>
                  <label className="block text-[0.62rem] font-bold uppercase text-taupe/60 mb-1">Cevap</label>
                  <textarea
                    rows={3}
                    value={faq.a}
                    onChange={(e) => {
                      const updated = [...content.faqSection.items];
                      updated[idx].a = e.target.value;
                      setContent({
                        ...content,
                        faqSection: { ...content.faqSection, items: updated }
                      });
                    }}
                    className="w-full p-2.5 bg-ivory border border-gold/20 rounded-lg text-xs text-taupe/85 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SUB-TAB 8: DUYURU & FOOTER ── */}
      {activeSubTab === 'announcement_footer' && (
        <div className="space-y-8">
          {/* Top Announcement Bar */}
          <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
            <div className="border-b border-gold/15 pb-4 flex justify-between items-center">
              <div>
                <h4 className="font-serif text-xl text-wine font-bold">Üst Duyuru Çubuğu (Announcement Bar)</h4>
                <p className="text-xs text-taupe/60">Sayfanın en tepesinde dikkat çeken kampanya ve haber şeridi.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.announcement?.enabled || false}
                  onChange={(e) => updateNested(['announcement', 'enabled'], e.target.checked)}
                  className="w-5 h-5 accent-wine cursor-pointer"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-wine">
                  {content.announcement?.enabled ? 'AKTİF (AÇIK)' : 'PASİF (KAPALI)'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Duyuru Rozeti (Badge)
                </label>
                <input
                  type="text"
                  value={content.announcement?.badge || ''}
                  onChange={(e) => updateNested(['announcement', 'badge'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                  placeholder="Örn: YENİ"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Duyuru Metni
                </label>
                <input
                  type="text"
                  value={content.announcement?.text || ''}
                  onChange={(e) => updateNested(['announcement', 'text'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                  placeholder="Örn: Yeni dönem dönüşüm programları kayıtları başlamıştır."
                />
              </div>

              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Buton / Link Metni
                </label>
                <input
                  type="text"
                  value={content.announcement?.linkText || ''}
                  onChange={(e) => updateNested(['announcement', 'linkText'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                  placeholder="Örn: İncele"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Hedef URL / Çapa
                </label>
                <input
                  type="text"
                  value={content.announcement?.linkUrl || ''}
                  onChange={(e) => updateNested(['announcement', 'linkUrl'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                  placeholder="Örn: #portallar"
                />
              </div>
            </div>
          </div>

          {/* Footer Settings */}
          <div className="bg-white/70 border border-gold/15 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
            <div className="border-b border-gold/15 pb-4">
              <h4 className="font-serif text-xl text-wine font-bold">Footer & İletişim Bilgileri</h4>
              <p className="text-xs text-taupe/60">Sayfa altında yer alan şirket adı, yasal tebligat adresi ve telif hakkı metni.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Şirket / Rehber Ticari Ünvanı (PayTR Yasal Zorunluluk)
                </label>
                <input
                  type="text"
                  value={content.footer?.companyTitle || ''}
                  onChange={(e) => updateNested(['footer', 'companyTitle'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs font-bold"
                  placeholder="Örn: DENİZ BAYRAKTAR"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  İletişim / Destek E-posta Adresi
                </label>
                <input
                  type="email"
                  value={content.footer?.email || ''}
                  onChange={(e) => updateNested(['footer', 'email'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                  placeholder="Örn: info@lyraonearth.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Fiziki Adres (PayTR & Yasal Tebligat)
                </label>
                <input
                  type="text"
                  value={content.footer?.address || ''}
                  onChange={(e) => updateNested(['footer', 'address'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[0.68rem] font-bold uppercase tracking-wider text-taupe/70 mb-1.5">
                  Telif Hakkı (Copyright) Metni
                </label>
                <input
                  type="text"
                  value={content.footer?.copyright || ''}
                  onChange={(e) => updateNested(['footer', 'copyright'], e.target.value)}
                  className="w-full p-3 bg-white border border-gold/20 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
