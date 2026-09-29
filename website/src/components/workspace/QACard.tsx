
import {
  CircleCheck,
  CircleAlert,
  CircleX,
} from "lucide-react";

type Props = {
  title: string;
  status: string;
  detail: string;
};

export default function QACard({
  title,
  status,
  detail,
}: Props) {
  const config = {
    pass: {
      icon: CircleCheck,
      color: "text-green-400",
      border: "border-green-500/20",
      bg: "bg-green-500/5",
      label: "Healthy",
    },
    warn: {
      icon: CircleAlert,
      color: "text-yellow-400",
      border: "border-yellow-500/20",
      bg: "bg-yellow-500/5",
      label: "Needs attention",
    },
    fail: {
      icon: CircleX,
      color: "text-red-400",
      border: "border-red-500/20",
      bg: "bg-red-500/5",
      label: "Failed",
    },
  }[status as "pass" | "warn" | "fail"];

  const Icon = config.icon;

  return (
    <div
      className={`rounded-2xl border ${config.border} ${config.bg} p-6`}
    >
      <div className="flex items-center justify-between">

        <div>

          <div className="text-sm text-slate-400">
            {title}
          </div>

          <div className="mt-1 text-lg font-semibold">
            {config.label}
          </div>

        </div>

        <Icon className={`h-7 w-7 ${config.color}`}/>

      </div>

      <p className="mt-4 text-sm text-slate-300">
        {detail}
      </p>

    </div>
  );
}