import Link from 'next/link';
import { externalLinks, ghostBrand, kanjavaRadio, persianHeritage, person, site } from '@/lib/site-content';

export function HeroSection() {
  return (
    <section className="hero is-medium">
      <div className="hero-body px-0">
        <p className="kanjava-hero-mood" aria-hidden="true">
          {site.mood}
        </p>
        <p className="subtitle has-text-success has-text-weight-semibold">{ghostBrand.headline}</p>
        <h1 className="title is-2">{site.name}</h1>
        <p className="subtitle is-5">{site.tagline}</p>
        <div className="content">
          <p>
            <strong>Ghost Marketplace</strong> — unfinished audio & MIDI you own, shared to find real
            collaborators. <strong>Kanjava</strong> — {person.displayName} / {site.handle}: Radio
            originals, build logs, and the code behind the slow burn.
          </p>
          <p className="is-muted is-size-7">{site.ecosystemLine}</p>
        </div>
        <div className="buttons are-small">
          <Link className="button is-primary" href="/philosophy">
            What we’re not
          </Link>
          <Link className="button is-light is-outlined" href="/radio">
            Kanjava Radio
          </Link>
          <Link className="button is-light is-outlined" href="/heritage">
            Heritage
          </Link>
          <Link className="button is-light is-outlined" href="/ecosystem">
            Ecosystem
          </Link>
          <Link className="button is-light is-outlined" href="/browse">
            Browse
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PassionSection() {
  return (
    <div className="box kanjava-box-accent">
      <h2 className="title is-4">Slow burn, not a blitz</h2>
      <div className="content">
        <p>{person.shortBio}</p>
        <p className="is-muted">{ghostBrand.subhead}</p>
      </div>
    </div>
  );
}

export function RadioTeaserSection() {
  return (
    <div className="box">
      <div className="level is-mobile mb-3">
        <div className="level-left">
          <h2 className="title is-4 mb-0">{kanjavaRadio.title}</h2>
        </div>
        <div className="level-right">
          <span className="tag is-primary">Site exclusive · all originals</span>
        </div>
      </div>
      <div className="content">
        <p>{kanjavaRadio.exclusivity}</p>
        <p className="is-muted">{kanjavaRadio.statusNote}</p>
      </div>
      <Link href="/radio">Radio page →</Link>
    </div>
  );
}

export function HeritageTeaserSection() {
  return (
    <div className="box">
      <h2 className="title is-4">{persianHeritage.title}</h2>
      <div className="content">
        <p>{persianHeritage.intro}</p>
        <p className="is-muted is-size-7">{persianHeritage.memorialNote}</p>
      </div>
      <Link href="/heritage">Learn & remember →</Link>
    </div>
  );
}

export function LinksTeaserSection() {
  return (
    <div className="box">
      <h2 className="title is-4">Elsewhere</h2>
      <div className="content">
        <ul>
          {externalLinks.slice(0, 3).map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/links">All links →</Link>
    </div>
  );
}
