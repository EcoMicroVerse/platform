
"use client";

import { X, Network, BookOpen, ArrowRightCircle } from "lucide-react";
import Link from "next/link";

type NodeType = {
  id: string;
  label: string;
  type: string;
};

type EdgeType = {
  source: any;
  target: any;
  relation: string;
};

type Props = {
  node: NodeType | null;
  edges: EdgeType[];
  onClose: () => void;
};

export default function EntityDrawer({
  node,
  edges,
  onClose,
}: Props) {
  if (!node) return null;

  const connected = edges.filter((edge: any) => {
    const source =
      typeof edge.source === "string"
        ? edge.source
        : edge.source.id;

    const target =
      typeof edge.target === "string"
        ? edge.target
        : edge.target.id;

    return source === node.id || target === node.id;
  });

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-[380px] border-l border-teal-500/20 bg-[#07121f] shadow-2xl">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-teal-300">
              {node.type}
            </div>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {node.label}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <section>
            <div className="mb-3 flex items-center gap-2 text-teal-300">
              <Network className="h-5 w-5" />
              <span className="font-medium">Connections</span>
            </div>

            <div className="space-y-3">
              {connected.length === 0 ? (
                <div className="text-sm text-slate-500">
                  No connections yet.
                </div>
              ) : (
                connected.map((edge, index) => {
                  const source =
                    typeof edge.source === "string"
                      ? edge.source
                      : edge.source.label;

                  const target =
                    typeof edge.target === "string"
                      ? edge.target
                      : edge.target.label;

                  const other =
                    source === node.id ? target : source;

                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-800 bg-[#061426] p-3"
                    >
                      <div className="text-sm font-medium text-white">
                        {other}
                      </div>

                      <div className="mt-1 text-xs text-teal-300">
                        {edge.relation}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2 text-teal-300">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Research Objects</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#061426] p-4">
              <div className="text-sm text-slate-300">
                Future versions will automatically list every
                Research Object connected to this entity.
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-slate-800 p-6">
          <Link
            href="/search"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
          >
            <ArrowRightCircle className="h-4 w-4" />
            Explore Related Research
          </Link>
        </div>
      </div>
    </div>
  );
}