"use client";

import {
  Search,
  CircleCheck,
  Newspaper,
  Download,
  Check,
} from "lucide-react";
import { useState } from "react";

import PublishButton from "./PublishButton";
import StatusPill from "./StatusPill";

function StatusDot({
  color,
}: {
  color: "green" | "yellow" | "gray";
}) {
  const colours = {
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    gray: "bg-slate-500",
  };

  return (
    <span className={`h-2.5 w-2.5 rounded-full ${colours[color]}`} />
  );
}

export default function QuickActions({
  status,
}: {
  status: {
    scannerToday: boolean;
    pendingReview: number;
    weeklyPulse: boolean;
    dashboardReady: boolean;
  };
}) {
  const [copied, setCopied] = useState("");

  function copyCommand(id: string, command: string) {
    navigator.clipboard.writeText(command);
    setCopied(id);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-[#061426] p-6 backdrop-blur">

      {/* Header */}

      <div className="mb-5">

        <h2 className="text-xl font-bold text-white">
          Editorial Control Centre
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Editorial workflow shortcuts and live publishing status.
        </p>

      </div>

      {/* Live Status Row */}

      <div className="mb-6 flex flex-wrap gap-3">

        <StatusPill
          label="Scanner Ready"
          status="green"
        />

        <StatusPill
          label="Repository Synced"
          status="green"
        />

        <StatusPill
          label={
            status.pendingReview > 0
              ? `${status.pendingReview} Drafts Pending`
              : "No Drafts Pending"
          }
          status={
            status.pendingReview > 0
              ? "yellow"
              : "green"
          }
        />

      </div>

      {/* Action Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {/* Run Scanner */}

        <button
          onClick={() =>
            copyCommand(
              "scanner",
              "cd automation/source_scanner && python scanner.py"
            )
          }
          className="group rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left transition hover:border-teal-500/40 hover:bg-slate-800"
        >

          <Search className="mb-4 h-8 w-8 text-teal-300" />

          <h3 className="font-semibold text-white">
            Run Scanner
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Discover new papers
          </p>

          <div className="mt-3 flex items-center gap-2">

            <StatusDot
              color={status.scannerToday ? "green" : "gray"}
            />

            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-300">
              {status.scannerToday
                ? "Completed today"
                : "Not run"}
            </span>

          </div>

          <div className="mt-4 text-xs text-teal-300">

            {copied === "scanner"
              ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Command copied
                </span>
              )
              : "Copy command"}

          </div>

        </button>

        {/* Founder Review */}

        <button
          onClick={() =>
            copyCommand(
              "review",
              "cd automation/founder_review && python review.py"
            )
          }
          className="group rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left transition hover:border-teal-500/40 hover:bg-slate-800"
        >

          <CircleCheck className="mb-4 h-8 w-8 text-teal-300" />

          <h3 className="font-semibold text-white">
            Founder Review
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Approve Research Objects
          </p>

          <div className="mt-3 flex items-center gap-2">

            <StatusDot
              color={
                status.pendingReview > 0
                  ? "yellow"
                  : "green"
              }
            />

            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
              {status.pendingReview} Pending
            </span>

          </div>

          <div className="mt-4 text-xs text-teal-300">

            {copied === "review"
              ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Command copied
                </span>
              )
              : "Copy command"}

          </div>

        </button>

        {/* AI Draft Generator */}

        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-5">

          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">

            ✨

          </div>

          <h3 className="font-semibold text-white">
            AI Draft Generator
          </h3>

          <p className="mt-1 mb-4 text-sm text-slate-400">
            Generate a complete editorial package.
          </p>

          <PublishButton />

        </div>

        {/* Weekly Pulse */}

        <button
          onClick={() =>
            copyCommand(
              "pulse",
              "python automation/weekly_pulse/generate.py"
            )
          }
          className="group rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left transition hover:border-teal-500/40 hover:bg-slate-800"
        >

          <Newspaper className="mb-4 h-8 w-8 text-teal-300" />

          <h3 className="font-semibold text-white">
            Weekly Pulse
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Generate editorial report
          </p>

          <div className="mt-3 flex items-center gap-2">

            <StatusDot
              color={status.weeklyPulse ? "green" : "gray"}
            />

            <span className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs text-slate-300">
              {status.weeklyPulse
                ? "Generated"
                : "Pending"}
            </span>

          </div>

          <div className="mt-4 text-xs text-teal-300">

            {copied === "pulse"
              ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Command copied
                </span>
              )
              : "Copy command"}

          </div>

        </button>

        {/* Export Dashboard */}

        <button
          onClick={() =>
            copyCommand(
              "export",
              "python automation/export_dashboard/export_dashboard.py"
            )
          }
          className="group rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left transition hover:border-teal-500/40 hover:bg-slate-800"
        >

          <Download className="mb-4 h-8 w-8 text-teal-300" />

          <h3 className="font-semibold text-white">
            Export Dashboard
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Refresh public dashboard
          </p>

          <div className="mt-3 flex items-center gap-2">

            <StatusDot
              color={status.dashboardReady ? "green" : "gray"}
            />

            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-300">
              {status.dashboardReady
                ? "Synced"
                : "Needs export"}
            </span>

          </div>

          <div className="mt-4 text-xs text-teal-300">

            {copied === "export"
              ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Command copied
                </span>
              )
              : "Copy command"}

          </div>

        </button>

      </div>

    </section>
  );
}