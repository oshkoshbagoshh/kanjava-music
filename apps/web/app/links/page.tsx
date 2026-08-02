import Link from 'next/link';
import { externalLinks, site } from '@/lib/site-content';

export default function LinksPage() {
  return (
    <div className="box content">
      <h1>Links</h1>
      <p className="is-muted">Same hub as {site.handle} on Linktree—plus this site for Radio and catalog.</p>
      {externalLinks.map((link) => (
        <div key={link.href} className="mb-4">
          <p>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </p>
          <p className="is-muted">{link.description}</p>
        </div>
      ))}
    </div>
  );
}
