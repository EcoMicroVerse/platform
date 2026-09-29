
"use client";

import {
  CheckCircle2,
  AlertCircle,
  CircleOff,
} from "lucide-react";

type Section = {
  name: string;
  status: "Good" | "Short" | "Missing";
  words: number;
  suggestion: string;
};

export default function ContentQuality({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        AI Editorial Copilot
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Content Quality
      </h2>

      <div className="mt-8 space-y-3">

        {sections.map((section) => (
          <div
            key={section.name}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="font-semibold">
                  {section.name}
                </div>

                <div className="text-sm text-slate-400">
                  {section.words} words
                </div>

              </div>

              {section.status === "Good" ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-400"/>
              ) : section.status === "Short" ? (
                <AlertCircle className="h-6 w-6 text-amber-400"/>
              ) : (
                <CircleOff className="h-6 w-6 text-red-400"/>
              )}

            </div>

            {section.status !== "Good" && (
              <div className="mt-3 text-sm text-slate-300">
                {section.suggestion}
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}