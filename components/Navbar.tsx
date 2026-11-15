'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const other = locale === 'vi' ? 'en' : 'vi';
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-synth text-xl font-bold leading-none tracking-wider text-fg">VINH</span>
          <span
            aria-hidden
            className="mb-0.5 h-2 w-2 bg-neon-magenta transition-transform duration-200 group-hover:rotate-45"
          />
          <span className="mb-0.5 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
            portfolio // 2026
          </span>
        </Link>

        <nav aria-label={t('sections')} className="hidden items-center gap-4 md:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={
                active === id
                  ? 'px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-neon-cyan border-b-2 border-neon-cyan'
                  : 'px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-neon-cyan'
              }
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            locale={other}
            className="btn-neon px-2 py-1 font-mono text-[10px] tracking-[0.2em]"
          >
            {other.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('close') : t('menu')}
            className="btn-neon p-2 md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t('sections')}
          className="border-t border-subtle bg-bg/90 px-4 py-3 md:hidden"
        >
          <ul className="grid grid-cols-2 gap-2">
            {sections.map((id, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-2 border border-subtle bg-card px-3 py-2 text-fg hover:border-neon-cyan hover:bg-elevated"
                >
                  <span className="font-mono text-[9px] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-synth text-sm">{t(id)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-neon-magenta"
      />
    </header>
  );
}