"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

type Booking = {
  id: string;
  bookingCode?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate: string;
  employeeCount: number;
  city: string;
  state: string;
  message?: string;
  additionalNotes?: string;
  status: string;
  submittedAt: string;
  category?: string;
  serviceSlug?: string;
  locationType?: string;
  address?: string;
  zip?: string;
  timeWindow1?: string;
  date2?: string;
  timeWindow2?: string;
};

function formatDate(date?: string) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatLocationType(value?: string) {
  if (!value) return "—";
  return value
    .replace(/_/g, "-")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-900">{value}</p>
    </div>
  );
}

export default function BookingDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Status update logic hooks (must be before any return)
  const statusOptions = [
    "New",
    "In Progress",
    "Contacted",
    "Completed",
    "Replied",
    "Closed",
  ];
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [statusError, setStatusError] = useState<string | null>(null);

  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();

        if (data.success) {
          const found = data.bookings.find((b: Booking) => b.id === id);
          setBooking(found || null);
        } else {
          setError(data.error || "Failed to fetch booking");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id]);

  useEffect(() => {
    if (booking) setNewStatus(booking.status);
  }, [booking]);
  useEffect(() => {
    if (booking) setNotesValue(booking.additionalNotes || "");
  }, [booking]);

  const locationLine = useMemo(() => {
    if (!booking) return "";
    return [booking.city, booking.state, booking.zip].filter(Boolean).join(", ").replace(", " + booking.zip, ` ${booking.zip}`);
  }, [booking]);

  const handleStatusUpdate = async () => {
    setStatusUpdating(true);
    setStatusError(null);
    try {
      const res = await fetch(`/api/bookings/${booking?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBooking((prev) => prev && { ...prev, status: newStatus });
      } else {
        setStatusError(data.error || "Failed to update status");
      }
    } catch (err: any) {
      setStatusError(err.message || "Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleNotesSave = async () => {
    setNotesSaving(true);
    setNotesError(null);
    try {
      const res = await fetch(`/api/bookings/${booking?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ additionalNotes: notesValue }),
      });
      const data = await res.json();
      if (data.success) {
        setBooking((prev) => prev && { ...prev, additionalNotes: notesValue });
        setEditingNotes(false);
      } else {
        setNotesError(data.error || "Failed to update notes");
      }
    } catch (err: any) {
      setNotesError(err.message || "Failed to update notes");
    } finally {
      setNotesSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading booking...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.push("/admin/bookings")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        ← Back to Bookings
      </button>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                {booking.companyName}
              </h1>
              <StatusBadge status={booking.status as any} />
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Submitted:</span>{" "}
                {formatDate(booking.submittedAt)}
              </p>
              <p>
                <span className="font-medium text-slate-800">Booking ID:</span>{" "}
                {booking.bookingCode ?? booking.id}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2 items-center">
            <select
              className="rounded-lg border px-2 py-2 text-sm"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              disabled={statusUpdating}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              onClick={handleStatusUpdate}
              disabled={statusUpdating || newStatus === booking.status}
            >
              {statusUpdating ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
        {statusError && (
          <div className="mt-2 text-sm text-red-600">{statusError}</div>
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Customer</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Contact Name" value={booking.contactName} />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <a
                  href={`mailto:${booking.email}`}
                  className="mt-1 block text-sm text-slate-900 underline-offset-2 hover:underline"
                >
                  {booking.email}
                </a>
              </div>

              {booking.phone && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${booking.phone}`}
                    className="mt-1 block text-sm text-slate-900 underline-offset-2 hover:underline"
                  >
                    {booking.phone}
                  </a>
                </div>
              )}

              <Field label="Location" value={locationLine || "—"} />
            </div>

            {booking.address && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <Field label="Address" value={booking.address} />
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
            <div className="mt-4 space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-2">Client Message</p>
                {booking.message ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-900">{booking.message}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No client message provided.</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-800">Admin Message</p>
                  {!editingNotes ? (
                    <button
                      type="button"
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 px-2 py-1"
                      onClick={() => setEditingNotes(true)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 px-2 py-1"
                      onClick={handleNotesSave}
                      disabled={notesSaving}
                    >
                      {notesSaving ? "Saving..." : "Save"}
                    </button>
                  )}
                </div>
                <div className="rounded-xl border border-slate-200 bg-yellow-50 p-4">
                  {editingNotes ? (
                    <>
                      <textarea
                        className="w-full rounded border p-2 text-sm text-slate-900"
                        rows={4}
                        value={notesValue}
                        onChange={e => setNotesValue(e.target.value)}
                        disabled={notesSaving}
                      />
                      {notesError && (
                        <div className="mt-2 text-xs text-red-600">{notesError}</div>
                      )}
                    </>
                  ) : booking.additionalNotes ? (
                    <p className="text-sm leading-6 text-slate-900">{booking.additionalNotes}</p>
                  ) : (
                    <p className="text-slate-500 text-sm">No admin notes yet.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Training Details</h2>

            <div className="mt-5 grid gap-5">
              <Field label="Service" value={booking.service} />
              <Field label="Category" value={booking.category} />
              <Field label="Employee Count" value={booking.employeeCount} />
              <Field
                label="Location Type"
                value={formatLocationType(booking.locationType)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Schedule</h2>

            <div className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
                <div>
                  <Field label="Preferred Date" value={formatDate(booking.preferredDate)} />
                  {booking.timeWindow1 && (
                    <div className="mt-1 text-xs text-slate-600">
                      <span className="font-medium">Time Window:</span> {booking.timeWindow1}
                    </div>
                  )}
                </div>
                <div>
                  <Field label="Alternate Date" value={formatDate(booking.date2)} />
                  {booking.date2 && booking.timeWindow2 && (
                    <div className="mt-1 text-xs text-slate-600">
                      <span className="font-medium">Time Window:</span> {booking.timeWindow2}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}