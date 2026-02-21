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
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
            {section.category}
          </p>
        ) : null}

        <h1 className="text-4xl font-bold text-zinc-900">{service.title}</h1>
        <p className="mt-4 text-lg text-zinc-600">{service.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/book-training?service=${service.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition"
          >
            Book this training
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition"
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
            <section className="border border-zinc-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-zinc-900">Who it’s for</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {details.audience.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {details?.topics?.length ? (
            <section className="border border-zinc-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-zinc-900">What you’ll cover</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {details.topics.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="border border-zinc-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-zinc-900">Overview</h2>
              <p className="mt-2 text-sm text-zinc-600">
                We’ll tailor this training to your workplace and confirm scheduling, duration,
                and any site-specific requirements during booking.
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="border border-zinc-200 rounded-xl p-6 h-fit">
          <h3 className="text-sm font-semibold text-zinc-900">Quick facts</h3>

          <dl className="mt-4 space-y-3 text-sm">
            {details?.format ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Format</dt>
                <dd className="text-zinc-800 text-right">{details.format}</dd>
              </div>
            ) : null}

            {details?.duration ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Duration</dt>
                <dd className="text-zinc-800 text-right">{details.duration}</dd>
              </div>
            ) : null}
          </dl>

          {details?.deliverables?.length ? (
            <>
              <p className="mt-6 text-sm font-semibold text-zinc-900">Deliverables</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-700">
                {details.deliverables.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <Link
            href={`/book-training?service=${service.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition"
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
    title: `${service.title} | Safety101`,
    description: service.summary,
  };
}