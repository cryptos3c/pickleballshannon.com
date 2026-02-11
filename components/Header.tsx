'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

/** Navigation links for the site */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

/** Placeholder social media links — update URLs when accounts are created */
const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      {/* Top gold accent stripe */}
      <div className="header-stripe-top" />

      <nav className="header-nav">
        <div className="header-container">
          {/* Wordmark / Logo */}
          <Link href="/" className="header-logo">
            <span className="header-logo-name">Shannon Kuhlman</span>
            <span className="header-logo-tagline">Pickleball Coach</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="header-links">
            {navLinks.map((link, i) => (
              <span key={link.href} className="header-link-wrapper">
                {i > 0 && <span className="header-link-sep" aria-hidden="true">·</span>}
                <Link
                  href={link.href}
                  className={`header-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Social Icons + CTA */}
          <div className="header-right">
            <div className="header-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="header-social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <Link href="/contact" className="btn btn-primary header-cta">
              Book a Lesson
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="header-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="header-mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-mobile-link ${pathname === link.href ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-primary header-mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Lesson
            </Link>
            <div className="header-mobile-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="header-social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom jade accent stripe */}
      <div className="header-stripe-bottom" />

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--white);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .header-stripe-top {
          height: 4px;
          background: var(--gold);
        }

        .header-stripe-bottom {
          height: 3px;
          background: var(--jade);
        }

        .header-nav {
          background: var(--white);
        }

        .header-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .header-logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          flex-shrink: 0;
        }

        .header-logo-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--charcoal);
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .header-logo-tagline {
          font-family: var(--font-display);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--jade);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 0.5rem;
        }

        .header-links {
          display: flex;
          align-items: center;
          gap: 0.125rem;
        }

        .header-link-wrapper {
          display: flex;
          align-items: center;
          gap: 0.125rem;
        }

        .header-link-sep {
          color: var(--gray-300);
          font-size: 1.25rem;
          line-height: 1;
          user-select: none;
          padding: 0 0.125rem;
        }

        .header-link {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--gray-700);
          padding: 0.5rem 0.875rem;
          border-radius: var(--border-radius);
          transition: color 0.2s, background-color 0.2s;
          white-space: nowrap;
        }

        .header-link:hover {
          color: var(--jade-dark);
          background: var(--jade-light);
        }

        .header-link.active {
          color: var(--jade-dark);
          background: var(--jade-light);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-socials {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          color: var(--gray-500);
          border-radius: 50%;
          transition: color 0.2s, background-color 0.2s;
        }

        .header-social-link:hover {
          color: var(--jade);
          background: var(--jade-light);
        }

        .header-social-link :global(svg) {
          width: 1.125rem;
          height: 1.125rem;
        }

        .header-cta {
          font-size: 0.875rem;
          padding: 0.625rem 1.25rem;
        }

        .header-mobile-btn {
          display: none;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          color: var(--gray-700);
        }

        .header-mobile-btn svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        .header-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 1rem;
          background: var(--white);
          border-top: 1px solid var(--gray-200);
        }

        .header-mobile-link {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-700);
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius);
          text-decoration: none;
        }

        .header-mobile-link.active {
          color: var(--jade-dark);
          background: var(--jade-light);
        }

        .header-mobile-cta {
          text-align: center;
          margin-top: 0.5rem;
        }

        .header-mobile-socials {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-200);
        }

        @media (max-width: 768px) {
          .header-links,
          .header-right {
            display: none;
          }

          .header-mobile-btn {
            display: block;
          }

          .header-mobile-menu {
            display: flex;
          }

          .header-container {
            padding: 0.5rem 1rem;
          }

          .header-logo-name {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </header>
  );
}
