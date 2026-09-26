type StatCardProps = {
  title: string;
  value: number;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-teal-800/30 bg-slate-900/60 p-5 backdrop-blur">
      <p className="text-sm text-teal-300">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-white">{value}</h2>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}