import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Safety101
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Home
          </Link>
          <Link href="/services" className="hover:text-gray-600 transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="hover:text-gray-600 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Button */}
        <Link
          href="/book-training"
          className="rounded-md border border-black px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white"
        >
          Book Training
        </Link>
      </nav>
    </header>
  );
}
