import Link from 'next/link';
import { persianHeritage } from '@/lib/site-content';

export default function HeritagePage() {
  return (
    <>
      <div className="box kanjava-box-accent mb-4">
        <h1 className="title is-3">{persianHeritage.title}</h1>
        <div className="content">
          <p>{persianHeritage.intro}</p>
          {persianHeritage.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </div>

      <div className="box kanjava-memorial mb-4">
        <h2 className="title is-5">Kanjava Radio — remembrance</h2>
        <div className="content">
          <p>{persianHeritage.memorialNote}</p>
        </div>
        <Link href="/radio">Radio page →</Link>
      </div>

      <div className="box">
        <h2 className="title is-4">Learn more (neutral resources)</h2>
        <div className="content">
          <ul>
            {persianHeritage.learnMoreLinks.map((link) => (
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
