"use server";

import {
  getCandidateDecision,
  type CandidateStatus,
} from "@/lib/candidateStore";

import {
  createArticle,
  getArticleByCandidateId,
  getArticleById,
  updateArticleContent,
  updateArticleSource,
  updateArticleStatus,
  type ArticleRecord,
  type ArticleStatus,
} from "@/lib/articleStore";

import { generateEmvId } from "@/lib/emvIdStore";

import { requirePermission } from "@/lib/auth/authorization";

export async function getCandidateArticleStatus(
  candidateId: string
) {
  await requirePermission("articles.read");

  const article = await getArticleByCandidateId(candidateId);

  if (!article) {
    return null;
  }

  return {
    id: article.id,
    status: article.status,
  };
}

export type ArticleCollection =
  | "GENERAL"
  | "TPHAGE"
  | "TNEW";

export async function updateCandidateStatus(
  candidateId: string,
  status: CandidateStatus
) {
  await requirePermission("candidates.review");

  if (!candidateId) {
    throw new Error("Candidate ID is required.");
  }

  const currentDecision =
    await getCandidateDecision(candidateId);

  const currentStatus = currentDecision.status;

  const allowedTransitions: Record<
    CandidateStatus,
    CandidateStatus[]
  > = {
    discovered: ["reviewed"],
    reviewed: ["approved", "rejected"],
    approved: [],
    rejected: [],
  };

  const allowedNextStatuses =
    allowedTransitions[currentStatus];

  if (!allowedNextStatuses.includes(status)) {
    throw new Error(
      `Candidate status transition from "${currentStatus}" to "${status}" is not permitted.`
    );
  }

  const { setCandidateStatus } =
    await import("@/lib/candidateStore");

  return setCandidateStatus(
    candidateId,
    status
  );
}

export async function createArticleDraft(
  candidate: {
    id: string;
    title: string;
    pmid: string;
    doi: string | null;
    journal: string;
    publicationDate: string;
    publicationDateType:
      | "electronic"
      | "issue"
      | "unknown";
    abstract: string;

    relevanceScore: number;
    relevanceTier: string;
    editorialPriority: string;
  },
  collection: ArticleCollection
): Promise<ArticleRecord> {
  await requirePermission("articles.create");

  if (!candidate.id) {
    throw new Error("Candidate ID is required.");
  }

  if (!candidate.title.trim()) {
    throw new Error("Article title is required.");
  }

  const decision = await getCandidateDecision(candidate.id);

  if (decision.status !== "approved") {
    throw new Error(
      "Only approved candidates can be converted into article drafts."
    );
  }

  const existingArticle =
    await getArticleByCandidateId(candidate.id);

  if (existingArticle) {
    return existingArticle;
  }

  const emvId = await generateEmvId(collection);

  return createArticle({
    id: emvId,
    candidateId: candidate.id,
    collection,
    title: candidate.title.trim(),
    status: "draft",
    articleType: "research_object",
    contentPath: null,

    sourcePmid: candidate.pmid,
    sourceDoi: candidate.doi,
    sourceJournal: candidate.journal,
    sourcePublicationDate:
      candidate.publicationDate,
    sourcePublicationDateType:
      candidate.publicationDateType,
    sourceAbstract: candidate.abstract,

    relevanceScore:
      candidate.relevanceScore,
    relevanceTier:
      candidate.relevanceTier,
    editorialPriority:
      candidate.editorialPriority,
  });
}

export type SaveArticleDraftInput = {
  title: string;
  summary: string;
  methodology: string;
  results: string;
  discussion: string;
  limitations: string;
  futureWork: string;
  keyTakeaways: string;
  articleContent: string;
  editorNotes: string;
};

export async function saveArticleDraft(
  articleId: string,
  input: SaveArticleDraftInput
): Promise<ArticleRecord> {
  await requirePermission("articles.edit");
  const article = await getArticleById(articleId);

  if (!article) {
    throw new Error(`Article not found: ${articleId}`);
  }

  if (
    article.status === "published" ||
    article.status === "archived"
  ) {
    throw new Error(
      `Article ${articleId} cannot be edited because its status is ${article.status}.`
    );
  }

  const title = input.title.trim();

  if (!title) {
    throw new Error("Article title cannot be empty.");
  }

  return updateArticleContent(articleId, {
    title,
    summary: input.summary,
    methodology: input.methodology,
    results: input.results,
    discussion: input.discussion,
    limitations: input.limitations,
    futureWork: input.futureWork,
    keyTakeaways: input.keyTakeaways,
    articleContent: input.articleContent,
    editorNotes: input.editorNotes,
  });
}

export async function updateArticleEditorialStatus(
  articleId: string,
  nextStatus: ArticleStatus,
): Promise<ArticleRecord> {
  // --------------------------------------------------
  // Load current article
  // --------------------------------------------------

  const article = await getArticleById(articleId);

  if (!article) {
    throw new Error("Article not found.");
  }

  const currentStatus = article.status;

  // --------------------------------------------------
  // Determine the permission required for the
  // requested editorial transition
  // --------------------------------------------------

  let requiredPermission:
    | "articles.review"
    | "articles.approve"
    | null = null;

  if (
    currentStatus === "draft" &&
    nextStatus === "review"
  ) {
    requiredPermission = "articles.review";
  } else if (
    currentStatus === "review" &&
    nextStatus === "draft"
  ) {
    requiredPermission = "articles.review";
  } else if (
    currentStatus === "review" &&
    nextStatus === "approved"
  ) {
    requiredPermission = "articles.approve";
  } else if (
    currentStatus === "approved" &&
    nextStatus === "review"
  ) {
    requiredPermission = "articles.review";
  }

  // --------------------------------------------------
  // Reject unsupported transitions
  // --------------------------------------------------

  if (!requiredPermission) {
    throw new Error(
      `Editorial transition from "${currentStatus}" to "${nextStatus}" is not permitted.`,
    );
  }

  // --------------------------------------------------
  // Enforce permission server-side
  // --------------------------------------------------

  await requirePermission(requiredPermission);

  // --------------------------------------------------
  // Update article status
  // --------------------------------------------------

  return updateArticleStatus(
    articleId,
    nextStatus,
  );
}

export async function hydrateArticleSource(
  articleId: string,
  source: {
    pmid: string;
    doi: string | null;
    journal: string;
    publicationDate: string;
    publicationDateType: string;
    abstract: string;
  }
): Promise<ArticleRecord> {
  await requirePermission("articles.edit");
  const article = await getArticleById(articleId);

  if (!article) {
    throw new Error(`Article not found: ${articleId}`);
  }

  if (
    article.candidateId &&
    article.candidateId !== `PUBMED_${source.pmid}`
  ) {
    throw new Error(
      `Source PMID ${source.pmid} does not match article candidate ${article.candidateId}.`
    );
  }

  return updateArticleSource(articleId, {
    sourcePmid: source.pmid,
    sourceDoi: source.doi,
    sourceJournal: source.journal,
    sourcePublicationDate:
      source.publicationDate,
    sourcePublicationDateType:
      source.publicationDateType,
    sourceAbstract: source.abstract,
  });
}