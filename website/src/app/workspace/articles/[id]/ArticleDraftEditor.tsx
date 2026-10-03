"use client";

import { useState } from "react";
import type {
  ArticleRecord,
  ArticleStatus,
} from "@/lib/articleStore";

import {
  saveArticleDraft,
  updateArticleEditorialStatus,
  type SaveArticleDraftInput,
} from "@/app/workspace/candidates/candidateActions";

type ArticleDraftEditorProps = {
  article: ArticleRecord;
  canEditArticles: boolean;
  canReviewArticles: boolean;
  canApproveArticles: boolean;
  canPublishArticles: boolean;
};

type EditableField =
  | "title"
  | "summary"
  | "methodology"
  | "results"
  | "discussion"
  | "limitations"
  | "futureWork"
  | "keyTakeaways"
  | "articleContent"
  | "editorNotes";

function formatSavedAt(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
}

function formatPublicationDate(
  date: string | null
): string {
  if (!date) {
    return "Unknown";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed);
}

function Field({
  label,
  value,
  onChange,
  rows = 6,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-400 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

export default function ArticleDraftEditor({
  article,
  canEditArticles,
  canReviewArticles,
  canApproveArticles,
  canPublishArticles,
}: ArticleDraftEditorProps) {
  const [form, setForm] =
    useState<SaveArticleDraftInput>({
      title: article.title,
      summary: article.summary ?? "",
      methodology: article.methodology ?? "",
      results: article.results ?? "",
      discussion: article.discussion ?? "",
      limitations: article.limitations ?? "",
      futureWork: article.futureWork ?? "",
      keyTakeaways: article.keyTakeaways ?? "",
      articleContent: article.articleContent ?? "",
      editorNotes: article.editorNotes ?? "",
    });

  const [saving, setSaving] = useState(false);
  const [statusSaving, setStatusSaving] =
    useState(false);
  const [publishing, setPublishing] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [lastSavedAt, setLastSavedAt] = useState(
    article.updatedAt
  );

  const [articleStatus, setArticleStatus] =
    useState<ArticleStatus>(article.status);

  function updateField(
    field: EditableField,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!canEditArticles) {
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const savedArticle =
        await saveArticleDraft(
          article.id,
          form
        );

      setLastSavedAt(savedArticle.updatedAt);
      setMessage("✓ Saved");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save article draft."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(
    nextStatus: ArticleStatus
  ) {
    setStatusSaving(true);
    setMessage("");
    setError("");

    try {
      const updatedArticle =
        await updateArticleEditorialStatus(
          article.id,
          nextStatus
        );

      setArticleStatus(updatedArticle.status);
      setLastSavedAt(updatedArticle.updatedAt);
      setMessage("✓ Status updated");
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update article status."
      );
    } finally {
      setStatusSaving(false);
    }
  }

  async function handlePublish() {
    if (
      !canPublishArticles ||
      articleStatus !== "approved"
    ) {
      return;
    }

    const confirmed = window.confirm(
      "Publish this Research Object to EcoMicroVerse?"
    );

    if (!confirmed) {
      return;
    }

    setPublishing(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/workspace/articles/${encodeURIComponent(
          article.id
        )}/publish`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ??
            "Unable to publish article."
        );
      }

      setArticleStatus("published");

      setMessage(
        "✓ Article published successfully"
      );
    } catch (publishError) {
      setError(
        publishError instanceof Error
          ? publishError.message
          : "Unable to publish article."
      );
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Editorial controls */}
      <div className="sticky top-4 z-20 flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-950/95 p-4 shadow-xl backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Editorial draft
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-slate-300">
              Changes are saved to Neon and do not
              publish the article.
            </span>

            <span className="text-slate-500">
              •
            </span>

            <span className="text-slate-400">
              Last saved:{" "}
              {formatSavedAt(lastSavedAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {message && (
            <span className="text-sm text-emerald-400">
              {message}
            </span>
          )}

          {error && (
            <span className="max-w-md text-sm text-red-400">
              {error}
            </span>
          )}

          {canEditArticles && (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Draft"}
            </button>
          )}
        </div>
      </div>

      {/* Article identity */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Article identity
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            {article.id}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">
              Publication date
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {formatPublicationDate(
                article.sourcePublicationDate
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {article.sourcePublicationDateType ===
              "electronic"
                ? "Electronic publication"
                : article.sourcePublicationDateType ===
                    "issue"
                  ? "Journal issue"
                  : "Date type unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Collection
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {article.collection ??
                "Not assigned"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Article type
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {article.articleType}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Candidate
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {article.candidateId ??
                "Not linked"}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial status */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Editorial status
            </p>

            <div className="mt-2 flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  articleStatus === "draft"
                    ? "bg-amber-400/10 text-amber-300"
                    : articleStatus === "review"
                      ? "bg-blue-400/10 text-blue-300"
                      : articleStatus ===
                          "approved"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : articleStatus ===
                            "published"
                          ? "bg-green-400/10 text-green-300"
                          : "bg-slate-400/10 text-slate-300"
                }`}
              >
                {articleStatus}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Editorial status controls the
              article&apos;s progression through
              review and publication.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {articleStatus === "draft" &&
              canReviewArticles && (
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange("review")
                  }
                  disabled={statusSaving}
                  className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {statusSaving
                    ? "Updating…"
                    : "Send to Review"}
                </button>
              )}

            {articleStatus === "review" && (
              <>
                {canReviewArticles && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange("draft")
                    }
                    disabled={statusSaving}
                    className="rounded-xl border border-slate-700 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Return to Draft
                  </button>
                )}

                {canApproveArticles && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        "approved"
                      )
                    }
                    disabled={statusSaving}
                    className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {statusSaving
                      ? "Updating…"
                      : "Approve Article"}
                  </button>
                )}
              </>
            )}

            {articleStatus === "approved" && (
              <>
                {canReviewArticles && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        "review"
                      )
                    }
                    disabled={
                      statusSaving || publishing
                    }
                    className="rounded-xl border border-slate-700 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Return to Review
                  </button>
                )}

                {canPublishArticles && (
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={
                      publishing || statusSaving
                    }
                    className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {publishing
                      ? "Publishing…"
                      : "Publish Article"}
                  </button>
                )}
              </>
            )}

            {articleStatus === "published" && (
              <span className="text-sm font-medium text-emerald-300">
                Published
              </span>
            )}

            {articleStatus === "archived" && (
              <span className="text-sm font-medium text-slate-400">
                Archived
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Source evidence */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Source evidence
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            PubMed source
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This information is the source evidence
            attached to the article. It is read-only
            in this first editor version.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">
              PMID
            </p>

            <p className="mt-1 font-mono text-sm text-slate-200">
              {article.sourcePmid ??
                "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              DOI
            </p>

            <p className="mt-1 break-all font-mono text-sm text-slate-200">
              {article.sourceDoi ??
                "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Journal
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {article.sourceJournal ??
                "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Publication date
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {formatPublicationDate(
                article.sourcePublicationDate
              )}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs text-slate-500">
            Source abstract
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
            {article.sourceAbstract ||
              "No source abstract is available."}
          </div>
        </div>
      </section>

      {/* Editable article */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Research object
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Editorial content
          </h2>
        </div>

        <div className="space-y-7">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Title
            </label>

            <input
              value={form.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              disabled={!canEditArticles}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-base font-medium text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-400 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <Field
            label="Summary"
            value={form.summary}
            onChange={(value) =>
              updateField("summary", value)
            }
            rows={7}
            placeholder="Write a concise research summary."
            disabled={!canEditArticles}
          />

          <Field
            label="Methodology"
            value={form.methodology}
            onChange={(value) =>
              updateField(
                "methodology",
                value
              )
            }
            rows={8}
            placeholder="Describe the methods, study design, datasets, experiments or analytical approaches."
            disabled={!canEditArticles}
          />

          <Field
            label="Results"
            value={form.results}
            onChange={(value) =>
              updateField("results", value)
            }
            rows={8}
            placeholder="Record the main findings supported by the source."
            disabled={!canEditArticles}
          />

          <Field
            label="Discussion"
            value={form.discussion}
            onChange={(value) =>
              updateField(
                "discussion",
                value
              )
            }
            rows={8}
            placeholder="Interpret the findings while keeping claims aligned with the source evidence."
            disabled={!canEditArticles}
          />

          <Field
            label="Limitations"
            value={form.limitations}
            onChange={(value) =>
              updateField(
                "limitations",
                value
              )
            }
            rows={6}
            placeholder="Record limitations identified in the source or during editorial review."
            disabled={!canEditArticles}
          />

          <Field
            label="Future work"
            value={form.futureWork}
            onChange={(value) =>
              updateField(
                "futureWork",
                value
              )
            }
            rows={6}
            placeholder="Potential future directions supported by the research."
            disabled={!canEditArticles}
          />

          <Field
            label="Key takeaways"
            value={form.keyTakeaways}
            onChange={(value) =>
              updateField(
                "keyTakeaways",
                value
              )
            }
            rows={6}
            placeholder="Capture the most important takeaways for readers."
            disabled={!canEditArticles}
          />

          <Field
            label="Article content"
            value={form.articleContent}
            onChange={(value) =>
              updateField(
                "articleContent",
                value
              )
            }
            rows={16}
            placeholder="Main article body. Markdown can be used here."
            disabled={!canEditArticles}
          />

          <Field
            label="Editor notes"
            value={form.editorNotes}
            onChange={(value) =>
              updateField(
                "editorNotes",
                value
              )
            }
            rows={6}
            placeholder="Private editorial notes, questions, checks and follow-up items."
            disabled={!canEditArticles}
          />
        </div>
      </section>

      {/* Bottom save */}
      {canEditArticles && (
        <div className="flex justify-end border-t border-slate-800 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving…"
              : "Save Draft"}
          </button>
        </div>
      )}
    </div>
  );
}