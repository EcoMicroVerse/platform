"use client";

import { useMemo, useState } from "react";

import KnowledgeGraph from "./KnowledgeGraph";
import EntityPanel from "./EntityPanel";

type Props = {
  graph: {
    nodes: any[];
    edges: any[];
  };
  entities: any[];
};

export default function GraphExplorer({
  graph,
  entities,
}: Props) {
  const [selectedId, setSelectedId] = useState("");

  const selected = useMemo(
    () =>
      entities.find(
        (entity) => entity.name === selectedId
      ) ?? null,
    [selectedId, entities]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

      <KnowledgeGraph
        nodes={graph.nodes}
        edges={graph.edges}
        onSelect={setSelectedId}
      />

      <EntityPanel entity={selected}/>

    </div>
  );
}