import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function loadPublicHomepage() {
  const approvedDir = path.join(ROOT, "content", "approved");

  const folders = await fs.readdir(approvedDir);

  const articles: any[] = [];

  for (const folder of folders) {
    const metadataPath = path.join(
      approvedDir,
      folder,
      "metadata.yml"
    );

    const summaryPath = path.join(
      approvedDir,
      folder,
      "summary.md"
    );

    try {
      const metadata = load(
        await fs.readFile(metadataPath, "utf8")
      ) as any;

      let summary = "";

      try {
        summary = await fs.readFile(summaryPath, "utf8");
      } catch {}

      articles.push({
        ...metadata,
        summary,
      });
    } catch {}
  }

  articles.sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );

  return {
    featured: articles[0] ?? null,
    latest: articles.slice(0, 6),
    collections: [
      ...new Set(
        articles.map((a) => a.recommended_collection)
      ),
    ],
    articles,
  };
}

export async function loadArticle(id: string) {
  const folder = path.join(
    ROOT,
    "content",
    "approved",
    id
  );

  const metadata = load(
    await fs.readFile(
      path.join(folder, "metadata.yml"),
      "utf8"
    )
  ) as any;

  const summary = await fs.readFile(
    path.join(folder, "summary.md"),
    "utf8"
  );

  const article = await fs.readFile(
    path.join(folder, "article.md"),
    "utf8"
  );

  let readingPath: any = { recommended: [] };

  try {
    readingPath = load(
      await fs.readFile(
        path.join(folder, "reading_path.yml"),
        "utf8"
      )
    );
  } catch {}

  let citations: any = {};

  try {
    citations = load(
      await fs.readFile(
        path.join(folder, "citations.yml"),
        "utf8"
      )
    );
  } catch {}

  return {
    metadata,
    summary,
    article,
    readingPath,
    citations,
  };
}

export async function loadCollection(collection: string) {
  const homepage = await loadPublicHomepage();

  const articles = homepage.articles.filter(
    (article: any) =>
      article.recommended_collection === collection
  );

  const methods = new Map<string, number>();

  for (const article of articles) {
    if (article.matched_terms) {
      for (const term of article.matched_terms) {
        const name =
          typeof term === "string"
            ? term
            : term.term;

        methods.set(
          name,
          (methods.get(name) ?? 0) + 1
        );
      }
    }
  }

  const trendingMethods = [...methods.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      count,
    }));

  return {
    collection,
    featured: articles[0] ?? null,
    articles,
    trendingMethods,
    stats: {
      total: articles.length,
      averageScore:
        articles.length === 0
          ? 0
          : Math.round(
              articles.reduce(
                (sum, article) =>
                  sum + (article.score ?? 0),
                0
              ) / articles.length
            ),
    },
  };
}

export async function loadRelatedResearch(id: string) {
  const homepage = await loadPublicHomepage();

  const current = homepage.articles.find(
    (article: any) => article.emv_id === id
  );

  if (!current) return [];

  const currentMethods = new Set(
    (current.matched_terms ?? []).map((term: any) =>
      typeof term === "string"
        ? term
        : term.term
    )
  );

  const currentProfiles = new Set(
    (current.profile_matches ?? []).map(
      (profile: any) =>
        typeof profile === "string"
          ? profile
          : profile.name
    )
  );

  return homepage.articles
    .filter((article: any) => article.emv_id !== id)
    .map((article: any) => {
      let similarity = 0;

      if (
        article.recommended_collection ===
        current.recommended_collection
      ) {
        similarity += 40;
      }

      for (const term of article.matched_terms ?? []) {
        const name =
          typeof term === "string"
            ? term
            : term.term;

        if (currentMethods.has(name)) {
          similarity += 20;
        }
      }

      for (const profile of article.profile_matches ??
        []) {
        const name =
          typeof profile === "string"
            ? profile
            : profile.name;

        if (currentProfiles.has(name)) {
          similarity += 10;
        }
      }

      return {
        ...article,
        similarity,
      };
    })
    .filter(
      (article: any) => article.similarity > 0
    )
    .sort(
      (a: any, b: any) =>
        b.similarity - a.similarity
    )
    .slice(0, 4);
}