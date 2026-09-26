type Props = {
  label: string;
  status: "green" | "yellow" | "red";
};

export default function StatusPill({
  label,
  status,
}: Props) {

  const colours = {
    green: "bg-green-400",
    yellow: "bg-amber-400",
    red: "bg-red-400",
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-[#081521] px-3 py-2 text-sm">
      <div
        className={`h-2.5 w-2.5 rounded-full ${colours[status]}`}
      />
      <span>{label}</span>
    </div>
  );
}
