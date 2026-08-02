export function StubBanner() {
  return (
    <div className="stub-banner" role="status">
      <strong>Release 1 — Vercel stub.</strong> Marketplace UI and API migration are in progress.
      The full app (auth, search, uploads, previews) runs locally via{' '}
      <code>docker compose up</code>. See{' '}
      <a href="/migration">Release 2 plan</a>{' '}
      in this app, or{' '}
    </div>
  );
}
