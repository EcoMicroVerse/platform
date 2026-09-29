
"use client";

import {
  ShieldCheck,
  Gauge,
} from "lucide-react";

import QualityRadar from "./QualityRadar";

type Props = {
  report: {
    overall: number;
    verdict: string;
    metrics: {
      label: string;
      score: number;
    }[];
  };
};

export default function EditorialQualityPanel({
  report,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <ShieldCheck className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Editorial Studio
          </div>

          <h2 className="text-3xl font-bold">
            Editorial Quality Panel
          </h2>

        </div>

      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">

        <div className="rounded-2xl border border-teal-500/20 bg-[#082028] p-6 text-center">

          <Gauge className="mx-auto h-10 w-10 text-teal-300"/>

          <div className="mt-4 text-5xl font-bold text-teal-300">
            {report.overall}
          </div>

          <div className="mt-2 text-sm text-slate-400">
            {report.verdict}
          </div>

        </div>

        <QualityRadar metrics={report.metrics}/>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        {report.metrics.map(metric=>(
          <div
            key={metric.label}
            className="rounded-xl border border-slate-800 bg-[#082028] p-4"
          >
            <div className="text-sm text-slate-400">
              {metric.label}
            </div>

            <div className="mt-2 text-2xl font-bold">
              {metric.score}
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}