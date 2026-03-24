"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

type Contact = {
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
	additionalNotes?: string;
	status: string;
	submittedAt: string;
};

const statusOptions = [
	"New",
	"In Progress",
	"Contacted",
	"Completed",
	"Replied",
	"Closed",
];

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

function Field({ label, value }: { label: string; value?: string | null }) {
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

export default function ContactDetailPage() {
	const router = useRouter();
	const { id } = useParams();
	const [contact, setContact] = useState<Contact | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [newStatus, setNewStatus] = useState("");
	const [statusUpdating, setStatusUpdating] = useState(false);
	const [statusError, setStatusError] = useState<string | null>(null);

	const [editingNotes, setEditingNotes] = useState(false);
	const [notesValue, setNotesValue] = useState("");
	const [notesSaving, setNotesSaving] = useState(false);
	const [notesError, setNotesError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchContact() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/contacts/${id}`);
				if (!res.ok) {
					setError("Contact not found.");
					setContact(null);
				} else {
					const data = await res.json();
					setContact(data);
				}
			} catch {
				setError("Failed to load contact.");
				setContact(null);
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchContact();
	}, [id]);

	useEffect(() => {
		if (contact) setNewStatus(contact.status);
	}, [contact]);

	useEffect(() => {
		if (contact) setNotesValue(contact.additionalNotes || "");
	}, [contact]);

	const handleStatusUpdate = async () => {
		setStatusUpdating(true);
		setStatusError(null);
		try {
			const res = await fetch(`/api/contacts/${contact?.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
			});
			const data = await res.json();
			if (data.success) {
				setContact((prev) => prev && { ...prev, status: newStatus });
			} else {
				setStatusError(data.error || "Failed to update status");
			}
		} catch {
			setStatusError("Failed to update status");
		} finally {
			setStatusUpdating(false);
		}
	};

	const handleNotesSave = async () => {
		setNotesSaving(true);
		setNotesError(null);
		try {
			const res = await fetch(`/api/contacts/${contact?.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ additionalNotes: notesValue }),
			});
			const data = await res.json();
			if (data.success) {
				setContact((prev) => prev && { ...prev, additionalNotes: notesValue });
				setEditingNotes(false);
			} else {
				setNotesError(data.error || "Failed to update notes");
			}
		} catch {
			setNotesError("Failed to update notes");
		} finally {
			setNotesSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
				Loading contact...
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

	if (!contact) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
				Contact not found.
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<button
				type="button"
				onClick={() => router.push("/admin/contacts")}
				className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
			>
				← Back to Contacts
			</button>

			{/* Header */}
			<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-3">
							<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
								{contact.name}
							</h1>
							<StatusBadge status={contact.status as any} />
						</div>

						<div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
							<p>
								<span className="font-medium text-slate-800">Submitted:</span>{" "}
								{formatDate(contact.submittedAt)}
							</p>
							<p>
								<span className="font-medium text-slate-800">Contact ID:</span>{" "}
								{contact.contactCode ?? contact.id}
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
							disabled={statusUpdating || newStatus === contact.status}
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
					{/* Contact Information */}
					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>

						<div className="mt-5 grid gap-5 sm:grid-cols-2">
							<Field label="Name" value={contact.name} />

							<div>
								<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
									Email
								</p>
								<a
									href={`mailto:${contact.email}`}
									className="mt-1 block text-sm text-slate-900 underline-offset-2 hover:underline"
								>
									{contact.email}
								</a>
							</div>

							{contact.phone && (
								<div>
									<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
										Phone
									</p>
									<a
										href={`tel:${contact.phone}`}
										className="mt-1 block text-sm text-slate-900 underline-offset-2 hover:underline"
									>
										{contact.phone}
									</a>
								</div>
							)}

							<Field label="Company" value={contact.company} />
							<Field label="Location" value={contact.location} />
						</div>
					</section>

					{/* Notes */}
					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Notes</h2>
						<div className="mt-4 space-y-6">
							<div>
								<p className="text-sm font-semibold text-slate-800 mb-2">Client Message</p>
								{contact.message ? (
									<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
										<p className="text-sm leading-6 text-slate-900">{contact.message}</p>
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
											className="text-sm font-medium text-slate-500 hover:text-slate-900 px-2 py-1"
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
												onChange={(e) => setNotesValue(e.target.value)}
												disabled={notesSaving}
											/>
											{notesError && (
												<div className="mt-2 text-xs text-red-600">{notesError}</div>
											)}
										</>
									) : contact.additionalNotes ? (
										<p className="text-sm leading-6 text-slate-900">{contact.additionalNotes}</p>
									) : (
										<p className="text-slate-500 text-sm">No admin notes yet.</p>
									)}
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className="space-y-6">
					{/* Submission Details */}
					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Submission Details</h2>

						<div className="mt-5 grid gap-5">
							<Field label="Topic" value={contact.topic} />
							<Field label="Preferred Contact" value={contact.preferredContact} />
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
