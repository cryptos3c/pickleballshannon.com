'use client';

import { useState, useRef, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service_interest?: string;
  message?: string;
}

/** Format phone number as (XXX) XXX-XXXX */
const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const trimmed = digits.slice(0, 10);

  if (trimmed.length === 0) return '';
  if (trimmed.length <= 3) return `(${trimmed}`;
  if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
  return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  /** Load and initialize Cloudflare Turnstile widget */
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    script.async = true;
    script.defer = true;

    (window as Window & { onloadTurnstileCallback?: () => void }).onloadTurnstileCallback =
      () => {
        if (turnstileRef.current && window.turnstile) {
          widgetIdRef.current =
            window.turnstile.render(turnstileRef.current, {
              sitekey: turnstileSiteKey,
              theme: 'light',
              size: 'normal',
            }) ?? null;
        }
      };

    document.head.appendChild(script);

    return () => {
      script.remove();
      delete (window as Window & { onloadTurnstileCallback?: () => void })
        .onloadTurnstileCallback;
    };
  }, [turnstileSiteKey]);

  /** Validate form fields before submission */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service_interest) {
      newErrors.service_interest = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Get Turnstile token if available
    let turnstileToken = '';
    if (turnstileSiteKey && widgetIdRef.current && window.turnstile) {
      turnstileToken = window.turnstile.getResponse(widgetIdRef.current) || '';
      if (!turnstileToken) {
        setErrorMessage('Please complete the security check');
        setSubmitStatus('error');
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });

      // Reset Turnstile widget
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Handle input changes and clear field errors */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="form-success">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </div>
        <h3>Thank You!</h3>
        <p>
          Your message has been sent. Shannon will get back to you within 24 hours.
        </p>
        <button onClick={() => setSubmitStatus('idle')} className="btn btn-secondary">
          Send Another Message
        </button>

        <style jsx>{`
          .form-success {
            text-align: center;
            padding: 3rem 2rem;
            background: var(--jade-light);
            border-radius: var(--border-radius);
          }

          .success-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 4rem;
            height: 4rem;
            background: var(--jade);
            border-radius: 50%;
            margin-bottom: 1.5rem;
          }

          .success-icon :global(svg) {
            width: 2rem;
            height: 2rem;
            color: var(--white);
          }

          h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gray-900);
            margin-bottom: 0.5rem;
          }

          p {
            color: var(--gray-600);
            margin-bottom: 1.5rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Name */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Your full name"
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      {/* Email & Phone row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            placeholder="(612) 555-1234"
          />
        </div>
      </div>

      {/* Service Interest */}
      <div className="form-group">
        <label htmlFor="service_interest" className="form-label">
          What are you interested in? *
        </label>
        <select
          id="service_interest"
          name="service_interest"
          value={formData.service_interest}
          onChange={handleInputChange}
          className={`form-input ${errors.service_interest ? 'error' : ''}`}
        >
          <option value="">Select a service</option>
          <option value="Private Lessons">Private Lessons (1-on-1)</option>
          <option value="Group Lessons">Group Lessons &amp; Clinics</option>
          <option value="Video Analysis">Video / Stroke Analysis</option>
          <option value="Tournament Coaching">Tournament Coaching &amp; Prep</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
        {errors.service_interest && <p className="form-error">{errors.service_interest}</p>}
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className={`form-textarea ${errors.message ? 'error' : ''}`}
          placeholder="Tell Shannon about your experience level, goals, and availability..."
          rows={5}
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      {/* Turnstile Widget */}
      {turnstileSiteKey && (
        <div className="turnstile-container">
          <div ref={turnstileRef} />
        </div>
      )}

      {/* Error banner */}
      {submitStatus === 'error' && (
        <div className="form-error-message">
          {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Submit */}
      <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="form-disclaimer">
        Your information is private and will never be shared. Shannon will respond within 24 hours.
      </p>

      <style jsx>{`
        .contact-form {
          background: var(--white);
          padding: 2.5rem;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .turnstile-container {
          margin-bottom: 1.25rem;
        }

        .form-error-message {
          background: var(--error-light);
          color: var(--error);
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.25rem;
          font-size: 0.9375rem;
        }

        .submit-btn {
          width: 100%;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-disclaimer {
          font-size: 0.8125rem;
          color: var(--gray-500);
          text-align: center;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </form>
  );
}
