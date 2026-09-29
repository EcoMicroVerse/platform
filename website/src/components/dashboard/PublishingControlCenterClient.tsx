
"use client";

import { useState } from "react";

type Props = {
  queue: number;
  published: number;
};

export default function PublishingControlCenterClient({
  queue,
  published,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function publishNow() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/publish/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `EMV-${Date.now()}`,
          title: "Founder Publication Job",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Publication Job created: ${data.job.id}`);
      } else {
        setMessage("Failed to create publication job.");
      }
    } catch {
      setMessage("Unable to reach publishing service.");
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Editorial Command Center
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Autonomous Publishing
      </h2>

      <p className="mt-3 text-slate-400">
        Create publication jobs before enabling live platform integrations.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
          <div className="text-sm text-slate-400">
            Ready to Publish
          </div>

          <div className="mt-2 text-4xl font-bold">
            {queue}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
          <div className="text-sm text-slate-400">
            Published
          </div>

          <div className="mt-2 text-4xl font-bold">
            {published}
          </div>
        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <button
          onClick={publishNow}
          disabled={loading}
          className="rounded-xl border border-teal-500 bg-teal-500/10 p-5 text-left transition hover:bg-teal-500/20 disabled:opacity-50"
        >
          <div className="font-semibold">
            {loading ? "Creating..." : "Publish Now"}
          </div>

          <div className="mt-2 text-sm text-slate-300">
            Create a real publication job.
          </div>
        </button>

        <button
          disabled
          className="rounded-xl border border-slate-700 bg-[#082028] p-5 text-left opacity-70"
        >
          <div className="font-semibold">
            Schedule
          </div>

          <div className="mt-2 text-sm text-slate-300">
            Coming in v3.0
          </div>
        </button>

      </div>

      {message && (
        <div className="mt-6 rounded-xl border border-teal-500/30 bg-teal-500/10 p-4 text-sm text-teal-200">
          {message}
        </div>
      )}

    </section>
  );
}