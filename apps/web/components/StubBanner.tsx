import Link from 'next/link';

export function StubBanner() {
  return (
    <div className="notification is-kanjava-stub" role="status">
      <strong>Release 1 — Vercel stub.</strong> Marketplace UI and API migration are in progress.
      The full app (auth, search, uploads, previews) runs locally via{' '}
      <code>docker compose up</code>. See{' '}
      <Link href="/migration">Release 2 plan</Link> in this app.
    </div>
  );
}
