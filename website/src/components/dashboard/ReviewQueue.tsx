import PriorityBadge from "./PriorityBadge";
import ProfileChips from "./ProfileChips";

export default function ReviewQueue({ items }: any) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Review Queue
      </h2>

      <div className="space-y-5">

        {items.map((item: any, index: number) => (
          <article
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5"
          >
            <div className="mb-3 flex items-center justify-between">

              <PriorityBadge priority={item.priority} />

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {item.recommended_collection || "GENERAL"}
              </span>

            </div>

            <h3 className="text-lg font-semibold leading-snug text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {item.collection}
            </p>

            {item.profile_matches?.length > 0 && (
              <div className="mt-4">
                <ProfileChips profiles={item.profile_matches} />
              </div>
            )}

            <div className="mt-5 flex items-center justify-between text-sm">

              <span className="text-slate-400">
                Score: <span className="font-semibold text-teal-300">{item.score}</span>
              </span>

              <span className="text-yellow-300">
                Pending Founder Review
              </span>

            </div>

          </article>
        ))}

      </div>
    </section>
  );
}