'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import PhotoStack from '@/components/PhotoStack';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} id="about" className="relative border-t border-subtle py-16 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 crt-scanlines" />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute -top-24 -left-24 h-80 w-80 rotate-12 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute -bottom-24 -right-24 h-72 w-72 -rotate-6 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute top-1/2 -right-32 h-64 w-64 -translate-y-1/2 rotate-3 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute bottom-1/2 -left-32 h-64 w-64 -translate-y-1/2 -rotate-3 border border-subtle bg-card/50"
        />
      </div>

      <SectionHeading index="01" title={t('title')} />

      <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-balance font-mono text-lg leading-snug md:text-xl text-fg">{t('bio')}</p>
          <p className="mt-6 inline-block -rotate-1 border border-subtle bg-card px-4 py-3 font-mono text-xs leading-relaxed text-fg">
            {t('objective')}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <PhotoStack />
        </div>
      </div>
    </section>
  );
}