
type Report = {
  id: string;
  score: number;
  metadata: boolean;
  summary: boolean;
  article: boolean;
  timeline: boolean;
  citations: boolean;
};

type Props = {
  reports: Report[];
};

export default function EditorialIntelligence({
  reports,
}: Props) {
  if (reports.length === 0) {
    return (
      <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
        <div className="text-xs uppercase tracking-widest text-teal-300">
          Editorial Intelligence
        </div>

        <h2 className="mt-3 text-3xl font-bold">
          Publication Readiness
        </h2>

        <p className="mt-4 text-slate-400">
          No Research Objects available yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Editorial Intelligence
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Publication Readiness
      </h2>

      <div className="mt-8 space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">
                  {report.id}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  {report.score}% ready
                </div>
              </div>

              <div className="text-xl font-bold text-teal-300">
                {report.score}%
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {!report.metadata && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  Metadata
                </span>
              )}

              {!report.summary && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  Summary
                </span>
              )}

              {!report.article && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  Article
                </span>
              )}

              {!report.timeline && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  Timeline
                </span>
              )}

              {!report.citations && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  Citations
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}