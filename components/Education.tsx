'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Education() {
  const t = useTranslations('education');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} id="education" className="relative border-t border-subtle py-16 md:py-24 overflow-hidden">
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

      <SectionHeading index="04" title={t('title')} />

      <div className="mt-8 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal intensity="strong">
          <div className="-rotate-1 card-base p-6 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-transparent to-transparent" />
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">GPA</div>
              <div className="mt-4 font-synth text-7xl leading-none text-neon-magenta">3.25</div>
              <div className="mt-6 h-0.5 w-full bg-border" />
              <div className="mt-3 font-mono text-[11px] text-muted">BIU · 2022—2026</div>
            </div>
          </div>
        </Reveal>

        <Reveal intensity="strong">
          <div className="rotate-1 card-base p-6 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-900/50 to-neutral-900/50" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-subtle pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  transcript
                </span>
                <span aria-hidden className="h-2 w-2 bg-neon-cyan" />
              </div>

              <ol className="relative mt-5 border-l-2 border-subtle pl-6">
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-1 h-3 w-3 border-2 border-neon-magenta bg-neon-magenta"
                  />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {t('period')}
                  </div>
                  <h3 className="mt-1 font-synth text-2xl text-fg">{t('school')}</h3>
                  <p className="mt-1 text-sm text-muted">{t('major')}</p>
                </li>
              </ol>

              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                <span className="h-px w-6 bg-border" />
                2022 — 2026
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}