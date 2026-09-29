
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";

type Suggestion = {
  title: string;
  reason: string;
};

const suggestions: Suggestion[] = [
  {
    title: "The plaque that changed virology forever",
    reason: "Historical anniversary",
  },
  {
    title: "PHASTER's impact on prophage discovery",
    reason: "Tool Spotlight",
  },
  {
    title: "Lake Washington methane discoveries",
    reason: "Related Research Object",
  },
];

export default function WorkspaceAISuggestions() {
  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            AI Assistant
          </div>

          <h3 className="text-2xl font-bold">
            Suggested Discoveries
          </h3>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        {suggestions.map((item) => (

          <div
            key={item.title}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >

            <div className="font-semibold">
              {item.title}
            </div>

            <div className="mt-2 text-sm text-slate-400">
              {item.reason}
            </div>

            <EMVButton
              variant="ghost"
              className="mt-4 flex items-center gap-2"
            >
              Review Draft

              <ArrowRight className="h-4 w-4"/>

            </EMVButton>

          </div>

        ))}

      </div>

    </EMVCard>
  );
}