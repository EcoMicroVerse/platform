
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Network,
  BookOpen,
  Sparkles,
} from "lucide-react";
import EntityIntelligence from "./EntityIntelligence";
import { getEntityInfo } from "@/lib/entityIntelligence";

type Props = {
  article: any;
  readingTime: number;
};

export default function ResearchObjectInspector({
  article,
  readingTime,
}: Props) {
  const [open, setOpen] = useState(true);

  const words = article.article
    ? article.article.split(/\s+/).length
    : 0;

  const citationCount =
    article.citations?.references?.length ?? 0;

  const timelineCount =
    article.timeline?.events?.length ?? 0;

  const featuredEntity = null;

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-teal-300" />

          <div className="text-left">
            <div className="text-xs uppercase tracking-widest text-teal-300">
              Research Object
            </div>

            <h2 className="text-2xl font-bold">
              Inspector
            </h2>
          </div>
        </div>

        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="mt-6 space-y-6">

          {/* Collection */}
          <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
            <div className="text-sm text-slate-400">
              Collection
            </div>

            <div className="mt-2 text-lg font-semibold">
              {article.metadata.recommended_collection}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-300">
                Score {article.metadata.score}
              </span>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {article.metadata.type}
              </span>
            </div>
          </div>

          {/* Step 11.2.3 – Editorial Status */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="text-sm text-emerald-300">
              Editorial Status
            </div>

            <div className="mt-2 text-lg font-semibold">
              Publication Ready
            </div>

            <p className="mt-2 text-sm text-slate-300">
              This Research Object has completed the editorial workflow.
            </p>
          </div>

          {/* Step 11.2.4 – Metadata Preview */}
          <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
            <div className="text-sm text-slate-400">
              Metadata
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">

  <div className="text-sm text-slate-400">
    Publication
  </div>

  <div className="mt-2 text-lg font-semibold">
    Version 1.0
  </div>

  <div className="mt-2 text-sm text-slate-300">
    Editorial Edition
  </div>

</div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Collection</span>
                <span>{article.metadata.recommended_collection}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Type</span>
                <span>{article.metadata.type}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Editorial Score</span>
                <span>{article.metadata.score}</span>
              </div>
            </div>
          </div>

          {/* Scientific Statistics */}
          <div className="grid gap-3 sm:grid-cols-2">

            <InfoCard
              icon={<FileText className="h-5 w-5" />}
              label="Words"
              value={words.toString()}
            />

            <InfoCard
              icon={<BookOpen className="h-5 w-5" />}
              label="Reading Time"
              value={`${readingTime} min`}
            />

            <InfoCard
              icon={<Calendar className="h-5 w-5" />}
              label="Timeline Events"
              value={timelineCount.toString()}
            />

            <InfoCard
              icon={<Network className="h-5 w-5" />}
              label="Citations"
              value={citationCount.toString()}
            />

          </div>

          {featuredEntity && (
  <EntityIntelligence entity={featuredEntity}/>
)}

        </div>
      )}
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#082028] p-4">
      <div className="flex items-center gap-3 text-teal-300">
        {icon}
      </div>

      <div className="mt-3 text-sm text-slate-400">
        {label}
      </div>

      <div className="text-xl font-bold">
        {value}
      </div>
    </div>
  );
}