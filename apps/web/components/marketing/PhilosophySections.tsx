import Link from 'next/link';
import {
  ghostBrand,
  whatWereNotIntro,
  whatWereNotSections,
} from '@/lib/site-content';

export function PhilosophySectionList() {
  return (
    <>
      <section className="panel panel--accent">
        <h1>{whatWereNotIntro.title}</h1>
        <p className="philosophy-lead">{whatWereNotIntro.lead}</p>
      </section>

      {whatWereNotSections.map((block) => (
        <section key={block.id} className="panel philosophy-block" id={block.id}>
          <h2>{block.title}</h2>
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {block.bullets && (
            <ul className="philosophy-list">
              {block.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="panel">
        <h2>Upload with intent</h2>
        <p>{ghostBrand.marketplacePitch}</p>
        <ul className="philosophy-list">
          {ghostBrand.uploadRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p>
          <Link href="/upload">Upload (stub)</Link> · <Link href="/ecosystem">Ecosystem map</Link>
        </p>
      </section>
    </>
  );
}
