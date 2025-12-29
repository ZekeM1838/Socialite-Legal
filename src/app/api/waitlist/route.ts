// src/app/api/waitlist/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ============================================
// SUPABASE CLIENT (Server-side with service role)
// ============================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// RATE LIMITING (In-memory, resets on deploy)
// For production, use Redis or Upstash
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // First request or window expired - reset
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  // Increment count
  record.count++;
  return false;
}

// ============================================
// VALIDATION HELPERS
// ============================================
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500); // Limit length and trim
}

function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  // Allow digits, spaces, dashes, parentheses, plus sign
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.length <= 20;
}

// ============================================
// ALLOWED COUNTRIES
// ============================================
const ALLOWED_COUNTRIES = new Set([
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Brazil",
  "Mexico",
  "Japan",
  "South Korea",
  "India",
  "Singapore",
  "Other",
]);

// ============================================
// POST HANDLER
// ============================================
export async function POST(request: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // 2. Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, email, phone, country } = body;

    // 4. Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!country || !ALLOWED_COUNTRIES.has(country)) {
      return NextResponse.json(
        { error: "Please select a valid country" },
        { status: 400 }
      );
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // 5. Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      phone: phone ? sanitizeInput(phone) : null,
      country: country,
      ip_address: ip,
      user_agent: request.headers.get("user-agent")?.slice(0, 500) || null,
    };

    // 6. Check for duplicate email
    const { data: existingUser } = await supabase
      .from("waitlist")
      .select("id, email")
      .eq("email", sanitizedData.email)
      .single();

    if (existingUser) {
      // Don't reveal that email exists - just return success
      // This prevents email enumeration attacks
      return NextResponse.json(
        { success: true, message: "Thank you for joining the waitlist!" },
        { status: 200 }
      );
    }

    // 7. Insert into Supabase
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([sanitizedData]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      
      // Check for unique constraint violation (duplicate email race condition)
      if (insertError.code === "23505") {
        return NextResponse.json(
          { success: true, message: "Thank you for joining the waitlist!" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }

    // 8. Success!
    return NextResponse.json(
      { success: true, message: "Thank you for joining the waitlist!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// ============================================
// BLOCK OTHER METHODS
// ============================================
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}