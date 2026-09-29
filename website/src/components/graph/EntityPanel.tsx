
import {
  Network,
  BookOpen,
  Folder,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";

type Props = {
  entity: any;
};

export default function EntityPanel({
  entity,
}: Props) {
  if (!entity) {
    return (
      <EMVCard className="border-teal-500/20">

        <div className="text-center text-slate-400 py-16">

          <Network className="mx-auto h-10 w-10 mb-4"/>

          Select an entity in the graph.

        </div>

      </EMVCard>
    );
  }

  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center gap-3">

        <Network className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Entity
          </div>

          <h2 className="text-2xl font-bold">
            {entity.name}
          </h2>

        </div>

      </div>

      <div className="mt-6 space-y-6">

        <div>

          <div className="text-sm text-teal-300">
            Type
          </div>

          <div className="mt-1">
            {entity.type}
          </div>

        </div>

        <div>

          <div className="text-sm text-teal-300">
            Description
          </div>

          <p className="mt-2 text-slate-300">
            {entity.description}
          </p>

        </div>

        <div>

          <div className="mb-3 flex items-center gap-2 text-teal-300">

            <Folder className="h-4 w-4"/>

            Collections

          </div>

          <div className="flex flex-wrap gap-2">

            {(entity.collections ?? []).map((collection: string)=>(

              <span
                key={collection}
                className="rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-300"
              >
                {collection}
              </span>

            ))}

          </div>

        </div>

        <div>

          <div className="mb-3 flex items-center gap-2 text-teal-300">

            <BookOpen className="h-4 w-4"/>

            Related Entities

          </div>

          <div className="space-y-2">

            {(entity.related ?? []).map((related: string)=>(

              <div
                key={related}
                className="rounded-lg border border-slate-800 bg-[#082028] p-3"
              >
                {related}
              </div>

            ))}

          </div>

        </div>

      </div>

    </EMVCard>
  );
}