
type Props = {
  metadataComplete: boolean;
  summaryPresent: boolean;
  articlePresent: boolean;
  timelinePresent: boolean;
  citationsPresent: boolean;
};

type Check = {
  label: string;
  ok: boolean;
};

export default function EditorialChecklist({
  metadataComplete,
  summaryPresent,
  articlePresent,
  timelinePresent,
  citationsPresent,
}: Props) {
  const checks: Check[] = [
    { label: "Metadata", ok: metadataComplete },
    { label: "Executive Summary", ok: summaryPresent },
    { label: "Full Article", ok: articlePresent },
    { label: "Timeline", ok: timelinePresent },
    { label: "Citations", ok: citationsPresent },
  ];

  const completed = checks.filter((check) => check.ok).length;
  const score = Math.round((completed / checks.length) * 100);

  return (
    <div className="rounded-3xl border border-teal-500/20 bg-[#061426] p-6">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Editorial Readiness
      </div>

      <div className="mt-3 text-4xl font-bold">
        {score}%
      </div>

      <div className="mt-6 space-y-3">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex items-center justify-between"
          >
            <span>{check.label}</span>

            {check.ok ? (
              <span className="text-green-400">✓</span>
            ) : (
              <span className="text-slate-500">○</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}