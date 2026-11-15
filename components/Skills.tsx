'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const groups = [
  { key: 'languages', items: ['TypeScript', 'JavaScript'] },
  { key: 'frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { key: 'tools', items: ['Git', 'npm', 'ESLint', 'Vercel'] },
] as const;

const rotations = ['-rotate-1', 'rotate-1', '-rotate-1'];

export default function Skills() {
  const t = useTranslations('skills');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} id="skills" className="relative border-t border-subtle py-16 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 crt-scanlines" />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute -top-20 -left-20 h-72 w-72 rotate-12 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute -bottom-20 -right-20 h-64 w-64 -rotate-6 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute top-1/2 -right-24 h-56 w-56 -translate-y-1/2 rotate-3 border border-subtle bg-card/50"
        />
        <motion.div
          style={{ y: scrollYProgress }}
          className="absolute bottom-1/2 -left-24 h-56 w-56 -translate-y-1/2 -rotate-3 border border-subtle bg-card/50"
        />
      </div>

      <SectionHeading index="02" title={t('title')} />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal key={group.key} intensity="strong">
            <div
              className={`card-base p-5 transition-transform hover:-translate-y-1 hover:rotate-0 ${rotations[index]} ${
                index === 1 ? 'md:translate-y-3' : ''
              } relative overflow-hidden`}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-transparent to-neutral-900/50" />
              </div>
              <div className="flex items-center justify-between border-b border-subtle pb-2 relative z-10">
                <h3 className="font-synth text-lg text-fg">{t(group.key)}</h3>
                <span className="bg-neon-magenta px-1 font-mono text-[10px] text-bg">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2 relative z-10">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className={`border border-subtle px-2 py-1 font-mono text-[11px] transition-colors hover:border-neon-cyan hover:bg-elevated ${
                      itemIndex % 3 === 0
                        ? '-rotate-1'
                        : itemIndex % 3 === 1
                        ? 'rotate-1'
                        : ''
                    } ${itemIndex % 2 === 0 ? 'bg-elevated' : 'bg-card'}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}