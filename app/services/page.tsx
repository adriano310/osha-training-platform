import { services } from "@/lib/servicesData";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-6">
      <header className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-dark)]">
          Safety & Compliance Training Services
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
          We deliver OSHA-authorized, in-person safety training designed for real workplace environments. 
          From general industry certifications to equipment training and compliance support, our programs 
          help keep your workforce protected and your operations compliant. Browse training categories 
          below or request a program tailored to your team.
        </p>
      </header>

      {services.map((section) => (
        <div key={section.category} className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold text-[var(--text-dark)]">
            {section.category}
          </h2>
          <p className="mb-6 text-[var(--text-muted)]">{section.description}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((service) => (
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
                  href={`/services/${service.slug}`}
                  className="mt-auto pt-4 inline-flex text-sm font-semibold text-[var(--navy)] transition-colors hover:text-[var(--yellow-mid)]"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}