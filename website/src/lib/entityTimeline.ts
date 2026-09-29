
import { loadApproved } from "./dashboard";
import { loadGraph } from "./graph";
import { getEntityInfo } from "./entityIntelligence";

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  source: string;
};

export async function getEntityTimeline(
  name: string
) {
  const entity =
    await getEntityInfo(name);

  const approved =
    await loadApproved();

  const graph =
    await loadGraph();

  const timeline: TimelineEntry[] =
    [];

  // EcoMicroVerse appearances
  for (const article of approved) {
    const text =
      JSON.stringify(article);

    if (
      text
        .toLowerCase()
        .includes(name.toLowerCase())
    ) {
      timeline.push({
        year: "2026",
        title:
          article.title,
        description:
          "Referenced in an EcoMicroVerse Research Object.",
        source:
          "EcoMicroVerse",
      });
    }
  }

  // Graph relationships
  const connections =
    graph.edges.filter(
      (edge: any) =>
        edge.source === name ||
        edge.target === name ||
        edge.from === name ||
        edge.to === name
    );

  if (
    connections.length > 0
  ) {
    timeline.push({
      year: "2026",
      title:
        "Knowledge Graph Integration",
      description: `Connected to ${connections.length} scientific relationships.`,
      source:
        "Knowledge Graph",
    });
  }

  // Placeholder for future historical milestones
  if (entity) {
    timeline.push({
      year: "Future",
      title:
        "Historical scientific milestones",
      description:
        "This section will automatically include landmark papers and discoveries.",
      source:
        "Historical Timeline",
    });
  }

  return timeline.sort(
    (a, b) =>
      a.year.localeCompare(b.year)
  );
}