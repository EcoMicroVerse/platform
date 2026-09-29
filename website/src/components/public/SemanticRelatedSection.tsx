
import SemanticRelatedCard from "./SemanticRelatedCard";

type Props = {
  articles: any[];
};

export default function SemanticRelatedSection({
  articles,
}: Props) {
  if (articles.length === 0)
    return null;

  return (
    <section className="mt-20">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Research Journey
      </div>

      <h2 className="mt-2 text-3xl font-bold">
        Continue Your Research Journey
      </h2>

      <p className="mt-3 max-w-3xl text-slate-300">
        These Research Objects are connected through shared scientific entities, editorial collections and the EcoMicroVerse Knowledge Graph.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {articles.map(
          (article) => (
            <SemanticRelatedCard
              key={article.id}
              article={article}
            />
          )
        )}
      </div>

    </section>
  );
}