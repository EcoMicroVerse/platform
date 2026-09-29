"use client";

import {
  BookOpen,
  ExternalLink,
} from "lucide-react";

type Citation = {
  title?: string;
  authors?: string;
  journal?: string;
  year?: string | number;
  doi?: string;
};

type Props = {
  citation: Citation;
};

export default function CitationCard({
  citation,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#082028] p-5 transition hover:border-teal-500/30">

      <div className="flex items-start gap-3">

        <BookOpen className="mt-1 h-5 w-5 text-teal-300"/>

        <div className="flex-1">

          <h4 className="font-semibold leading-snug text-white">
            {citation.title ?? "Untitled Reference"}
          </h4>

          <div className="mt-2 text-sm text-slate-400">
            {citation.authors ?? "Unknown Authors"}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">

            <div className="mt-3 flex flex-wrap gap-2 text-xs">

  {citation.journal && (
    <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-teal-300">
      {citation.journal}
    </span>
  )}

  {citation.year && (
    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
      {citation.year}
    </span>
  )}

  {citation.doi && (
    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
      DOI Available
    </span>
  )}

</div>

            {citation.year && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                {citation.year}
              </span>
            )}

          </div>

          {citation.doi && (
            <a
              href={`https://doi.org/${citation.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200"
            >
              DOI: {citation.doi}
              <ExternalLink className="h-4 w-4"/>
            </a>
          )}

        </div>

      </div>

    </div>
  );
}