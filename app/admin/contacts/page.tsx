
"use client";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

import { useEffect, useState } from "react";

type Status =
  | "New"
  | "In Progress"
  | "Contacted"
  | "Completed"
  | "Replied"
  | "Closed";

type ContactSubmission = {
  id: string;
  contactCode?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  topic?: string;
  preferredContact: string;
  message: string;
  status: string;
  submittedAt: string;
};

export default function AdminContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true);
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
      setLoading(false);
    }
    fetchContacts();
  }, []);

  // Filter contacts based on status and search
  const filteredContacts = contacts.filter((contact) => {
    const matchesStatus = statusFilter === "All" || contact.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      contact.name.toLowerCase().includes(searchLower) ||
      (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
      (contact.company && contact.company.toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by name, email, or company"
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
            <option value="Replied">Replied</option>
            <option value="Closed">Closed</option>
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
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading...</div>
          ) : (
            <table className="min-w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-500">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Topic</th>
                  <th className="px-5 py-3 font-medium">Preferred</th>
                  <th className="px-5 py-3 font-medium">Submitted</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-8 text-center text-slate-400">No contacts found.</td>
                  </tr>
                ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-t border-slate-200 text-sm text-slate-700 transition hover:bg-yellow-50 cursor-pointer"
                    tabIndex={0}
                    onClick={() => router.push(`/admin/contacts/${contact.contactCode || contact.id}`)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        router.push(`/admin/contacts/${contact.contactCode || contact.id}`);
                      }
                    }}
                    aria-label={`View details for contact ${contact.contactCode || contact.id}`}
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900">{contact.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{contact.contactCode ?? contact.id}</p>
                    </td>
                    <td className="px-5 py-4">{contact.email}</td>
                    <td className="px-5 py-4">{contact.phone || <span className="text-slate-400">—</span>}</td>
                    <td className="px-5 py-4">{contact.company || <span className="text-slate-400">—</span>}</td>
                    <td className="px-5 py-4">{contact.location || <span className="text-slate-400">—</span>}</td>
                    <td className="px-5 py-4">{contact.topic || <span className="text-slate-400">—</span>}</td>
                    <td className="px-5 py-4">{contact.preferredContact}</td>
                    <td className="px-5 py-4">{new Date(contact.submittedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={
                          ([
                            "New",
                            "In Progress",
                            "Contacted",
                            "Completed",
                            "Replied",
                            "Closed",
                          ].includes(contact.status)
                            ? (contact.status as Status)
                            : "New")
                        }
                      />
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