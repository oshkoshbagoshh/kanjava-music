import Link from 'next/link';
import { blogPosts } from '@/lib/site-content';

export default function BlogIndexPage() {
  return (
    <div className="box">
      <h1 className="title is-3">Blog</h1>
      <div className="content">
        <p className="is-muted">
          Build notes, intent, and updates for Kanjava Music. Heavier technical chapters live in the
          repo under <code>docs/book/</code>.
        </p>
        {blogPosts.map((post) => (
          <article key={post.slug} className="mb-5">
            <h2 className="title is-5">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="is-muted">
              <time dateTime={post.date}>{post.date}</time>
            </p>
            <p>{post.excerpt}</p>
          </article>
        ))}
        <p>
          <Link href="/building">Building Kanjava Music (book index) →</Link>
        </p>
      </div>
    </div>
  );
}
