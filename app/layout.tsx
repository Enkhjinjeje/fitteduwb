import type { Metadata, Viewport } from 'next';
import {
  Abril_Fatface, DM_Serif_Display, Great_Vibes, Hanken_Grotesk, Lilita_One, Playfair_Display, Rubik_Dirt,
} from 'next/font/google';
import './globals.css';

// Hanken Grotesk is the site's face. The others set event titles, each matched to that event's
// poster; globals.css maps them to Tailwind classes (font-swap, font-script, …).
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-hanken' });
const lilita = Lilita_One({ subsets: ['latin'], weight: '400', variable: '--font-lilita' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '800'], style: ['normal', 'italic'], variable: '--font-playfair' });
const vibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-vibes' });
const dmserif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dmserif' });
const rubikDirt = Rubik_Dirt({ subsets: ['latin'], weight: '400', variable: '--font-rubikdirt' });
const abril = Abril_Fatface({ subsets: ['latin'], weight: '400', variable: '--font-abril' });
const fonts = [hanken, lilita, playfair, vibes, dmserif, rubikDirt, abril].map(f => f.variable).join(' ');

export const metadata: Metadata = {
  title: 'Fitted UWB',
  description: "Fitted UWB is UW Bothell's student fashion club: clothing swaps, thrift trips, DIY nights and outfit hikes.",
  icons: { icon: '/brand/husky-purple.png' },
};

export const viewport: Viewport = { themeColor: '#e8e7e3' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        {/* Marks the page as scripted before first paint, so [data-reveal] content can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
