import { repositorySearch } from "@/lib/founderSearch";
import {
  findNodeByTitle,
  findConnectedPapers,
} from "@/lib/graph";

export async function POST(req: Request) {
  const { query } = await req.json();

  const node = await findNodeByTitle(query);

  if (node) {
    const papers = await findConnectedPapers(node.id);

    if (papers.length) {
      return Response.json({
        results: papers.map((paper: any) => ({
          source: "Graph",
          title: paper.title,
          collection: node.title,
          priority: "connected",
        })),
      });
    }
  }

  const results = await repositorySearch(query);

  return Response.json({ results });
}