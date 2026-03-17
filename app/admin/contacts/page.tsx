
"use client";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

const contacts = [
  {
    id: "CT-1001",
    name: "Jane Doe",
    email: "jane@company.com",
    phone: "(555) 555-5555",
    company: "Northfield Manufacturing",
    location: "Boston, MA",
    topic: "OSHA Training",
    preferredContact: "Email",
    message: "We need OSHA 10 training for 15 employees.",
    submittedAt: "March 10, 2026",
    status: "New" as const,
  },
  {
    id: "CT-1002",
    name: "Michael Torres",
    email: "michael@logistics.com",
    phone: "(555) 123-4567",
    company: "Hudson Valley Logistics",
    location: "Albany, NY",
    topic: "Site Audit",
    preferredContact: "Phone",
    message: "Looking for a site safety audit next month.",
    submittedAt: "March 9, 2026",
    status: "Contacted" as const,
  },
  {
    id: "CT-1003",
    name: "Sarah Kim",
    email: "sarah@crbuilders.com",
    phone: "(555) 987-6543",
    company: "Capital Region Builders",
    location: "Springfield, MA",
    topic: "Custom Program",
    preferredContact: "Email",
    message: "Interested in a custom safety program for our team.",
    submittedAt: "March 8, 2026",
    status: "Replied" as const,
  },
];

export default function AdminContactsPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by name, email, or company"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:w-80"
          />
          <select
            defaultValue="All"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Replied">Replied</option>
          </select>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            All Contact Submissions
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Review contact form submissions and follow up with leads.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Topic</th>
                <th className="px-5 py-3 font-medium">Preferred</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t border-slate-200 text-sm text-slate-700 transition hover:bg-yellow-50 cursor-pointer"
                  tabIndex={0}
                  onClick={() => router.push(`/admin/contacts/${contact.id}`)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push(`/admin/contacts/${contact.id}`);
                    }
                  }}
                  aria-label={`View details for contact ${contact.id}`}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">{contact.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{contact.id}</p>
                  </td>
                  <td className="px-5 py-4">{contact.email}</td>
                  <td className="px-5 py-4">{contact.company}</td>
                  <td className="px-5 py-4">{contact.topic}</td>
                  <td className="px-5 py-4">{contact.preferredContact}</td>
                  <td className="px-5 py-4">{contact.submittedAt}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={contact.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}