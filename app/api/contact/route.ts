import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend client (will be null if not configured)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Create Supabase client at runtime to ensure env vars are available */
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(url, key);
}

/** Zod schema for contact form validation */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(20).optional().or(z.literal('')),
  service_interest: z.string().min(1, 'Please select a service'),
  message: z.string().min(5, 'Message is required').max(2000),
  turnstileToken: z.string().optional(),
});

/** Verify Turnstile token with Cloudflare */
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Service not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Verify Turnstile token if provided
    if (validatedData.turnstileToken) {
      const isValid = await verifyTurnstile(validatedData.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      // If Turnstile is configured but no token provided, reject
      return NextResponse.json(
        { error: 'Security verification required.' },
        { status: 400 }
      );
    }

    // Get Supabase client at runtime
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (e) {
      console.error('Supabase client error:', e);
      return NextResponse.json(
        { error: 'Database not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Insert inquiry into Supabase (don't use .select() — anon users can't read back)
    const { error } = await supabase.from('inquiries').insert([
      {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        service_interest: validatedData.service_interest,
        message: validatedData.message,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error.message, error.code, error.details);
      return NextResponse.json(
        { error: `Failed to save your request: ${error.message}` },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking — don't fail the request if email fails)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Pickleball Shannon <noreply@pickleballshannon.com>',
          to: ['shannon@pickleballshannon.com'],
          subject: `New Inquiry: ${validatedData.service_interest} from ${validatedData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2A9D8F;">New Coaching Inquiry</h2>
              <hr style="border: 1px solid #e5e7eb;" />

              <h3 style="color: #374151;">Contact Information</h3>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
              ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}

              <h3 style="color: #374151;">Inquiry Details</h3>
              <p><strong>Service:</strong> ${validatedData.service_interest}</p>
              <p><strong>Message:</strong> ${validatedData.message}</p>

              <hr style="border: 1px solid #e5e7eb;" />
              <p style="color: #6b7280; font-size: 12px;">
                Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
                via pickleballshannon.com
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        // Log but don't fail the request
        console.error('Email notification error:', emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Shannon will get back to you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please fill in all required fields correctly.', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
