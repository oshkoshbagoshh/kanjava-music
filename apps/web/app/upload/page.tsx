import Link from 'next/link';
import { StubBanner } from '@/components/StubBanner';
import { ghostBrand } from '@/lib/site-content';

export default function UploadPage() {
  return (
    <>
      <StubBanner />
      <div className="box">
        <h1 className="title is-3">Upload — {ghostBrand.marketplaceName}</h1>
        <div className="content">
          <p>{ghostBrand.marketplacePitch}</p>
          <ul>
            {ghostBrand.uploadRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="is-muted">
            Uploads are disabled on the Vercel stub until Release 2 (Blob + processing). For local
            testing, use <code>docker compose up</code> and <code>docs/producer-upload-guide.md</code>.
          </p>
        </div>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" disabled placeholder="Disabled in stub" />
          </div>
        </div>
        <div className="field">
          <label className="label">Type (audio / MIDI when live)</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select disabled>
                <option>Sample</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">File</label>
          <div className="control">
            <input className="input" type="file" accept="audio/*,.mid,.midi" disabled />
          </div>
        </div>
        <button type="button" className="button is-primary" disabled>
          Upload (Release 2)
        </button>
        <p className="mt-4">
          <Link href="/philosophy">What we’re not</Link>
        </p>
      </div>
    </>
  );
}
