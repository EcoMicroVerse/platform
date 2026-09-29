
"use client";

import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

type Props = {
  report: {
    score: number;
    readiness: string;
    strengths: string[];
    improvements: string[];
  };
};

export default function EditorialCopilot({
  report,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            AI Editorial Copilot
          </div>

          <h2 className="text-3xl font-bold">
            Publication Readiness
          </h2>

        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">

        <div className="rounded-2xl border border-teal-500/20 bg-[#082028] p-6 text-center">

          <div className="text-5xl font-bold text-teal-300">
            {report.score}%
          </div>

          <div className="mt-2 text-sm text-slate-400">
            {report.readiness}
          </div>

        </div>

        <div className="space-y-6">

          <div>

            <h3 className="mb-3 font-semibold text-teal-300">
              Strengths
            </h3>

            <div className="space-y-2">

              {report.strengths.map((item,index)=>(
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-[#082028] p-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400"/>

                  <span>{item}</span>

                </div>
              ))}

            </div>

          </div>

          <div>

            <h3 className="mb-3 font-semibold text-amber-300">
              Improvements
            </h3>

            <div className="space-y-2">

              {report.improvements.map((item,index)=>(
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-[#082028] p-3"
                >
                  <AlertCircle className="h-5 w-5 text-amber-400"/>

                  <span>{item}</span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}