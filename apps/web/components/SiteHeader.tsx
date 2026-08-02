'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site-content';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/ecosystem', label: 'Ecosystem' },
  { href: '/heritage', label: 'Heritage' },
  { href: '/radio', label: 'Radio' },
  { href: '/browse', label: 'Browse' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/links', label: 'Links' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="navbar kanjava-navbar is-dark is-spaced"
      role="navigation"
      aria-label="Main"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item has-text-weight-bold" href="/">
            <span className="has-text-primary">{site.name}</span>
          </Link>
          <button
            type="button"
            className={`navbar-burger ${menuOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <span className="navbar-item kanjava-tagline is-hidden-desktop">{site.tagline}</span>
          </div>
          <div className="navbar-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="navbar-item"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
