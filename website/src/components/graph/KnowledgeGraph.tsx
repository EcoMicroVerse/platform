
"use client";

import "@xyflow/react/dist/style.css";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import { useEffect } from "react";

type Props = {
  nodes: any[];
  edges: any[];
  onSelect?: (id: string) => void;
};

export default function KnowledgeGraph({
  nodes,
  edges,
  onSelect,
}: Props) {
  const [graphNodes, setNodes, onNodesChange] =
    useNodesState(nodes);

  const [graphEdges, setEdges, onEdgesChange] =
    useEdgesState(edges);

  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  return (
    <div className="h-[720px] rounded-3xl border border-teal-500/20 bg-[#061426]">

      <ReactFlow
        nodes={graphNodes}
        edges={graphEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={(_, node) =>
          onSelect?.(node.id)
        }
      >

        <Background gap={24} size={1}/>

        <MiniMap/>

        <Controls/>

      </ReactFlow>

    </div>
  );
}