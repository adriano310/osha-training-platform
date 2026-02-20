export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Safety101</p>
          <p>Built for safety. Backed by compliance.</p>
        </div>
      </div>
    </footer>
  );
}