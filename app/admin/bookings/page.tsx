"use client";
import StatusBadge from "@/components/admin/StatusBadge";
import { useRouter } from "next/navigation";

const bookings = [
  {
    id: "BK-1001",
    company: "Northfield Manufacturing",
    contactName: "Jane Doe",
    email: "jane@northfieldmfg.com",
    service: "OSHA 10-Hour Training",
    preferredDate: "March 18, 2026",
    submittedAt: "March 10, 2026",
    status: "New" as const,
  },
  {
    id: "BK-1002",
    company: "Hudson Valley Logistics",
    contactName: "Michael Torres",
    email: "michael@hudsonlogistics.com",
    service: "Forklift / Powered Industrial Trucks",
    preferredDate: "March 21, 2026",
    submittedAt: "March 9, 2026",
    status: "In Progress" as const,
  },
  {
    id: "BK-1003",
    company: "Capital Region Builders",
    contactName: "Sarah Kim",
    email: "sarah@crbuilders.com",
    service: "Fall Protection",
    preferredDate: "March 25, 2026",
    submittedAt: "March 8, 2026",
    status: "Contacted" as const,
  },
  {
    id: "BK-1004",
    company: "Empire Packaging",
    contactName: "David Brown",
    email: "david@empirepackaging.com",
    service: "Hazard Communication",
    preferredDate: "April 2, 2026",
    submittedAt: "March 7, 2026",
    status: "Completed" as const,
  },
  {
    id: "BK-1005",
    company: "Summit Industrial Services",
    contactName: "Olivia Martinez",
    email: "olivia@summitindustrial.com",
    service: "Lockout/Tagout (LOTO)",
    preferredDate: "April 5, 2026",
    submittedAt: "March 6, 2026",
    status: "New" as const,
  },
  {
    id: "BK-1006",
    company: "Tri-State Fabrication",
    contactName: "Alex Carter",
    email: "alex@tristatefab.com",
    service: "Confined Space Awareness",
    preferredDate: "April 8, 2026",
    submittedAt: "March 5, 2026",
    status: "In Progress" as const,
  },
];

export default function AdminBookingsPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by company, contact, or service"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:w-80"
          />

          <select
            defaultValue="All"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            All Booking Requests
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Review incoming training requests, follow up with clients, and track progress.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Preferred Date</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-slate-200 text-sm text-slate-700 transition hover:bg-yellow-50 cursor-pointer"
                  tabIndex={0}
                  onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push(`/admin/bookings/${booking.id}`);
                    }
                  }}
                  aria-label={`View details for booking ${booking.id}`}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">{booking.company}</p>
                    <p className="mt-1 text-xs text-slate-500">{booking.id}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900">
                      {booking.contactName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{booking.email}</p>
                  </td>

                  <td className="px-5 py-4">{booking.service}</td>
                  <td className="px-5 py-4">{booking.preferredDate}</td>
                  <td className="px-5 py-4">{booking.submittedAt}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
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