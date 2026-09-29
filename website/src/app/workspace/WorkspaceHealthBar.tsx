
import {
  Inbox,
  FileCheck,
  Rocket,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";

type Props = {
  inbox: number;
  approved: number;
  jobs: number;
};

export default function WorkspaceHealthBar({
  inbox,
  approved,
  jobs,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <HealthCard
        icon={<Inbox className="h-5 w-5" />}
        label="Editorial Inbox"
        value={inbox}
      />

      <HealthCard
        icon={<FileCheck className="h-5 w-5" />}
        label="Approved"
        value={approved}
      />

      <HealthCard
        icon={<Rocket className="h-5 w-5" />}
        label="Publication Jobs"
        value={jobs}
      />

    </div>
  );
}

function HealthCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center gap-2 text-teal-300">
        {icon}
        {label}
      </div>

      <div className="mt-3 text-3xl font-bold">
        {value}
      </div>

    </EMVCard>
  );
}