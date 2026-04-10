import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--navy)]">
      <nav className="w-full">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight">
          <img
            src="/Helmet Logo.png"
            alt="Safety Helmet Logo"
            className="h-12 w-auto"
          />
          <span className={`${montserrat.className} flex items-baseline gap-[4px]`}>
            <span className="text-xl font-semibold tracking-[0.02em] text-[var(--surface)]/95">Andrade</span>
            <span className="text-xl font-bold text-[var(--yellow)]">Safety</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex items-center gap-8 text-base font-medium">
          <Link href="/" className="text-[var(--surface)] hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Home
          </Link>
          <Link href="/services" className="text-[var(--surface)] hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Services
          </Link>
          <Link href="/contact" className="text-[var(--surface)] hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Contact
          </Link>
        </div>

        {/* Button */}
         <Link
           href="/book-training"
           className="shrink-0 rounded-lg px-5 py-3 text-sm font-semibold transition-colors bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-dark)] hover:shadow-md"
         >
           Book Training
         </Link>
        </div>
      </nav>
    </header>
  );
}
