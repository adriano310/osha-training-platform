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
    <main className="bg-[var(--off-white)]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--hero-tint)] to-[var(--surface)] pt-12 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-10 shadow-md sm:p-12">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-dark)] sm:text-5xl">
            Book on-site OSHA training for your team.
          </h1>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--text-muted)]">
            Andrade Safety helps companies book in-person OSHA training, coordinate schedules,
            and keep training plans organized. Built for teams that need a faster, simpler way
            to get compliant.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-training"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--yellow)] px-6 py-3 font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
              >
                Book Training
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--navy)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--off-white)]"
              >
                View Training Options
              </Link>
            </div>

            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
              <span>OSHA-authorized training</span>
              <span className="text-[var(--text-muted)]/60">•</span>
              <span>On-site at your facility</span>
              <span className="text-[var(--text-muted)]/60">•</span>
              <span>Flexible scheduling</span>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--surface)] pt-0 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--yellow-text)]">
            Simple process
          </p>
          <h2 className="text-2xl font-semibold text-[var(--text-dark)]">How it works</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[ 
                {
                  title: "Request training",
                  desc: "Choose your course, location, and preferred dates — it takes just a few minutes.",
                },
                {
                  title: "We handle scheduling",
                  desc: "We review your request, confirm availability, and handle scheduling for you.",
                },
                {
                  title: "Train on-site",
                  desc: "Your team gets trained on-site, and your records stay organized for compliance.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="relative rounded-xl border border-[var(--border-subtle)] border-t-4 border-t-[var(--yellow-mid)] bg-[var(--surface)] p-7 shadow-sm transition hover:shadow-md"
                >
                  {index < 2 ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-[-24px] top-[50px] hidden h-[2px] w-6 bg-[var(--yellow-connector)] sm:block"
                    />
                  ) : null}

                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--yellow)] text-base font-semibold text-[var(--navy)]">
                      {index + 1}
                    </span>
                  
                    <h3 className="text-base font-semibold text-[var(--text-dark)]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured trainings */}
      <section className="bg-[var(--surface)] pt-0 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--yellow-text)]">
              Most Requested
            </p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark)]">
              Popular trainings
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Start with a common training and customize it for your team, schedule, and facility.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden text-md font-semibold text-[var(--text-dark)] transition-colors hover:text-[var(--yellow-mid)] sm:inline"
          >
            See all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <div
              key={service.slug}
              className="flex h-full flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-[var(--text-dark)]">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {service.summary}
              </p>
              <Link
                href={`/book-training?service=${service.slug}`}
                className="mt-auto pt-4 inline-flex text-sm font-semibold text-[var(--navy)] transition-colors hover:text-[var(--yellow-mid)]"
              >
                Request training →
              </Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mb-0 border-t border-b border-[var(--border-subtle)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex justify-center">
          <div className="grid gap-4 sm:grid-cols-3 w-full text-center">
            {[
              {
                title: "OSHA-compliant training",
                desc: "Built around real workplace requirements.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-3 h-6 w-6 text-[var(--yellow-mid)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z"
                    />
                  </svg>
                ),
              },
              {
                title: "On-site at your facility",
                desc: "Hands-on, team-focused instruction.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-3 h-6 w-6 text-[var(--yellow-mid)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "We handle scheduling",
                desc: "From request to confirmation, we keep it simple.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-3 h-6 w-6 text-[var(--yellow-mid)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title}>
                {item.icon}
                <p className="font-semibold text-[var(--text-dark)]">{item.title}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}