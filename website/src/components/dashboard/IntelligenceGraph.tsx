"use client";
import { useEffect, useState } from "react";
import { layoutGraph } from "@/lib/layoutGraph";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

import GraphNode from "./GraphNode";

const nodeTypes={
  graph:GraphNode,
};
const edgeTypes = {};

type GraphProps = {
  onSelectNode: (node: any) => void;
};

export default function IntelligenceGraph({
  onSelectNode,
}: GraphProps) {
  const [loaded, setLoaded] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    fetch("/graph/graph.json")
      .then((r) => r.json())
      .then((graph) => {
        const initialNodes = graph.nodes.map((node:any)=>({

  id:node.id,

  type: "graph",

  data:{
    label:node.title,
    type:node.type,
  },

  position:{x:0,y:0},

}));

const initialEdges = graph.edges.map((edge:any,index:number)=>({

  id:`e${index}`,

  source:edge.from,

  target:edge.to,

  label:edge.type,

  animated:true,

}));

setNodes(layoutGraph(initialNodes,initialEdges));

setEdges(initialEdges);

        setEdges(
          graph.edges.map((edge: any, index: number) => ({
            id: `e${index}`,
            source: edge.from,
            target: edge.to,
            label: edge.type,
            animated: true,
          }))
        );

        setLoaded(true);
      });
  }, [setNodes, setEdges]);

  if (!loaded) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#061426] p-6 text-teal-300">
        Loading Intelligence Graph...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#061426] p-4">
      <div className="mb-4">
  <h2 className="text-2xl font-bold text-white">
    Intelligence Graph
  </h2>

  <p className="text-sm text-slate-400">
    Live relationships across your Research Objects.
  </p>
</div>

      <div className="h-[520px] rounded-xl bg-[#081a1d]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => onSelectNode(node)}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}