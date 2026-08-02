import Link from 'next/link';

export default function BuildingHubPage() {
  return (
    <div className="box content">
      <h1>Building Kanjava Music</h1>
      <p>
        Chapter-by-chapter build log for the marketplace and local USB library (Phase 0). Markdown
        manuscripts and pass/fail checklists live in the GitHub repo.
      </p>
      <p>
        <a
          href="https://github.com/oshkoshbagoshh/kanjava-music/tree/main/docs/book"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/book on GitHub
        </a>
      </p>
      <p className="is-muted">
        On-site blog posts are shorter intent pieces; the book is the deep implementation guide.
      </p>
      <Link href="/blog">Back to blog</Link>
    </div>
  );
}
