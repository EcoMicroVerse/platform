import { loadYaml } from "./registryManager";

type GraphNode = {
  id: string;
  title?: string;
  label?: string;
  type?: string;

  data?: {
    label?: string;
    [key: string]: unknown;
  };

  position?: {
    x: number;
    y: number;
  };

  [key: string]: unknown;
};

type GraphEdge = {
  id?: string;
  source?: string;
  target?: string;
  from?: string;
  to?: string;

  [key: string]: unknown;
};

export async function loadGraph() {
  const rawNodes = await loadYaml<GraphNode[]>(
    "content/graph/nodes.yml",
    []
  );

  const rawEdges = await loadYaml<GraphEdge[]>(
    "content/graph/edges.yml",
    []
  );

  /*
   * React Flow requires every node to have
   * a valid position.
   *
   * If positions are missing from YAML,
   * generate safe fallback positions.
   */

  const columns = 4;
  const spacingX = 260;
  const spacingY = 180;

  const nodes = rawNodes.map((node, index) => {
    const existingPosition =
      node.position &&
      typeof node.position.x === "number" &&
      typeof node.position.y === "number"
        ? node.position
        : null;

    const fallbackPosition = {
      x: (index % columns) * spacingX,
      y: Math.floor(index / columns) * spacingY,
    };

    return {
      ...node,

      id: String(node.id),

      data: {
        ...(node.data ?? {}),

        label:
          node.data?.label ??
          node.title ??
          node.label ??
          String(node.id),
      },

      position:
        existingPosition ??
        fallbackPosition,
    };
  });

  /*
   * Convert from/to representation into
   * React Flow source/target representation.
   *
   * Original from/to fields are preserved.
   */

  const edges = rawEdges.map((edge, index) => ({
    ...edge,

    id:
      edge.id ??
      `${edge.from ?? edge.source}-${edge.to ?? edge.target}-${index}`,

    source: String(
      edge.source ??
      edge.from ??
      ""
    ),

    target: String(
      edge.target ??
      edge.to ??
      ""
    ),
  }));

  return {
    nodes,
    edges,
  };
}

export async function findNodeByTitle(
  title: string
) {
  const graph = await loadGraph();

  return graph.nodes.find(
    (node: GraphNode) =>
      node.title?.toLowerCase() ===
      title.toLowerCase()
  );
}

export async function findConnectedPapers(
  nodeId: string
) {
  const graph = await loadGraph();

  const paperIds = graph.edges
    .filter(
      (edge: GraphEdge) =>
        edge.target === nodeId ||
        edge.to === nodeId
    )
    .map(
      (edge: GraphEdge) =>
        edge.source ??
        edge.from
    )
    .filter(
      (id): id is string =>
        typeof id === "string"
    );

  return graph.nodes.filter(
    (node: GraphNode) =>
      node.type === "paper" &&
      paperIds.includes(node.id)
  );
}