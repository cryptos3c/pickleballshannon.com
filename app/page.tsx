import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import Image from 'next/image';

/** SVG icons for the service cards */
const icons = {
  privateLessons: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  groupLessons: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  videoAnalysis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  tournament: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15l-3 6h6l-3-6zM8 2h8l2 5H6l2-5zM6 7h12v2a6 6 0 01-12 0V7z" />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Preview */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="accent-underline">Coaching Services</span>
            </h2>
            <p className="section-subtitle">
              Tailored programs to help you improve your game, no matter where you&apos;re starting from.
            </p>
          </div>

          <div className="grid grid-4" style={{ gap: '1.5rem' }}>
            <ServiceCard
              icon={icons.privateLessons}
              title="Private Lessons"
              description="One-on-one instruction customized to your skill level, goals, and areas for improvement."
              href="/services"
            />
            <ServiceCard
              icon={icons.groupLessons}
              title="Group Clinics"
              description="Small-group sessions focusing on specific skills like dinking, drives, and court positioning."
              href="/services"
            />
            <ServiceCard
              icon={icons.videoAnalysis}
              title="Video Analysis"
              description="Film review and stroke breakdown to identify patterns and accelerate your improvement."
              href="/services"
            />
            <ServiceCard
              icon={icons.tournament}
              title="Tournament Prep"
              description="Strategy, mental game, and match-play coaching to get you competition-ready."
              href="/services"
            />
          </div>
        </div>
      </section>

      {/* Why Shannon Section */}
      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <div className="why-shannon">
            <div className="why-image">
              <Image
                src="/images/IMG_4553.JPG"
                alt="Shannon coaching on the pickleball court"
                width={520}
                height={400}
                style={{ objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
              />
            </div>
            <div className="why-content">
              <h2>
                <span className="accent-underline">Why Train with Shannon?</span>
              </h2>
              <p style={{ marginTop: '1.5rem', color: 'var(--gray-600)', fontSize: '1.0625rem' }}>
                As a 5.0+ rated player and experienced coach, Shannon brings a unique combination
                of technical expertise, patience, and passion to every session.
              </p>
              <ul className="why-list">
                <li>
                  <span className="why-check">&#10003;</span>
                  <span>5.0+ DUPR-rated professional player</span>
                </li>
                <li>
                  <span className="why-check">&#10003;</span>
                  <span>Experienced coaching players from 2.5 to 5.0+</span>
                </li>
                <li>
                  <span className="why-check">&#10003;</span>
                  <span>Patient, encouraging approach for all ages and levels</span>
                </li>
                <li>
                  <span className="why-check">&#10003;</span>
                  <span>Focus on both technique and strategy</span>
                </li>
                <li>
                  <span className="why-check">&#10003;</span>
                  <span>Serving the Twin Cities metro area</span>
                </li>
              </ul>
              <Link href="/about" className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                Learn More About Shannon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Improve Your Game?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Get in touch to schedule a lesson or learn more about coaching options.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}
