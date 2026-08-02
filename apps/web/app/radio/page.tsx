import Link from 'next/link';
import { kanjavaRadio } from '@/lib/site-content';

export default function RadioPage() {
  return (
    <>
      <section className="panel panel--accent">
        <div className="section-head">
          <h1>{kanjavaRadio.title}</h1>
          <span className="badge badge--exclusive">Exclusive · all originals</span>
        </div>
        <p>{kanjavaRadio.exclusivity}</p>
        <p className="muted">{kanjavaRadio.statusNote}</p>
      </section>

      <section className="panel">
        <h2>Mixes</h2>
        <ul className="radio-list radio-list--cards">
          {kanjavaRadio.upcomingMixes.map((mix) => (
            <li key={mix.id} className="radio-card">
              <h3 className="radio-card__title">{mix.title}</h3>
              <p className="muted">{mix.subtitle}</p>
              <span className="badge">Coming soon</span>
            </li>
          ))}
        </ul>
        <p className="muted">
          When the first mix is ready, it will stream from this site only. No re-uploads to
          Spotify, YouTube, or SoundCloud for the Radio series.
        </p>
      </section>

      <section className="panel">
        <h2>Marketplace vs Radio</h2>
        <p>
          The <Link href="/browse">catalog</Link> is for royalty-free production assets from
          producers (including future self-serve uploads). Kanjava Radio is for listening—long-form
          original mixes, not sample packs.
        </p>
      </section>
    </>
  );
}
