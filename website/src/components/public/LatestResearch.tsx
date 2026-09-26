import Link from "next/link";

type Props = {
  articles: any[];
};

export default function LatestResearch({
  articles,
}: Props) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Latest Research
        </h2>

        <div className="text-sm text-slate-400">
          {articles.length} article
          {articles.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.emv_id}
            href={`/articles/${article.emv_id}`}
            className="group"
          >
            <article className="h-full rounded-2xl border border-slate-800 bg-[#061426] p-5 transition hover:-translate-y-1 hover:border-teal-500/30 hover:bg-[#081a2d]">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-teal-300">
                  {article.recommended_collection}
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
                  ? article.summary
                      .replace(/^#+\s*/gm, "")
                      .trim()
                  : "Summary coming soon."}
              </p>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  {article.type}
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
  );
}