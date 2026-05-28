'use client';

import { useState, useEffect } from 'react';
import { defaultPageContent, getFeaturedItems, getTestimonials } from '@/data/defaults';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import CustomSelect from '@/components/CustomSelect';

const TABS = [
  { id: 'hero', label: 'Giriş (Hero)' },
  { id: 'services', label: 'Hizmetler' },
  { id: 'featured', label: 'Öne Çıkanlar' },
  { id: 'testimonials', label: 'Yorumlar' },
  { id: 'blog', label: 'Kütüphane' },
  { id: 'cta', label: 'Kapanış (CTA)' }
];

export default function AdminSayfalar() {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(defaultPageContent);
  const [featured, setFeatured] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Modals / Editors state
  const [editingFeatured, setEditingFeatured] = useState<any | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('custom_page_content');
    if (saved) {
      setContent({ ...defaultPageContent, ...JSON.parse(saved) });
    } else {
      setContent(defaultPageContent);
    }
    setFeatured(getFeaturedItems());
    setTestimonials(getTestimonials());
  }, []);

  const handleSaveHeaders = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('custom_page_content', JSON.stringify(content));
    showSaveSuccess();
  };

  const showSaveSuccess = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (key: keyof typeof defaultPageContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const saveFeatured = () => {
    const newFeatured = editingFeatured.index !== undefined
      ? featured.map((item, i) => i === editingFeatured.index ? editingFeatured : item)
      : [...featured, editingFeatured];
    setFeatured(newFeatured);
    localStorage.setItem('custom_featured_items', JSON.stringify(newFeatured));
    setEditingFeatured(null);
  };

  const deleteFeatured = (index: number) => {
    const newFeatured = featured.filter((_, i) => i !== index);
    setFeatured(newFeatured);
    localStorage.setItem('custom_featured_items', JSON.stringify(newFeatured));
  };

  const saveTestimonial = () => {
    const newTestimonial = editingTestimonial.index !== undefined
      ? testimonials.map((item, i) => i === editingTestimonial.index ? editingTestimonial : item)
      : [...testimonials, editingTestimonial];
    setTestimonials(newTestimonial);
    localStorage.setItem('custom_testimonials', JSON.stringify(newTestimonial));
    setEditingTestimonial(null);
  };

  const deleteTestimonial = (index: number) => {
    const newTestimonial = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonial);
    localStorage.setItem('custom_testimonials', JSON.stringify(newTestimonial));
  };

  const renderHeaderForm = (
    labelKey: keyof typeof defaultPageContent,
    title1Key: keyof typeof defaultPageContent,
    title2Key: keyof typeof defaultPageContent,
    descKey?: keyof typeof defaultPageContent
  ) => (
    <form onSubmit={handleSaveHeaders} className="space-y-6">
      <div>
        <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Üst Etiket</label>
        <input
          type="text"
          value={content[labelKey as keyof typeof defaultPageContent]}
          onChange={(e) => handleChange(labelKey, e.target.value)}
          className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 1</label>
          <input
            type="text"
            value={content[title1Key as keyof typeof defaultPageContent]}
            onChange={(e) => handleChange(title1Key, e.target.value)}
            className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
            required
          />
        </div>
        <div>
          <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık - Satır 2 (Vurgulu)</label>
          <input
            type="text"
            value={content[title2Key as keyof typeof defaultPageContent]}
            onChange={(e) => handleChange(title2Key, e.target.value)}
            className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
            required
          />
        </div>
      </div>
      {descKey && (
        <div>
          <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Açıklama</label>
          <textarea
            value={content[descKey as keyof typeof defaultPageContent]}
            onChange={(e) => handleChange(descKey, e.target.value)}
            className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine h-24"
            required
          />
        </div>
      )}
      <div className="pt-4 flex items-center gap-4">
        <button type="submit" className="btn-primary !rounded-2xl py-4 px-12">KAYDET</button>
        {isSaved && <span className="text-green-600 font-medium text-sm tracking-widest uppercase">Başarıyla kaydedildi!</span>}
      </div>
    </form>
  );

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-wine mb-2">Sayfa Yönetimi</h2>
        <p className="text-taupe/50 text-sm tracking-widest uppercase">Anasayfadaki başlık, metin ve bölümleri yönetin.</p>
      </header>

      {/* TABS NAV */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
              activeTab === tab.id ? 'bg-burgundy text-cream shadow-lg' : 'bg-white/50 text-gold hover:bg-gold/10 border border-gold/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="premium-card p-8 bg-white/60 backdrop-blur-2xl max-w-4xl">
        {activeTab === 'hero' && renderHeaderForm('heroLabel', 'heroTitleLine1', 'heroTitleLine2', 'heroDescription')}
        {activeTab === 'services' && renderHeaderForm('servicesLabel', 'servicesTitleLine1', 'servicesTitleLine2', 'servicesDescription')}
        {activeTab === 'blog' && renderHeaderForm('blogLabel', 'blogTitleLine1', 'blogTitleLine2', 'blogDescription')}
        {activeTab === 'cta' && renderHeaderForm('ctaLabel', 'ctaTitleLine1', 'ctaTitleLine2', 'ctaDescription')}

        {activeTab === 'featured' && (
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl text-wine mb-6 pb-2 border-b border-gold/20">Bölüm Başlıkları</h3>
              {renderHeaderForm('featuredLabel', 'featuredTitleLine1', 'featuredTitleLine2', 'featuredDescription')}
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold/20">
                <h3 className="font-serif text-2xl text-wine">Öne Çıkan İçerikler</h3>
                <button 
                  onClick={() => setEditingFeatured({ tag: 'Yeni İçerik', title: '', description: '', date: '', color: 'from-gold to-gold-dark', icon: 'HiOutlineStar', link: '/' })}
                  className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-2"
                >
                  <HiOutlinePlus /> YENİ EKLE
                </button>
              </div>

              {editingFeatured && (
                <div className="bg-ivory p-6 rounded-3xl border border-gold/20 mb-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Başlık</label>
                      <input type="text" value={editingFeatured.title} onChange={e => setEditingFeatured({...editingFeatured, title: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Etiket</label>
                      <input type="text" value={editingFeatured.tag} onChange={e => setEditingFeatured({...editingFeatured, tag: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Tarih / Durum</label>
                      <input type="text" value={editingFeatured.date} onChange={e => setEditingFeatured({...editingFeatured, date: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Yönlendirme Linki</label>
                      <input type="text" value={editingFeatured.link} onChange={e => setEditingFeatured({...editingFeatured, link: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Açıklama</label>
                    <textarea value={editingFeatured.description} onChange={e => setEditingFeatured({...editingFeatured, description: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm h-16" />
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={() => setEditingFeatured(null)} className="px-4 py-2 text-taupe text-sm">İptal</button>
                    <button onClick={saveFeatured} className="btn-primary !py-2 !px-6">Kaydet</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {featured.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-gold/10">
                    <div>
                      <div className="text-wine font-serif text-lg">{item.title}</div>
                      <div className="text-gold text-xs font-bold tracking-widest uppercase">{item.tag}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingFeatured({ ...item, index })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-white transition-colors"><HiOutlinePencil /></button>
                      <button onClick={() => deleteFeatured(index)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"><HiOutlineTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl text-wine mb-6 pb-2 border-b border-gold/20">Bölüm Başlıkları</h3>
              {renderHeaderForm('testimonialsLabel', 'testimonialsTitleLine1', 'testimonialsTitleLine2')}
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold/20">
                <h3 className="font-serif text-2xl text-wine">Yorumlar</h3>
                <button 
                  onClick={() => setEditingTestimonial({ name: '', role: '', text: '', rating: 5 })}
                  className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-2"
                >
                  <HiOutlinePlus /> YENİ EKLE
                </button>
              </div>

              {editingTestimonial && (
                <div className="bg-ivory p-6 rounded-3xl border border-gold/20 mb-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">İsim Soyisim (veya Kısaltma)</label>
                      <input type="text" value={editingTestimonial.name} onChange={e => setEditingTestimonial({...editingTestimonial, name: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Ünvan / Rol</label>
                      <input type="text" value={editingTestimonial.role} onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-gold mb-1">Yorum Metni</label>
                    <textarea value={editingTestimonial.text} onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})} className="w-full bg-white/50 border border-gold/10 rounded-xl px-4 py-2 text-sm h-24" />
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-taupe text-sm">İptal</button>
                    <button onClick={saveTestimonial} className="btn-primary !py-2 !px-6">Kaydet</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {testimonials.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-gold/10">
                    <div>
                      <div className="text-wine font-serif text-lg">{item.name}</div>
                      <div className="text-gold text-xs font-bold tracking-widest uppercase">{item.role}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingTestimonial({ ...item, index })} className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-white transition-colors"><HiOutlinePencil /></button>
                      <button onClick={() => deleteTestimonial(index)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"><HiOutlineTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
