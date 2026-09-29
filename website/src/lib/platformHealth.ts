import { loadSources } from "./sourceRegistry";
import { getAllEntities } from "./entityIntelligence";
import { loadGraph } from "./graph";

export async function loadPlatformHealth() {
  const sources = await loadSources();
  const entities = await getAllEntities();
  const graph = await loadGraph();

  return {
    sources: sources.length,
    entities: entities.length,
    graphNodes: graph.nodes.length,
    graphEdges: graph.edges.length,
  };
}