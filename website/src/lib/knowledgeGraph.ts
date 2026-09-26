
import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function loadKnowledgeGraph() {
  const graphDir = path.join(ROOT, "content", "graph");

  const nodes = load(
    await fs.readFile(path.join(graphDir, "nodes.yml"), "utf8")
  ) as any[];

  const edges = load(
    await fs.readFile(path.join(graphDir, "edges.yml"), "utf8")
  ) as any[];

  const aliases = load(
    await fs.readFile(path.join(graphDir, "aliases.yml"), "utf8")
  ) as Record<string, string>;

  return {
    nodes,
    edges,
    aliases,
  };
}