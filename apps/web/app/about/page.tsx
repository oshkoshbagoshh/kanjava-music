import Link from 'next/link';
import { externalLinks, kanjavaRadio, person, site } from '@/lib/site-content';

export default function AboutPage() {
  return (
    <>
      <section className="panel">
        <h1>About</h1>
        <p className="hero__mood">{site.mood}</p>
        <p>
          <strong>{site.name}</strong> ({site.handle}) and <strong>{person.displayName}</strong>{' '}
          share this site equally: one is the product, one is the person behind it.
        </p>
        {person.longBio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>

      <section className="panel">
        <h2>Kanjava Radio promise</h2>
        <p>{kanjavaRadio.exclusivity}</p>
        <p className="muted">
          Public edits and legacy streams may still exist on other platforms;{' '}
          <strong>Kanjava Radio</strong> mixes are a separate series—original material published
          only on kanjava.com (this project).
        </p>
        <Link href="/radio">Go to Kanjava Radio</Link>
      </section>

      <section className="panel">
        <h2>Connect</h2>
        <ul className="link-list">
          {externalLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
              <span className="muted link-list__desc"> — {link.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
