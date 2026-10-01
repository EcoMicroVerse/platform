import { scanPubMed } from "./pubmedScanner";
import { scorePubMedArticle } from "./pubmedRelevance";
import {
  pubmedToCandidate,
  type ResearchCandidate,
} from "./researchCandidates";

function deduplicatePubMedArticles<T extends { pmid: string }>(
  articles: T[]
): T[] {
  const seen = new Set<string>();
  const unique: T[] = [];

  for (const article of articles) {
    if (seen.has(article.pmid)) {
      continue;
    }

    seen.add(article.pmid);
    unique.push(article);
  }

  return unique;
}

export async function discoverPubMedCandidates(
  queries?: string[],
  retmax = 5
): Promise<ResearchCandidate[]> {
  const articles = await scanPubMed(
    queries,
    retmax
  );

  const uniqueArticles =
    deduplicatePubMedArticles(articles);

  const candidates = await Promise.all(
    uniqueArticles.map(async (article) => {
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
