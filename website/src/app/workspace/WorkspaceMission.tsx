
import {
  Target,
  Sparkles,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";

type Props = {
  inbox: number;
  approved: number;
};

export default function WorkspaceMission({
  inbox,
  approved,
}: Props) {
  let mission =
    "Everything looks healthy.";

  if (inbox > 0)
    mission = `Review ${inbox} pending Research Objects.`;

  else if (approved > 0)
    mission = `Publish ${approved} approved Research Objects.`;

  return (
    <EMVCard className="border-teal-500/20 bg-gradient-to-r from-[#082028] to-[#061426]">

      <div className="flex items-center gap-3">

        <Target className="h-7 w-7 text-teal-300" />

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Today's Mission
          </div>

          <h2 className="text-2xl font-bold">
            Mission Control
          </h2>

        </div>

      </div>

      <div className="mt-6 flex items-start gap-3">

        <Sparkles className="mt-1 h-5 w-5 text-teal-300" />

        <p className="text-slate-300">
          {mission}
        </p>

      </div>

    </EMVCard>
  );
}