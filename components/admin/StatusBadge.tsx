type Status =
  | "New"
  | "In Progress"
  | "Contacted"
  | "Completed"
  | "Replied"
  | "Closed";

type StatusBadgeProps = {
  status: Status;
};

const statusStyles: Record<Status, string> = {
  New: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  "In Progress":
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  Contacted:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Completed:
    "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
  Replied:
    "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200",
  Closed: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}