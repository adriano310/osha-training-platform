
"use client";
import { useParams } from "next/navigation";

import StatusBadge from "@/components/admin/StatusBadge";

// Mock bookings data (should match the list page)
const bookings = [
  {
    id: "BK-1001",
    company: "Northfield Manufacturing",
    contactName: "Jane Doe",
    email: "jane@northfieldmfg.com",
    phone: "(518) 555-0142",
    service: "OSHA 10-Hour Training",
    preferredDate: "March 18, 2026",
    employees: "20-30",
    notes: "We would like onsite training before our annual safety audit.",
    submittedAt: "March 10, 2026",
    status: "New" as const,
  },
  {
    id: "BK-1002",
    company: "Hudson Valley Logistics",
    contactName: "Michael Torres",
    email: "michael@hudsonlogistics.com",
    phone: "(845) 555-0199",
    service: "Forklift / Powered Industrial Trucks",
    preferredDate: "March 21, 2026",
    employees: "15",
    notes: "Need Spanish-language materials.",
    submittedAt: "March 9, 2026",
    status: "In Progress" as const,
  },
  {
    id: "BK-1003",
    company: "Capital Region Builders",
    contactName: "Sarah Kim",
    email: "sarah@crbuilders.com",
    phone: "(518) 555-0111",
    service: "Fall Protection",
    preferredDate: "March 25, 2026",
    employees: "8",
    notes: "Please include harness inspection demo.",
    submittedAt: "March 8, 2026",
    status: "Contacted" as const,
  },
  {
    id: "BK-1004",
    company: "Empire Packaging",
    contactName: "David Brown",
    email: "david@empirepackaging.com",
    phone: "(212) 555-0123",
    service: "Hazard Communication",
    preferredDate: "April 2, 2026",
    employees: "30+",
    notes: "Flexible on date, mornings preferred.",
    submittedAt: "March 7, 2026",
    status: "Completed" as const,
  },
  {
    id: "BK-1005",
    company: "Summit Industrial Services",
    contactName: "Olivia Martinez",
    email: "olivia@summitindustrial.com",
    phone: "(315) 555-0177",
    service: "Lockout/Tagout (LOTO)",
    preferredDate: "April 5, 2026",
    employees: "12",
    notes: "Urgent: OSHA inspection scheduled soon.",
    submittedAt: "March 6, 2026",
    status: "New" as const,
  },
  {
    id: "BK-1006",
    company: "Tri-State Fabrication",
    contactName: "Alex Carter",
    email: "alex@tristatefab.com",
    phone: "(607) 555-0133",
    service: "Confined Space Awareness",
    preferredDate: "April 8, 2026",
    employees: "10",
    notes: "Can you provide digital certificates?",
    submittedAt: "March 5, 2026",
    status: "In Progress" as const,
  },
];


export default function BookingDetailPage() {
  const { id } = useParams();
  const booking = bookings.find((b) => b.id === id) || null;

  if (!booking) {
    return (
      <div className="p-8 text-center text-slate-500">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{booking.id}</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {booking.company}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Submitted {booking.submittedAt}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </section>

      {/* Contact Info */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Contact Information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Contact Name</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {booking.contactName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="mt-1 text-sm text-slate-900">{booking.email}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Phone</p>
            <p className="mt-1 text-sm text-slate-900">{booking.phone}</p>
          </div>
        </div>
      </section>

      {/* Training Request */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Training Request
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Service</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {booking.service}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Preferred Date</p>
            <p className="mt-1 text-sm text-slate-900">
              {booking.preferredDate}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Employees</p>
            <p className="mt-1 text-sm text-slate-900">
              {booking.employees}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-slate-500">Additional Notes</p>
          <p className="mt-1 text-sm text-slate-900">
            {booking.notes}
          </p>
        </div>
      </section>
    </div>
  );
}