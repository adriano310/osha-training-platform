"use client";
import StatusBadge from "@/components/admin/StatusBadge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  bookingCode?: string;
  companyName: string;
  contactName: string;
  email: string;
  service: string;
  preferredDate: string;
  submittedAt: string;
  status: string;
};

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError(data.error || "Failed to fetch bookings");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      booking.companyName.toLowerCase().includes(searchLower) ||
      booking.contactName.toLowerCase().includes(searchLower) ||
      booking.service.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by company, contact, or service"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:w-80"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
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
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading bookings...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
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
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-slate-400">No bookings found.</td>
                  </tr>
                ) : (
                 filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-200 text-sm text-slate-700 transition hover:bg-yellow-50 cursor-pointer"
                      tabIndex={0}
                      onClick={() => router.push(`/admin/bookings/${booking.bookingCode ?? booking.id}`)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          router.push(`/admin/bookings/${booking.bookingCode ?? booking.id}`);
                        }
                      }}
                      aria-label={`View details for booking ${booking.bookingCode ?? booking.id}`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900">{booking.companyName}</p>
                        <p className="mt-1 text-xs text-slate-500">{booking.bookingCode ?? booking.id}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900">{booking.contactName}</p>
                        <p className="mt-1 text-xs text-slate-500">{booking.email}</p>
                      </td>
                      <td className="px-5 py-4">{booking.service}</td>
                      <td className="px-5 py-4">{new Date(booking.preferredDate).toLocaleDateString()}</td>
                      <td className="px-5 py-4">{new Date(booking.submittedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={booking.status as any} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}