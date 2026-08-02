import Link from 'next/link';
import { blogPosts } from '@/lib/site-content';

export default function BlogIndexPage() {
  return (
    <section className="panel">
      <h1>Blog</h1>
      <p className="muted">
        Build notes, intent, and updates for Kanjava Music. Heavier technical chapters live in the
        repo under <code>docs/book/</code>.
      </p>
      <ul className="blog-list">
        {blogPosts.map((post) => (
          <li key={post.slug} className="blog-list__item">
            <Link href={`/blog/${post.slug}`}>
              <span className="blog-list__title">{post.title}</span>
            </Link>
            <time className="muted" dateTime={post.date}>
              {post.date}
            </time>
            <p className="muted">{post.excerpt}</p>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/building">Building Kanjava Music (book index) →</Link>
      </p>
    </section>
  );
}
