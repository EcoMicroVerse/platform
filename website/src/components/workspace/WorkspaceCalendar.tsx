
"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import CalendarEventCard from "./CalendarEventCard";

type Item = {
  date: string;
  type: string;
  status: string;
  title: string;
};

type Props = {
  queue: Item[];
};

const WEEK = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function WorkspaceCalendar({
  queue,
}: Props) {
  const today = new Date();

  const [month, setMonth] = useState(
    today.getMonth()
  );

  const [year, setYear] = useState(
    today.getFullYear()
  );

  const [selected, setSelected] =
    useState(today.toISOString().slice(0, 10));

  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  const monthName = firstDay.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const days = useMemo(() => {
    const result = [];

    const offset =
      (firstDay.getDay() + 6) % 7;

    for (let i = 0; i < offset; i++) {
      result.push(null);
    }

    for (
      let d = 1;
      d <= lastDay.getDate();
      d++
    ) {
      result.push(
        new Date(year, month, d)
      );
    }

    return result;
  }, [month, year]);

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const selectedItems = queue.filter(
    (q) => q.date === selected
  );

  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <CalendarDays className="h-6 w-6 text-teal-300"/>

          <div>

            <div className="text-xs uppercase tracking-widest text-teal-300">
              Editorial Calendar
            </div>

            <h3 className="text-2xl font-bold">
              {monthName} {year}
            </h3>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={previousMonth}
            className="rounded-lg border border-slate-700 p-2 hover:bg-[#082028]"
          >
            <ChevronLeft className="h-4 w-4"/>
          </button>

          <button
            onClick={nextMonth}
            className="rounded-lg border border-slate-700 p-2 hover:bg-[#082028]"
          >
            <ChevronRight className="h-4 w-4"/>
          </button>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-7 gap-2">

        {WEEK.map((day) => (

          <div
            key={day}
            className="text-center text-sm text-teal-300"
          >
            {day}
          </div>

        ))}

        {days.map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="h-24"
              />
            );
          }

          const iso = day
            .toISOString()
            .slice(0, 10);

          const items = queue.filter(
            (q) => q.date === iso
          );

          const isToday =
            iso ===
            today.toISOString().slice(0, 10);

          return (
            <button
              key={iso}
              onClick={() => setSelected(iso)}
              className={`min-h-[110px] rounded-xl border p-2 text-left transition ${
                selected === iso
                  ? "border-teal-400 bg-[#082028]"
                  : "border-slate-800 hover:border-teal-500/30 hover:bg-[#082028]"
              }`}
            >

              <div
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                  isToday
                    ? "bg-teal-500 text-[#07121f] font-bold"
                    : "text-white"
                }`}
              >
                {day.getDate()}
              </div>

              {items.slice(0, 2).map((item) => (
                <CalendarEventCard
                  key={item.title}
                  title={item.title}
                  type={item.type}
                />
              ))}

              {items.length > 2 && (
                <div className="mt-1 text-xs text-slate-400">
                  +{items.length - 2} more
                </div>
              )}

            </button>
          );
        })}

      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-[#082028] p-5">

        <div className="text-sm text-teal-300">
          Selected Day
        </div>

        <div className="mt-2 text-lg font-semibold">
          {selected}
        </div>

        <div className="mt-4 space-y-3">

          {selectedItems.length === 0 ? (

            <div className="text-slate-400">
              No scheduled content.
            </div>

          ) : (

            selectedItems.map((item) => (
              <CalendarEventCard
                key={item.title}
                title={item.title}
                type={item.type}
              />
            ))

          )}

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">

        <Legend
          color="bg-teal-500"
          label="Daily Discovery"
        />

        <Legend
          color="bg-blue-500"
          label="Tool Spotlight"
        />

        <Legend
          color="bg-amber-500"
          label="Historical Milestone"
        />

        <Legend
          color="bg-purple-500"
          label="Research Object"
        />

      </div>

    </EMVCard>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${color}`}
      />

      {label}
    </div>
  );
}