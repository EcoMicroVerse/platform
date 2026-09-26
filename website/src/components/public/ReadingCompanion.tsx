
import Link from "next/link";
import { BookOpen, Quote, Network } from "lucide-react";

type ReadingPaper = {
  title: string;
  category?: string;
  year?: number | string;
};

type RelatedArticle = {
  emv_id: string;
  title: string;
};

type Props = {
  readingPath?: {
    recommended?: ReadingPaper[];
  };
  related?: RelatedArticle[];
};

export default function ReadingCompanion({
  readingPath,
  related = [],
}: Props) {
  const recommended = readingPath?.recommended ?? [];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">
        Reading Companion
      </h3>

      {/* Reading Path */}
      <section className="rounded-xl bg-[#07121f] p-4">
        <div className="mb-3 flex items-center gap-2 text-teal-300">
          <BookOpen className="h-5 w-5" />
          <span className="font-medium">Reading Path</span>
        </div>

        {recommended.length ? (
          <div className="space-y-3">
            {recommended.map((paper, index) => (
              <div
                key={index}
                className="border-l-2 border-teal-500 pl-3"
              >
                <div className="text-xs text-teal-300">
                  {paper.category ?? "Recommended"}
                </div>

                <div className="text-sm text-white">
                  {paper.title}
                </div>

                {paper.year && (
                  <div className="text-xs text-slate-400">
                    {paper.year}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Reading recommendations will appear here.
          </div>
        )}
      </section>

      {/* Citation Trail */}
      <section className="rounded-xl bg-[#07121f] p-4">
        <div className="mb-3 flex items-center gap-2 text-teal-300">
          <Quote className="h-5 w-5" />
          <span className="font-medium">Citation Trail</span>
        </div>

        <p className="text-sm text-slate-300">
          Follow the scientific lineage behind this Research Object.
        </p>
      </section>

      {/* Knowledge Family */}
      <section className="rounded-xl bg-[#07121f] p-4">
        <div className="mb-3 flex items-center gap-2 text-teal-300">
          <Network className="h-5 w-5" />
          <span className="font-medium">Knowledge Family</span>
        </div>

        <p className="text-sm text-slate-300">
          Explore connected methods, concepts and tools inside
          EcoMicroVerse.
        </p>

        <Link
          href="/graph"
          className="mt-4 inline-flex rounded-lg border border-teal-500/30 px-3 py-2 text-sm text-teal-300 transition hover:bg-teal-500/10"
        >
          Open Knowledge Graph
        </Link>
      </section>

      {/* Related Research */}
      <section className="rounded-xl bg-[#07121f] p-4">
        <div className="mb-3 flex items-center gap-2 text-teal-300">
          <Network className="h-5 w-5" />
          <span className="font-medium">Related Research</span>
        </div>

        {related.length ? (
          <div className="space-y-3">
            {related.map((article) => (
              <Link
                key={article.emv_id}
                href={`/articles/${article.emv_id}`}
                className="block rounded-lg border border-slate-700 p-3 transition hover:border-teal-500/30 hover:bg-[#081a2d]"
              >
                <div className="text-sm text-white">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Related Research Objects will appear here as the
            collection grows.
          </div>
        )}
      </section>
    </div>
  );
}