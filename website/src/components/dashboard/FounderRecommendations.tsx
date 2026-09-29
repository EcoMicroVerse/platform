
type Recommendation = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

type Props = {
  recommendations: Recommendation[];
};

export default function FounderRecommendations({
  recommendations,
}: Props) {
  const colours = {
    High: "border-red-500/30 bg-red-500/10 text-red-300",
    Medium:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
    Low: "border-teal-500/30 bg-teal-500/10 text-teal-300",
  };

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Editorial Recommendations
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        AI Editorial Assistant
      </h2>

      <p className="mt-3 text-slate-400">
        Suggested next actions based on your current editorial
        pipeline.
      </p>

      <div className="mt-8 space-y-4">
        {recommendations.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-white">
                  {item.title}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {item.description}
                </div>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs ${colours[item.priority]}`}
              >
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}