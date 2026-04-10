import Link from "next/link";
import { services } from "@/lib/servicesData";

export default function Home() {
  const featuredSlugs = [
    "osha-10-general-industry",
    "osha-30-general-industry",
    "forklift-certification",
    "lockout-tagout",
    "haccp-training",
    "safety-audits",
  ];

  const featuredServices = services
    .flatMap((section) => section.items)
    .filter((item) => featuredSlugs.includes(item.slug));

  return (
    <main className="bg-zinc-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[rgba(27,47,88,0.05)] to-white pt-12 pb-20">
        <div className="mx-auto max-w-6xl px-6 rounded-3xl border border-[rgba(27,42,74,0.15)] bg-white p-10 shadow-md">          
          <p className="mb-4 inline-flex items-center rounded-full border border-[rgba(27,42,74,0.2)] bg-[rgba(27,42,74,0.06)] px-4 py-2 text-sm font-medium text-[var(--navy)]">
            In-person OSHA training • Simple booking
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Book OSHA training for your team — fast.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            Andrade Safety helps companies request in-person trainings, coordinate schedules,
            and keep everything organized from one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-training"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--yellow)] px-6 py-3 font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
            >
              Book Training
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--navy)] bg-white px-6 py-3 font-semibold text-[var(--navy)] transition-colors hover:bg-zinc-50"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white -mt-10 pt-10 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold text-zinc-900">How it works</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
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
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[rgba(27,42,74,0.15)] bg-white p-7 shadow-sm transition hover:shadow-md border-l-4 border-l-[var(--navy)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(27,42,74,0.25)] bg-white text-sm font-semibold text-[var(--navy)]">
                      {index + 1}
                    </span>
                  
                    <h3 className="text-base font-semibold text-zinc-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured trainings */}
      <section className="bg-white pt-0 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">
              Popular trainings
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Start with a common course — you can customize later.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden text-md font-semibold text-zinc-900 hover:text-zinc-600 sm:inline"
          >
            See all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-3xl border border-[rgba(27,42,74,0.15)] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {service.summary}
              </p>
              <Link
                href={`/book-training?service=${service.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-zinc-900 hover:text-zinc-600"
              >
                Request this →
              </Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-b border-[rgba(27,42,74,0.10)] bg-white mb-0">
        <div className="mx-auto max-w-6xl px-6 py-10 flex justify-center">
          <div className="grid gap-4 sm:grid-cols-3 w-full text-center">
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
    </main>
  );
}