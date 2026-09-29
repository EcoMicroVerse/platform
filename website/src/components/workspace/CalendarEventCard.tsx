
type Props = {
  title: string;
  type: string;
};

const COLORS: Record<string, string> = {
  "Daily Discovery":
    "bg-teal-500/20 text-teal-300 border-teal-500/30",

  "Tool Spotlight":
    "bg-blue-500/20 text-blue-300 border-blue-500/30",

  "Historical Milestone":
    "bg-amber-500/20 text-amber-300 border-amber-500/30",

  "Research Object":
    "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function CalendarEventCard({
  title,
  type,
}: Props) {
  return (
    <div
      className={`mt-1 rounded-lg border px-2 py-1 text-xs ${
        COLORS[type] ??
        "bg-slate-700 text-slate-300 border-slate-600"
      }`}
    >
      <div className="font-medium">
        {title}
      </div>

      <div className="opacity-80">
        {type}
      </div>
    </div>
  );
}