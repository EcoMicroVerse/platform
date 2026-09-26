import Link from "next/link";
type Props = {
  article: any;
};

export default function FeaturedArticle({
  article,
}: Props) {

  if (!article) return null;

  return (
    <section className="rounded-3xl border border-slate-800 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Featured Research
      </div>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {article.title}
      </h2>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">

        <span className="rounded-full bg-teal-500/10 px-3 py-1 text-teal-300">
          {article.recommended_collection}
        </span>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
          Score {article.score}
        </span>

      </div>

      <p className="mt-6 text-slate-300">
        {article.summary || "Summary coming soon."}
      </p>

      <Link
  href={`/articles/${article.emv_id}`}
  className="mt-8 inline-block rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
>
  Read Research →
</Link>

    </section>
  );
}