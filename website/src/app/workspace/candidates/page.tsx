import {
  getAllCandidateDecisions,
  type CandidateDecision,
} from "@/lib/candidateStore";

import {
  discoverPubMedCandidates,
} from "@/lib/pubmedCandidates";

import type {
  ResearchCandidate,
} from "@/lib/researchCandidates";

import {
  getAllArticles,
  type ArticleRecord,
} from "@/lib/articleStore";

import CandidateFilters from "./CandidateFilters";

function formatPublicationDate(
  date: string
): string {
  const match = date.match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  );

  if (!match) {
    return date;
  }

  const [, year, month, day] = match;

  return `${day}/${month}/${year}`;
}

export default async function CandidatesPage() {
  let candidates: ResearchCandidate[] = [];
  let decisions: Record<
    string,
    CandidateDecision
  > = {};
  let articles: ArticleRecord[] = [];
  let error: string | null = null;

  try {
    candidates =
      await discoverPubMedCandidates();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Unable to discover PubMed candidates.";
  }

  try {
    decisions =
      await getAllCandidateDecisions();
  } catch (err) {
    console.error(
      "Unable to load candidate decisions:",
      err
    );
  }

  try {
    articles =
      await getAllArticles();
  } catch (err) {
    console.error(
      "Unable to load article records:",
      err
    );
  }

  /**
   * Build a lookup table:
   *
   * candidate ID
   *      ↓
   * ArticleRecord
   *
   * This allows CandidateFilters/CandidateCard
   * to determine whether a candidate has already
   * been converted into an article.
   */
  const articlesByCandidateId: Record<
    string,
    ArticleRecord
  > = Object.fromEntries(
    articles
      .filter(
        (
          article
        ): article is ArticleRecord & {
          candidateId: string;
        } =>
          Boolean(article.candidateId)
      )
      .map((article) => [
        article.candidateId,
        article,
      ])
  );

  const highRelevanceCount =
    candidates.filter(
      (candidate) =>
        candidate.relevanceTier === "high"
    ).length;

  const detectedTopics =
    new Set(
      candidates.flatMap(
        (candidate) =>
          candidate.matchedTopics
      )
    ).size;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          EcoMicroVerse Editorial Workspace
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Research Candidates
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Newly discovered scientific literature
          identified by the EcoMicroVerse research
          intelligence engine.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium">
            Candidate discovery temporarily unavailable
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {error}
          </p>
        </div>
      )}

      {!error && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">
              Discovered
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {candidates.length}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">
              High relevance
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {highRelevanceCount}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">
              Topics detected
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {detectedTopics}
            </p>
          </div>
        </div>
      )}

      <CandidateFilters
        candidates={candidates}
        decisions={decisions}
        articles={articlesByCandidateId}
      />
    </main>
  );
}