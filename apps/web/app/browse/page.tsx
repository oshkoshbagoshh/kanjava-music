import { StubBanner } from '@/components/StubBanner';

export default function BrowsePage() {
  return (
    <>
      <StubBanner />
      <section className="panel">
        <h1>Browse catalog</h1>
        <p className="muted">
          Stub deployment — no database connected. API returns an empty list (
          <code>GET /api/resources</code>).
        </p>
        <div className="empty-state">
          <p>No resources to show yet.</p>
          <p>Run the full marketplace locally with Docker to search and preview assets.</p>
        </div>
      </section>
    </>
  );
}
