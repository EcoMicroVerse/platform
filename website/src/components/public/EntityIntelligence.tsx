
"use client";

import {
  Network,
  Layers,
  Sparkles,
} from "lucide-react";

type Props = {
  entity: {
    name: string;
    type: string;
    description: string;
    collections: string[];
    related: string[];
  };
};

export default function EntityIntelligence({
  entity,
}: Props) {
  return (
    <div className="rounded-3xl border border-teal-500/20 bg-[#061426] p-6">

      <div className="flex items-center gap-3">

        <Sparkles className="h-5 w-5 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Entity Intelligence
          </div>

          <h3 className="text-2xl font-bold">
            {entity.name}
          </h3>

        </div>

      </div>

      <div className="mt-6 space-y-6">

        <div>
          <div className="text-sm text-slate-400">
            Type
          </div>

          <div className="mt-1 font-medium">
            {entity.type}
          </div>
        </div>

        <div>
          <div className="text-sm text-slate-400">
            Description
          </div>

          <p className="mt-2 text-slate-300">
            {entity.description}
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-teal-300">
            <Layers className="h-4 w-4"/>
            Collections
          </div>

          <div className="flex flex-wrap gap-2">

            {entity.collections.map(collection=>(
              <span
                key={collection}
                className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-sm text-teal-300"
              >
                {collection}
              </span>
            ))}

          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-teal-300">
            <Network className="h-4 w-4"/>
            Related Entities
          </div>

          <div className="flex flex-wrap gap-2">

            {entity.related.map(item=>(
              <span
                key={item}
                className="rounded-full border border-slate-700 bg-[#082028] px-3 py-1 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}

          </div>
        </div>

      </div>

    </div>
  );
}