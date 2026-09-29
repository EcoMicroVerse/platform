import { loadApproved } from "./dashboard";
import { loadGraph } from "./graph";

export async function getEntityInsights(
  entityName: string
) {
  const approved =
    await loadApproved();

  const graph =
    await loadGraph();

  const articles = approved.filter(
    (article: any) =>
      JSON.stringify(article)
        .toLowerCase()
        .includes(entityName.toLowerCase())
  );

  const connections =
    graph.edges.filter(
      (edge: any) =>
        edge.source === entityName ||
        edge.target === entityName ||
        edge.from === entityName ||
        edge.to === entityName
    );

  return {
    articleCount: articles.length,
    connectionCount:
      connections.length,
    articles: articles
      .slice(0, 3)
      .map((article: any) => ({
        id:
          article.emv_id ??
          article.id,
        title: article.title,
      })),
  };
}