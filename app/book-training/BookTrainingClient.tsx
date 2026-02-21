
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

	const canSubmit =
		form.company.trim().length > 1 &&
		form.contactName.trim().length > 1 &&
		isValidEmail(form.email) &&
		Number(form.trainees) > 0 &&
		(form.date1.trim().length > 0 || form.date2.trim().length > 0);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;

		// front-end only. Later: POST to /api/bookings and create a Prisma record.
		setSubmitted(true);
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
			<div className="flex items-end justify-between gap-6">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-900">Book a training</h1>
					<p className="mt-1 text-sm text-zinc-600">
						Request a date and we’ll follow up to confirm details.
					</p>
				</div>

				<Link
					href="/services"
					className="text-sm font-semibold text-zinc-900 hover:text-zinc-600"
				>
					Browse services →
				</Link>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-3">
				{/* Form */}
				<section className="lg:col-span-2">
					<div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
						{!submitted ? (
							<form onSubmit={onSubmit} className="space-y-8">
								{/* Service */}
								<div>
									<h2 className="text-sm font-semibold text-zinc-900">Training details</h2>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">Training Area</label>
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
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											>
												<option value="" disabled>Choose a training area…</option>
												{categoryList.map(cat => (
													<option key={cat} value={cat}>{cat}</option>
												))}
											</select>
											{!form.category && (
												<p className="mt-2 text-xs text-zinc-500">Choose a training area to view available programs.</p>
											)}
										</div>

										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">Training Program</label>
											<select
												value={form.serviceSlug}
												onChange={e => update("serviceSlug", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												disabled={!form.category}
											>
												<option value="" disabled>Choose a training program…</option>
												{filteredServices.map(s => (
													<option key={s.slug} value={s.slug}>{s.name}</option>
												))}
											</select>
											{form.category && !form.serviceSlug && (
												<p className="mt-2 text-xs text-zinc-500">Please select a service from this category.</p>
											)}
											<p className="mt-2 text-xs text-zinc-500">
												Not sure? Pick the closest match — you can adjust later.
											</p>
										</div>

										<div>
											<label className="text-sm font-medium text-zinc-800">
												# of trainees
											</label>
											<input
												type="number"
												min={1}
												value={form.trainees}
												onChange={(e) => update("trainees", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>

										<div>
											<label className="text-sm font-medium text-zinc-800">
												Delivery type
											</label>
											<select
												value={form.locationType}
												onChange={(e) =>
													update("locationType", e.target.value as any)
												}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											>
												<option value="our_location">At your facility</option>
												<option value="virtual">Virtual / Remote</option>
											</select>
										</div>
									</div>
								</div>

								{/* Date preferences */}
								<div>
									<h2 className="text-sm font-semibold text-zinc-900">Preferred schedule</h2>
									<p className="mt-1 text-xs text-zinc-500">
										Add at least one preferred date so we can confirm availability.
									</p>

									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div>
											<label className="text-sm font-medium text-zinc-800">
												Preferred date #1
											</label>
											<input
												type="date"
												value={form.date1}
												onChange={(e) => update("date1", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">
												Time window
											</label>
											<select
												value={form.timeWindow1}
												onChange={(e) => update("timeWindow1", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											>
												{DEFAULT_TIME_WINDOWS.map((t) => (
													<option key={t} value={t}>
														{t}
													</option>
												))}
											</select>
										</div>

										<div>
											<label className="text-sm font-medium text-zinc-800">
												Preferred date #2 (optional)
											</label>
											<input
												type="date"
												value={form.date2}
												onChange={(e) => update("date2", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">
												Time window (optional)
											</label>
											<select
												value={form.timeWindow2}
												onChange={(e) => update("timeWindow2", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
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
									<h2 className="text-sm font-semibold text-zinc-900">Location</h2>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">
												Address (if applicable)
											</label>
											<input
												value={form.address}
												onChange={(e) => update("address", e.target.value)}
												placeholder="Street address"
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">City</label>
											<input
												value={form.city}
												onChange={(e) => update("city", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">State</label>
											<input
												value={form.state}
												onChange={(e) => update("state", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">ZIP</label>
											<input
												value={form.zip}
												onChange={(e) => update("zip", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
											/>
										</div>
									</div>
									<p className="mt-2 text-xs text-zinc-500">
										If you’re not sure yet, leave this blank — we’ll confirm during follow-up.
									</p>
								</div>

								{/* Contact */}
								<div>
									<h2 className="text-sm font-semibold text-zinc-900">Contact</h2>
									<div className="mt-4 grid gap-4 sm:grid-cols-2">
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">Company</label>
											<input
												value={form.company}
												onChange={(e) => update("company", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												placeholder="Company / organization name"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">
												Contact name
											</label>
											<input
												value={form.contactName}
												onChange={(e) => update("contactName", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												placeholder="Full name"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-800">Email</label>
											<input
												value={form.email}
												onChange={(e) => update("email", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												placeholder="name@company.com"
												type="email"
											/>
											{form.email.length > 0 && !isValidEmail(form.email) && (
												<p className="mt-1 text-xs text-red-600">
													Enter a valid email.
												</p>
											)}
										</div>
										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">Phone (optional)</label>
											<input
												value={form.phone}
												onChange={(e) => update("phone", e.target.value)}
												className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												placeholder="(555) 555-5555"
											/>
										</div>

										<div className="sm:col-span-2">
											<label className="text-sm font-medium text-zinc-800">
												Notes (optional)
											</label>
											<textarea
												value={form.notes}
												onChange={(e) => update("notes", e.target.value)}
												className="mt-2 min-h-[110px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-200"
												placeholder="Anything we should know? (equipment, language needs, site constraints, etc.)"
											/>
										</div>
									</div>
								</div>

								{/* Submit */}
								<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-xs text-zinc-500">
										By submitting, you’re requesting a booking — we’ll confirm availability by email.
									</p>

									<button
										type="submit"
										disabled={!canSubmit}
										className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
									>
										Submit request
									</button>
								</div>
							</form>
						) : (
							<div className="py-6">
								<h2 className="text-lg font-semibold text-zinc-900">Request received</h2>
								<p className="mt-2 text-sm text-zinc-600">
									Thanks — we’ll follow up shortly to confirm availability and finalize details.
								</p>

								<div className="mt-6 flex flex-col gap-3 sm:flex-row">
									<Link
										href="/services"
										className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
									>
										Browse services
									</Link>
									<button
										onClick={() => setSubmitted(false)}
										className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
									>
										Submit another request
									</button>
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Summary */}
				<aside className="lg:col-span-1">
					<div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
						<h2 className="text-sm font-semibold text-zinc-900">Summary</h2>

						<div className="mt-4 space-y-4">
							<div>
								<p className="text-xs text-zinc-500">Service</p>
								<p className="mt-1 text-sm font-semibold text-zinc-900">
									{selectedService?.name ?? "—"}
								</p>
								{selectedService?.duration && (
									<p className="mt-1 text-xs text-zinc-500">
										Typical duration: {selectedService.duration}
									</p>
								)}
							</div>

							<div className="grid gap-3">
								<div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
									<p className="text-xs text-zinc-500">Preference #1</p>
									<p className="mt-1 text-sm text-zinc-900">
										{form.date1 ? `${form.date1} • ${form.timeWindow1}` : "—"}
									</p>
								</div>
								<div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
									<p className="text-xs text-zinc-500">Preference #2</p>
									<p className="mt-1 text-sm text-zinc-900">
										{form.date2 ? `${form.date2} • ${form.timeWindow2}` : "—"}
									</p>
								</div>
							</div>

							<div className="rounded-xl border border-zinc-200 p-3">
								<p className="text-xs text-zinc-500">Estimated group size</p>
								<p className="mt-1 text-sm font-semibold text-zinc-900">
									{form.trainees} trainees
								</p>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}