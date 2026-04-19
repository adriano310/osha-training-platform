"use client";

import Link from "next/link";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--navy)]">
      <nav className="w-full">
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex min-w-0 shrink items-center gap-2 text-xl font-semibold tracking-tight"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/Helmet Logo.png"
                alt="Safety Helmet Logo"
                className="h-10 w-auto sm:h-12"
              />
              <span className={`${montserrat.className} flex items-baseline gap-[4px]`}>
                <span className="text-lg font-semibold tracking-[0.02em] text-[var(--surface)]/95 sm:text-xl">
                  Andrade
                </span>
                <span className="text-lg font-bold text-[var(--yellow)] sm:text-xl">Safety</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 text-base font-medium md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--surface)] transition-all hover:text-[var(--yellow)] hover:brightness-110"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/book-training"
                className="hidden shrink-0 rounded-lg bg-[var(--yellow)] px-5 py-3 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)] hover:shadow-md md:inline-flex"
              >
                Book Training
              </Link>

              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--surface)]/20 p-2 text-[var(--surface)] transition hover:bg-[var(--surface)]/10 md:hidden"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="mt-4 rounded-xl border border-[var(--surface)]/10 bg-[var(--navy)]/95 p-4 shadow-lg md:hidden">
              <div className="flex flex-col gap-2 text-base font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-[var(--surface)] transition hover:bg-[var(--surface)]/10 hover:text-[var(--yellow)]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/book-training"
                  className="mt-2 inline-flex justify-center rounded-lg bg-[var(--yellow)] px-5 py-3 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
                  onClick={() => setIsOpen(false)}
                >
                  Book Training
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
