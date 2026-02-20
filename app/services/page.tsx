import { services } from "@/lib/servicesData";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Safety & Compliance Training Services
      </h1>

      {services.map((section) => (
        <div key={section.category} className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">
            {section.category}
          </h2>
          <p className="text-gray-600 mb-6">{section.description}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((service) => (
              <div
                key={service.slug}
                className="border rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.summary}
                </p>
                <Link
                  href={`/book?service=${service.slug}`}
                  className="font-medium hover:underline"
                >
                  Request this training →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}