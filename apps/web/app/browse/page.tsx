import { StubBanner } from '@/components/StubBanner';

export default function BrowsePage() {
  return (
    <>
      <StubBanner />
      <div className="box">
        <h1 className="title is-3">Browse catalog</h1>
        <div className="content">
          <p className="is-muted">
            Stub deployment — no database connected. API returns an empty list (
            <code>GET /api/resources</code>).
          </p>
          <div className="has-text-centered py-5">
            <p>No resources to show yet.</p>
            <p className="is-muted">Run the full marketplace locally with Docker to search and preview assets.</p>
          </div>
        </div>
      </div>
    </>
  );
}
