"use client";

import { useEffect, useState } from "react";

type GraphInspectorProps = {
  node: any;
};

export default function GraphInspector({ node }: GraphInspectorProps) {
  const semanticType = node?.data?.type;
  const displayTitle = node?.data?.label ?? node?.title;
  const [timeline, setTimeline] = useState<any[]>([]);

  const [objectData, setObjectData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!node || semanticType !== "paper") {
      setObjectData(null);
      return;
    }

    setLoading(true);

    fetch("/api/founder/object", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: node.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setObjectData(data);
        setNotes(data.notes || "");
        setSummary(data.summary || "");
        setTimeline(data.timeline?.timeline || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [node, semanticType]);

  async function saveResearchObject() {
    if (!objectData?.metadata?.emv_id) return;

    setSaving(true);
    setSaved(false);

    const response = await fetch("/api/founder/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  id: objectData.metadata.emv_id,
  notes,
  summary,
  timeline,
}),
    });

    setSaving(false);

    if (response.ok) {
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    }
  }

  if (!node) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#061426] p-6">
        <h2 className="text-xl font-bold">Knowledge Explorer</h2>
        <p className="mt-2 text-slate-400">
          Click a node to explore its Research Object.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#061426] p-6">

      <div className="mb-6">

        <div className="text-xs uppercase tracking-widest text-teal-300">
          {semanticType}
        </div>

        <h2 className="mt-2 text-2xl font-bold leading-tight">
          {displayTitle}
        </h2>

        <div className="mt-2 font-mono text-xs text-slate-400">
          {node.id}
        </div>

      </div>

      {loading && (
        <p className="text-slate-400">Loading Research Object...</p>
      )}

      {!loading && objectData?.metadata && (

        <div className="space-y-6">

          <div className="grid gap-4 text-sm">

            <div>
              <div className="text-slate-400">Collection</div>
              <div>{objectData.metadata.recommended_collection}</div>
            </div>

            <div>
              <div className="text-slate-400">Priority</div>
              <div className="capitalize">
                {objectData.metadata.priority}
              </div>
            </div>

            <div>
              <div className="text-slate-400">Score</div>
              <div>{objectData.metadata.score}</div>
            </div>

          </div>

          <div className="rounded-xl bg-[#081a1d] p-4">

            <div className="mb-2 text-xs uppercase text-slate-500">
              Founder Notes
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-32 w-full rounded-lg border border-slate-700 bg-[#05111d] p-3 text-sm text-slate-200 outline-none focus:border-teal-400"
            />

          </div>

          <div className="rounded-xl bg-[#081a1d] p-4">

            <div className="mb-2 text-xs uppercase text-slate-500">
              Summary
            </div>

            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="h-32 w-full rounded-lg border border-slate-700 bg-[#05111d] p-3 text-sm text-slate-200 outline-none focus:border-teal-400"
            />

          </div>

          <div className="rounded-xl bg-[#081a1d] p-4">

            <div className="mb-2 text-xs uppercase text-slate-500">
              Timeline
            </div>

            <div className="space-y-3">

  {timeline.length === 0 && (
    <div className="text-sm text-slate-400">
      No timeline events yet.
    </div>
  )}

  {timeline.map((event, index) => (

    <div
      key={index}
      className="rounded-lg border border-slate-700 bg-[#05111d] p-3 text-sm"
    >
      <div className="font-semibold">
        {event.event}
      </div>

      <div className="text-xs text-slate-400">
        {event.date}
      </div>

    </div>

  ))}

  <button
    onClick={() =>
      setTimeline([
        ...timeline,
        {
          event: "Founder updated notes",
          date: new Date().toISOString().split("T")[0],
        },
      ])
    }
    className="w-full rounded-lg border border-teal-500/30 bg-teal-500/10 py-2 text-sm text-teal-300 hover:bg-teal-500/20"
  >
    + Add Timeline Event
  </button>

</div>

          </div>

          <div className="space-y-3">

            <button
              onClick={saveResearchObject}
              disabled={saving}
              className="w-full rounded-xl bg-teal-500 px-4 py-3 font-semibold text-black transition hover:bg-teal-400 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {saved && (
              <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-3 text-sm text-teal-300">
                ✓ Research Object saved successfully.
              </div>
            )}

          </div>

        </div>

      )}

      {!loading && semanticType !== "paper" && (

        <div className="rounded-xl bg-[#081a1d] p-4 text-sm text-slate-300">
          This is a <strong>{semanticType}</strong> node.
          Repository-backed details currently exist for paper nodes.
        </div>

      )}

    </div>
  );
}