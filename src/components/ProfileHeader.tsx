'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaSpotify, FaEnvelope, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getProfile, ProfileData, defaultProfile } from '@/data/defaults';

const socialIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  instagram: { icon: FaInstagram, label: 'Instagram' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
  spotify: { icon: FaSpotify, label: 'Spotify' },
  email: { icon: FaEnvelope, label: 'E-posta' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
};

export default function ProfileHeader() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    const loadProfile = async () => {
      setProfile(await getProfile());
    };
    loadProfile();
  }, []);

  const activeSocials = Object.entries(profile.socials).filter(([, url]) => url);

  return (
    <section className="pt-12 lg:pt-4 pb-8 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
      {/* Avatar with glow ring */}
      <motion.div
        className="relative mb-6 group/avatar"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Editorial offset gold frame */}
        <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/30 -z-10 transition-transform duration-500 group-hover/avatar:translate-x-1 group-hover/avatar:translate-y-1" />

        <div className="relative w-28 h-28 lg:w-60 lg:h-60 rounded-none overflow-hidden shadow-2xl border border-gold/10 transition-all duration-500">
          <Image
            src={profile.avatar || '/deniz_bayraktar.jpeg'}
            alt={profile.name || 'Deniz Bayraktar'}
            fill
            sizes="(max-width: 1024px) 112px, 240px"
            className="object-cover"
            priority
          />
        </div>
        {/* Glow effect behind avatar */}
        <div className="absolute -inset-3 bg-gradient-to-br from-gold/15 via-transparent to-burgundy/5 blur-2xl -z-20" />
      </motion.div>

      {/* Brand name */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <h1 className="font-serif text-2xl lg:text-3xl tracking-[0.1em] text-wine font-semibold mb-1">
          {profile.name}
        </h1>
        <span className="text-[0.65rem] lg:text-[0.7rem] tracking-[0.3em] text-[#A39B94] font-bold uppercase block">
          {profile.brandName}
        </span>
      </motion.div>

      {/* Bio */}
      <motion.p
        className="text-taupe/70 text-[0.95rem] leading-relaxed max-w-xs lg:max-w-sm mb-6 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        {profile.bio}
      </motion.p>

      {/* Social icons */}
      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        {activeSocials.map(([key, url]) => {
          const social = socialIcons[key];
          if (!social) return null;
          const IconComp = social.icon;
          return (
            <a
              key={key}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-none bg-white/40 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-wine/75 hover:text-white hover:border-wine hover:bg-wine hover:shadow-xl hover:scale-102 active:scale-98 transition-all duration-400"
              aria-label={social.label}
            >
              <IconComp className="text-[1.1rem]" />
            </a>
          );
        })}
      </motion.div>


    </section>
  );
}
