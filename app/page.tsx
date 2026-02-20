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
          {featuredServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {service.summary}
              </p>
              <Link
                href={`/book?service=${service.slug}`}
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
    </main>
  );
}