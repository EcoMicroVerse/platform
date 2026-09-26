import Link from "next/link";

type Props = {
  collections: string[];
};

export default function CollectionPreview({
  collections,
}: Props) {

  return (

    <section>

      <h2 className="mb-6 text-2xl font-bold text-white">
        Explore Collections
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {collections.map(collection => (

          <Link
            key={collection}
            href={`/collections/${collection}`}
            className="group"
          >

            <div className="rounded-2xl border border-slate-800 bg-[#061426] p-6 text-center transition hover:border-teal-500/30 hover:-translate-y-1">

              <div className="text-lg font-semibold text-white group-hover:text-teal-300 transition-colors">
                {collection}
              </div>

              <div className="mt-2 text-sm text-slate-400">
                Browse research →
              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}