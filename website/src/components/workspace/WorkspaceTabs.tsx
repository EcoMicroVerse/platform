
"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Rocket,
  CalendarDays,
  BrainCircuit,
  BarChart3,
  Settings,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "publishing", label: "Publishing", icon: Rocket },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

type Props = {
  onChange: (tab: string) => void;
};

export default function WorkspaceTabs({ onChange }: Props) {
  const [active, setActive] = useState("overview");

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="flex gap-3 rounded-2xl border border-teal-500/20 bg-[#061426] p-2 w-max min-w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab.id);
                onChange(tab.id);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition ${
                active === tab.id
                  ? "bg-teal-500 text-[#07121f]"
                  : "text-slate-300 hover:bg-[#082028]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}