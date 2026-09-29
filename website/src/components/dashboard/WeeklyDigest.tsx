
type Digest = {
  week: string;
  newArticles: number;
  collectionsExpanded: number;
  graphNodes: number;
  graphLinks: number;
  averageReadiness: number;
};

type Props = {
  digest: Digest;
};

export default function WeeklyDigest({
  digest,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Weekly Scientific Intelligence
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Week {digest.week}
      </h2>

      <p className="mt-3 text-slate-300">
        Your weekly editorial snapshot of EcoMicroVerse activity.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-[#082028] p-5">
          <div className="text-sm text-teal-300">
            New Research Objects
          </div>

          <div className="mt-2 text-3xl font-bold">
            {digest.newArticles}
          </div>
        </div>

        <div className="rounded-xl bg-[#082028] p-5">
          <div className="text-sm text-teal-300">
            Collections Expanded
          </div>

          <div className="mt-2 text-3xl font-bold">
            {digest.collectionsExpanded}
          </div>
        </div>

        <div className="rounded-xl bg-[#082028] p-5">
          <div className="text-sm text-teal-300">
            Editorial Readiness
          </div>

          <div className="mt-2 text-3xl font-bold">
            {digest.averageReadiness}%
          </div>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-[#082028] p-6">

        <div className="text-sm text-teal-300">
          Knowledge Graph Growth
        </div>

        <div className="mt-4 flex flex-wrap gap-6">

          <div>
            <div className="text-2xl font-bold">
              {digest.graphNodes}
            </div>

            <div className="text-sm text-slate-400">
              Entities
            </div>
          </div>

          <div>
            <div className="text-2xl font-bold">
              {digest.graphLinks}
            </div>

            <div className="text-sm text-slate-400">
              Relationships
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}