import Link from 'next/link';
import { externalLinks, kanjavaRadio, persianHeritage, person, site } from '@/lib/site-content';

export default function AboutPage() {
  return (
    <>
      <div className="box mb-4">
        <h1 className="title is-3">About</h1>
        <p className="kanjava-hero-mood">{site.mood}</p>
        <div className="content">
          <p>
            <strong>{site.name}</strong> ({site.handle}) and <strong>{person.displayName}</strong>{' '}
            share this site equally: one is the product, one is the person behind it.
          </p>
          {person.longBio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="box mb-4">
        <h2 className="title is-4">{persianHeritage.title}</h2>
        <div className="content">
          <p>{persianHeritage.intro}</p>
        </div>
        <Link href="/heritage">Heritage page →</Link>
      </div>

      <div className="box mb-4">
        <h2 className="title is-4">Kanjava Radio promise</h2>
        <div className="content">
          <p>{kanjavaRadio.exclusivity}</p>
          <p className="is-muted">
            Public edits and legacy streams may still exist on other platforms;{' '}
            <strong>Kanjava Radio</strong> mixes are a separate series—original material published
            only here.
          </p>
        </div>
        <Link href="/radio">Go to Kanjava Radio</Link> · <Link href="/philosophy">Ghost philosophy</Link>{' '}
        · <Link href="/ecosystem">Ecosystem</Link>
      </div>

      <div className="box">
        <h2 className="title is-4">Connect</h2>
        <div className="content">
          <ul>
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
                <span className="is-muted"> — {link.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
