type Priority = "critical" | "high" | "medium" | "low";

const styles = {
  critical: "bg-red-500/20 text-red-300 border-red-500/30",
  high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  low: "bg-slate-700 text-slate-300 border-slate-600",
};

export default function PriorityBadge({
  priority,
}: {
  priority: Priority;
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}