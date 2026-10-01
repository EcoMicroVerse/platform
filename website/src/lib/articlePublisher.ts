import fs from "fs/promises";
import path from "path";
import { dump } from "js-yaml";
import type { ArticleRecord } from "@/lib/articleStore";

const ROOT = path.resolve(process.cwd(), "..");

function getApprovedArticleDir(articleId: string) {
  return path.join(ROOT, "content", "approved", articleId);
}

function cleanText(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function requireField(
  value: string | null | undefined,
  fieldName: string
): string {
  const cleaned = cleanText(value);

  if (!cleaned) {
    throw new Error(`Cannot publish article: ${fieldName} is empty.`);
  }

  return cleaned;
}

function buildSourceUrl(article: ArticleRecord): string {
  if (article.sourceDoi) {
    return `https://doi.org/${article.sourceDoi}`;
  }

  if (article.sourcePmid) {
    return `https://pubmed.ncbi.nlm.nih.gov/${article.sourcePmid}/`;
  }

  return "";
}

function buildMetadata(article: ArticleRecord) {
  const sourceUrl = buildSourceUrl(article);

  const collection = article.collection ?? "GENERAL";

  return {
    status: "approved",

    emv_id: article.id,

    title: article.title,

    source: article.sourceJournal ?? "",

    type: "paper",

    collection,

    recommended_collection: collection,

    subcategory: "",

    profile_matches: [],

    priority: article.editorialPriority ?? null,

    score: article.relevanceScore ?? null,

    relevance_score: article.relevanceScore ?? null,

    relevance_tier: article.relevanceTier ?? null,

    matched_terms: [],

    founder_decision: "approve",

    published: null,

    authors: [],

    doi: article.sourceDoi ?? null,

    url: sourceUrl,

    // Backward compatibility with existing Research Objects.
    link: sourceUrl,

    summary: article.summary ?? null,

    why_it_matters: null,

    methods: [],

    related_objects: [],

    created_at: article.createdAt,

    source_metadata: {
      pmid: article.sourcePmid,
      doi: article.sourceDoi,
      journal: article.sourceJournal,
      publication_date: article.sourcePublicationDate,
      publication_date_type: article.sourcePublicationDateType,
    },
  };
}

async function writeOptionalMarkdown(
  folder: string,
  filename: string,
  content: string
): Promise<boolean> {
  if (!content) {
    return false;
  }

  await fs.writeFile(
    path.join(folder, filename),
    `${content}\n`,
    "utf8"
  );

  return true;
}

export async function publishArticleResearchObject(
  article: ArticleRecord
) {
  if (article.status !== "approved") {
    throw new Error(
      `Cannot publish article ${article.id}: article status is "${article.status}". Only approved articles can be published.`
    );
  }

  const summary = requireField(
    article.summary,
    "Summary"
  );

  const articleContent = requireField(
    article.articleContent,
    "Article content"
  );

  const methodology = cleanText(article.methodology);
  const results = cleanText(article.results);
  const discussion = cleanText(article.discussion);
  const limitations = cleanText(article.limitations);
  const futureWork = cleanText(article.futureWork);
  const keyTakeaways = cleanText(article.keyTakeaways);
  const editorNotes = cleanText(article.editorNotes);

  const folder = getApprovedArticleDir(article.id);

  await fs.mkdir(folder, {
    recursive: true,
  });

  const metadata = buildMetadata(article);

  await fs.writeFile(
    path.join(folder, "metadata.yml"),
    dump(metadata, {
      noRefs: true,
      lineWidth: 120,
    }),
    "utf8"
  );

  await fs.writeFile(
    path.join(folder, "summary.md"),
    `${summary}\n`,
    "utf8"
  );

  await fs.writeFile(
    path.join(folder, "article.md"),
    `${articleContent}\n`,
    "utf8"
  );

  const writtenFiles: string[] = [
    "metadata.yml",
    "summary.md",
    "article.md",
  ];

  const optionalSections: Array<[string, string]> = [
    ["methodology.md", methodology],
    ["results.md", results],
    ["discussion.md", discussion],
    ["limitations.md", limitations],
    ["future_work.md", futureWork],
    ["key_takeaways.md", keyTakeaways],
  ];

  for (const [filename, content] of optionalSections) {
    if (
      await writeOptionalMarkdown(
        folder,
        filename,
        content
      )
    ) {
      writtenFiles.push(filename);
    }
  }

  if (editorNotes) {
    await fs.writeFile(
      path.join(folder, "founder_notes.md"),
      `${editorNotes}\n`,
      "utf8"
    );

    writtenFiles.push("founder_notes.md");
  }

  if (article.sourcePmid || article.sourceDoi) {
    const citation = {
      references: [
        {
          pmid: article.sourcePmid,
          doi: article.sourceDoi,
          journal: article.sourceJournal,
          publication_date: article.sourcePublicationDate,
          publication_date_type:
            article.sourcePublicationDateType,
          url: buildSourceUrl(article),
        },
      ],
    };

    await fs.writeFile(
      path.join(folder, "citations.yml"),
      dump(citation, {
        noRefs: true,
        lineWidth: 120,
      }),
      "utf8"
    );

    writtenFiles.push("citations.yml");
  }

  return {
    articleId: article.id,
    directory: folder,
    files: writtenFiles,
  };
}