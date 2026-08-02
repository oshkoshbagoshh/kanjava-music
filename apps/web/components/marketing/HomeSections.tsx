import Link from 'next/link';
import { externalLinks, ghostBrand, kanjavaRadio, person, site } from '@/lib/site-content';

export function HeroSection() {
  return (
    <section className="hero panel">
      <p className="hero__mood" aria-hidden="true">
        {site.mood}
      </p>
      <p className="hero__eyebrow">{ghostBrand.headline}</p>
      <h1 className="hero__title">{site.name}</h1>
      <p className="hero__lead">{site.tagline}</p>
      <p className="hero__dual">
        <strong>Ghost Marketplace</strong> — unfinished audio & MIDI you own, shared to find real
        collaborators. <strong>Kanjava</strong> — {person.displayName} / {site.handle}: Radio
        originals, build logs, and the code behind the slow burn.
      </p>
      <p className="muted hero__ecosystem">{site.ecosystemLine}</p>
      <div className="hero__actions">
        <Link className="btn" href="/philosophy">
          What we’re not
        </Link>
        <Link className="btn btn--ghost" href="/radio">
          Kanjava Radio
        </Link>
        <Link className="btn btn--ghost" href="/ecosystem">
          Ecosystem
        </Link>
        <Link className="btn btn--ghost" href="/browse">
          Browse
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
      <p className="muted">{ghostBrand.subhead}</p>
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
