"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Network,
  Folder,
  ArrowRight,
} from "lucide-react";

type Props = {
  entity: any;
};

export default function EntityHoverCard({
  entity,
}: Props) {
  const [open, setOpen] = useState(false);

  if (!entity) return null;

  // Step 13.12.4 – Connection Strength
  const connectionCount = entity.related?.length ?? 0;

  const strength =
    connectionCount >= 10
      ? "Core"
      : connectionCount >= 5
      ? "Connected"
      : "Emerging";

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-help rounded px-1 text-teal-300 underline decoration-dotted">
        {entity.name}
      </span>

      {open && (
        <div className="absolute left-0 top-7 z-50 w-96 rounded-2xl border border-teal-500/20 bg-[#061426] p-5 shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <div className="text-xs uppercase tracking-wider text-teal-300">
                {entity.type}
              </div>

              <h3 className="mt-1 text-2xl font-bold">
                {entity.name}
              </h3>

            </div>

            <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300">
              {strength}
            </span>

          </div>

          {/* Description */}

          <p className="mt-4 text-sm leading-6 text-slate-300">
            {entity.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">

  <div className="rounded-xl bg-[#082028] p-4 text-center">

    <div className="text-2xl font-bold text-teal-300">
      {entity.related.length}
    </div>

    <div className="text-xs text-slate-400">
      Graph Connections
    </div>

  </div>

  <div className="rounded-xl bg-[#082028] p-4 text-center">

    <div className="text-2xl font-bold text-teal-300">
      {entity.collections.length}
    </div>

    <div className="text-xs text-slate-400">
      Collections
    </div>

  </div>

  <div className="rounded-xl bg-[#082028] p-4 text-center">

    <div className="text-2xl font-bold text-teal-300">
      {entity.articles.length}
    </div>

    <div className="text-xs text-slate-400">
      Research Objects
    </div>

  </div>

</div>

          {/* Statistics */}

          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-[#082028] p-3 text-center">

              <div className="text-xl font-bold text-teal-300">
                {entity.articles?.length ?? 0}
              </div>

              <div className="text-xs text-slate-400">
                Research Objects
              </div>

            </div>

            <div className="rounded-xl bg-[#082028] p-3 text-center">

              <div className="text-xl font-bold text-teal-300">
                {connectionCount}
              </div>

              <div className="text-xs text-slate-400">
                Connections
              </div>

            </div>

          </div>

          {/* Collections */}

          <div className="mt-5">

            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-teal-300">

              <Folder className="h-3 w-3"/>

              Collections

            </div>

            <div className="flex flex-wrap gap-2">

              {(entity.collections ?? []).map(
                (collection: string) => (
                  <span
                    key={collection}
                    className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                  >
                    {collection}
                  </span>
                )
              )}

            </div>

          </div>

          {/* Related Entities */}

          <div className="mt-5">

            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-teal-300">

              <Network className="h-3 w-3"/>

              Related Entities

            </div>

            <div className="flex flex-wrap gap-2">

              {(entity.related ?? [])
                .slice(0, 4)
                .map((item: string) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}

            </div>

          </div>

          {/* Step 13.12.3 – Related Research Objects */}

          {(entity.articles?.length ?? 0) > 0 && (
            <div className="mt-5">

              <div className="mb-2 text-xs uppercase tracking-wider text-teal-300">
                Research Objects
              </div>

              <div className="space-y-2">

                {(entity.articles ?? [])
                  .slice(0, 3)
                  .map((article: string) => (
                    <div
                      key={article}
                      className="rounded-lg border border-slate-800 bg-[#082028] px-3 py-2 text-sm text-slate-300"
                    >
                      {article}
                    </div>
                  ))}

              </div>

            </div>
          )}

          {/* Footer */}

          <Link
            href={`/entities/${entity.name}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200"
          >
            View Entity Timeline

            <ArrowRight className="h-4 w-4"/>
          </Link>

        </div>
      )}

    </span>
  );
}