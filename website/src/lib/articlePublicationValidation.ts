import type { ArticleRecord } from "@/lib/articleStore";

function clean(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export type ArticlePublicationChecks = {
  articleExists: boolean;
  statusApproved: boolean;
  hasId: boolean;
  hasTitle: boolean;
  hasCollection: boolean;
  hasSummary: boolean;
  hasArticleContent: boolean;

  hasRelevanceScore: boolean;
  hasRelevanceTier: boolean;

  hasSourcePmid: boolean;
  hasSourceJournal: boolean;
  hasSourcePublicationDate: boolean;
  hasSourcePublicationDateType: boolean;
};

export type ArticlePublicationValidation = {
  valid: boolean;
  checks: ArticlePublicationChecks;
  fields: {
    summaryLength: number;
    articleContentLength: number;
    methodologyLength: number;
    resultsLength: number;
    discussionLength: number;
    limitationsLength: number;
    futureWorkLength: number;
    keyTakeawaysLength: number;
    editorNotesLength: number;
  };
};

export function validateArticleForPublication(
  article: ArticleRecord | null
): ArticlePublicationValidation {
  if (!article) {
    return {
      valid: false,
      checks: {
        articleExists: false,
        statusApproved: false,
        hasId: false,
        hasTitle: false,
        hasCollection: false,
        hasSummary: false,
        hasArticleContent: false,
        hasRelevanceScore: false,
        hasRelevanceTier: false,
        hasSourcePmid: false,
        hasSourceJournal: false,
        hasSourcePublicationDate: false,
        hasSourcePublicationDateType: false,
      },
      fields: {
        summaryLength: 0,
        articleContentLength: 0,
        methodologyLength: 0,
        resultsLength: 0,
        discussionLength: 0,
        limitationsLength: 0,
        futureWorkLength: 0,
        keyTakeawaysLength: 0,
        editorNotesLength: 0,
      },
    };
  }

  /*
   * This publication workflow is currently designed for
   * PubMed-derived Research Objects.
   *
   * Relevance score 0 is a valid numerical score, so we
   * explicitly test for a finite number rather than truthiness.
   */
  const hasRelevanceScore =
    typeof article.relevanceScore === "number" &&
    Number.isFinite(article.relevanceScore);

  const hasRelevanceTier =
    Boolean(clean(article.relevanceTier));

  const hasSourcePmid =
    Boolean(clean(article.sourcePmid));

  const hasSourceJournal =
    Boolean(clean(article.sourceJournal));

  const hasSourcePublicationDate =
    Boolean(clean(article.sourcePublicationDate));

  const hasSourcePublicationDateType =
    Boolean(clean(article.sourcePublicationDateType));

  const checks: ArticlePublicationChecks = {
    articleExists: true,
    statusApproved: article.status === "approved",
    hasId: Boolean(clean(article.id)),
    hasTitle: Boolean(clean(article.title)),
    hasCollection: Boolean(clean(article.collection)),
    hasSummary: Boolean(clean(article.summary)),
    hasArticleContent: Boolean(
      clean(article.articleContent)
    ),

    hasRelevanceScore,
    hasRelevanceTier,

    hasSourcePmid,
    hasSourceJournal,
    hasSourcePublicationDate,
    hasSourcePublicationDateType,
  };

  const valid =
    Object.values(checks).every(Boolean);

  return {
    valid,
    checks,
    fields: {
      summaryLength: clean(article.summary).length,
      articleContentLength:
        clean(article.articleContent).length,
      methodologyLength:
        clean(article.methodology).length,
      resultsLength:
        clean(article.results).length,
      discussionLength:
        clean(article.discussion).length,
      limitationsLength:
        clean(article.limitations).length,
      futureWorkLength:
        clean(article.futureWork).length,
      keyTakeawaysLength:
        clean(article.keyTakeaways).length,
      editorNotesLength:
        clean(article.editorNotes).length,
    },
  };
}
