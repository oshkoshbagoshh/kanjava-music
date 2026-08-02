import Link from 'next/link';
import {
  ghostBrand,
  whatWereNotIntro,
  whatWereNotSections,
} from '@/lib/site-content';

export function PhilosophySectionList() {
  return (
    <>
      <div className="box kanjava-box-accent mb-4">
        <h1 className="title is-3">{whatWereNotIntro.title}</h1>
        <div className="content">
          <p className="is-size-5">{whatWereNotIntro.lead}</p>
        </div>
      </div>

      {whatWereNotSections.map((block) => (
        <div key={block.id} className="box mb-4" id={block.id}>
          <h2 className="title is-4">{block.title}</h2>
          <div className="content">
            {block.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {block.bullets && (
              <ul>
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      <div className="box">
        <h2 className="title is-4">Upload with intent</h2>
        <div className="content">
          <p>{ghostBrand.marketplacePitch}</p>
          <ul>
            {ghostBrand.uploadRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
        <p>
          <Link href="/upload">Upload (stub)</Link> · <Link href="/ecosystem">Ecosystem map</Link>
        </p>
      </div>
    </>
  );
}
