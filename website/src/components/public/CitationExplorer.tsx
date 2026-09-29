
"use client";

import { useState } from "react";
import {
  Search,
  BookMarked,
} from "lucide-react";

import CitationCard from "./CitationCard";
import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";

type Props = {
  citations: any[];
};

export default function CitationExplorer({
  citations,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = citations.filter((citation) =>
    JSON.stringify(citation)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <EMVCard className="border-teal-500/20">
      <SectionHeader
        eyebrow="Research Object"
        title="Citation Explorer"
        description="Search and browse references for this Research Object."
        icon={<BookMarked className="h-6 w-6" />}
      />

      <div className="relative mt-8">
        <Search className="absolute left-4 top-3 h-5 w-5 text-slate-500" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search citations..."
          className="w-full rounded-xl border border-slate-700 bg-[#082028] py-3 pl-12 pr-4 text-white outline-none focus:border-teal-500"
        />
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 ? (
          <EMVCard className="bg-[#082028] text-center text-slate-400">
            No matching citations found.
          </EMVCard>
        ) : (
          filtered.map((citation, index) => (
            <CitationCard
              key={index}
              citation={citation}
            />
          ))
        )}
      </div>
    </EMVCard>
  );
}