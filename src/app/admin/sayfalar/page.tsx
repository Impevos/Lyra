'use client';

import { useState, useEffect } from 'react';
import { defaultPageContent } from '@/data/defaults';

export default function AdminSayfalar() {
  const [content, setContent] = useState(defaultPageContent);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('custom_page_content');
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      setContent(defaultPageContent);
      localStorage.setItem('custom_page_content', JSON.stringify(defaultPageContent));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('custom_page_content', JSON.stringify(content));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (key: keyof typeof defaultPageContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-wine mb-2">Sayfa Yönetimi</h2>
        <p className="text-taupe/50 text-sm tracking-widest uppercase">Anasayfadaki başlık ve metinleri düzenleyin.</p>
      </header>

      <div className="premium-card p-8 bg-white/60 backdrop-blur-2xl max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h3 className="font-serif text-2xl text-wine mb-4 border-b border-gold/20 pb-2">Hero (Giriş) Bölümü</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Üst Etiket</label>
                <input
                  type="text"
                  value={content.heroLabel}
                  onChange={(e) => handleChange('heroLabel', e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 1</label>
                  <input
                    type="text"
                    value={content.heroTitleLine1}
                    onChange={(e) => handleChange('heroTitleLine1', e.target.value)}
                    className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 2 (Vurgulu)</label>
                  <input
                    type="text"
                    value={content.heroTitleLine2}
                    onChange={(e) => handleChange('heroTitleLine2', e.target.value)}
                    className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Açıklama</label>
                <textarea
                  value={content.heroDescription}
                  onChange={(e) => handleChange('heroDescription', e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine h-24"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-wine mb-4 border-b border-gold/20 pb-2 mt-8">CTA (Çağrı) Bölümü</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Üst Etiket</label>
                <input
                  type="text"
                  value={content.ctaLabel}
                  onChange={(e) => handleChange('ctaLabel', e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 1</label>
                  <input
                    type="text"
                    value={content.ctaTitleLine1}
                    onChange={(e) => handleChange('ctaTitleLine1', e.target.value)}
                    className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 2 (Vurgulu)</label>
                  <input
                    type="text"
                    value={content.ctaTitleLine2}
                    onChange={(e) => handleChange('ctaTitleLine2', e.target.value)}
                    className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Açıklama</label>
                <textarea
                  value={content.ctaDescription}
                  onChange={(e) => handleChange('ctaDescription', e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine h-24"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button type="submit" className="btn-primary !rounded-2xl py-4 px-12">
              KAYDET
            </button>
            {isSaved && (
              <span className="text-green-600 font-medium text-sm tracking-widest uppercase">
                Başarıyla kaydedildi!
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
