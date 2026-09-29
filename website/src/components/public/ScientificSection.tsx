
"use client";

import { useState } from "react";
import {
  Beaker,
  BarChart3,
  Lightbulb,
  TriangleAlert,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Props = {
  title: string;
  content: string;
  defaultOpen?: boolean;
};

const styles = {
  Methodology: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
    text: "text-sky-300",
    icon: Beaker,
  },
  Results: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-300",
    icon: BarChart3,
  },
  Discussion: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-300",
    icon: Lightbulb,
  },
  Limitations: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-300",
    icon: TriangleAlert,
  },
  "Future Work": {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    text: "text-cyan-300",
    icon: Compass,
  },
  "Key Takeaways": {
    border: "border-teal-500/30",
    bg: "bg-teal-500/5",
    text: "text-teal-300",
    icon: CheckCircle2,
  },
} as const;

export default function ScientificSection({
  title,
  content,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  if (!content.trim()) return null;

  const style =
    styles[title as keyof typeof styles] ?? styles["Discussion"];

  const Icon = style.icon;

  return (
    <section
      className={`overflow-hidden rounded-2xl border ${style.border} ${style.bg} transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5`}
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`rounded-xl p-2 ${style.bg}`}>
            <Icon className={`h-5 w-5 ${style.text}`} />
          </div>

          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {open ? (
          <ChevronUp className={`h-5 w-5 ${style.text}`} />
        ) : (
          <ChevronDown className={`h-5 w-5 ${style.text}`} />
        )}
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-800 p-6">
            {title === "Key Takeaways" ? (
              <div className="space-y-3">
                {content
                  .split("\n")
                  .filter(Boolean)
                  .map((line: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />

                      <span>{line.replace(/^-+\s*/, "")}</span>
                    </div>
                  ))}
              </div>
            ) : (
              <article className="prose prose-invert max-w-none whitespace-pre-wrap">
                {content}
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}