"use client";

import { useMemo, useState } from "react";
// Phone formatting and validation helpers (from BookTrainingClient)
function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function isValidPhoneNumber(phone: string) {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}


type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  topic: "" | "OSHA Training" | "Site Audit" | "Custom Program" | "Other";
  preferredContact: "Email" | "Phone";
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  topic: "",
  preferredContact: "Email",
  message: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  // FAQ accordion state
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!isEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please add a short message.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error("Failed to submit. Please try again.");
      }
      setSubmitted(true);
      setForm(initialState);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Contact</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Questions? Send us a note and we’ll respond within a few business days.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Left: Info */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900">Get in touch</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Prefer email or phone? Use what’s easiest.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Service Area
                </div>
                <div className="mt-1 text-sm text-zinc-800">Massachusetts & New England</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Email
                </div>
                <a
                  className="mt-1 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
                  href="mailto:info@safety101.com"
                >
                  info@safety101.com
                </a>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Phone
                </div>
                <a
                  className="mt-1 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
                  href="tel:+10000000000"
                >
                  (000) 000-0000
                </a>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Hours
                </div>
                <div className="mt-1 text-sm text-zinc-800">Mon–Fri, 9:00 AM – 5:00 PM</div>
              </div>
            </div>
          </div>

          {/* small CTA */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-sm font-semibold text-zinc-900">Ready to schedule?</h3>
            <p className="mt-2 text-sm text-zinc-600">
              If you already know what you need, you can request a training directly.
            </p>
                <a
                  href="/book-training"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
                >
                  Book training →
                </a>
          </div>
        </aside>

        {/* Right: Form or Confirmation */}
        <section className="lg:col-span-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            {!submitted && (
              <h2 className="text-sm font-semibold text-zinc-900">Send a message</h2>
            )}
            {!submitted ? (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="name">
                    Full name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-zinc-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="email">
                    Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1 text-xs text-zinc-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", formatPhoneInput(e.target.value))}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="(555) 555-5555"
                    autoComplete="tel"
                  />
                  {form.phone.length > 0 && !isValidPhoneNumber(form.phone) && (
                    <p className="mt-1 text-xs text-zinc-500">Please enter a valid 10-digit phone number.</p>
                  )}
                </div>

                {/* Company */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="company">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="City, State"
                    autoComplete="address-level2"
                  />
                </div>

                {/* Topic */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="topic">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={form.topic}
                    onChange={(e) => update("topic", e.target.value as FormState["topic"])}
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  >
                    <option value="">Select a topic...</option>
                    <option value="OSHA Training">OSHA Training</option>
                    <option value="Site Audit">Site Audit</option>
                    <option value="Custom Program">Custom Program</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Preferred Contact */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-zinc-900">
                    Preferred contact method
                  </label>

                  <div className="mt-3 flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="Email"
                        checked={form.preferredContact === "Email"}
                        onChange={() => update("preferredContact", "Email")}
                        className="h-4 w-4 accent-zinc-900"
                      />
                      Email
                    </label>

                    <label className="flex items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="Phone"
                        checked={form.preferredContact === "Phone"}
                        onChange={() => update("preferredContact", "Phone")}
                        className="h-4 w-4 accent-zinc-900"
                      />
                      Phone
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-zinc-900" htmlFor="message">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="mt-2 min-h-[140px] w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                    placeholder="Tell us what you're looking for (training topic, group size, preferred dates, etc.)"
                  />
                  {errors.message && <p className="mt-1 text-xs text-zinc-500">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-zinc-500">
                    By submitting, you agree we may contact you about your request.
                  </p>
                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={[
                      "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-colors",
                      canSubmit && !loading
                        ? "bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-dark)]"
                        : "bg-zinc-200 text-zinc-500 cursor-not-allowed",
                    ].join(" ")}
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-xs text-rose-600">{error}</p>
                )}
              </form>
            ) : (
              <div className="py-6">
                <h2 className="text-lg font-semibold text-zinc-900">Request received</h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Thanks — we got your message. We’ll respond within a few business days.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Accordion FAQ */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-sm font-semibold text-zinc-900">FAQ</h3>
            <div className="mt-4 flex flex-col gap-2">
              {[
                {
                  q: "On-site training?",
                  a: "Yes — delivered in person at your facility.",
                },
                {
                  q: "Customized content?",
                  a: "We tailor programs to your operations and risks.",
                },
                {
                  q: "Scheduling?",
                  a: "Most sessions can be scheduled within 1–2 weeks.",
                },
              ].map((item, idx) => (
                <div key={item.q} className="border-b border-zinc-200 last:border-b-0">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3 text-left text-sm font-medium text-zinc-900 focus:outline-none"
                    aria-expanded={faqOpen === idx}
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="ml-2 text-zinc-400">{faqOpen === idx ? "−" : "+"}</span>
                  </button>
                  {faqOpen === idx && (
                    <div className="pb-3 pl-1 pr-2 text-sm text-zinc-600 animate-fade-in">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}