export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--navy-dark)]">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-2 text-xs text-[var(--surface)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Andrade Safety Consulting</p>
          <p>Built for safety. Backed by compliance.</p>
        </div>
      </div>
    </footer>
  );
}