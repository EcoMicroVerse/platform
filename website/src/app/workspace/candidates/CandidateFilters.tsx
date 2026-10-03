"use client";

import { useMemo, useState } from "react";
import type { CandidateDecision } from "@/lib/candidateStore";
import type {
  EditorialPriority,
  ResearchCandidate,
} from "@/lib/researchCandidates";
import CandidateCard from "./CandidateCard";
import type { ArticleRecord } from "@/lib/articleStore";

type RelevanceFilter =
  | "all"
  | "high"
  | "medium"
  | "low"
  | "minimal";

type PriorityFilter =
  | "all"
  | EditorialPriority;

const RELEVANCE_FILTERS: {
  id: RelevanceFilter;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
  { id: "minimal", label: "Minimal" },
];

const PRIORITY_FILTERS: {
  id: PriorityFilter;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
  { id: "defer", label: "Defer" },
];

type CandidateFiltersProps = {
  candidates: ResearchCandidate[];
  decisions: Record<string, CandidateDecision>;
  articles: Record<string, ArticleRecord>;
  canReviewCandidates: boolean;
  canReadArticles: boolean;
  canCreateArticles: boolean;
};

export default function CandidateFilters({
  candidates,
  decisions,
  articles,
  canReviewCandidates,
  canReadArticles,
  canCreateArticles,
}: CandidateFiltersProps) {
  const [relevanceFilter, setRelevanceFilter] =
    useState<RelevanceFilter>("all");

  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("all");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesRelevance =
        relevanceFilter === "all" ||
        candidate.relevanceTier === relevanceFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        candidate.editorialPriority === priorityFilter;

      return matchesRelevance && matchesPriority;
    });
  }, [candidates, relevanceFilter, priorityFilter]);

  const relevanceCount = (filter: RelevanceFilter) => {
    if (filter === "all") {
      return candidates.length;
    }

    return candidates.filter(
      (candidate) => candidate.relevanceTier === filter
    ).length;
  };

  const priorityCount = (filter: PriorityFilter) => {
    if (filter === "all") {
      return candidates.length;
    }

    return candidates.filter(
      (candidate) => candidate.editorialPriority === filter
    ).length;
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-background p-4">
        <div className="space-y-5">
          {/* Relevance filters */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Filter by relevance
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {RELEVANCE_FILTERS.map((option) => {
                const active =
                  relevanceFilter === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setRelevanceFilter(option.id)
                    }
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    {option.label} (
                    {relevanceCount(option.id)})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial priority filters */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Filter by editorial priority
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {PRIORITY_FILTERS.map((option) => {
                const active =
                  priorityFilter === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setPriorityFilter(option.id)
                    }
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    {option.label} (
                    {priorityCount(option.id)})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active result count */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredCandidates.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {candidates.length}
              </span>{" "}
              candidates
            </p>
          </div>
        </div>
      </div>

      {/* Candidate cards */}
      {filteredCandidates.length === 0 ? (
        <div className="rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">
            No candidates match the selected filters.
          </p>
        </div>
      ) : (
        filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            decision={decisions[candidate.id]}
            article={
              canReadArticles
                ? articles[candidate.id]
                : undefined
            }
            canReviewCandidates={canReviewCandidates}
            canReadArticles={canReadArticles}
            canCreateArticles={canCreateArticles}
          />
        ))
      )}
    </div>
  );
}