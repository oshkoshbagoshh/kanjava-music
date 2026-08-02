import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { site } from '@/lib/site-content';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Ghost ecosystem for creative mastery`,
    template: `%s · ${site.name}`,
  },
  description:
    'Open-source ecosystem for creative mastery: Ghost Marketplace collaboration, Kanjava Radio originals, slow-burn build in public.',
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
