import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/site-content';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { blogPosts } = await import('@/lib/site-content');
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="panel">
      <p>
        <Link href="/blog">← Blog</Link>
      </p>
      <h1>{post.title}</h1>
      <time className="muted" dateTime={post.date}>
        {post.date}
      </time>
      {post.body.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
      ))}
    </article>
  );
}
