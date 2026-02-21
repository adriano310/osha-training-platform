
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
  return <BookTrainingClient services={flatServices}  />;
}