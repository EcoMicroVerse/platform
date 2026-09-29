
import {
  Sunrise,
  Sparkles,
  Flame,
  Rocket,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import StatusBadge from "@/components/ui/StatusBadge";

type Props = {
  inbox: number;
  approved: number;
  scheduled: number;
};

export default function WorkspaceMorningBrief({
  inbox,
  approved,
  scheduled,
}: Props) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  const streak = Math.max(
    approved + scheduled,
    1
  );

  return (
    <EMVCard className="border-teal-500/20 bg-gradient-to-r from-[#082028] via-[#061426] to-[#082028]">

      <div className="flex items-start justify-between gap-6">

        <div>

          <div className="flex items-center gap-2 text-teal-300">

            <Sunrise className="h-5 w-5"/>

            {greeting}

          </div>

          <h2 className="mt-3 text-3xl font-bold">
            Welcome to Mission Control
          </h2>

          <p className="mt-3 max-w-2xl text-slate-300">
            Your editorial workspace is ready. Here's what deserves attention today.
          </p>

        </div>

        <StatusBadge
          label="Launch Candidate"
          status="success"
        />

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <BriefCard
          icon={<Sparkles className="h-5 w-5"/>}
          title="Review"
          value={`${inbox} pending`}
        />

        <BriefCard
          icon={<Rocket className="h-5 w-5"/>}
          title="Approved"
          value={String(approved)}
        />

        <BriefCard
          icon={<Flame className="h-5 w-5"/>}
          title="Scheduled"
          value={String(scheduled)}
        />

        <BriefCard
          icon={<Sunrise className="h-5 w-5"/>}
          title="Publishing Streak"
          value={`${streak} days`}
        />

      </div>

    </EMVCard>
  );
}

function BriefCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-teal-500/20 bg-[#082028] p-4">

      <div className="flex items-center gap-2 text-teal-300">

        {icon}

        <span className="text-sm">{title}</span>

      </div>

      <div className="mt-3 text-2xl font-bold">

        {value}

      </div>

    </div>
  );
}