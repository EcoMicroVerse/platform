
"use client";

import {
  FileText,
  Network,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Props = {
  article: {
    title: string;
    collection: string;
    score: number;
  };
};

export default function EditorialWorkspace({
  article,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Editorial Workspace
          </div>

          <h2 className="text-3xl font-bold">
            Research Object Workspace
          </h2>

        </div>

      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">

        <div className="rounded-2xl border border-slate-800 bg-[#082028] p-6">

          <div className="text-sm text-slate-400">
            Active Research Object
          </div>

          <h3 className="mt-3 text-2xl font-bold leading-snug">
            {article.title}
          </h3>

          <div className="mt-6 flex flex-wrap gap-3">

            <span className="rounded-full bg-teal-500/10 px-3 py-2 text-sm text-teal-300">
              {article.collection}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300">
              Editorial Score {article.score}
            </span>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#061426] p-4">

              <div className="flex items-center gap-3">

                <FileText className="h-5 w-5 text-teal-300"/>

                <div>

                  <div className="font-medium">
                    Research Object
                  </div>

                  <div className="text-sm text-slate-400">
                    Scientific content
                  </div>

                </div>

              </div>

              <ArrowRight className="h-4 w-4 text-slate-500"/>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#061426] p-4">

              <div className="flex items-center gap-3">

                <Network className="h-5 w-5 text-teal-300"/>

                <div>

                  <div className="font-medium">
                    Knowledge Graph
                  </div>

                  <div className="text-sm text-slate-400">
                    Connected entities
                  </div>

                </div>

              </div>

              <ArrowRight className="h-4 w-4 text-slate-500"/>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#061426] p-4">

              <div className="flex items-center gap-3">

                <Calendar className="h-5 w-5 text-teal-300"/>

                <div>

                  <div className="font-medium">
                    Timeline
                  </div>

                  <div className="text-sm text-slate-400">
                    Scientific chronology
                  </div>

                </div>

              </div>

              <ArrowRight className="h-4 w-4 text-slate-500"/>

            </div>

          </div>

        </div>

        <div className="space-y-5">

          <div className="rounded-2xl border border-teal-500/20 bg-[#082028] p-6">

            <div className="text-sm text-slate-400">
              Workspace Status
            </div>

            <div className="mt-3 text-4xl font-bold text-teal-300">
              Ready
            </div>

            <div className="mt-2 text-sm text-slate-400">
              Editorial workflow synchronized
            </div>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#082028] p-6">

            <div className="text-sm text-slate-400">
              Connected Assets
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#061426] p-4 text-center">
                <div className="text-2xl font-bold text-teal-300">
                  6
                </div>
                <div className="text-xs text-slate-400">
                  Panels
                </div>
              </div>

              <div className="rounded-xl bg-[#061426] p-4 text-center">
                <div className="text-2xl font-bold text-teal-300">
                  ✓
                </div>
                <div className="text-xs text-slate-400">
                  AI Ready
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}