import Link from "next/link";
import type { ComponentProps } from "react";
import AdminStatCard from "@/components/admin/AdminStatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import prisma from "@/lib/prisma";

type BadgeStatus = ComponentProps<typeof StatusBadge>["status"];

const statusMap: Record<string, BadgeStatus> = {
  new: "New",
  pending: "New",
  "in progress": "In Progress",
  contacted: "Contacted",
  completed: "Completed",
  replied: "Replied",
  closed: "Closed",
};

function normalizeAdminStatus(value: unknown): BadgeStatus {
  if (typeof value !== "string") return "New";
  return statusMap[value.trim().toLowerCase()] ?? "New";
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function previewMessage(message: string): string {
  if (message.length <= 70) return message;
  return `${message.slice(0, 67)}...`;
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    bookingsThisMonth,
    pendingBookings,
    newMessages,
    completedTrainings,
    bookingRows,
    contactRows,
  ] = await Promise.all([
    prisma.booking.count({
      where: {
        submittedAt: {
          gte: startOfMonth,
        },
      },
    }),
    prisma.booking.count({
      where: {
        status: {
          in: ["New", "new", "pending", "In Progress", "in progress", "Contacted", "contacted"],
        },
      },
    }),
    prisma.contactSubmission.count({
      where: {
        status: {
          in: ["New", "new"],
        },
      },
    }),
    prisma.booking.count({
      where: {
        status: {
          in: ["Completed", "completed"],
        },
      },
    }),
    prisma.booking.findMany({
      orderBy: {
        submittedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        bookingCode: true,
        companyName: true,
        contactName: true,
        service: true,
        preferredDate: true,
        status: true,
      },
    }),
    prisma.contactSubmission.findMany({
      orderBy: {
        submittedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        contactCode: true,
        name: true,
        company: true,
        email: true,
        message: true,
        status: true,
      },
    }),
  ]);

  const recentBookings = bookingRows.map((booking) => ({
    id: booking.id,
    href: `/admin/bookings/${booking.bookingCode ?? booking.id}`,
    company: booking.companyName,
    contactName: booking.contactName,
    service: booking.service,
    preferredDate: formatDate(booking.preferredDate),
    status: normalizeAdminStatus(booking.status) as BadgeStatus,
  }));

  const recentContacts = contactRows.map((contact) => ({
    id: contact.id,
    href: `/admin/contacts/${contact.contactCode ?? contact.id}`,
    name: contact.name,
    company: contact.company || "No company provided",
    email: contact.email,
    messagePreview: previewMessage(contact.message),
    status: normalizeAdminStatus(contact.status) as BadgeStatus,
  }));

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Bookings This Month"
          value={bookingsThisMonth}
          helperText="Requests submitted this month"
        />
        <AdminStatCard
          label="Pending Bookings"
          value={pendingBookings}
          helperText="Waiting for follow-up"
        />
        <AdminStatCard
          label="New Messages"
          value={newMessages}
          helperText="Unread inquiries from the contact form"
        />
        <AdminStatCard
          label="Completed Trainings"
          value={completedTrainings}
          helperText="Bookings marked as completed"
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
                    className="relative border-t border-slate-200 text-sm text-slate-700 transition hover:bg-yellow-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={booking.href}
                        className="absolute inset-0"
                        aria-label={`View booking for ${booking.company}`}
                      />
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
              <Link
                key={contact.id}
                href={contact.href}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-yellow-50 sm:flex-row sm:items-start sm:justify-between"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}