
"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import EntityDrawer from "./EntityDrawer";

type NodeType = {
  id: string;
  label: string;
  type: string;
};

type LinkType = {
  source: string;
  target: string;
  relation: string;
};

type Props = {
  nodes: NodeType[];
  links: LinkType[];
};

export default function KnowledgeGraph({
  nodes,
  links,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] =
  useState<NodeType | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 900;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const root = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g");

    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 3])
        .on("zoom", (event) => {
          root.attr("transform", event.transform);
        })
    );

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links as any)
          .id((d: any) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(38));

    const link = root
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#1fb8a6")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2);

    const node = root
  .append("g")
  .selectAll<SVGGElement, NodeType>("g")
  .data(nodes)
  .join("g");

node.call(
  d3
    .drag<SVGGElement, NodeType>()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
);

    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#1dd3c5")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2);

    node
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 36)
      .attr("fill", "#ffffff")
      .style("font-size", "12px");

    node
  .style("cursor", "pointer")
  .on("click", (_, d) => {
    setSelectedNode(d);
  })
  .on("mouseover", function () {
    d3.select(this)
      .select("circle")
      .transition()
      .duration(150)
      .attr("r", 24)
      .attr("fill", "#35f2e2");
  })
  .on("mouseout", function () {
    d3.select(this)
      .select("circle")
      .transition()
      .duration(150)
      .attr("r", 20)
      .attr("fill", "#1dd3c5");
  });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr(
        "transform",
        (d: any) => `translate(${d.x},${d.y})`
      );
    });

    function dragstarted(
  event: d3.D3DragEvent<SVGGElement, NodeType, NodeType>,
  d: any
) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

    function dragged(
  event: d3.D3DragEvent<SVGGElement, NodeType, NodeType>,
  d: any
) {
  d.fx = event.x;
  d.fy = event.y;
}

    function dragended(
  event: d3.D3DragEvent<SVGGElement, NodeType, NodeType>,
  d: any
) {
  if (!event.active) simulation.alphaTarget(0);

  d.fx = null;
  d.fy = null;
}

    return () => {
  simulation.stop();
};
  }, [nodes, links]);

  return (
  <>
    <div className="rounded-3xl border border-teal-500/20 bg-[#061426] p-4">
      <svg
        ref={svgRef}
        className="w-full"
        style={{ height: "620px" }}
      />
    </div>

    <EntityDrawer
      node={selectedNode}
      edges={links}
      onClose={() => setSelectedNode(null)}
    />
  </>
);
}