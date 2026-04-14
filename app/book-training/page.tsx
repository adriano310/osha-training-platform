
import { Suspense } from "react";
import servicesData from "@/lib/servicesData";
import BookTrainingClient from "./BookTrainingClient";

const flatServices = servicesData.flatMap((category) =>
  category.items.map((item) => ({
    category: category.category,
    slug: item.slug,
    name: item.title,
    duration: item.details?.duration,
    note: item.summary,
  }))
);

export default function BookTrainingPage() {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-6xl px-6 py-12 text-slate-600">Loading booking form...</main>}
    >
      <BookTrainingClient services={flatServices} />
    </Suspense>
  );
}