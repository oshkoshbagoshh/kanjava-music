import Link from 'next/link';
import { site } from '@/lib/site-content';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="logo" href="/">
          {site.name}
        </Link>
        <p className="tagline">{site.tagline}</p>
        <nav className="site-nav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/radio">Radio</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/links">Links</Link>
        </nav>
      </div>
    </header>
  );
}
