"use client";

import { useState } from "react";

type LogLine = {
  text: string;
  success: boolean;
};

export default function PublishButton() {

  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);

  async function publish() {

    setRunning(true);

    setLogs([
      {
        text: "Starting publishing pipeline...",
        success: true,
      },
    ]);

    const res = await fetch("/api/founder/publish", {
      method: "POST",
    });

    const data = await res.json();

    const output = data.output
      .split("\n")
      .filter((x: string) => x.trim());

    const formatted = output.map((line: string) => ({
      text: line,
      success:
        line.toLowerCase().includes("completed") ||
        line.toLowerCase().includes("generated") ||
        line.toLowerCase().includes("starting"),
    }));

    setLogs(formatted);

    setTimeout(() => {

      setRunning(false);

      location.reload();

    }, 2500);

  }

  return (

    <div className="space-y-3">

      <button
        onClick={publish}
        disabled={running}
        className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
      >

        {running
          ? "Publishing..."
          : "Generate AI Draft"}

      </button>

      {logs.length > 0 && (

        <div className="rounded-xl border border-slate-700 bg-[#04111b] p-3 font-mono text-xs">

          {logs.map((log, i) => (

            <div
              key={i}
              className={`mb-1 ${
                log.success
                  ? "text-green-300"
                  : "text-slate-300"
              }`}
            >
              {log.success ? "✓" : "•"} {log.text}
            </div>

          ))}

        </div>

      )}

    </div>

  );

}