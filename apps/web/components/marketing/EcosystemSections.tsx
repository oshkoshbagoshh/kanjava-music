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
      <div className="box kanjava-box-accent mb-4">
        <h1 className="title is-3">{ghostBrand.headline}</h1>
        <div className="content">
          <p className="is-size-5">{ghostBrand.subhead}</p>
          <p className="is-muted">
            Kanjava Music is the repository and deployment where Ghost Marketplace is being implemented
            first. Names evolve; philosophy stays.
          </p>
        </div>
      </div>

      <div className="box mb-4">
        <h2 className="title is-4">Ecosystem map</h2>
        <div className="columns is-multiline">
          {ecosystemPillars.map((pillar) => (
            <div key={pillar.id} className="column is-12-tablet is-6">
              <div className="box">
                <div className="level is-mobile mb-2">
                  <div className="level-left">
                    <h3 className="title is-5 mb-0">{pillar.name}</h3>
                  </div>
                  <div className="level-right">
                    <span className="tag is-info">{statusLabel[pillar.status]}</span>
                  </div>
                </div>
                <p className="has-text-primary is-size-7">{pillar.role}</p>
                <p className="is-muted">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p>
        <Link href="/philosophy">Read: What we’re not →</Link>
      </p>
    </>
  );
}

export function EcosystemTeaser() {
  return (
    <div className="box">
      <h2 className="title is-4">Ghost ecosystem</h2>
      <div className="content">
        <p className="is-muted">{ghostBrand.subhead}</p>
        <ul>
          {ecosystemPillars.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.role}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/ecosystem">Full ecosystem map →</Link>
    </div>
  );
}

export function MarketplacePhilosophyTeaser() {
  return (
    <div className="box">
      <h2 className="title is-4">{ghostBrand.marketplaceName}</h2>
      <div className="content">
        <p>{ghostBrand.marketplacePitch}</p>
        <ul>
          {ghostBrand.uploadRules.slice(0, 3).map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
      <Link href="/philosophy">What we’re not →</Link>
    </div>
  );
}
