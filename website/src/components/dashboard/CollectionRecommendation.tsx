
"use client";

import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Props = {
  suggestion: {
    current: string;
    suggested: string;
    confidence: number;
    reasons: string[];
  };
};

export default function CollectionRecommendation({
  suggestion,
}: Props) {
  const changed =
    suggestion.current !== suggestion.suggested;

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            AI Editorial Copilot
          </div>

          <h2 className="text-3xl font-bold">
            Collection Recommendation
          </h2>

        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">

        <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">

          <div className="text-sm text-slate-400">
            Current Collection
          </div>

          <div className="mt-2 text-xl font-bold">
            {suggestion.current}
          </div>

        </div>

        <div className="flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-teal-300"/>
        </div>

        <div className="rounded-xl border border-teal-500/30 bg-[#082028] p-5">

          <div className="text-sm text-teal-300">
            AI Suggestion
          </div>

          <div className="mt-2 text-xl font-bold">
            {suggestion.suggested}
          </div>

          <div className="mt-3 text-sm text-slate-400">
            Confidence {suggestion.confidence}%
          </div>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold text-teal-300">
          Why?
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">

          {suggestion.reasons.map((reason,index)=>(
            <span
              key={index}
              className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-2 text-sm text-teal-300"
            >
              {reason}
            </span>
          ))}

        </div>

      </div>

      {changed ? (
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-300">
          Recommendation differs from the current editorial classification.
          Review before publishing.
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
          Current collection aligns with the detected scientific content.
        </div>
      )}

    </section>
  );
}