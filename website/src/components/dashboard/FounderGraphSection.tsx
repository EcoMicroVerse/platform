"use client";

import { useState } from "react";

import IntelligenceGraph from "./IntelligenceGraph";
import GraphInspector from "./GraphInspector";

export default function FounderGraphSection() {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
      <IntelligenceGraph onSelectNode={setSelectedNode} />
      <GraphInspector node={selectedNode} />
    </div>
  );
}