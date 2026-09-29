
"use client";

import {
  CheckCircle2,
  FilePen,
  Eye,
  Rocket,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";
import StatusBadge from "@/components/ui/StatusBadge";

type HistoryEvent = {
  stage: string;
  date: string;
  icon: "draft" | "review" | "approved" | "published";
};

type Props = {
  history: HistoryEvent[];
};

const ICONS = {
  draft: FilePen,
  review: Eye,
  approved: CheckCircle2,
  published: Rocket,
};

export default function PublicationHistory({
  history,
}: Props) {
  return (
    <EMVCard className="border-teal-500/20">
      <SectionHeader
        eyebrow="Research Object"
        title="Publication History"
        description="Track the editorial journey of this Research Object."
        icon={<Rocket className="h-6 w-6" />}
      />

      <div className="mt-5 flex flex-wrap gap-3">
        <StatusBadge label="Version 1.0" status="info" />
        <StatusBadge label="Editorial Edition" status="success" />
      </div>

      <div className="mt-8 space-y-6">
        {history.map((event, index) => {
          const Icon = ICONS[event.icon];

          return (
            <div key={index} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-teal-500/10 p-3">
                  <Icon className="h-5 w-5 text-teal-300" />
                </div>

                {index !== history.length - 1 && (
                  <div className="mt-2 h-full w-px bg-teal-500/20" />
                )}
              </div>

              <EMVCard className="flex-1 bg-[#082028]">
                <div className="font-semibold">{event.stage}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {event.date}
                </div>
              </EMVCard>
            </div>
          );
        })}
      </div>
    </EMVCard>
  );
}