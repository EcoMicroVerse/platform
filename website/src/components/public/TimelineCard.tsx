
"use client";

import {
  Calendar,
  Sparkles,
} from "lucide-react";

type Props = {
  event: {
    year?: string | number;
    title?: string;
    description?: string;
    category?: string;
  };
};

export default function TimelineCard({
  event,
}: Props) {
  return (
    <div className="relative pl-10">

      <div className="absolute left-3 top-0 bottom-0 w-px bg-teal-500/30"/>

      <div className="absolute left-0 top-5 h-6 w-6 rounded-full border-4 border-[#07121f] bg-teal-400"/>

      <div className="rounded-2xl border border-slate-800 bg-[#082028] p-5">

        <div className="flex flex-wrap items-center gap-3">

          <span className="flex items-center gap-2 text-sm text-teal-300">

            <Calendar className="h-4 w-4"/>

            {event.year ?? "Unknown"}

          </span>

          {event.category && (

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {event.category}
            </span>

          )}

        </div>

        <h3 className="mt-3 text-xl font-semibold">
          {event.title ?? "Untitled Event"}
        </h3>

        <p className="mt-3 text-slate-300">
          {event.description ?? ""}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-teal-300">

          <Sparkles className="h-4 w-4"/>

          Scientific milestone

        </div>

      </div>

    </div>
  );
}