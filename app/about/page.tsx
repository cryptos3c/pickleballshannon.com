import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Shannon | Pickleball Pro Coach - Twin Cities',
  description:
    'Meet Shannon Kuhlman, a 5.0+ rated pickleball pro coach serving the Twin Cities. Learn about her background, coaching philosophy, and approach to helping players improve.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About Shannon</h1>
          <p className="page-header-subtitle">
            5.0+ rated pro coach helping players of all levels reach their potential.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="bio-grid">
            <div className="bio-image">
              <Image
                src="/images/IMG_4439.JPG"
                alt="Shannon Kuhlman - Pickleball Pro Coach"
                width={480}
                height={560}
                style={{ objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
              />
            </div>
            <div className="bio-content">
              <h2>
                <span className="accent-underline">Meet Your Coach</span>
              </h2>
              <p style={{ marginTop: '1.5rem', fontSize: '1.0625rem', color: 'var(--gray-700)' }}>
                Shannon Kuhlman is a 5.0+ rated pickleball professional based in the Twin Cities
                metro area. With years of competitive play and coaching experience, she brings a
                deep understanding of the game to every lesson.
              </p>
              <p style={{ fontSize: '1.0625rem', color: 'var(--gray-700)' }}>
                Shannon&apos;s coaching philosophy centers on meeting players where they are and
                building their skills through a combination of technical instruction, strategic
                thinking, and game-situation practice. Whether you&apos;re picking up a paddle for
                the first time or preparing for your next tournament, Shannon tailors her approach
                to your specific goals.
              </p>
              <p style={{ fontSize: '1.0625rem', color: 'var(--gray-700)' }}>
                Known for her patience, encouragement, and ability to break down complex techniques
                into actionable steps, Shannon has helped hundreds of players in the Twin Cities
                improve their game and fall deeper in love with pickleball.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Philosophy */}
      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="accent-underline">Coaching Philosophy</span>
            </h2>
            <p className="section-subtitle">
              A thoughtful, personalized approach to getting the most out of your game.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="philosophy-card card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Patient &amp; Encouraging</h3>
              <p>
                Every player learns differently. Shannon creates a supportive environment where
                you feel comfortable taking risks and trying new techniques.
              </p>
            </div>

            <div className="philosophy-card card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Technique &amp; Strategy</h3>
              <p>
                Great pickleball combines solid mechanics with smart decision-making. Shannon
                develops both your strokes and your court IQ.
              </p>
            </div>

            <div className="philosophy-card card">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3>Measurable Progress</h3>
              <p>
                Structured lessons with clear goals so you can see and feel your improvement
                from session to session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Let&apos;s talk about your goals and find the right coaching program for you.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Book a Lesson
          </Link>
        </div>
      </section>
    </>
  );
}
