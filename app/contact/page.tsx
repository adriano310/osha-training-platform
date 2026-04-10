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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-dark)]">Contact</h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
          Have a question or looking to schedule training? Send us a message and we’ll respond within 1–2 business days.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Left: Info */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[var(--text-dark)]">Get in touch</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Prefer email or phone? Use what’s easiest.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Service Area
                </div>
                <div className="mt-1 text-sm text-[var(--text-dark)]">Massachusetts & New England</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Email
                </div>
                <a
                  className="mt-1 inline-block text-sm font-medium text-[var(--text-dark)] underline decoration-[var(--border-subtle)] underline-offset-4 hover:decoration-[var(--text-muted)]"
                  href="mailto:info@andradesafety.com"
                >
                  info@andradesafety.com
                </a>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Phone
                </div>
                <a
                  className="mt-1 inline-block text-sm font-medium text-[var(--text-dark)] underline decoration-[var(--border-subtle)] underline-offset-4 hover:decoration-[var(--text-muted)]"
                  href="tel:+10000000000"
                >
                  (000) 000-0000
                </a>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Hours
                </div>
                <div className="mt-1 text-sm text-[var(--text-dark)]">Mon–Fri, 9:00 AM – 5:00 PM</div>
              </div>
            </div>
          </div>

          {/* small CTA */}
          <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--off-white)] p-6">
            <h3 className="text-sm font-semibold text-[var(--text-dark)]">Ready to schedule?</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              If you already know the training you need, you can request a session in just a few minutes.
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
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            {!submitted && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-semibold text-[var(--text-dark)]">Send a message</h2>
                <p className="text-xs text-[var(--text-muted)] sm:text-right">
                  Fields marked <span className="text-rose-600">*</span> are required.
                </p>
              </div>
            )}
            {!submitted ? (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="name">
                    Full name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-[var(--text-muted)]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="email">
                    Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[var(--text-muted)]">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", formatPhoneInput(e.target.value))}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="(555) 555-5555"
                    autoComplete="tel"
                  />
                  {form.phone.length > 0 && !isValidPhoneNumber(form.phone) && (
                    <p className="mt-1 text-xs text-[var(--text-muted)]">Please enter a valid 10-digit phone number.</p>
                  )}
                </div>

                {/* Company */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="company">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="City, State"
                    autoComplete="address-level2"
                  />
                </div>

                {/* Topic */}
                <div className="sm:col-span-1">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="topic">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={form.topic}
                    onChange={(e) => update("topic", e.target.value as FormState["topic"])}
                    className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
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
                  <label className="block text-sm font-medium text-[var(--text-dark)]">
                    Preferred contact method
                  </label>

                  <div
                    className="mt-2 inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--off-white)] p-1"
                    role="group"
                    aria-label="Preferred contact method"
                  >
                    <button
                      type="button"
                      aria-pressed={form.preferredContact === "Email"}
                      onClick={() => update("preferredContact", "Email")}
                      className={[
                        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                        form.preferredContact === "Email"
                          ? "bg-[var(--yellow)] text-[var(--navy)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-dark)]",
                      ].join(" ")}
                    >
                      Email
                    </button>

                    <button
                      type="button"
                      aria-pressed={form.preferredContact === "Phone"}
                      onClick={() => update("preferredContact", "Phone")}
                      className={[
                        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                        form.preferredContact === "Phone"
                          ? "bg-[var(--yellow)] text-[var(--navy)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-dark)]",
                      ].join(" ")}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[var(--text-dark)]" htmlFor="message">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="mt-2 min-h-[140px] w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:border-[var(--navy)]"
                    placeholder="Tell us what you're looking for (training topic, group size, preferred dates, etc.)"
                  />
                  {errors.message && <p className="mt-1 text-xs text-[var(--text-muted)]">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-[var(--text-muted)]">
                    By submitting, you agree we may contact you about your request.
                  </p>
                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className={[
                      "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-colors",
                      canSubmit && !loading
                        ? "bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-dark)]"
                        : "cursor-not-allowed bg-[var(--off-white)] text-[var(--text-muted)]",
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
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">Submission received</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Thanks. We’ve received your message. We’ll review your request and follow up within 
                  1–2 business days to discuss next steps. If your request is urgent, feel free to 
                  contact us directly.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Accordion FAQ */}
          <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--off-white)] p-6">
            <h3 className="text-sm font-semibold text-[var(--text-dark)]">FAQ</h3>
            <div className="mt-4 flex flex-col gap-2">
              {[
                {
                  q: "Do you offer on-site training at our facility?",
                  a: "Yes — all training is delivered in person at your facility to match your equipment, environment, and team.",
                },
                {
                  q: "Can you customize the training content for our industry?",
                  a: "Yes — we tailor each program to your operations, industry requirements, and specific safety risks.",
                },
                {
                  q: "How far in advance do I need to schedule?",
                  a: "Most sessions can be scheduled within 1–2 weeks, depending on availability and location.",
                },
                {
                  q: "How does pricing work?",
                  a: "Pricing depends on the type of training, group size, and location. Contact us or request a quote for a quick estimate.",
                },
              ].map((item, idx) => (
                <div key={item.q} className="border-b border-[var(--border-subtle)] last:border-b-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-[var(--text-dark)] focus:outline-none"
                    aria-expanded={faqOpen === idx}
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="ml-2 text-[var(--text-muted)]">{faqOpen === idx ? "−" : "+"}</span>
                  </button>
                  {faqOpen === idx && (
                    <div className="animate-fade-in pb-3 pl-1 pr-2 text-sm text-[var(--text-muted)]">
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