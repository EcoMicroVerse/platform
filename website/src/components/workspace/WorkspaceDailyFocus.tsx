
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";

export default function WorkspaceDailyFocus() {
  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            AI Focus
          </div>

          <h3 className="text-2xl font-bold">
            Today's Opportunity
          </h3>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-[#082028] p-5">

        <div className="font-semibold">
          The plaque assay that transformed virology
        </div>

        <p className="mt-3 text-slate-300">
          This historical milestone laid the foundation for quantitative phage biology.
        </p>

        <EMVButton
          variant="ghost"
          className="mt-4 flex items-center gap-2"
        >

          Prepare Discovery

          <ArrowRight className="h-4 w-4"/>

        </EMVButton>

      </div>

    </EMVCard>
  );
}