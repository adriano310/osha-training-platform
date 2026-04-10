import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/servicesData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getAllServices() {
  return services.flatMap((section) => section.items);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const all = getAllServices();
  const service = all.find((s) => s.slug === slug);
  if (!service) return notFound();

  const section = services.find((sec) =>
    sec.items.some((item) => item.slug === service.slug)
  );

  const details = service.details;

  return (
    <div className="px-6 py-16 mx-auto max-w-6xl">
      {/* Header */}
      <div className="max-w-3xl">
        {section?.category ? (
          <p className="mb-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">
            {section.category}
          </p>
        ) : null}

        <h1 className="text-4xl font-bold text-[var(--text-dark)]">{service.title}</h1>
        <p className="mt-4 text-lg text-[var(--text-muted)]">{service.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/book-training?service=${service.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
          >
            Book this training
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-[var(--navy)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--off-white)]"
          >
            Request a quote
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {details?.audience?.length ? (
            <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text-dark)]">Who it’s for</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                {details.audience.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--yellow-mid)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {details?.topics?.length ? (
            <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text-dark)]">What you’ll cover</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
                {details.topics.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--yellow-mid)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text-dark)]">Overview</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                We’ll tailor this training to your workplace and confirm scheduling, duration,
                and any site-specific requirements during booking.
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h3 className="text-sm font-semibold text-[var(--text-dark)]">Quick facts</h3>

          <dl className="mt-4 space-y-3 text-sm">
            {details?.format ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--text-muted)]">Format</dt>
                <dd className="text-right text-[var(--text-dark)]">{details.format}</dd>
              </div>
            ) : null}

            {details?.duration ? (
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--text-muted)]">Duration</dt>
                <dd className="text-right text-[var(--text-dark)]">{details.duration}</dd>
              </div>
            ) : null}
          </dl>

          {details?.deliverables?.length ? (
            <>
              <p className="mt-6 text-sm font-semibold text-[var(--text-dark)]">Deliverables</p>
              <ul className="mt-2 space-y-2 text-sm text-[var(--text-muted)]">
                {details.deliverables.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--yellow-mid)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <Link
            href={`/book-training?service=${service.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
          >
            Start booking
          </Link>
        </aside>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return services
    .flatMap((section) => section.items)
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const service = services
    .flatMap((section) => section.items)
    .find((s) => s.slug === slug);

  if (!service) return {};

  return {
    title: `${service.title} | Andrade Safety`,
    description: service.summary,
  };
}