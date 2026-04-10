export default function Footer() {
  return (
    <footer className="border-t border-[rgba(27,42,74,0.10)] bg-[var(--navy-dark)]">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white">
          <p>© {new Date().getFullYear()} Andrade Safety Consulting</p>
          <p>Built for safety. Backed by compliance.</p>
        </div>
      </div>
    </footer>
  );
}