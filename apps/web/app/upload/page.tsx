import { StubBanner } from '@/components/StubBanner';

export default function UploadPage() {
  return (
    <>
      <StubBanner />
      <section className="panel">
        <h1>Upload resource</h1>
        <p className="muted">
          Uploads are disabled on the Vercel stub. Release 2 will use direct-to-Blob uploads and
          background media processing.
        </p>
        <form className="stack" aria-disabled="true">
          <label>
            Title
            <input type="text" disabled placeholder="Disabled in stub" />
          </label>
          <label>
            Type
            <select disabled>
              <option>Sample</option>
            </select>
          </label>
          <label>
            File
            <input type="file" disabled />
          </label>
          <button type="button" className="btn" disabled>
            Upload (Release 2)
          </button>
        </form>
        <p className="muted">
          Local uploads: see README <code>docker compose up</code> and{' '}
          <code>docs/producer-upload-guide.md</code>.
        </p>
      </section>
    </>
  );
}
