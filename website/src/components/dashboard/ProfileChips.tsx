export default function ProfileChips({
  profiles,
}: {
  profiles: { name: string; score: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {profiles.map((p) => (
        <span
          key={p.name}
          className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300 border border-teal-500/20"
        >
          {p.name}
        </span>
      ))}
    </div>
  );
}