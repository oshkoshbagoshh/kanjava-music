import Link from 'next/link';
import { StubBanner } from '@/components/StubBanner';

export default function MigrationPage() {
  return (
    <>
      <StubBanner />
      <section className="panel">
        <h1>Next.js migration (Release 1 → 2)</h1>
        <p>
          <strong>Release 1 (current Vercel deploy):</strong> Static-friendly Next.js app with stub
          API routes. No Postgres, Redis, Blob, or ffmpeg required.
        </p>
        <p>
          <strong>Release 2 (planned):</strong> Port Express routes to Route Handlers, Neon
          Postgres, Vercel Blob direct uploads, and Workflow/Sandbox (or external worker) for
          previews and waveforms.
        </p>
        <p>
          Full checklist:{' '}
          <a href="https://github.com/oshkoshbagoshh/kanjava-music/blob/main/docs/next-migration.md">
            docs/next-migration.md
          </a>{' '}
          in the repository.
        </p>
        <p>
          <Link href="/">Back home</Link>
        </p>
      </section>
    </>
  );
}
