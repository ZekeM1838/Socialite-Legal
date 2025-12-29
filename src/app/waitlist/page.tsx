// src/app/waitlist/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import ClientLayout from "../../components/ClientLayout";
import { Check, Loader2, Instagram } from "lucide-react";

// Common countries for the dropdown
const countries = [
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
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export default function WaitlistPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!formData.country) {
      setError("Please select your country");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Connect to Supabase
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success!
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (isSubmitted) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 max-w-xl">
          <div className="py-20 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Thank you!
            </h1>

            <div className="panel-chrome rounded-lg p-6 text-left mb-8">
              <p className="text-[13px] text-black/80 leading-relaxed mb-4">
                Your submission has been recorded. We will follow up when you&apos;re
                off the waitlist.
              </p>
              <p className="text-[13px] text-black/80 leading-relaxed mb-4">
                No worries about subscriptions or spam as this is to record signups.
              </p>
              <p className="text-[13px] text-black/80 leading-relaxed">
                Follow{" "}
                <a
                  href="https://instagram.com/socialitehq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-black"
                >
                  @socialitehq
                </a>{" "}
                on Instagram to stay connected for live updates.
              </p>
            </div>

            <p className="text-[12px] text-black/50 mb-6">— Socialite Team</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://instagram.com/socialitehq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-winamp-sm flex items-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow on Instagram</span>
              </a>
              <Link
                href="/"
                className="text-[12px] text-black/60 hover:text-black transition-colors underline underline-offset-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  // Form State
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-xl">
        {/* Page Header */}
        <div className="py-10 border-b border-[#222222]">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Join the Waitlist
          </h1>
          <p className="text-black/60 text-sm">
            Be the first to experience Socialite
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-10">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-[11px] text-black/60 uppercase tracking-wider mb-2 px-1">
              What is your name? <span className="text-black">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-neumorphic"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-[11px] text-black/60 uppercase tracking-wider mb-2 px-1">
              What is your email address? <span className="text-black">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-neumorphic"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Field (Optional) */}
          <div className="mb-6">
            <label className="block text-[11px] text-black/60 uppercase tracking-wider mb-2 px-1">
              What is your phone number?
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone (optional)"
              className="input-neumorphic"
              disabled={isSubmitting}
            />
          </div>

          {/* Country Field */}
          <div className="mb-6">
            <label className="block text-[11px] text-black/60 uppercase tracking-wider mb-2 px-1">
              What country are you based in? <span className="text-black">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="select-neumorphic"
              disabled={isSubmitting}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Launch Notice */}
          <div className="panel-inset rounded-lg p-4 mb-8">
            <p className="text-[11px] text-black/70 leading-relaxed">
              Socialite will be launching in the <strong>United States</strong> first.
              We will then launch across the Globe shortly after.
            </p>
          </div>

          {/* Privacy Notice */}
          <p className="text-[11px] text-black/50 mb-6 px-1">
            By subscribing, you are agreeing to our{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-black"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-winamp w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                SUBMITTING...
              </span>
            ) : (
              "SUBMIT"
            )}
          </button>
        </form>
      </div>
    </ClientLayout>
  );
}
