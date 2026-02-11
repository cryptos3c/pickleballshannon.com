import Link from 'next/link';

interface ServiceCardProps {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Service title */
  title: string;
  /** Short description of the service */
  description: string;
  /** Optional link destination (defaults to /contact) */
  href?: string;
  /** CTA button text */
  ctaText?: string;
}

/** Reusable card component for displaying a coaching service */
export default function ServiceCard({
  icon,
  title,
  description,
  href = '/contact',
  ctaText = 'Learn More',
}: ServiceCardProps) {
  return (
    <div className="service-card card">
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href} className="service-cta">
        {ctaText}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
