import { services } from "@/lib/servicesData";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Safety & Compliance Training Services
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-12">
        We deliver OSHA-aligned, in-person safety training programs designed 
        to meet real workplace demands. From general industry certification 
        to equipment safety and compliance consulting, our courses are built 
        to keep your workforce protected and your operations compliant. Browse our core training 
        categories below or request a customized program designed specifically for 
        your team.
      </p>

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
                  href={`/services/${service.slug}`}
                  className="font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}