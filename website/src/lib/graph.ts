import fs from "fs/promises";
import path from "path";
import * as yaml from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function loadGraph() {
  const nodes = yaml.load(
    await fs.readFile(
      path.join(ROOT, "content", "graph", "nodes.yml"),
      "utf8"
    )
  ) as any[];

  const edges = yaml.load(
    await fs.readFile(
      path.join(ROOT, "content", "graph", "edges.yml"),
      "utf8"
    )
  ) as any[];

  return { nodes, edges };
}

export async function findNodeByTitle(title: string) {
  const graph = await loadGraph();

  return graph.nodes.find(
    (node: any) =>
      node.title?.toLowerCase() === title.toLowerCase()
  );
}

export async function findConnectedPapers(nodeId: string) {
  const graph = await loadGraph();

  const paperIds = graph.edges
    .filter((edge: any) => edge.to === nodeId)
    .map((edge: any) => edge.from);

  return graph.nodes.filter(
    (node: any) =>
      node.type === "paper" &&
      paperIds.includes(node.id)
  );
}