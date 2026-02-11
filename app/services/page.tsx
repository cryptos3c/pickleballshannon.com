import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Shannon Kuhlman Pickleball Coaching',
  description:
    'Private lessons, group clinics, video analysis, and tournament coaching from a 5.0+ rated pickleball pro in the Twin Cities. Contact for rates.',
};

/** Data for each service offering */
const services = [
  {
    id: 'private-lessons',
    title: 'Private Lessons',
    subtitle: '1-on-1 Coaching',
    description:
      'Get personalized attention with one-on-one sessions tailored entirely to your game. Shannon will assess your current skill level, identify areas for improvement, and create a structured plan to help you reach your goals.',
    highlights: [
      'Customized drills for your specific needs',
      'Technique correction with instant feedback',
      'Strategy and shot selection development',
      'Flexible scheduling to fit your availability',
    ],
    image: '/images/IMG_4463.JPG',
    imageAlt: 'Private pickleball lesson',
  },
  {
    id: 'group-clinics',
    title: 'Group Lessons & Clinics',
    subtitle: 'Small-Group Sessions',
    description:
      'Join a small group of players at a similar level for focused skill development. Clinics cover specific topics like dinking, the transition zone, third-shot drops, and more — in a fun, social setting.',
    highlights: [
      'Skill-matched groups for effective learning',
      'Topic-focused sessions (dinks, drives, serves)',
      'Live-ball drills and point play',
      'Great for learning with friends or teammates',
    ],
    image: '/images/IMG_4546.JPG',
    imageAlt: 'Group pickleball clinic',
  },
  {
    id: 'video-analysis',
    title: 'Video / Stroke Analysis',
    subtitle: 'Film Review & Breakdown',
    description:
      'Sometimes the best way to improve is to see yourself play. Shannon will film your game, then walk you through a detailed analysis of your strokes, positioning, and decision-making.',
    highlights: [
      'On-court filming of match or drill play',
      'Frame-by-frame stroke breakdown',
      'Side-by-side comparison with ideal technique',
      'Actionable improvement plan to take away',
    ],
    image: '/images/IMG_4615.JPG',
    imageAlt: 'Video analysis session',
  },
  {
    id: 'tournament-prep',
    title: 'Tournament Coaching & Prep',
    subtitle: 'Competition Ready',
    description:
      'Preparing for a tournament? Shannon will help you sharpen your competitive game with focused strategy sessions, pressure-point practice, and mental game coaching.',
    highlights: [
      'Match strategy and game-plan development',
      'Pressure-situation drills and point play',
      'Partner communication and doubles tactics',
      'Mental toughness and between-point routines',
    ],
    image: '/images/IMG_4687.JPG',
    imageAlt: 'Tournament preparation coaching',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Coaching Services</h1>
          <p className="page-header-subtitle">
            Programs designed to meet you where you are and take your game further.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-row ${index % 2 === 1 ? 'reverse' : ''}`}
              id={service.id}
            >
              <div className="service-image">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={520}
                  height={380}
                  style={{ objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
                />
              </div>
              <div className="service-details">
                <span className="service-subtitle">{service.subtitle}</span>
                <h2>{service.title}</h2>
                <p className="service-description">{service.description}</p>
                <ul className="service-highlights">
                  {service.highlights.map((item) => (
                    <li key={item}>
                      <span className="highlight-check">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary">
                  Contact for Rates
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Not Sure Which Service Is Right for You?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Reach out and Shannon will help you find the best fit for your goals and experience level.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
