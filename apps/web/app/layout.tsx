import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kanjava Music — Royalty-Free Samples & MIDI',
  description:
    'Royalty-free sample, loop, MIDI, DAW template, and stem marketplace. Producer retains copyright; you get a usage license with no ongoing royalties.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="layout">{children}</main>
      </body>
    </html>
  );
}
