
"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Link,
  FileText,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";

export default function SchedulerEditor() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Daily Discovery");

  async function save() {
    if (!title || !date) return;

    await fetch("/api/scheduler/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        date,
        type,
      }),
    });

    setTitle("");
    setDate("");
  }

  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center gap-3">

        <Plus className="h-6 w-6 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Scheduler
          </div>

          <h3 className="text-2xl font-bold">
            Quick Schedule
          </h3>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Discovery title"
          className="w-full rounded-xl border border-slate-700 bg-[#082028] p-3 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#082028] p-3 text-white"
        />

        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#082028] p-3 text-white"
        >
          <option>Daily Discovery</option>
          <option>Tool Spotlight</option>
          <option>Historical Milestone</option>
          <option>Research Object</option>
        </select>

      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">

        <EMVButton variant="secondary">
          <Link className="mr-2 h-4 w-4"/>

          Paste DOI
        </EMVButton>

        <EMVButton variant="secondary">
          <FileText className="mr-2 h-4 w-4"/>

          Paper Link
        </EMVButton>

        <EMVButton variant="secondary">
          <Calendar className="mr-2 h-4 w-4"/>

          AI Draft
        </EMVButton>

      </div>

      <EMVButton
        onClick={save}
        className="mt-6 w-full"
      >
        Add to Schedule
      </EMVButton>

    </EMVCard>
  );
}