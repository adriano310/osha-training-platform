"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type ServiceOption = {
    category: string;
	slug: string;
	name: string;
	duration?: string;
	note?: string;
};

const DEFAULT_TIME_WINDOWS = [
	"Morning (8am–12pm)",
	"Afternoon (12pm–4pm)",
	"Evening (4pm–7pm)",
	"Flexible",
];

interface BookTrainingClientProps {
	services: ServiceOption[];
}

export default function BookTrainingClient({ services }: BookTrainingClientProps) {
	const [submitted, setSubmitted] = useState(false);

	const categoryList = Array.from(new Set(services.map(s => s.category)));

	const [form, setForm] = useState({
		category: "",
		serviceSlug: "",
		trainees: "10",
		company: "",
		contactName: "",
		email: "",
		phone: "",
		locationType: "on_site" as "on_site" | "virtual",
		address: "",
		city: "",
		state: "",
		zip: "",
		date1: "",
		timeWindow1: DEFAULT_TIME_WINDOWS[0],
		date2: "",
		timeWindow2: DEFAULT_TIME_WINDOWS[1],
		notes: "",
	});

	const filteredServices = useMemo(
		() => services.filter(s => s.category === form.category),
		[form.category, services]
	);

	const selectedService = useMemo(
		() => filteredServices.find((s) => s.slug === form.serviceSlug),
		[form.serviceSlug, filteredServices]
	);

	function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function isValidEmail(email: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function formatPhoneInput(value: string) {
		const digits = value.replace(/\D/g, "");
		if (digits.length === 0) return "";
		if (digits.length <= 3) return `(${digits}`;
		if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
		if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
	}

	function isValidPhoneNumber(phone: string) {
		return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
	}

	const canSubmit =
		form.company.trim().length > 1 &&
		form.contactName.trim().length > 1 &&
		isValidEmail(form.email) &&
		Number(form.trainees) > 0 &&
		(form.date1.trim().length > 0 || form.date2.trim().length > 0) &&
		form.locationType &&
		form.city.trim().length > 0 &&
		form.state.trim().length > 0;

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;

		// Map form fields to Booking model
		const bookingData = {
			company: form.company,
			contactName: form.contactName,
			email: form.email,
			phone: form.phone,
			service: selectedService?.name || form.serviceSlug,
			preferredDate: form.date1,
			employeeCount: Number(form.trainees),
			city: form.city,
			state: form.state,
			message: form.notes,
			category: form.category,
			serviceSlug: form.serviceSlug,
			locationType: form.locationType,
			address: form.address,
			zip: form.zip,
			timeWindow1: form.timeWindow1,
			date2: form.date2,
			timeWindow2: form.timeWindow2,
		};

		try {
			const res = await fetch("/api/bookings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bookingData),
			});
			if (!res.ok) throw new Error("Failed to submit booking");
			setSubmitted(true);
		} catch (err) {
			alert("There was an error submitting your booking. Please try again.");
		}
	}

	const searchParams = useSearchParams();

	useEffect(() => {
		const serviceFromQuery = searchParams.get("service");

		if (!serviceFromQuery) return;

		const exists = services.find((s) => s.slug === serviceFromQuery);
		if (exists) {
			setForm((prev) => ({
				...prev,
				category: exists.category,
				serviceSlug: serviceFromQuery,
			}));
		}
	}, [searchParams, services]);

	return (
		<main className="mx-auto max-w-6xl px-6 py-12">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
				<div className="max-w-3xl">
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-dark)]">Book a training</h1>
					<p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
						Tell us about your training needs and preferred dates. We’ll review your request and follow up to 
						confirm details and schedule your session.
					</p>
				</div>

				<Link
					href="/services"
					className="shrink-0 text-md font-semibold text-[var(--text-dark)] transition-colors hover:text-[var(--yellow-mid)]"
				>
					Browse services →
				</Link>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-3">
				{/* Form */}
				<section className="lg:col-span-2">
					<div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm">
						{!submitted ? (
							<form onSubmit={onSubmit} className="space-y-8">
								{/* Service */}
								<div>
									<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
										<h2 className="text-sm font-semibold text-[var(--text-dark)]">Training details</h2>
										<p className="text-xs text-[var(--text-muted)] sm:text-right">
											Fields marked <span className="text-rose-600">*</span> are required.
										</p>
									</div>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">Training Area <span className="text-rose-600">*</span></label>
											<select
												value={form.category}
												onChange={e => {
													const newCategory = e.target.value;
													setForm(prev => ({
														...prev,
														category: newCategory,
														serviceSlug: "",
													}));
												}}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											>
												<option value="" disabled>Choose a training area…</option>
												{categoryList.map(cat => (
													<option key={cat} value={cat}>{cat}</option>
												))}
											</select>
											{!form.category && (
												<p className="mt-2 text-xs text-[var(--text-muted)]">Choose a training area to view available programs.</p>
											)}
										</div>

										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">Training Program <span className="text-rose-600">*</span></label>
											<select
												value={form.serviceSlug}
												onChange={e => update("serviceSlug", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												disabled={!form.category}
											>
												<option value="" disabled>Choose a training program…</option>
												{filteredServices.map(s => (
													<option key={s.slug} value={s.slug}>{s.name}</option>
												))}
											</select>
											{form.category && !form.serviceSlug && (
												<p className="mt-2 text-xs text-[var(--text-muted)]">Please select a service from this category.</p>
											)}
											<p className="mt-2 text-xs text-[var(--text-muted)]">
												Not sure? Pick the closest match — you can adjust later.
											</p>
										</div>

										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]"># of trainees <span className="text-rose-600">*</span></label>
											<input
												type="number"
												min={1}
												value={form.trainees}
												onChange={(e) => update("trainees", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>

										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">Delivery type <span className="text-rose-600">*</span></label>
											<select
												value={form.locationType}
												onChange={(e) =>
													update("locationType", e.target.value as any)
												}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											>
												<option value="on_site">On Site</option>
												<option value="virtual">Virtual / Remote</option>
											</select>
										</div>
									</div>
								</div>

								{/* Date preferences */}
								<div>
									<h2 className="text-sm font-semibold text-[var(--text-dark)]">Preferred Schedule</h2>
									<p className="mt-1 text-xs text-[var(--text-muted)]">
										Add at least one preferred date so we can confirm availability.
									</p>

									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">Preferred date #1 <span className="text-rose-600">*</span></label>
											<input
												type="date"
												value={form.date1}
												onChange={(e) => update("date1", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">Time window <span className="text-rose-600">*</span></label>
											<select
												value={form.timeWindow1}
												onChange={(e) => update("timeWindow1", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											>
												{DEFAULT_TIME_WINDOWS.map((t) => (
													<option key={t} value={t}>
														{t}
													</option>
												))}
											</select>
										</div>

										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">
												Preferred date #2
											</label>
											<input
												type="date"
												value={form.date2}
												onChange={(e) => update("date2", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">
												Time window
											</label>
											<select
												value={form.timeWindow2}
												onChange={(e) => update("timeWindow2", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											>
												{DEFAULT_TIME_WINDOWS.map((t) => (
													<option key={t} value={t}>
														{t}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>

								{/* Location */}
								<div>
									<h2 className="text-sm font-semibold text-[var(--text-dark)]">Location</h2>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">
												Address (if applicable)
											</label>
											<input
												value={form.address}
												onChange={(e) => update("address", e.target.value)}
												placeholder="Street address"
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">City <span className="text-rose-600">*</span></label>
											<input
												value={form.city}
												onChange={(e) => update("city", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">State <span className="text-rose-600">*</span></label>
											<input
												value={form.state}
												onChange={(e) => update("state", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">ZIP</label>
											<input
												value={form.zip}
												onChange={(e) => update("zip", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
											/>
										</div>
									</div>
									<p className="mt-2 text-xs text-[var(--text-muted)]">
										If you’re not sure yet, leave this blank — we’ll confirm during follow-up.
									</p>
								</div>

								{/* Contact */}
								<div>
									<h2 className="text-sm font-semibold text-[var(--text-dark)]">Contact</h2>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">Full name <span className="text-rose-600">*</span></label>
											<input
												value={form.contactName}
												onChange={(e) => update("contactName", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												placeholder="Jane Doe"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-[var(--text-dark)]">Email <span className="text-rose-600">*</span></label>
											<input
												value={form.email}
												onChange={(e) => update("email", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												placeholder="jane@company.com"
												type="email"
											/>
											   {form.email.length > 0 && !isValidEmail(form.email) && (
												   <p className="mt-1 text-xs text-[var(--text-muted)]">
													   Please enter a valid email address.
												   </p>
											   )}
										</div>
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">Phone</label>
											<input
												value={form.phone}
												onChange={e => update("phone", formatPhoneInput(e.target.value))}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												placeholder="(555) 555-5555"
											/>
											{form.phone.length > 0 && !isValidPhoneNumber(form.phone) && (
												<p className="mt-1 text-xs text-[var(--text-muted)]">Please enter a valid 10-digit phone number.</p>
											)}
										</div>

										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">Company / Organization <span className="text-rose-600">*</span></label>
											<input
												value={form.company}
												onChange={(e) => update("company", e.target.value)}
												className="mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												placeholder="Company name"
											/>
										</div>

										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-[var(--text-dark)]">
												Message
											</label>
											<textarea
												value={form.notes}
												onChange={(e) => update("notes", e.target.value)}
												className="mt-2 min-h-[110px] w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-dark)] outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
												placeholder="Anything we should know? (equipment, language needs, site constraints, etc.)"
											/>
										</div>
									</div>
								</div>

								{/* Submit */}
								<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-xs text-[var(--text-muted)]">
										By submitting, you’re requesting a booking — we’ll confirm availability by email.
									</p>

									<button
										type="submit"
										disabled={!canSubmit}
										className={[
											"inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
											canSubmit
												? "bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-dark)]"
												: "bg-[var(--off-white)] text-[var(--text-muted)] cursor-not-allowed opacity-50",
										].join(" ")}
									>
										Submit request
									</button>
								</div>
							</form>
						) : (
							<div className="py-6">
								<h2 className="text-lg font-semibold text-[var(--text-dark)]">Request received</h2>
								<p className="mt-2 text-sm text-[var(--text-muted)]">
									Thanks. We’ve received your training request. We’ll review your details and follow 
									up within 1–2 business days to confirm scheduling and next steps. You’ll receive a 
									confirmation once your session is scheduled.
								</p>

								<div className="mt-6 flex flex-col gap-3 sm:flex-row">
									<button
										onClick={() => setSubmitted(false)}
										className="inline-flex items-center justify-center rounded-lg bg-[var(--yellow)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--yellow-dark)]"
									>
										Submit another request
									</button>
									<Link
										href="/services"
										className="inline-flex items-center justify-center rounded-lg border border-[var(--navy)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--off-white)]"
									>
										Browse services
									</Link>
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Summary */}
				<aside className="lg:col-span-1">
				<div className="sticky top-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm">
					<h2 className="text-sm font-semibold text-[var(--text-dark)]">Summary</h2>

					<div className="mt-4 space-y-4">
					{/* Service */}
					<div>
						<p className="text-xs text-[var(--text-muted)]">Training Program</p>
						<p className="mt-1 text-sm font-semibold text-[var(--text-dark)]">
						{selectedService?.name ?? "—"}
						</p>
						{selectedService?.duration && (
						<p className="mt-1 text-xs text-[var(--text-muted)]">
							Typical duration: {selectedService.duration}
						</p>
						)}
					</div>

					{/* Details */}
					<div className="border-t border-[var(--border-subtle)] pt-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
						Details
						</p>

						<div className="mt-3 space-y-2">
						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Delivery</span>
							<span className="text-sm text-[var(--text-dark)] text-right">
							{form.locationType === "on_site"
								? "On Site"
								: form.locationType === "virtual"
								? "Virtual / Remote"
								: "—"}
							</span>
						</div>

						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Group size</span>
							<span className="text-sm font-semibold text-[var(--text-dark)] text-right">
							{Number(form.trainees) === 1 ? "1 trainee" : `${form.trainees} trainees`}
							</span>
						</div>
						</div>
					</div>

					{/* Schedule */}
					<div className="border-t border-[var(--border-subtle)] pt-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
						Schedule
						</p>

						<div className="mt-3 space-y-2">
						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Preference #1</span>
							<span className="text-sm text-[var(--text-dark)] text-right">
								{form.date1 ? (
									<>
										<span>{formatDate(form.date1)}</span><br />
										<span>{form.timeWindow1}</span>
									</>
								) : "—"}
							</span>
						</div>

						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Preference #2</span>
							<span className="text-sm text-[var(--text-dark)] text-right">
								{form.date2 ? (
									<>
										<span>{formatDate(form.date2)}</span><br />
										<span>{form.timeWindow2}</span>
									</>
								) : "—"}
							</span>
						</div>
						</div>
					</div>

					{/* Location + Contact */}
					<div className="border-t border-[var(--border-subtle)] pt-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
						Contact
						</p>

						<div className="mt-3 space-y-2">
						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Location</span>
							<span className="text-sm text-[var(--text-dark)] text-right">
							{form.city || form.state
								? `${form.city}${form.city && form.state ? ", " : ""}${form.state}`
								: "—"}
							</span>
						</div>

						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Contact</span>

							<div className="text-right">
								<p className="text-sm text-[var(--text-dark)]">
								{form.contactName || "—"}
								</p>

								<p className="text-sm text-[var(--text-dark)]">
								{form.email || "—"}
								</p>
							</div>
						</div>

						<div className="flex items-start justify-between gap-4">
							<span className="text-xs text-[var(--text-muted)]">Company</span>
							<span className="text-sm text-[var(--text-dark)] text-right">
							{form.company || "—"}
							</span>
						</div>
						</div>
					</div>
					</div>
				</div>
				</aside>
			</div>
		</main>
	);
}

function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatPhoneInput(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function isValidPhoneNumber(phone: string) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}
