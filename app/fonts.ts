import { VT323, Orbitron, Space_Mono, IBM_Plex_Mono } from 'next/font/google';

export const fontCrt = VT323({
  subsets: ['latin'],
  variable: '--font-crt',
  display: 'swap',
  weight: '400',
});

export const fontSynth = Orbitron({
  subsets: ['latin'],
  variable: '--font-synth',
  display: 'swap',
  weight: ['400', '700', '900'],
});

export const fontTerminal = Space_Mono({
  subsets: ['latin'],
  variable: '--font-terminal',
  display: 'swap',
  weight: ['400', '700'],
});

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});