import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { site } from '@/lib/site-content';
import '@/styles/main.scss';

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
    <html lang="en" className="theme-dark" data-theme="dark">
      <body className="kanjava-body">
        <SiteHeader />
        <main className="section pt-4 pb-6">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
