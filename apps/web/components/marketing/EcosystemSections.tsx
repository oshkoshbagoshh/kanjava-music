import Link from 'next/link';
import { ecosystemPillars, ghostBrand } from '@/lib/site-content';

const statusLabel = {
  live_stub: 'Stub live',
  building: 'Building',
  vision: 'Vision',
} as const;

export function EcosystemPageContent() {
  return (
    <>
      <section className="panel panel--accent">
        <h1>{ghostBrand.headline}</h1>
        <p className="philosophy-lead">{ghostBrand.subhead}</p>
        <p className="muted">
          Kanjava Music is the repository and deployment where Ghost Marketplace is being implemented
          first. Names evolve; philosophy stays.
        </p>
      </section>

      <section className="panel">
        <h2>Ecosystem map</h2>
        <ul className="ecosystem-grid">
          {ecosystemPillars.map((pillar) => (
            <li key={pillar.id} className="ecosystem-card">
              <div className="section-head">
                <h3 className="ecosystem-card__title">{pillar.name}</h3>
                <span className="badge">{statusLabel[pillar.status]}</span>
              </div>
              <p className="ecosystem-card__role">{pillar.role}</p>
              <p className="muted">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <p>
          <Link href="/philosophy">Read: What we’re not →</Link>
        </p>
      </section>
    </>
  );
}

export function EcosystemTeaser() {
  return (
    <section className="panel">
      <h2>Ghost ecosystem</h2>
      <p className="muted">{ghostBrand.subhead}</p>
      <ul className="philosophy-list philosophy-list--compact">
        {ecosystemPillars.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.role}
          </li>
        ))}
      </ul>
      <Link href="/ecosystem">Full ecosystem map →</Link>
    </section>
  );
}

export function MarketplacePhilosophyTeaser() {
  return (
    <section className="panel">
      <h2>{ghostBrand.marketplaceName}</h2>
      <p>{ghostBrand.marketplacePitch}</p>
      <ul className="philosophy-list philosophy-list--compact">
        {ghostBrand.uploadRules.slice(0, 3).map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      <Link href="/philosophy">What we’re not →</Link>
    </section>
  );
}
