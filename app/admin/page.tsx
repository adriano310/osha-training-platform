import Link from "next/link";
import AdminStatCard from "@/components/admin/AdminStatCard";
import StatusBadge from "@/components/admin/StatusBadge";

const recentBookings = [
  {
    id: "BK-1001",
    company: "Northfield Manufacturing",
    contactName: "Jane Doe",
    service: "OSHA 10-Hour Training",
    preferredDate: "March 18, 2026",
    status: "New" as const,
  },
  {
    id: "BK-1002",
    company: "Hudson Valley Logistics",
    contactName: "Michael Torres",
    service: "Forklift / Powered Industrial Trucks",
    preferredDate: "March 21, 2026",
    status: "In Progress" as const,
  },
  {
    id: "BK-1003",
    company: "Capital Region Builders",
    contactName: "Sarah Kim",
    service: "Fall Protection",
    preferredDate: "March 25, 2026",
    status: "Contacted" as const,
  },
  {
    id: "BK-1004",
    company: "Empire Packaging",
    contactName: "David Brown",
    service: "Hazard Communication",
    preferredDate: "April 2, 2026",
    status: "Completed" as const,
  },
];

const recentContacts = [
  {
    id: "CT-2001",
    name: "Alex Carter",
    company: "Tri-State Fabrication",
    email: "alex@tristatefab.com",
    messagePreview: "Looking for custom onsite training for 20 employees.",
    status: "New" as const,
  },
  {
    id: "CT-2002",
    name: "Emily Johnson",
    company: "Riverbend Warehousing",
    email: "emily@riverbend.com",
    messagePreview: "Do you offer weekend training sessions?",
    status: "Replied" as const,
  },
  {
    id: "CT-2003",
    name: "Chris Lee",
    company: "Upstate Plant Services",
    email: "chris@upstateplant.com",
    messagePreview: "Interested in an audit and gap assessment.",
    status: "Closed" as const,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total Bookings"
          value={24}
          helperText="All training requests submitted"
        />
        <AdminStatCard
          label="Pending Bookings"
          value={6}
          helperText="Waiting for follow-up"
        />
        <AdminStatCard
          label="New Messages"
          value={13}
          helperText="Recent inquiries from the contact form"
        />
        <AdminStatCard
          label="Open Inquiries"
          value={8}
          helperText="Still needing a response"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Bookings
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Latest training requests submitted through the site.
              </p>
            </div>

            <Link
              href="/admin/bookings"
              className="text-sm font-semibold text-slate-900 hover:text-slate-600"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-500">
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Preferred Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-slate-200 text-sm text-slate-700"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">
                        {booking.company}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.contactName}
                      </p>
                    </td>
                    <td className="px-5 py-4">{booking.service}</td>
                    <td className="px-5 py-4">{booking.preferredDate}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Contacts
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Latest contact form submissions.
              </p>
            </div>

            <Link
              href="/admin/contacts"
              className="text-sm font-semibold text-slate-900 hover:text-slate-600"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y divide-slate-200">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-900">{contact.name}</p>
                    <StatusBadge status={contact.status} />
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {contact.company} • {contact.email}
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    {contact.messagePreview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}