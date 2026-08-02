import Link from 'next/link';
import { kanjavaRadio } from '@/lib/site-content';

export default function RadioPage() {
  return (
    <>
      <div className="box kanjava-box-accent mb-4">
        <div className="level is-mobile mb-3">
          <div className="level-left">
            <h1 className="title is-3 mb-0">{kanjavaRadio.title}</h1>
          </div>
          <div className="level-right">
            <span className="tag is-primary">Exclusive · all originals</span>
          </div>
        </div>
        <div className="content">
          <p>{kanjavaRadio.exclusivity}</p>
          <p className="is-muted">{kanjavaRadio.statusNote}</p>
        </div>
      </div>

      <div className="box mb-4">
        <h2 className="title is-4">Mixes</h2>
        <div className="columns is-multiline">
          {kanjavaRadio.upcomingMixes.map((mix) => (
            <div key={mix.id} className="column is-12-tablet is-6">
              <div className={`box ${'memorial' in mix && mix.memorial ? 'kanjava-memorial' : ''}`}>
                <h3 className="title is-5">{mix.title}</h3>
                <p className="is-muted">{mix.subtitle}</p>
                {'memorial' in mix && mix.memorial ? (
                  <span className="tag is-info">In honor · coming soon</span>
                ) : (
                  <span className="tag">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="content">
          <p className="is-muted">
            When mixes go live, they stream from this site only. No re-uploads to Spotify, YouTube,
            or SoundCloud for the Radio series.
          </p>
        </div>
      </div>

      <div className="box">
        <h2 className="title is-4">Marketplace vs Radio</h2>
        <div className="content">
          <p>
            The <Link href="/browse">catalog</Link> is for royalty-free production assets from
            producers. Kanjava Radio is for listening—long-form original mixes, not sample packs.
          </p>
        </div>
      </div>
    </>
  );
}
