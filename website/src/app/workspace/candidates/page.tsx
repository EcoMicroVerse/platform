export const dynamic = "force-dynamic";

import {
  discoverPubMedCandidates,
} from "@/lib/pubmedCandidates";

import type {
  ResearchCandidate,
} from "@/lib/researchCandidates";

export default async function CandidatesPage() {
  let candidates: ResearchCandidate[] = [];
  let error = "";

  try {
    candidates =
      await discoverPubMedCandidates(
        [
          "bacteriophage",
          "prophage",
          "methanotroph",
        ],
        5
      );
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Unable to discover research candidates.";
  }

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
          Newly discovered scientific literature identified
          by the EcoMicroVerse research intelligence engine.
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
              {
                candidates.filter(
                  (candidate) =>
                    candidate.relevanceTier ===
                    "high"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">
              Topics detected
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {
                new Set(
                  candidates.flatMap(
                    (candidate) =>
                      candidate.matchedTopics
                  )
                ).size
              }
            </p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {candidates.map((candidate) => (
          <article
            key={candidate.id}
            className="rounded-xl border bg-background p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {candidate.source}
                  </span>

                  <span>•</span>

                  <span>
                    {candidate.sourceId}
                  </span>

                  {candidate.publicationDate && (
                    <>
                      <span>•</span>

                      <span>
                        {candidate.publicationDate}
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

            <div className="mt-5 flex flex-wrap gap-2">
              {candidate.matchedTopics.map(
                (topic) => (
                  <span
                    key={topic}
                    className="rounded-full border px-3 py-1 text-xs"
                  >
                    {topic}
                  </span>
                )
              )}
            </div>

            {candidate.matchedKeywords.length >
              0 && (
              <div className="mt-4 rounded-lg border p-4">
                <p className="text-xs font-medium">
                  Detection signals
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {candidate.matchedKeywords.join(
                    ", "
                  )}
                </p>
              </div>
            )}

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

              <span className="ml-auto rounded-full border px-3 py-1 text-xs">
                {candidate.status}
              </span>
            </div>
          </article>
        ))}

        {!error && candidates.length === 0 && (
          <div className="rounded-xl border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No research candidates were discovered.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}