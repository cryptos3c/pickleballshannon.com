'use client';

import Link from 'next/link';

/** Placeholder social media links — update URLs when accounts are created */
const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top gold accent stripe */}
      <div className="footer-stripe" />

      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-name">Shannon Kuhlman</span>
                <span className="footer-logo-tagline">Pickleball Coach</span>
              </div>
              <p className="footer-tagline">
                Helping players of all levels elevate their game through expert coaching
                in the Twin Cities.
              </p>
              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-links-col">
              <h4>Services</h4>
              <ul>
                <li>Private Lessons</li>
                <li>Group Clinics</li>
                <li>Video Analysis</li>
                <li>Tournament Prep</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-links-col">
              <h4>Get in Touch</h4>
              <p className="footer-contact-text">
                Serving the Minneapolis&ndash;St. Paul metro area.
              </p>
              <a href="mailto:shannon@pickleballshannon.com" className="footer-email">
                shannon@pickleballshannon.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright">
            &copy; {currentYear} Shannon Kuhlman Pickleball. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--charcoal);
          color: var(--gray-300);
        }

        .footer-stripe {
          height: 4px;
          background: var(--gold);
        }

        .footer-content {
          padding: 4rem 0;
        }

        .footer-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-logo {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
        }

        .footer-logo-tagline {
          font-family: var(--font-display);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--jade);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-tagline {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--gray-400);
          margin: 0;
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          color: var(--gray-400);
          border: 1px solid var(--gray-600);
          border-radius: 50%;
          transition: color 0.2s, border-color 0.2s, background-color 0.2s;
        }

        .footer-social-link:hover {
          color: var(--white);
          border-color: var(--jade);
          background: var(--jade);
        }

        .footer-social-link :global(svg) {
          width: 1rem;
          height: 1rem;
        }

        .footer-links-col h4 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 1rem;
        }

        .footer-links-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-col li {
          font-size: 0.9375rem;
          color: var(--gray-400);
          margin-bottom: 0.5rem;
        }

        .footer-links-col :global(a) {
          color: var(--gray-400);
          transition: color 0.2s;
        }

        .footer-links-col :global(a:hover) {
          color: var(--white);
        }

        .footer-contact-text {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--gray-400);
          margin: 0 0 0.75rem;
        }

        .footer-email {
          font-size: 0.875rem;
          color: var(--jade);
          transition: color 0.2s;
          word-break: break-all;
        }

        .footer-email:hover {
          color: var(--gold);
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          padding: 1.25rem 0;
          text-align: center;
        }

        .footer-copyright {
          font-size: 0.8125rem;
          color: var(--gray-500);
          margin: 0;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-content {
            padding: 3rem 0;
          }

          .footer-brand {
            text-align: center;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
