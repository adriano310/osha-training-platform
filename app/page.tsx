import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-zinc-50">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border bg-white p-10 shadow-sm">
          <p className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-zinc-700">
            In-person OSHA training • Simple booking
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Book OSHA training for your team — fast.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            Safety101 helps companies request in-person trainings, coordinate schedules,
            and keep everything organized from one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-training"
              className="inline-flex h-12 items-center justify-center rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Book Training
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <h2 className="text-xl font-semibold text-zinc-900">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Request a training",
              desc: "Choose a course, location, and preferred dates.",
            },
            {
              title: "We confirm details",
              desc: "An admin reviews your request and schedules an instructor.",
            },
            {
              title: "Train on-site",
              desc: "Your team gets trained and your records stay organized.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured trainings */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Popular trainings
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Start with a common course — you can customize later.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden text-sm font-semibold text-zinc-900 hover:text-zinc-600 sm:inline"
          >
            See all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Forklift / Powered Industrial Trucks",
            "Fall Protection",
            "Hazard Communication (HazCom)",
            "Confined Space Awareness",
            "Lockout/Tagout (LOTO)",
            "First Aid / CPR",
          ].map((title) => (
            <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm text-zinc-600">
                On-site training for teams. Request dates and we’ll coordinate.
              </p>
              <Link
                href="/book-training"
                className="mt-4 inline-flex text-sm font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Request this →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "OSHA-aligned curriculum", desc: "Built around real workplace needs." },
              { title: "In-person instruction", desc: "Hands-on, team-focused training." },
              { title: "Simple scheduling", desc: "Request → review → confirm." },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-600">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Safety101</p>
            <div className="flex gap-4">
              <Link href="/contact" className="hover:text-zinc-900">Contact</Link>
              <Link href="/pricing" className="hover:text-zinc-900">Pricing</Link>
              <Link href="/services" className="hover:text-zinc-900">Services</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}