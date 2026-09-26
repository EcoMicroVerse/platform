import PriorityBadge from "./PriorityBadge";

export default function ApprovedList({ items }: any) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Approved Research Objects
      </h2>

      <div className="space-y-4">

        {items.map((item: any, index: number) => (
          <article
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5"
          >
            <div className="mb-3 flex items-center justify-between">

              <h3 className="font-semibold text-white">
                {item.emv_id}
              </h3>

              {item.priority && (
                <PriorityBadge priority={item.priority} />
              )}

            </div>

            <p className="text-sm text-slate-400">
              {item.title}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300 border border-teal-500/20">
                {item.collection}
              </span>

              {item.profiles?.map((p: string) => (
                <span
                  key={p}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  {p}
                </span>
              ))}

            </div>

          </article>
        ))}

      </div>
    </section>
  );
}