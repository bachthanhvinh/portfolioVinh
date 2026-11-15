import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.12em] text-muted md:flex-row md:items-center md:justify-between">
        <p>© {year} · {t('rights')}</p>

        <div className="flex items-center gap-4">
          <span>{t('builtWith')}</span>
          <a
            href="#home"
            className="link-neon inline-flex items-center gap-1 px-2 py-1 hover:text-neon-cyan"
          >
            {t('top')}
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}