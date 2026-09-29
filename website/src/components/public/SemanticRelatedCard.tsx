
import Link from "next/link";
import {
  Network,
  ArrowRight,
} from "lucide-react";

type Props = {
  article: any;
};

export default function SemanticRelatedCard({
  article,
}: Props) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="block rounded-2xl border border-teal-500/20 bg-[#061426] p-5 transition hover:border-teal-400 hover:bg-[#082028]"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-teal-300">
        <Network className="h-3 w-3"/>
        {article.collection}
      </div>

      <h3 className="mt-3 text-xl font-bold">
        {article.title}
      </h3>

      <p className="mt-3 text-sm text-slate-300">
        {article.reason}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {article.sharedEntities.map(
          (entity: string) => (
            <span
              key={entity}
              className="rounded-full bg-teal-500/10 px-2 py-1 text-xs text-teal-300"
            >
              {entity}
            </span>
          )
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-teal-300">
        Continue reading
        <ArrowRight className="h-4 w-4"/>
      </div>
    </Link>
  );
}