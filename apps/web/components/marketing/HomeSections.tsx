import Link from 'next/link';
import { externalLinks, kanjavaRadio, person, site } from '@/lib/site-content';

export function HeroSection() {
  return (
    <section className="hero panel">
      <p className="hero__mood" aria-hidden="true">
        {site.mood}
      </p>
      <h1 className="hero__title">{site.name}</h1>
      <p className="hero__lead">{site.tagline}</p>
      <p className="hero__dual">
        <strong>Marketplace</strong> — royalty-free samples, loops, MIDI, and production assets.{' '}
        <strong>Personal</strong> — {person.displayName} / {site.handle}: originals, radio, and
        build logs.
      </p>
      <div className="hero__actions">
        <Link className="btn" href="/radio">
          Kanjava Radio
        </Link>
        <Link className="btn btn--ghost" href="/browse">
          Browse catalog
        </Link>
        <Link className="btn btn--ghost" href="/about">
          About
        </Link>
      </div>
    </section>
  );
}

export function PassionSection() {
  return (
    <section className="panel panel--accent">
      <h2>Slow burn, not a blitz</h2>
      <p>{person.shortBio}</p>
      <p className="muted">
        Features land when they are solid—starting with this site, then catalog and uploads, then
        exclusive radio hosting. No fake urgency.
      </p>
    </section>
  );
}

export function RadioTeaserSection() {
  return (
    <section className="panel">
      <div className="section-head">
        <h2>{kanjavaRadio.title}</h2>
        <span className="badge badge--exclusive">Site exclusive · all originals</span>
      </div>
      <p>{kanjavaRadio.exclusivity}</p>
      <p className="muted">{kanjavaRadio.statusNote}</p>
      <ul className="radio-list">
        {kanjavaRadio.upcomingMixes.map((mix) => (
          <li key={mix.id} className="radio-list__item">
            <span className="radio-list__title">{mix.title}</span>
            <span className="muted">{mix.subtitle}</span>
          </li>
        ))}
      </ul>
      <Link href="/radio">Radio page →</Link>
    </section>
  );
}

export function MarketplaceTeaserSection() {
  return (
    <section className="panel">
      <h2>Production marketplace</h2>
      <p>
        Royalty-free assets for ghost producers and DJs. Producers retain copyright; buyers receive
        a usage license without ongoing royalty obligation.
      </p>
      <p className="muted">
        Catalog and upload flows are stubbed on Vercel until Release 2. Run the full stack locally
        with Docker if you are contributing or testing uploads.
      </p>
      <Link className="btn btn--ghost" href="/upload">
        Upload (stub)
      </Link>
    </section>
  );
}

export function LinksTeaserSection() {
  return (
    <section className="panel">
      <h2>Elsewhere</h2>
      <ul className="link-list">
        {externalLinks.slice(0, 3).map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/links">All links →</Link>
    </section>
  );
}
