type FounderBriefProps = {
  brief: {
    generated: string;
    processed: number;
    approved: number;
    average_score: number;
    high_priority: number;
    top_collection: string;
    top_method: string;
    message: string;
    next_action: string;
    focus: string;
  };
};

export default function FounderBrief({ brief }: FounderBriefProps) {
  return (
    <div className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-6">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Founder Morning Brief
      </div>

      <h2 className="mt-2 text-2xl font-bold text-white">
        Good morning, Founder.
      </h2>

      <p className="mt-4 text-slate-300">
        {brief.message}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard label="Processed" value={brief.processed} />

        <StatCard label="Approved" value={brief.approved} />

        <StatCard label="AI Score" value={brief.average_score} />

        <StatCard label="High Priority" value={brief.high_priority} />

      </div>

      <div className="mt-6 rounded-xl bg-[#04111b] p-4">

        <div className="space-y-3 text-sm text-slate-300">

          <div>
            📁 <span className="font-semibold text-white">Current Focus</span>
            <div className="mt-1 text-white">
              {brief.focus}
            </div>
          </div>

          <div>
            🔬 <span className="font-semibold text-white">Trending Method</span>
            <div className="mt-1 text-white">
              {brief.top_method}
            </div>
          </div>

          <div>
            💡 <span className="font-semibold text-white">Suggested Next Action</span>
            <div className="mt-1 text-teal-300">
              {brief.next_action}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2 text-xs text-slate-500">
            Updated {brief.generated}
          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-[#04111b] p-4">

      <div className="text-xs uppercase text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-bold text-white">
        {value}
      </div>

    </div>
  );
}