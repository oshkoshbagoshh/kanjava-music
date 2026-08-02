import { StubBanner } from '@/components/StubBanner';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <StubBanner />
      <section className="panel">
        <h1>Kanjava Music</h1>
        <p>
          Royalty-free sample / MIDI marketplace for ghost producers. Producers retain copyright;
          buyers get a usage license with no ongoing royalty obligation.
        </p>
        <p className="muted">
          This deployment is a lightweight Next.js shell for Vercel. Browse and upload pages are
          placeholders until Release 2 connects Neon, Blob uploads, and media processing.
        </p>
        <p>
          <Link className="btn" href="/browse">
            Browse (stub)
          </Link>{' '}
          <Link className="btn btn--ghost" href="/upload">
            Upload (stub)
          </Link>
        </p>
      </section>
    </>
  );
}
