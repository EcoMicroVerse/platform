"use client";

import { useEffect, useState } from "react";
import type { CandidateDecision } from "@/lib/candidateStore";
import type { ArticleRecord } from "@/lib/articleStore";
import type { ResearchCandidate } from "@/lib/researchCandidates";
import {
  createArticleDraft,
  getCandidateArticleStatus,
  updateCandidateStatus,
  type ArticleCollection,
} from "@/app/workspace/candidates/candidateActions";

type CandidateCardProps = {
  candidate: ResearchCandidate;
  decision?: CandidateDecision;
  article?: ArticleRecord;
  canReviewCandidates: boolean;
  canReadArticles: boolean;
  canCreateArticles: boolean;
};

function formatPublicationDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return date;
  }

  const [, year, month, day] = match;

  return `${day}/${month}/${year}`;
}

function viralContextLabel(
  context: ResearchCandidate["viralContext"]
): string {
  switch (context) {
    case "phage-associated":
      return "Phage-associated";

    case "bacterial-virus-associated":
      return "Bacterial-virus-associated";

    case "broader-viral":
      return "Broader viral";

    case "non-viral":
      return "Non-viral";

    default:
      return context;
  }
}

function viralContextDescription(
  context: ResearchCandidate["viralContext"]
): string {
  switch (context) {
    case "phage-associated":
      return "The publication contains explicit phage or prophage context.";

    case "bacterial-virus-associated":
      return "The publication connects viruses with bacterial or microbial systems.";

    case "broader-viral":
      return "The publication contains broader viral context without clear phage-specific focus.";

    case "non-viral":
      return "No meaningful viral context was detected.";

    default:
      return "";
  }
}

function viralContextClass(
  context: ResearchCandidate["viralContext"]
): string {
  switch (context) {
    case "phage-associated":
      return "border-blue-200 bg-blue-50";

    case "bacterial-virus-associated":
      return "border-purple-200 bg-purple-50";

    case "broader-viral":
      return "border-slate-200 bg-slate-50";

    case "non-viral":
      return "border-slate-200 bg-slate-50";

    default:
      return "border-slate-200 bg-slate-50";
  }
}

function viralEvidenceLabel(
  evidence: ResearchCandidate["viralEvidence"]
): string {
  switch (evidence) {
    case "direct":
      return "Direct";

    case "associated":
      return "Associated";

    case "incidental":
      return "Incidental";

    case "none":
      return "None";

    default:
      return evidence;
  }
}

function viralEvidenceDescription(
  evidence: ResearchCandidate["viralEvidence"]
): string {
  switch (evidence) {
    case "direct":
      return "Strong explicit viral or phage evidence was detected.";

    case "associated":
      return "Multiple viral or phage signals were detected in the publication.";

    case "incidental":
      return "Viral or phage terminology appears but does not indicate a strong focus.";

    case "none":
      return "No direct viral or phage evidence was detected.";

    default:
      return "";
  }
}

function researchFocusLabel(
  focus: ResearchCandidate["researchFocus"]
): string {
  switch (focus) {
    case "phage-focused":
      return "Phage-focused";

    case "prophage-focused":
      return "Prophage-focused";

    case "viral-ecology-focused":
      return "Viral-ecology-focused";

    case "bacterial-virus-focused":
      return "Bacterial-virus-focused";

    case "microbial-context":
      return "Microbial-context";

    case "broader-viral":
      return "Broader viral";

    case "non-viral":
      return "Non-viral";

    default:
      return focus;
  }
}

function researchFocusDescription(
  focus: ResearchCandidate["researchFocus"]
): string {
  switch (focus) {
    case "phage-focused":
      return "Phage biology appears to be a central research focus.";

    case "prophage-focused":
      return "Prophage biology appears to be a central research focus.";

    case "viral-ecology-focused":
      return "Viral ecology appears to be a central research focus.";

    case "bacterial-virus-focused":
      return "Bacterial-virus interactions appear to be a central research focus.";

    case "microbial-context":
      return "Viral signals occur within a broader microbial context.";

    case "broader-viral":
      return "The publication has broader viral relevance without a clear phage-specific focus.";

    case "non-viral":
      return "No meaningful viral research focus was detected.";

    default:
      return "";
  }
}

function researchFocusClass(
  focus: ResearchCandidate["researchFocus"]
): string {
  switch (focus) {
    case "phage-focused":
    case "prophage-focused":
      return "border-blue-200 bg-blue-50";

    case "viral-ecology-focused":
    case "bacterial-virus-focused":
      return "border-purple-200 bg-purple-50";

    case "microbial-context":
      return "border-amber-200 bg-amber-50";

    case "broader-viral":
      return "border-slate-200 bg-slate-50";

    case "non-viral":
      return "border-slate-200 bg-slate-50";

    default:
      return "border-slate-200 bg-slate-50";
  }
}

function editorialPriorityLabel(
  priority: ResearchCandidate["editorialPriority"]
): string {
  switch (priority) {
    case "high":
      return "High";

    case "medium":
      return "Medium";

    case "low":
      return "Low";

    case "defer":
      return "Defer";

    default:
      return priority;
  }
}

function editorialPriorityDescription(
  priority: ResearchCandidate["editorialPriority"]
): string {
  switch (priority) {
    case "high":
      return "High attention in the editorial workflow.";

    case "medium":
      return "Moderate attention in the editorial workflow.";

    case "low":
      return "Lower attention in the editorial workflow.";

    case "defer":
      return "Suitable for deferred editorial review.";

    default:
      return "";
  }
}

function editorialPriorityClass(
  priority: ResearchCandidate["editorialPriority"]
): string {
  switch (priority) {
    case "high":
      return "border-red-200 bg-red-50 text-red-700";

    case "medium":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "low":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "defer":
      return "border-slate-200 bg-slate-50 text-slate-600";

    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export default function CandidateCard({
  candidate,
  decision,
  article,
  canReviewCandidates,
  canReadArticles,
  canCreateArticles,
}: CandidateCardProps) {
  const [status, setStatus] =
    useState<ResearchCandidate["status"]>(
      decision?.status ?? candidate.status
    );

  const [savingStatus, setSavingStatus] = useState(false);

  /*
   * Article linked to this candidate.
   *
   * The article prop can provide the initial value from the server.
   * We then refresh the status from Neon so that the Candidate Inbox
   * reflects the current editorial state.
   */
  const [articleState, setArticleState] = useState<{
    id: string;
    status: string;
  } | null>(
    article
      ? {
          id: article.id,
          status: article.status,
        }
      : null
  );

  useEffect(() => {
  if (!canReadArticles) {
    setArticleState(null);
    return;
  }

  let active = true;

  getCandidateArticleStatus(candidate.id)
    .then((result) => {
      if (active) {
        setArticleState(result);
      }
    })
    .catch(() => {
      if (active) {
        setArticleState(null);
      }
    });

  return () => {
    active = false;
  };
}, [candidate.id, canReadArticles]);

  const [collection, setCollection] =
    useState<ArticleCollection>(
      (article?.collection as ArticleCollection) ?? "GENERAL"
    );

  const [creatingArticle, setCreatingArticle] = useState(false);

  const [articleId, setArticleId] = useState<string | null>(
    article?.id ?? null
  );

  const [articleError, setArticleError] =
    useState<string | null>(null);

  async function handleStatusChange(
    nextStatus: ResearchCandidate["status"]
  ) {
    setSavingStatus(true);

    try {
      const decision = await updateCandidateStatus(
        candidate.id,
        nextStatus
      );

      setStatus(decision.status);
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleCreateArticleDraft() {
    setCreatingArticle(true);
    setArticleError(null);

    try {
      const article = await createArticleDraft(
        {
          id: candidate.id,
          title: candidate.title,
          pmid: candidate.sourceId,
          doi: candidate.doi ?? null,
          journal: candidate.journal,
          publicationDate: candidate.publicationDate,
          publicationDateType: candidate.publicationDateType,
          abstract: candidate.abstract,

          relevanceScore: candidate.relevanceScore,
          relevanceTier: candidate.relevanceTier,
          editorialPriority: candidate.editorialPriority,
        },
        collection
      );

      setArticleId(article.id);

      setArticleState({
        id: article.id,
        status: article.status,
      });
    } catch (error) {
      setArticleError(
        error instanceof Error
          ? error.message
          : "Unable to create article draft."
      );
    } finally {
      setCreatingArticle(false);
    }
  }

  return (
    <article className="rounded-xl border bg-background p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{candidate.source}</span>

            <span>•</span>

            <span>{candidate.sourceId}</span>

            {candidate.publicationDate && (
              <>
                <span>•</span>

                <span>
                  {formatPublicationDate(
                    candidate.publicationDate
                  )}
                </span>

                <span className="text-[11px]">
                  {candidate.publicationDateType ===
                  "electronic"
                    ? "Electronic publication"
                    : candidate.publicationDateType ===
                        "issue"
                      ? "Journal issue"
                      : "Date type unknown"}
                </span>
              </>
            )}
          </div>

          <h2 className="mt-3 text-xl font-semibold leading-tight">
            {candidate.title}
          </h2>

          {candidate.journal && (
            <p className="mt-2 text-sm text-muted-foreground">
              {candidate.journal}
            </p>
          )}

          {candidate.authors.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {candidate.authors
                .slice(0, 6)
                .join(", ")}

              {candidate.authors.length > 6
                ? " et al."
                : ""}
            </p>
          )}
        </div>

        <div className="shrink-0 rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">
            Relevance
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {candidate.relevanceScore}

            <span className="text-sm font-normal text-muted-foreground">
              /100
            </span>
          </p>

          <p className="mt-1 text-xs capitalize text-muted-foreground">
            {candidate.relevanceTier}
          </p>
        </div>
      </div>

      {candidate.matchedTopics.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Matched topics
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {candidate.matchedTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border px-3 py-1 text-xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {candidate.matchedKeywords.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Detection signals
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {candidate.matchedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border px-3 py-1 text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className={`mt-5 rounded-lg border p-4 ${viralContextClass(
          candidate.viralContext
        )}`}
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Viral context
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full border px-3 py-1 text-sm">
              {viralContextLabel(candidate.viralContext)}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {viralContextDescription(
              candidate.viralContext
            )}
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Evidence strength
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full border px-3 py-1 text-sm">
              {viralEvidenceLabel(
                candidate.viralEvidence
              )}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {viralEvidenceDescription(
              candidate.viralEvidence
            )}
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Research focus
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-sm ${researchFocusClass(
                candidate.researchFocus
              )}`}
            >
              {researchFocusLabel(
                candidate.researchFocus
              )}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {researchFocusDescription(
              candidate.researchFocus
            )}
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Editorial priority
          </p>

          <div className="mt-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${editorialPriorityClass(
                candidate.editorialPriority
              )}`}
            >
              {editorialPriorityLabel(
                candidate.editorialPriority
              )}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {editorialPriorityDescription(
              candidate.editorialPriority
            )}
          </p>
        </div>
      </div>

      {candidate.abstract && (
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {candidate.abstract}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href={candidate.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline underline-offset-4"
        >
          View on PubMed
        </a>

        {candidate.doi && (
          <a
            href={`https://doi.org/${candidate.doi}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4"
          >
            View DOI
          </a>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
  <span className="rounded-full border px-3 py-1 text-xs">
    {status}
  </span>

  {/* Candidate editorial actions are hidden once the linked
      EcoMicroVerse article has been published. */}
  {canReviewCandidates &&
    articleState?.status !== "published" && (
    <>
      {status === "discovered" && (
        <button
          type="button"
          onClick={() =>
            handleStatusChange("reviewed")
          }
          disabled={savingStatus}
          className="rounded-full border px-3 py-1 text-xs transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingStatus
            ? "Saving..."
            : "Mark reviewed"}
        </button>
      )}

      {status !== "approved" && (
        <button
          type="button"
          onClick={() =>
            handleStatusChange("approved")
          }
          disabled={savingStatus}
          className="rounded-full border px-3 py-1 text-xs transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Approve
        </button>
      )}

      {status !== "rejected" && (
        <button
          type="button"
          onClick={() =>
            handleStatusChange("rejected")
          }
          disabled={savingStatus}
          className="rounded-full border px-3 py-1 text-xs transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reject
        </button>
      )}
    </>
  )}
</div>
      </div>

      {canCreateArticles &&
        status === "approved" && !articleState && (
        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700">
                Article Draft
              </p>

              <p className="mt-1 text-sm text-slate-700">
                Convert this approved candidate into an
                EcoMicroVerse Research Object draft.
              </p>
            </div>

            {!articleId && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <label className="text-sm text-slate-700">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wide">
                    Collection
                  </span>

                  <select
                    value={collection}
                    onChange={(event) =>
                      setCollection(
                        event.target.value as ArticleCollection
                      )
                    }
                    disabled={creatingArticle}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                  >
                    <option value="GENERAL">
                      GENERAL
                    </option>

                    <option value="TPHAGE">
                      TPHAGE
                    </option>

                    <option value="TNEW">
                      TNEW
                    </option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={handleCreateArticleDraft}
                  disabled={creatingArticle}
                  className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creatingArticle
                    ? "Creating draft..."
                    : "Create Article Draft"}
                </button>
              </div>
            )}
          </div>

          {articleError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {articleError}
            </div>
          )}
        </div>
      )}

      {articleId && !articleState && (
        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
          <p className="text-xs uppercase tracking-widest text-teal-700">
            Article created
          </p>

          <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
            {articleId}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Draft record created successfully in the editorial
            system.
          </p>
        </div>
      )}

      {articleError && !articleState && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {articleError}
        </div>
      )}

      {canReadArticles && articleState && (
        <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                EcoMicroVerse article
              </p>

              <p className="mt-1 font-mono text-sm text-teal-300">
                {articleState.id}
              </p>

              <span className="mt-2 inline-flex rounded-full border border-teal-500/30 px-3 py-1 text-xs font-medium capitalize text-teal-300">
                {articleState.status}
              </span>
            </div>

            {articleState.status === "published" && (
              <a
                href={`/articles/${encodeURIComponent(
                  articleState.id
                )}`}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                View Article →
              </a>
            )}

            {articleState.status !== "published" && (
              <a
                href={`/workspace/articles/${encodeURIComponent(
                  articleState.id
                )}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                Open Article →
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}