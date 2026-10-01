import { neon } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return url;
}

function getSql() {
  return neon(getDatabaseUrl());
}

export type ArticleStatus =
  | "draft"
  | "review"
  | "approved"
  | "published"
  | "archived";

export type ArticleType = "research_object";

export type CreateArticleInput = {
  id: string;
  candidateId: string;
  title: string;
  collection: string;
  slug?: string | null;
  status?: ArticleStatus;
  articleType?: ArticleType;
  contentPath?: string | null;

  sourcePmid?: string | null;
  sourceDoi?: string | null;
  sourceJournal?: string | null;
  sourcePublicationDate?: string | null;
  sourcePublicationDateType?: string | null;
  sourceAbstract?: string | null;

  relevanceScore?: number | null;
  relevanceTier?: string | null;
  editorialPriority?: string | null;
};

export type ArticleRecord = {
  id: string;
  candidateId: string | null;
  title: string;
  slug: string | null;
  status: ArticleStatus;
  articleType: ArticleType;
  collection: string | null;
  contentPath: string | null;

  sourcePmid: string | null;
  sourceDoi: string | null;
  sourceJournal: string | null;
  sourcePublicationDate: string | null;
  sourcePublicationDateType: string | null;
  sourceAbstract: string | null;

  relevanceScore: number | null;
  relevanceTier: string | null;
  editorialPriority: string | null;

  summary: string | null;
  methodology: string | null;
  results: string | null;
  discussion: string | null;
  limitations: string | null;
  futureWork: string | null;
  keyTakeaways: string | null;
  articleContent: string | null;
  editorNotes: string | null;

  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type UpdateArticleContentInput = {
  title?: string;
  summary?: string | null;
  methodology?: string | null;
  results?: string | null;
  discussion?: string | null;
  limitations?: string | null;
  futureWork?: string | null;
  keyTakeaways?: string | null;
  articleContent?: string | null;
  editorNotes?: string | null;
};

export type UpdateArticleSourceInput = {
  sourcePmid: string;
  sourceDoi: string | null;
  sourceJournal: string;
  sourcePublicationDate: string;
  sourcePublicationDateType: string;
  sourceAbstract: string;
};

function mapArticleRow(row: any): ArticleRecord {
  return {
    id: row.id,
    candidateId: row.candidate_id ?? null,
    title: row.title,
    slug: row.slug ?? null,
    status: row.status,
    articleType: row.article_type,
    collection: row.collection ?? null,
    contentPath: row.content_path ?? null,

    sourcePmid: row.source_pmid ?? null,
    sourceDoi: row.source_doi ?? null,
    sourceJournal: row.source_journal ?? null,
    sourcePublicationDate:
      row.source_publication_date ?? null,
    sourcePublicationDateType:
      row.source_publication_date_type ?? null,
    sourceAbstract:
      row.source_abstract ?? null,

    relevanceScore:
      row.relevance_score ?? null,
    relevanceTier:
      row.relevance_tier ?? null,
    editorialPriority:
      row.editorial_priority ?? null,

    summary: row.summary ?? null,
    methodology: row.methodology ?? null,
    results: row.results ?? null,
    discussion: row.discussion ?? null,
    limitations: row.limitations ?? null,
    futureWork: row.future_work ?? null,
    keyTakeaways: row.key_takeaways ?? null,
    articleContent: row.article_content ?? null,
    editorNotes: row.editor_notes ?? null,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? null,
  };
}

const ARTICLE_COLUMNS = `
  id,
  candidate_id,
  title,
  slug,
  status,
  article_type,
  collection,
  content_path,
  source_pmid,
  source_doi,
  source_journal,
  source_publication_date,
  source_publication_date_type,
  source_abstract,
  relevance_score,
  relevance_tier,
  editorial_priority,
  summary,
  methodology,
  results,
  discussion,
  limitations,
  future_work,
  key_takeaways,
  article_content,
  editor_notes,
  created_at,
  updated_at,
  published_at
`;

export async function getArticleById(
  id: string
): Promise<ArticleRecord | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      ${sql.unsafe(ARTICLE_COLUMNS)}
    FROM articles
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapArticleRow(rows[0]);
}

export async function getArticleByCandidateId(
  candidateId: string
): Promise<ArticleRecord | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      ${sql.unsafe(ARTICLE_COLUMNS)}
    FROM articles
    WHERE candidate_id = ${candidateId}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapArticleRow(rows[0]);
}

export async function getAllArticles(): Promise<ArticleRecord[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      ${sql.unsafe(ARTICLE_COLUMNS)}
    FROM articles
    ORDER BY created_at DESC
  `;

  return rows.map(mapArticleRow);
}

export async function createArticle(
  input: CreateArticleInput
): Promise<ArticleRecord> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO articles (
      id,
      candidate_id,
      title,
      slug,
      status,
      article_type,
      collection,
      content_path,
      source_pmid,
      source_doi,
      source_journal,
      source_publication_date,
      source_publication_date_type,
      source_abstract,
      relevance_score,
      relevance_tier,
      editorial_priority
    )
    VALUES (
      ${input.id},
      ${input.candidateId},
      ${input.title},
      ${input.slug ?? null},
      ${input.status ?? "draft"},
      ${input.articleType ?? "research_object"},
      ${input.collection},
      ${input.contentPath ?? null},
      ${input.sourcePmid ?? null},
      ${input.sourceDoi ?? null},
      ${input.sourceJournal ?? null},
      ${input.sourcePublicationDate ?? null},
      ${input.sourcePublicationDateType ?? null},
      ${input.sourceAbstract ?? null},
      ${input.relevanceScore ?? null},
      ${input.relevanceTier ?? null},
      ${input.editorialPriority ?? null}
    )
    RETURNING
      ${sql.unsafe(ARTICLE_COLUMNS)}
  `;

  return mapArticleRow(rows[0]);
}

export async function updateArticleContent(
  id: string,
  input: UpdateArticleContentInput
): Promise<ArticleRecord> {
  const sql = getSql();

  const rows = await sql`
    UPDATE articles
    SET
      title = COALESCE(${input.title ?? null}, title),
      summary = ${input.summary ?? null},
      methodology = ${input.methodology ?? null},
      results = ${input.results ?? null},
      discussion = ${input.discussion ?? null},
      limitations = ${input.limitations ?? null},
      future_work = ${input.futureWork ?? null},
      key_takeaways = ${input.keyTakeaways ?? null},
      article_content = ${input.articleContent ?? null},
      editor_notes = ${input.editorNotes ?? null},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING
      ${sql.unsafe(ARTICLE_COLUMNS)}
  `;

  if (rows.length === 0) {
    throw new Error(`Article not found: ${id}`);
  }

  return mapArticleRow(rows[0]);
}

export async function updateArticleSource(
  articleId: string,
  input: UpdateArticleSourceInput
): Promise<ArticleRecord> {
  const sql = getSql();

  const rows = await sql`
    UPDATE articles
    SET
      source_pmid = ${input.sourcePmid},
      source_doi = ${input.sourceDoi},
      source_journal = ${input.sourceJournal},
      source_publication_date = ${input.sourcePublicationDate},
      source_publication_date_type =
        ${input.sourcePublicationDateType},
      source_abstract = ${input.sourceAbstract},
      updated_at = NOW()
    WHERE id = ${articleId}
    RETURNING
      ${sql.unsafe(ARTICLE_COLUMNS)}
  `;

  if (rows.length === 0) {
    throw new Error(`Article not found: ${articleId}`);
  }

  return mapArticleRow(rows[0]);
}

export async function updateArticleStatus(
  id: string,
  status: ArticleStatus
): Promise<ArticleRecord> {
  const sql = getSql();

  const rows = await sql`
    UPDATE articles
    SET
      status = ${status},
      updated_at = NOW(),
      published_at =
        CASE
          WHEN ${status} = 'published'
            THEN COALESCE(published_at, NOW())
          ELSE published_at
        END
    WHERE id = ${id}
    RETURNING
      ${sql.unsafe(ARTICLE_COLUMNS)}
  `;

  if (rows.length === 0) {
    throw new Error(`Article not found: ${id}`);
  }

  return mapArticleRow(rows[0]);
}