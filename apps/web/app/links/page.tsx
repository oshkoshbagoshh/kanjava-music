import { externalLinks, site } from '@/lib/site-content';

export default function LinksPage() {
  return (
    <section className="panel">
      <h1>Links</h1>
      <p className="muted">Same hub as {site.handle} on Linktree—plus this site for Radio and catalog.</p>
      <ul className="link-list link-list--stacked">
        {externalLinks.map((link) => (
          <li key={link.href} className="link-card">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            <p className="muted">{link.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
