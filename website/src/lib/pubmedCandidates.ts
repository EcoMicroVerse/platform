import { scanPubMed } from "./pubmedScanner";
import { scorePubMedArticle } from "./pubmedRelevance";
import {
  pubmedToCandidate,
  type ResearchCandidate,
} from "./researchCandidates";

export async function discoverPubMedCandidates(
  queries?: string[],
  retmax = 5
): Promise<ResearchCandidate[]> {
  const articles = await scanPubMed(
    queries,
    retmax
  );

  const candidates = await Promise.all(
    articles.map(async (article) => {
      const relevance =
        await scorePubMedArticle(article);

      return pubmedToCandidate(
        article,
        relevance
      );
    })
  );

  return candidates.sort(
    (a, b) =>
      b.relevanceScore -
      a.relevanceScore
  );
}