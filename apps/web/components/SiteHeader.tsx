import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="logo" href="/">
          Kanjava Music
        </Link>
        <p className="tagline">Royalty-free production assets for ghost producers</p>
        <nav className="site-nav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/upload">Upload</Link>
        </nav>
      </div>
    </header>
  );
}
