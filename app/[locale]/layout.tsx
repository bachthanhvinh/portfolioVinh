import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { fontCrt, fontSynth, fontTerminal, fontMono } from '@/app/fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Vinh — Frontend Developer',
  description:
    'Portfolio of Vinh, a frontend developer focused on React, Next.js and interface craft.',
};

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('common');

  return (
    <html
      lang={locale}
      className={`${fontCrt.variable} ${fontSynth.variable} ${fontTerminal.variable} ${fontMono.variable}`}
    >
      <body className="bg-bg font-terminal text-fg crt-scanlines">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-neon-cyan focus:bg-bg focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
          >
            {t('skip')}
          </a>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}