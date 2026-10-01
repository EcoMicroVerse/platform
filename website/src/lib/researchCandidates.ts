import type { PubMedArticle } from "./pubmedScanner";
import type {
  RelevanceResult,
  ViralContext,
  ResearchFocus,
} from "./pubmedRelevance";

export type EditorialPriority =
  | "high"
  | "medium"
  | "low"
  | "defer";

export type ResearchCandidate = {
  id: string;

  source: string;
  sourceId: string;

  title: string;
  abstract: string;

  journal: string;
  publicationDate: string;
  publicationDateType: PubMedArticle["publicationDateType"];

  authors: string[];

  doi?: string;
  url: string;

  matchedTopics: string[];
  matchedKeywords: string[];

  relevanceScore: number;
  relevanceTier: RelevanceResult["tier"];

  viralContext: ViralContext;
  viralEvidence: RelevanceResult["viralEvidence"];
  researchFocus: ResearchFocus;

  editorialPriority: EditorialPriority;

  status:
    | "discovered"
    | "reviewed"
    | "approved"
    | "rejected";
};

export function calculateEditorialPriority(
  relevanceScore: number,
  relevanceTier: RelevanceResult["tier"],
  researchFocus: ResearchFocus,
  viralEvidence: RelevanceResult["viralEvidence"],
  viralContext: ViralContext
): EditorialPriority {
  /*
   * Editorial priority is deliberately separate from
   * relevance scoring.
   *
   * Relevance answers:
   * "How closely does this publication match
   *  EcoMicroVerse's research scope?"
   *
   * Editorial priority answers:
   * "How much attention should this candidate
   *  receive in the editorial workflow?"
   *
   * The priority should therefore favour:
   *
   * 1. Strong relevance
   * 2. A research focus aligned with the platform
   * 3. Strong viral/phage evidence
   *
   * It should not imply scientific quality.
   */

  /*
   * Strongly aligned research focus with direct evidence.
   */
  const stronglyFocused =
    researchFocus === "prophage-focused" ||
    researchFocus === "phage-focused" ||
    researchFocus === "bacterial-virus-focused" ||
    researchFocus === "viral-ecology-focused";

  /*
   * High-priority candidates:
   *
   * - High relevance
   * - Strong research focus
   * - Direct or associated evidence
   */
  if (
  stronglyFocused &&
  viralEvidence === "direct" &&
  relevanceScore >= 15
) {
  return "high";
}

  /*
   * Also allow a very high numerical score to
   * surface strongly focused candidates even if
   * the tier boundary changes in the future.
   */

  /*
   * Medium priority:
   *
   * Strongly focused publications with meaningful
   * evidence, even when their overall relevance
   * score is not yet in the high tier.
   */
  if (
    stronglyFocused &&
    (
      viralEvidence === "direct" ||
      viralEvidence === "associated"
    ) &&
    (
      relevanceTier === "medium" ||
      relevanceTier === "high"
    )
  ) {
    return "medium";
  }

  /*
   * Microbial-context papers can be useful, but
   * they are not necessarily central phage/viral
   * papers.
   */
  if (
    researchFocus === "microbial-context" &&
    viralEvidence === "associated" &&
    relevanceScore >= 10
  ) {
    return "medium";
  }

  /*
   * Broader viral papers can remain useful when
   * their relevance is reasonably strong, but they
   * should not automatically become high priority.
   */
  if (
    researchFocus === "broader-viral" &&
    relevanceScore >= 10
  ) {
    return "medium";
  }

  /*
   * Low priority:
   *
   * Papers with some useful connection but limited
   * evidence or weaker alignment.
   */
  if (
    relevanceScore >= 4 &&
    viralEvidence !== "none"
  ) {
    return "low";
  }

  /*
   * Incidental or non-viral material should generally
   * remain available for later inspection rather than
   * occupying the active editorial queue.
   */
  if (
    viralEvidence === "incidental" ||
    viralContext === "broader-viral" ||
    viralContext === "non-viral"
  ) {
    return "defer";
  }

  /*
   * Default conservative behaviour.
   */
  return "defer";
}

export function pubmedToCandidate(
  article: PubMedArticle,
  relevance: RelevanceResult
): ResearchCandidate {
  const editorialPriority =
    calculateEditorialPriority(
      relevance.score,
      relevance.tier,
      relevance.researchFocus,
      relevance.viralEvidence,
      relevance.viralContext
    );

  return {
    id: `PUBMED_${article.pmid}`,

    source: "PubMed",
    sourceId: article.pmid,

    title: article.title,
    abstract: article.abstract,

    journal: article.journal,
    publicationDate: article.publicationDate,
    publicationDateType: article.publicationDateType,

    authors: article.authors,

    doi: article.doi,
    url: article.url,

    matchedTopics: relevance.topics.map(
      (topic) => topic.name
    ),

    matchedKeywords: relevance.matchedKeywords,

    relevanceScore: relevance.score,
    relevanceTier: relevance.tier,

    viralContext: relevance.viralContext,
    viralEvidence: relevance.viralEvidence,
    researchFocus: relevance.researchFocus,

    editorialPriority,

    status: "discovered",
  };
}