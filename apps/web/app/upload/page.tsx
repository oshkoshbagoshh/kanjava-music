import Link from 'next/link';
import { StubBanner } from '@/components/StubBanner';
import { ghostBrand } from '@/lib/site-content';

export default function UploadPage() {
  return (
    <>
      <StubBanner />
      <section className="panel">
        <h1>Upload — {ghostBrand.marketplaceName}</h1>
        <p>{ghostBrand.marketplacePitch}</p>
        <ul className="philosophy-list">
          {ghostBrand.uploadRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="muted">
          Uploads are disabled on the Vercel stub until Release 2 (Blob + processing). For local
          testing, use <code>docker compose up</code> and{' '}
          <code>docs/producer-upload-guide.md</code>.
        </p>
        <form className="stack" aria-disabled="true">
          <label>
            Title
            <input type="text" disabled placeholder="Disabled in stub" />
          </label>
          <label>
            Type (audio / MIDI when live)
            <select disabled>
              <option>Sample</option>
            </select>
          </label>
          <label>
            File
            <input type="file" accept="audio/*,.mid,.midi" disabled />
          </label>
          <button type="button" className="btn" disabled>
            Upload (Release 2)
          </button>
        </form>
        <p>
          <Link href="/philosophy">What we’re not</Link>
        </p>
      </section>
    </>
  );
}
