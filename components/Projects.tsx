'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import TiltCard from '@/components/TiltCard';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const columns = ['TODO', 'DOING', 'DONE'] as const;
const options = ['A', 'B', 'C', 'D'] as const;

export default function Projects() {
  const t = useTranslations('projects');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} id="projects" className="relative border-t border-subtle py-16 md:py-24 overflow-hidden">
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

      <SectionHeading index="03" title={t('title')} />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <TiltCard max={10} className="-rotate-1 transition-transform hover:rotate-0">
          <article className="card-base flex h-full flex-col relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-transparent to-neutral-900/50" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden border-b border-subtle bg-card p-4 z-10">
              <div aria-hidden className="flex h-full gap-2">
                {columns.map((column, columnIndex) => (
                  <div key={column} className="flex-1 border border-subtle bg-card p-1.5">
                    <div className="flex items-center justify-between border-b border-subtle pb-1">
                      <span className="font-mono text-[7px] tracking-[0.15em] text-muted">
                        {column}
                      </span>
                      <span className="h-1 w-1 bg-neon-magenta" />
                    </div>
                    <div className="mt-1.5 space-y-1.5">
                      {Array.from({ length: columnIndex === 1 ? 2 : 3 }).map((_, cardIndex) => (
                        <div
                          key={cardIndex}
                          className={`h-7 border bg-card p-1 ${
                            cardIndex === 0 && columnIndex === 0 ? 'border-neon-magenta' : 'border-subtle'
                          }`}
                        >
                          <div className="h-1 w-3/4 bg-border" />
                          <div className="mt-1 h-1 w-1/2 bg-border/50" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 z-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span className="bg-neon-magenta px-1.5 py-0.5 text-bg">01</span>
                <span className="text-neon-cyan">Kanban</span>
              </div>
              <h3 className="mt-3 font-synth text-2xl text-fg">{t('trello.name')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t('trello.desc')}</p>
            </div>
          </article>
        </TiltCard>

        <TiltCard max={10} className="rotate-1 transition-transform hover:rotate-0">
          <article className="card-base flex h-full flex-col relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-transparent to-neutral-900/50" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden border-b border-subtle bg-card p-4 z-10">
              <div aria-hidden className="flex h-full flex-col justify-center gap-2">
                <div className="border border-subtle bg-card p-3">
                  <div className="h-2 w-2/3 bg-border" />
                  <div className="mt-2 h-1 w-1/3 bg-border/50" />
                </div>

                <div className="grid gap-1.5">
                  {options.map((option, optionIndex) => (
                    <div
                      key={option}
                      className={`flex items-center gap-2 border px-2 py-1.5 ${
                        optionIndex === 1
                          ? 'border-neon-magenta bg-elevated'
                          : 'border-subtle bg-card'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center border font-mono text-[8px] ${
                          optionIndex === 1
                            ? 'border-neon-magenta text-neon-magenta'
                            : 'border-subtle text-muted'
                        }`}
                      >
                        {option}
                      </span>
                      <span
                        className={`h-1.5 ${optionIndex === 1 ? 'w-1/2 bg-neon-magenta' : 'w-2/3 bg-border'}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 z-10">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span className="bg-neon-cyan px-1.5 py-0.5 text-bg">02</span>
                <span className="text-neon-magenta">Quiz</span>
              </div>
              <h3 className="mt-3 font-synth text-2xl text-fg">{t('quiz.name')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t('quiz.desc')}</p>
            </div>
          </article>
        </TiltCard>
      </div>
    </section>
  );
}