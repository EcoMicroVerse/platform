export const dynamic = "force-dynamic";

import { scanPubMed } from "@/lib/pubmedScanner";
import { scorePubMedArticle } from "@/lib/pubmedRelevance";

export default async function PubMedScannerPage() {
  let articles: Array<{
  article: Awaited<
    ReturnType<typeof scanPubMed>
  >[number];
  relevance: Awaited<
    ReturnType<typeof scorePubMedArticle>
  >;
}> = [];
  let error = "";

  try {
    const results = await scanPubMed(
      [
        "bacteriophage",
        "prophage",
        "methanotroph",
      ],
      5
    );

    articles = await Promise.all(
      results.map(async (article) => ({
        article,
        relevance:
          await scorePubMedArticle(article),
      }))
    );
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Unable to retrieve PubMed results.";
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          EcoMicroVerse Intelligence Engine
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          PubMed Scanner
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Live literature discovery from PubMed.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-medium">
            PubMed scanner temporarily unavailable
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {error}
          </p>
        </div>
      )}

      {!error && articles.length === 0 && (
        <div className="rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">
            No PubMed results were returned.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {articles.map(
          ({ article, relevance }) => (
            <article
              key={article.pmid}
              className="rounded-xl border bg-background p-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>PMID {article.pmid}</span>

                {article.publicationDate && (
                  <span>
                    • {article.publicationDate}
                  </span>
                )}

                {article.journal && (
                  <span>
                    • {article.journal}
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-lg font-semibold">
                {article.title}
              </h2>

              {article.authors.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {article.authors
                    .slice(0, 5)
                    .join(", ")}

                  {article.authors.length > 5
                    ? " et al."
                    : ""}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {relevance.topics.map(
                  (topic) => (
                    <span
                      key={topic.id}
                      className="rounded-full border px-3 py-1 text-xs"
                    >
                      {topic.name}
                    </span>
                  )
                )}
              </div>

              <div className="mt-4 rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium">
                    Relevance
                  </span>

                  <span className="text-sm font-semibold">
                    {relevance.score}/100
                  </span>

                  <span className="rounded-full border px-3 py-1 text-xs capitalize">
                    {relevance.tier}
                  </span>
                </div>

                {relevance.matchedKeywords.length >
                  0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Matched terms:{" "}
                    {relevance.matchedKeywords.join(
                      ", "
                    )}
                  </p>
                )}
              </div>

              {article.abstract && (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {article.abstract}
                </p>
              )}

              <div className="mt-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  View on PubMed
                </a>
              </div>
            </article>
          )
        )}
      </div>
    </main>
  );
}