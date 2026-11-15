'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import TerminalCard from '@/components/TerminalCard';
import ParallaxImage from '@/components/ParallaxImage';
import { GithubIcon } from '@/components/icons';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 48]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.45,
      ease: 'easeOut' as const,
      delay: reduceMotion ? 0 : delay,
    },
  });

  const meta = [
    { label: t('study'), value: 'BIU · 2022—2026' },
    { label: t('gpa'), value: '3.25' },
    { label: t('based'), value: t('location') },
  ];

  return (
    <section ref={ref} id="home" className="relative overflow-hidden border-b border-subtle">
      <div aria-hidden className="pointer-events-none absolute inset-0 crt-scanlines" />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          style={{ y: layer1Y }}
          className="absolute -top-40 left-1/4 h-96 w-96 -translate-x-1/2 rotate-12 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: layer2Y }}
          className="absolute top-20 right-1/4 h-64 w-64 -translate-x-1/2 -rotate-6 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: layer3Y }}
          className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rotate-3 border border-subtle bg-card/50"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div style={{ y: textY }}>
            <motion.div
              {...enter(0.05)}
              className="inline-flex items-center gap-2 border border-subtle bg-card px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg"
            >
              <span aria-hidden className="h-2 w-2 bg-neon-magenta" />
              {'>'} {t('role')}
            </motion.div>

            <motion.h1
              {...enter(0.1)}
              className="font-synth mt-4 text-[clamp(3rem,12vw,7rem)] font-bold leading-[0.85] tracking-[-0.02em] text-fg"
            >
              {t('name')}
              <span className="text-neon-magenta">.</span>
            </motion.h1>

            <motion.p
              {...enter(0.15)}
              className="mt-5 max-w-md text-base leading-relaxed text-muted"
            >
              {t('tagline')}
            </motion.p>

            <motion.div {...enter(0.2)} className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://github.com/bachthanhvinh"
                target="_blank"
                rel="noreferrer"
                className="btn-neon-magenta inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]"
              >
                <GithubIcon size={14} />
                {t('github')}
              </a>
              <a
                href="#contact"
                className="btn-neon inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]"
              >
                {t('contact')}
                <ArrowDown size={14} />
              </a>
            </motion.div>

            <motion.div {...enter(0.25)} className="mt-9 flex flex-wrap gap-3">
              {meta.map((entry, index) => (
                <div
                  key={entry.label}
                  className={`border border-subtle bg-card px-3 py-2 ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                    {entry.label}
                  </div>
                  <div className="mt-0.5 font-mono text-sm text-fg">{entry.value}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: cardY }} className="relative">
            <div className="absolute -top-6 right-0 z-0 hidden w-40 rotate-3 border border-subtle bg-card p-1.5 sm:block">
              <ParallaxImage
                src="/images/circuit.jpg"
                alt=""
                sizes="160px"
                className="aspect-square border border-subtle"
              />
              <div className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                fig. 01
              </div>
            </div>

            <motion.div {...enter(0.3)} className="relative z-10 mx-auto w-full max-w-md">
              <TerminalCard />
            </motion.div>
          </motion.div>
        </div>

        <div className="flex items-center gap-3 border-t border-subtle py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span aria-hidden className="h-px w-8 bg-border" />
          {t('scroll')}
          <ArrowDown size={12} className="text-neon-magenta" />
        </div>
      </div>
    </section>
  );
}