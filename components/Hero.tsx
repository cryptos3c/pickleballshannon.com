'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      {/* Background image with overlay */}
      <div className="hero-bg">
        <Image
          src="/images/IMG_4871.JPG"
          alt="Shannon Kuhlman coaching pickleball"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">5.0+ Rated Pro</div>
        <h1>Elevate Your<br />Pickleball Game</h1>
        <p className="hero-subtitle">
          Expert coaching for players of all levels in the Twin Cities.
          Whether you&apos;re just starting out or competing in tournaments,
          take your game to the next level.
        </p>
        <div className="hero-actions">
          <Link href="/contact" className="btn btn-primary btn-lg">
            Book a Lesson
          </Link>
          <Link href="/services" className="btn btn-outline-light btn-lg">
            View Services
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(45, 52, 54, 0.85) 0%,
            rgba(42, 157, 143, 0.6) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 5rem 1.5rem;
          color: var(--white);
        }

        .hero-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--charcoal);
          background: var(--gold);
          padding: 0.375rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 1.25rem;
          line-height: 1.1;
          max-width: 560px;
        }

        .hero-subtitle {
          font-size: 1.1875rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          max-width: 520px;
          margin-bottom: 2rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Light outline variant for dark backgrounds */
        .hero-actions :global(.btn-outline-light) {
          background: transparent;
          color: var(--white);
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .hero-actions :global(.btn-outline-light:hover) {
          background: var(--white);
          color: var(--charcoal);
          border-color: var(--white);
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 500px;
          }

          .hero-content {
            padding: 3rem 1.5rem;
          }

          .hero h1 {
            font-size: 2.25rem;
          }

          .hero-subtitle {
            font-size: 1.0625rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
