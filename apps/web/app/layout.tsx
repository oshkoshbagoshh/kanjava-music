import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { site } from '@/lib/site-content';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Original radio & royalty-free production assets`,
    template: `%s · ${site.name}`,
  },
  description:
    'Kanjava Music: slow-burn passion project by @kanjavamusic — exclusive original Kanjava Radio mixes on-site, plus a royalty-free marketplace for producers.',
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
