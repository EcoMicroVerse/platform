import Link from "next/link";
import { requireComingSoonAccess } from "@/lib/comingSoon";
import { loadCollection } from "@/lib/public";

type Props = {
  params: Promise<{
    collection: string;
  }>;
};

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  await requireComingSoonAccess(`/collections/${collection}`);


  const data = await loadCollection(collection);

  const highestScore =
    data.articles.length > 0
      ? Math.max(...data.articles.map((article: any) => article.score))
      : 0;

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl space-y-10 p-8">

        {/* Breadcrumb */}

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-teal-300 transition-colors">
            Home
          </Link>

          <span>→</span>

          <span className="text-slate-300">{collection}</span>
        </div>

        {/* Collection Hero */}

        <header className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-10">
          <div className="text-sm uppercase tracking-[0.3em] text-teal-300">
            Collection
          </div>

          <h1 className="mt-4 text-5xl font-bold">{collection}</h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-300">
  Explore curated research, editorial insights and interconnected
  discoveries across the {collection} collection.
</p>

<div className="mt-8 flex flex-wrap gap-4">
  <Link
    href={`/collections/${collection}/graph`}
    className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
  >
    Open Knowledge Graph
  </Link>
</div>
        </header>

        {/* Statistics Cards */}

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-[#061426] p-6">
            <div className="text-sm text-slate-400">Research Objects</div>

            <div className="mt-2 text-4xl font-bold">{data.stats.total}</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#061426] p-6">
            <div className="text-sm text-slate-400">Average Score</div>

            <div className="mt-2 text-4xl font-bold">
              {data.stats.averageScore}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#061426] p-6">
            <div className="text-sm text-slate-400">Trending Methods</div>

            <div className="mt-2 text-4xl font-bold">
              {data.trendingMethods.length}
            </div>
          </div>

        </div>

        {/* Collection Snapshot */}

        <section className="rounded-2xl border border-slate-800 bg-[#061426] p-8">

          <h2 className="text-2xl font-bold">Collection Snapshot</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div>
              <div className="text-sm text-slate-400">Collection</div>

              <div className="mt-2 text-xl font-semibold">{collection}</div>
            </div>

            <div>
              <div className="text-sm text-slate-400">Featured Research</div>

              <div className="mt-2 text-xl font-semibold">
                {data.featured ? data.featured.title : "Coming soon"}
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-400">Highest Score</div>

              <div className="mt-2 text-xl font-semibold">{highestScore}</div>
            </div>

          </div>

        </section>

        {/* Featured Research */}

        {data.featured && (
          <section className="rounded-2xl border border-slate-800 bg-[#061426] p-8">
            <div className="text-xs uppercase tracking-widest text-teal-300">
              Featured Research
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              {data.featured.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-teal-500/10 px-3 py-1 text-teal-300">
                Editorial Score {data.featured.score}
              </span>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                {data.featured.type}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">

  <Link
    href={`/articles/${data.featured.emv_id}`}
    className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
  >
    Read Research →
  </Link>

  <Link
    href={`/collections/${collection}/graph`}
    className="rounded-xl border border-teal-500/30 px-5 py-3 font-semibold text-teal-300 transition hover:bg-teal-500/10"
  >
    View Knowledge Graph
  </Link>

</div>
          </section>
        )}

        {/* Knowledge Map Preview */}

<section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

  <div className="text-xs uppercase tracking-widest text-teal-300">
    Knowledge Map
  </div>

  <h2 className="mt-3 text-3xl font-bold">
    Explore connected scientific entities
  </h2>

  <p className="mt-4 max-w-3xl text-slate-300">
    Discover how methods, tools, organisms and concepts connect
    across the {collection} collection through an interactive
    scientific knowledge graph.
  </p>

  <div className="mt-8 grid gap-5 md:grid-cols-3">

    <div className="rounded-xl border border-slate-800 bg-[#07121f] p-5">
      <div className="text-sm text-teal-300">Methods</div>
      <div className="mt-2 text-slate-300">
        Explore recurring experimental workflows.
      </div>
    </div>

    <div className="rounded-xl border border-slate-800 bg-[#07121f] p-5">
      <div className="text-sm text-teal-300">Tools</div>
      <div className="mt-2 text-slate-300">
        Discover software and computational pipelines.
      </div>
    </div>

    <div className="rounded-xl border border-slate-800 bg-[#07121f] p-5">
      <div className="text-sm text-teal-300">Concepts</div>
      <div className="mt-2 text-slate-300">
        Follow scientific relationships across Research Objects.
      </div>
    </div>

  </div>

  <div className="mt-8">
    <Link
      href={`/collections/${collection}/graph`}
      className="inline-flex rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
    >
      Launch Collection Graph
    </Link>
  </div>

</section>
        
        {/* Latest Research */}

        <section>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Research</h2>

            <div className="text-sm text-slate-400">
              {data.articles.length} article
              {data.articles.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {data.articles.map((article: any) => (
              <Link
                key={article.emv_id}
                href={`/articles/${article.emv_id}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-slate-800 bg-[#061426] p-5 transition hover:-translate-y-1 hover:border-teal-500/30 hover:bg-[#081a2d]">

                  <div className="flex items-center justify-between">

                    <div className="text-xs uppercase tracking-wider text-teal-300">
                      {article.type}
                    </div>

                    <div className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
                      {article.score}
                    </div>

                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-teal-300">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-slate-400">
                    {article.summary
                      ? article.summary.replace(/^#+\s*/gm, "").trim()
                      : "Summary coming soon."}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      {article.recommended_collection}
                    </span>

                    <span className="font-medium text-teal-300 transition-transform group-hover:translate-x-1">
                      Read →
                    </span>

                  </div>

                </article>
              </Link>
            ))}

          </div>

        </section>

        {/* Trending Methods */}

        <section className="rounded-2xl border border-slate-800 bg-[#061426] p-8">

          <h2 className="text-2xl font-bold">Trending Methods</h2>

          <p className="mt-2 text-slate-400">
            Emerging techniques and recurring themes within this collection.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            {data.trendingMethods.length === 0 ? (
              <div className="text-slate-400">
                No methods detected yet.
              </div>
            ) : (
              data.trendingMethods.map((method: any) => (
                <span
                  key={method.name}
                  className="rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-300 transition hover:border-teal-400 hover:bg-teal-500/20"
                >
                  {method.name} ({method.count})
                </span>
              ))
            )}

          </div>

        </section>

      </div>
    </main>
  );
}