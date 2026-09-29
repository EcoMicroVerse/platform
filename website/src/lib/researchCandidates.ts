import type { PubMedArticle } from "./pubmedScanner";
import type { RelevanceResult } from "./pubmedRelevance";

export type ResearchCandidate = {
  id: string;

  source: string;
  sourceId: string;

  title: string;
  abstract: string;

  journal: string;
  publicationDate: string;

  authors: string[];

  doi?: string;
  url: string;

  matchedTopics: string[];
  matchedKeywords: string[];

  relevanceScore: number;
  relevanceTier: RelevanceResult["tier"];

  status:
    | "discovered"
    | "reviewed"
    | "approved"
    | "rejected";
};

export function pubmedToCandidate(
  article: PubMedArticle,
  relevance: RelevanceResult
): ResearchCandidate {
  return {
    id: `PUBMED_${article.pmid}`,

    source: "PubMed",
    sourceId: article.pmid,

    title: article.title,
    abstract: article.abstract,

    journal: article.journal,
    publicationDate: article.publicationDate,

    authors: article.authors,

    doi: article.doi,
    url: article.url,

    matchedTopics: relevance.topics.map(
      (topic) => topic.name
    ),

    matchedKeywords: relevance.matchedKeywords,

    relevanceScore: relevance.score,
    relevanceTier: relevance.tier,

    status: "discovered",
  };
}