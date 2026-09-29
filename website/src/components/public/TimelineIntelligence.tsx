
"use client";

import { Clock3 } from "lucide-react";
import TimelineCard from "./TimelineCard";
import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";

type TimelineEvent = {
  year?: string | number;
  title?: string;
  description?: string;
  category?: string;
};

type Props = {
  events: TimelineEvent[];
};

export default function TimelineIntelligence({
  events,
}: Props) {
  const sorted = [...events].sort((a, b) => {
    const ay = Number(a.year ?? 0);
    const by = Number(b.year ?? 0);
    return ay - by;
  });

  const firstYear = sorted[0]?.year ?? "—";
  const latestYear = sorted[sorted.length - 1]?.year ?? "—";

  return (
    <EMVCard className="border-teal-500/20">
      <SectionHeader
        eyebrow="Research Object"
        title="Timeline Intelligence"
        description="Explore the chronology of discoveries and milestones."
        icon={<Clock3 className="h-6 w-6" />}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Events" value={String(sorted.length)} />
        <StatCard label="First" value={String(firstYear)} />
        <StatCard label="Latest" value={String(latestYear)} />
      </div>

      <div className="mt-8 space-y-8">
        {sorted.length === 0 ? (
          <EMVCard className="bg-[#082028] text-center text-slate-400">
            No timeline events available.
          </EMVCard>
        ) : (
          sorted.map((event, index) => (
            <TimelineCard key={index} event={event} />
          ))
        )}
      </div>
    </EMVCard>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <EMVCard className="bg-[#082028] p-4 text-center">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-bold text-teal-300">
        {value}
      </div>
    </EMVCard>
  );
}