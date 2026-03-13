import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-[var(--navy)]">
      <nav className="w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight">
          <img
            src="/Helmet Logo.png"
            alt="Safety Helmet Logo"
            className="h-12 w-auto"
          />
          <span className="font-bold text-xl text-white">Safety101</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link href="/" className="text-white hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Home
          </Link>
          <Link href="/services" className="text-white hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Services
          </Link>
          <Link href="/contact" className="text-white hover:text-[var(--yellow)] hover:brightness-110 transition-all">
            Contact
          </Link>
        </div>

        {/* Button */}
         <Link
           href="/book-training"
           className="rounded-lg px-5 py-3 text-sm font-semibold transition-colors bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-dark)] hover:shadow-md"
         >
           Book Training
         </Link>
        </div>
      </nav>
    </header>
  );
}
