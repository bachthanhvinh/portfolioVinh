'use client';

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType } from 'react';
import CopyEmail from '@/components/CopyEmail';
import ParallaxImage from '@/components/ParallaxImage';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { GithubIcon } from '@/components/icons';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const EMAIL = 'vinh@example.com';
const PHONE = '0123456789';
const GITHUB = 'github.com/bachthanhvinh';

export default function Contact() {
  const t = useTranslations('contact');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rows: {
    label: string;
    value: string;
    href?: string;
    icon: IconComponent;
  }[] = [
    { label: t('email'), value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
    { label: t('phone'), value: PHONE, href: `tel:${PHONE}`, icon: Phone },
    {
      label: t('github'),
      value: GITHUB,
      href: `https://${GITHUB}`,
      icon: GithubIcon,
    },
    { label: t('location'), value: t('locationValue'), icon: MapPin },
  ];

  return (
    <Reveal intensity="strong">
      <section ref={ref} id="contact" className="relative border-t border-subtle py-16 md:py-24 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 crt-scanlines" />

        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            style={{ y: scrollYProgress }}
            className="absolute -top-24 -right-24 h-80 w-80 rotate-12 border border-subtle bg-card/50"
          />
          <motion.div
            style={{ y: scrollYProgress }}
            className="absolute -bottom-24 -left-24 h-72 w-72 -rotate-6 border border-subtle bg-card/50"
          />
          <motion.div
            style={{ y: scrollYProgress }}
            className="absolute top-1/2 -left-32 h-64 w-64 -translate-y-1/2 rotate-3 border border-subtle bg-card/50"
          />
          <motion.div
            style={{ y: scrollYProgress }}
            className="absolute bottom-1/2 -right-32 h-64 w-64 -translate-y-1/2 -rotate-3 border border-subtle bg-card/50"
          />
        </div>

        <SectionHeading index="05" title={t('title')} />

        <div className="mt-8 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <h3 className="font-synth text-balance text-3xl leading-[0.95] md:text-5xl text-fg">
              {t('heading')}
            </h3>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {rows.map((row, index) => {
                const Icon = row.icon;
                const content = (
                  <>
                    <Icon size={15} className="mt-0.5 shrink-0 text-muted" />
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                        {row.label}
                      </span>
                      <span className="mt-1 block text-sm text-fg">{row.value}</span>
                    </span>
                  </>
                );

                const rotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={`flex items-start gap-3 card-base p-4 transition-transform hover:-translate-y-0.5 hover:rotate-0 hover:border-neon-cyan ${rotation}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={row.label}
                    className={`flex items-start gap-3 card-base p-4 ${rotation}`}
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="btn-neon-magenta inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]"
              >
                <Mail size={14} />
                {t('mailto')}
              </a>
              <CopyEmail email={EMAIL} />
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm rotate-1 card-base p-2">
            <ParallaxImage
              src="/images/code-green.jpg"
              alt=""
              sizes="(min-width: 768px) 360px, 90vw"
              className="aspect-[4/5] border border-subtle"
            />
            <figcaption className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              <span>fig. 03</span>
              <span aria-hidden className="h-2 w-2 bg-neon-magenta" />
            </figcaption>
          </figure>
        </div>
      </section>
    </Reveal>
  );
}