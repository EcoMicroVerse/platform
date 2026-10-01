import fs from "fs/promises";
import path from "path";
import { dump } from "js-yaml";
import type { ArticleRecord } from "@/lib/articleStore";
import type { ResearchObjectFile } from "@/lib/githubPublisher";

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
    throw new Error(
      `Cannot publish article: ${fieldName} is empty.`
    );
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
      publication_date_type:
        article.sourcePublicationDateType,
    },
  };
}

function buildMarkdownContent(
  content: string
): string {
  return `${content}\n`;
}

function addFile(
  files: ResearchObjectFile[],
  articleId: string,
  filename: string,
  content: string
): void {
  files.push({
    path: `content/approved/${articleId}/${filename}`,
    content,
  });
}

export type ResearchObjectPublication = {
  articleId: string;
  directory: string;
  files: string[];
  githubFiles: ResearchObjectFile[];
};

export function buildResearchObjectFiles(
  article: ArticleRecord
): ResearchObjectFile[] {
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

  const metadata = buildMetadata(article);

  const files: ResearchObjectFile[] = [];

  addFile(
    files,
    article.id,
    "metadata.yml",
    dump(metadata, {
      noRefs: true,
      lineWidth: 120,
    })
  );

  addFile(
    files,
    article.id,
    "summary.md",
    buildMarkdownContent(summary)
  );

  addFile(
    files,
    article.id,
    "article.md",
    buildMarkdownContent(articleContent)
  );

  const optionalSections: Array<
    [string, string]
  > = [
    ["methodology.md", methodology],
    ["results.md", results],
    ["discussion.md", discussion],
    ["limitations.md", limitations],
    ["future_work.md", futureWork],
    ["key_takeaways.md", keyTakeaways],
  ];

  for (const [filename, content] of optionalSections) {
    if (content) {
      addFile(
        files,
        article.id,
        filename,
        buildMarkdownContent(content)
      );
    }
  }

  if (editorNotes) {
    addFile(
      files,
      article.id,
      "founder_notes.md",
      buildMarkdownContent(editorNotes)
    );
  }

  if (article.sourcePmid || article.sourceDoi) {
    const citation = {
      references: [
        {
          pmid: article.sourcePmid,
          doi: article.sourceDoi,
          journal: article.sourceJournal,
          publication_date:
            article.sourcePublicationDate,
          publication_date_type:
            article.sourcePublicationDateType,
          url: buildSourceUrl(article),
        },
      ],
    };

    addFile(
      files,
      article.id,
      "citations.yml",
      dump(citation, {
        noRefs: true,
        lineWidth: 120,
      })
    );
  }

  return files;
}

export async function publishArticleResearchObject(
  article: ArticleRecord
): Promise<ResearchObjectPublication> {
  const githubFiles =
    buildResearchObjectFiles(article);

  const folder = getApprovedArticleDir(article.id);

  await fs.mkdir(folder, {
    recursive: true,
  });

  const writtenFiles: string[] = [];

  for (const file of githubFiles) {
    const filename = path.basename(file.path);

    await fs.writeFile(
      path.join(folder, filename),
      file.content,
      "utf8"
    );

    writtenFiles.push(filename);
  }

  return {
    articleId: article.id,
    directory: folder,
    files: writtenFiles,
    githubFiles,
  };
}
