
"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

type Props = {
  titles: {
    canonical: string;
    website: string;
    linkedin: string;
    x: string;
    newsletter: string;
    instagram: string;
  };
};

export default function TitleStudio({
  titles,
}: Props) {
  const [copied, setCopied] = useState("");

  async function copy(
    text: string,
    label: string
  ) {
    await navigator.clipboard.writeText(text);

    setCopied(label);

    setTimeout(() => setCopied(""), 1500);
  }

  const rows = [
    ["Canonical", titles.canonical],
    ["Website", titles.website],
    ["LinkedIn", titles.linkedin],
    ["X", titles.x],
    ["Newsletter", titles.newsletter],
    ["Instagram", titles.instagram],
  ];

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            AI Editorial Copilot
          </div>

          <h2 className="text-3xl font-bold">
            Title Optimizer
          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-3">

        {rows.map(([label,title])=>(
          <div
            key={label}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="text-sm text-teal-300">
                  {label}
                </div>

                <div className="mt-2 text-lg font-medium">
                  {title}
                </div>

              </div>

              <button
                onClick={() =>
                  copy(title as string,label)
                }
                className="rounded-lg border border-teal-500/20 p-2 hover:bg-teal-500/10"
              >
                {copied===label?(
                  <Check className="h-4 w-4 text-teal-300"/>
                ):(
                  <Copy className="h-4 w-4 text-slate-300"/>
                )}
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}