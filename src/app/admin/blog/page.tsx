'use client';

import { useState, useEffect } from 'react';
import { defaultPosts, defaultImages } from '@/data/defaults';
import CustomSelect from '@/components/CustomSelect';
import { compressImage } from '@/utils/image';

const categories = ['Spiritüel Gelişim', 'Enerji Çalışmaları', 'Meditasyon', 'Kristaller', 'Astroloji', 'Ritüel', 'Farkındalık', 'Bilinç'];

export default function AdminBlog() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Spiritüel Gelişim');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState(defaultImages[0].url);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('custom_blog_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('custom_blog_posts', JSON.stringify(defaultPosts));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const day = now.getDate();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const postData = {
      title,
      excerpt,
      category,
      readTime: readTime.includes('dk') ? readTime : readTime + ' dk',
      date: editingIndex !== null ? posts[editingIndex].date : `${day} ${month} ${year}`,
      gradient: editingIndex !== null ? posts[editingIndex].gradient : 'from-burgundy/8 to-pink/15',
      featured: editingIndex !== null ? posts[editingIndex].featured : false,
      image: image,
    };

    let updated;
    if (editingIndex !== null) {
      updated = [...posts];
      updated[editingIndex] = postData;
      setEditingIndex(null);
    } else {
      updated = [...posts, postData];
    }

    setPosts(updated);
    localStorage.setItem('custom_blog_posts', JSON.stringify(updated));
    setTitle('');
    setExcerpt('');
    setCategory('Spiritüel Gelişim');
    setReadTime('');
  };

  const handleEdit = (index: number) => {
    const post = posts[index];
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setReadTime(post.readTime.replace(' dk', ''));
    setImage(post.image || defaultImages[0].url);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = posts.filter((_, i) => i !== index);
    setPosts(updated);
    localStorage.setItem('custom_blog_posts', JSON.stringify(updated));
  };

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-wine mb-2">Blog Yönetimi</h2>
        <p className="text-taupe/50 text-sm tracking-widest uppercase">Yeni blog yazısı ekleyin veya mevcutları silin.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="premium-card p-8 bg-white/60 backdrop-blur-2xl">
            <h3 className="font-serif text-2xl text-wine mb-6">{editingIndex !== null ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Başlık</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                  placeholder="Örn: Yeni Bilinç Boyutları"
                  required
                />
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Özet</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine h-24"
                  placeholder="Yazı özeti..."
                  required
                />
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Kategori</label>
                <CustomSelect
                  value={category}
                  onChange={setCategory}
                  options={categories}
                />
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-2">Okuma Süresi (Dk)</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 outline-none focus:border-burgundy/30 transition-all text-wine"
                  placeholder="Örn: 5"
                  required
                />
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-widest font-bold text-gold mb-4">Kapak Görseli</label>
                
                <div className="mb-6 p-4 border border-gold/10 rounded-2xl bg-white/50">
                  <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-taupe/60 mb-2">Bilgisayardan Fotoğraf Yükle</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const compressed = await compressImage(file);
                          setImage(compressed);
                        } catch (error) {
                          console.error('Görsel yüklenemedi:', error);
                        }
                      }
                    }}
                    className="w-full text-xs text-taupe/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
                  />
                </div>

                <div className="max-h-80 overflow-y-auto pr-2 border border-gold/5 rounded-xl p-2 bg-white/30">
                  <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-taupe/60 mb-2 px-1">Veya Varsayılan Görsellerden Seç</label>
                  <div className="grid grid-cols-1 gap-4">
                    {defaultImages.map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => setImage(img.url)}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          image === img.url 
                            ? 'border-gold shadow-lg shadow-gold/20 scale-[0.98]' 
                            : 'border-transparent hover:border-gold/30'
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          image === img.url ? 'bg-black/20' : 'bg-black/50 opacity-0 hover:opacity-100'
                        }`}>
                          <span className="text-white text-sm font-medium text-center px-4 bg-black/60 py-2 rounded-full">{img.name}</span>
                        </div>
                        {image === img.url && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
               <button type="submit" className="btn-primary w-full !rounded-2xl py-4">
                {editingIndex !== null ? 'GÜNCELLE' : 'EKLE'}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="premium-card p-8 bg-white/40">
            <h3 className="font-serif text-2xl text-wine mb-6">Eklenen Yazılar</h3>
            {posts.length === 0 ? (
              <p className="text-taupe/60 text-center py-12">Henüz yeni bir yazı eklenmemiş.</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-white/80 rounded-2xl border border-gold/5">
                    <div>
                      <h4 className="font-serif text-xl text-wine">{post.title}</h4>
                      <p className="text-sm text-taupe/60 max-w-md">{post.excerpt}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-gold/10 text-gold-dark px-2 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs bg-ivory text-taupe/40 px-2 py-1 rounded-full">{post.date}</span>
                        <span className="text-xs bg-ivory text-taupe/40 px-2 py-1 rounded-full">{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleEdit(index)}
                        className="text-gold hover:text-gold/80 text-sm font-bold uppercase tracking-widest"
                      >
                        DÜZENLE
                      </button>
                      <button 
                        onClick={() => handleDelete(index)}
                        className="text-burgundy hover:text-burgundy/80 text-sm font-bold uppercase tracking-widest"
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
