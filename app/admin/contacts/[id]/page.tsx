
"use client";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

// Mock contacts data (should match the list page)
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


export default function ContactDetailPage() {
	const router = useRouter();
	const { id } = useParams();
	const contact = contacts.find((c) => c.id === id) || null;

	if (!contact) {
		return (
			<div className="p-8 text-center text-slate-500">
				Contact not found.
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Back Button */}
			<button
				type="button"
				onClick={() => router.push("/admin/contacts")}
				className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
			>
				← Back to Contacts
			</button>

			{/* Header */}
			<section className="flex items-start justify-between">
				<div>
					<p className="text-sm text-slate-500">{contact.id}</p>
					<h1 className="text-3xl font-semibold text-slate-900">
						{contact.name}
					</h1>
					<p className="mt-1 text-sm text-slate-600">
						Submitted {contact.submittedAt}
					</p>
				</div>
				<StatusBadge status={contact.status} />
			</section>

			{/* Contact Info */}
			<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 className="text-lg font-semibold text-slate-900">
					Contact Information
				</h2>

				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<p className="text-xs text-slate-500">Email</p>
						<p className="mt-1 text-sm text-slate-900">{contact.email}</p>
					</div>
					<div>
						<p className="text-xs text-slate-500">Phone</p>
						<p className="mt-1 text-sm text-slate-900">{contact.phone}</p>
					</div>
					<div>
						<p className="text-xs text-slate-500">Company</p>
						<p className="mt-1 text-sm text-slate-900">{contact.company}</p>
					</div>
					<div>
						<p className="text-xs text-slate-500">Location</p>
						<p className="mt-1 text-sm text-slate-900">{contact.location}</p>
					</div>
				</div>
			</section>

			{/* Submission Details */}
			<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 className="text-lg font-semibold text-slate-900">
					Submission Details
				</h2>

				<div className="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<p className="text-xs text-slate-500">Topic</p>
						<p className="mt-1 text-sm font-medium text-slate-900">{contact.topic}</p>
					</div>
					<div>
						<p className="text-xs text-slate-500">Preferred Contact</p>
						<p className="mt-1 text-sm text-slate-900">{contact.preferredContact}</p>
					</div>
				</div>

				<div className="mt-4">
					<p className="text-xs text-slate-500">Message</p>
					<p className="mt-1 text-sm text-slate-900">{contact.message}</p>
				</div>
			</section>
		</div>
	);
}
