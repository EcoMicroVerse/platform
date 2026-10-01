export type PublicationDateType =
  | "electronic"
  | "issue"
  | "unknown";

export type PubMedArticle = {
  pmid: string;
  title: string;
  abstract: string;
  journal: string;
  publicationDate: string;
  publicationDateType: PublicationDateType;
  authors: string[];
  doi?: string;
  url: string;
};

const PUBMED_EUTILS =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

const DEFAULT_QUERIES = [
  "bacteriophage",
  "prophage",
  "viral ecology",
  "methanotroph",
  "methane oxidizing bacteria",
  "metagenomics",
  "metatranscriptomics",
];

const NCBI_TOOL =
  process.env.NCBI_TOOL ?? "EcoMicroVerse";

const NCBI_EMAIL =
  process.env.NCBI_EMAIL ?? "";

const NCBI_API_KEY =
  process.env.NCBI_API_KEY ?? "";

type PubMedSearchResponse = {
  esearchresult?: {
    idlist?: string[];
  };
};

type PubMedSummary = {
  result?: Record<
    string,
    {
      uid?: string;
      title?: string;
      fulljournalname?: string;
      pubdate?: string;
      authors?: Array<{
        name?: string;
      }>;
      articleids?: Array<{
        idtype?: string;
        value?: string;
      }>;
    }
  >;
};

function cleanText(value: string | undefined): string {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildParams(
  params: Record<string, string>
): URLSearchParams {
  const searchParams = new URLSearchParams(params);

  searchParams.set("tool", NCBI_TOOL);

  if (NCBI_EMAIL) {
    searchParams.set("email", NCBI_EMAIL);
  }

  if (NCBI_API_KEY) {
    searchParams.set("api_key", NCBI_API_KEY);
  }

  return searchParams;
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

async function fetchWithRetry(
  url: string,
  attempts = 3
): Promise<Response> {
  let lastResponse: Response | null = null;

  for (
    let attempt = 0;
    attempt < attempts;
    attempt++
  ) {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (response.ok) {
      return response;
    }

    lastResponse = response;

    if (
      response.status !== 429 &&
      response.status < 500
    ) {
      return response;
    }

    if (attempt < attempts - 1) {
      const delay = 1000 * Math.pow(2, attempt);
      await wait(delay);
    }
  }

  return lastResponse!;
}

async function searchPubMed(
  query: string,
  retmax = 20
): Promise<string[]> {
  const params = buildParams({
    db: "pubmed",
    term: query,
    retmode: "json",
    retmax: String(retmax),
    sort: "pub_date",
  });

  const response = await fetchWithRetry(
    `${PUBMED_EUTILS}/esearch.fcgi?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `PubMed search failed: ${response.status} ${response.statusText}`
    );
  }

  const data =
    (await response.json()) as PubMedSearchResponse;

  return data.esearchresult?.idlist ?? [];
}

async function fetchPubMedSummaries(
  ids: string[]
): Promise<PubMedArticle[]> {
  if (ids.length === 0) {
    return [];
  }

  const params = buildParams({
    db: "pubmed",
    id: ids.join(","),
    retmode: "json",
  });

  const response = await fetchWithRetry(
    `${PUBMED_EUTILS}/esummary.fcgi?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `PubMed summary request failed: ${response.status} ${response.statusText}`
    );
  }

  const data =
    (await response.json()) as PubMedSummary;

  const results = data.result ?? {};

  return ids
    .map((id) => {
      const record = results[id];

      if (!record) {
        return null;
      }

      const doi =
        record.articleids?.find(
          (item) => item.idtype === "doi"
        )?.value;

      const publicationDate =
        cleanText(record.pubdate);

      return {
        pmid: id,
        title: cleanText(record.title),
        abstract: "",
        journal: cleanText(record.fulljournalname),
        publicationDate,
        publicationDateType:
          publicationDate ? "issue" : "unknown",
        authors:
          record.authors
            ?.map((author) =>
              cleanText(author.name)
            )
            .filter(Boolean) ?? [],
        doi,
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      };
    })
    .filter(Boolean) as PubMedArticle[];
}

function parseElectronicPublicationDate(
  block: string
): string {
  const match = block.match(
    /<ArticleDate\s+DateType="Electronic">([\s\S]*?)<\/ArticleDate>/
  );

  if (!match) {
    return "";
  }

  const content = match[1];

  const year =
    content.match(
      /<Year>([\s\S]*?)<\/Year>/
    )?.[1];

  const month =
    content.match(
      /<Month>([\s\S]*?)<\/Month>/
    )?.[1];

  const day =
    content.match(
      /<Day>([\s\S]*?)<\/Day>/
    )?.[1];

  const cleanYear = cleanText(year);
  const cleanMonth = cleanText(month);
  const cleanDay = cleanText(day);

  if (!cleanYear) {
    return "";
  }

  if (!cleanMonth) {
    return cleanYear;
  }

  if (!cleanDay) {
    return `${cleanYear}-${cleanMonth.padStart(
      2,
      "0"
    )}`;
  }

  return `${cleanYear}-${cleanMonth.padStart(
    2,
    "0"
  )}-${cleanDay.padStart(2, "0")}`;
}

async function fetchPubMedAbstracts(
  ids: string[]
): Promise<{
  abstracts: Map<string, string>;
  publicationDates: Map<string, string>;
}> {
  const abstracts = new Map<string, string>();
  const publicationDates = new Map<
    string,
    string
  >();

  if (ids.length === 0) {
    return {
      abstracts,
      publicationDates,
    };
  }

  const params = buildParams({
    db: "pubmed",
    id: ids.join(","),
    retmode: "xml",
  });

  const response = await fetchWithRetry(
    `${PUBMED_EUTILS}/efetch.fcgi?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `PubMed abstract request failed: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();

  /*
   * PubMed returns one <PubmedArticle> block
   * per publication.
   */
  const articleBlocks =
    xml.match(
      /<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g
    ) ?? [];

  for (const block of articleBlocks) {
    const pmidMatch = block.match(
      /<PMID[^>]*>([\s\S]*?)<\/PMID>/
    );

    if (!pmidMatch) {
      continue;
    }

    const pmid = cleanText(
      pmidMatch[1].replace(/<[^>]+>/g, "")
    );

    /*
     * Prefer PubMed's electronic publication date
     * over the journal issue date.
     */
    const electronicPublicationDate =
      parseElectronicPublicationDate(block);

    if (electronicPublicationDate) {
      publicationDates.set(
        pmid,
        electronicPublicationDate
      );
    }

    const abstractMatches = [
      ...block.matchAll(
        /<AbstractText(?:[^>]*)>([\s\S]*?)<\/AbstractText>/g
      ),
    ];

    if (abstractMatches.length === 0) {
      abstracts.set(pmid, "");
      continue;
    }

    const abstract = abstractMatches
      .map((match) =>
        cleanText(
          match[1]
            .replace(/<[^>]+>/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&#x27;/g, "'")
            .replace(/&quot;/g, '"')
        )
      )
      .filter(Boolean)
      .join(" ");

    abstracts.set(pmid, abstract);
  }

  return {
    abstracts,
    publicationDates,
  };
}

export async function scanPubMed(
  queries: string[] = DEFAULT_QUERIES,
  retmax = 20
): Promise<PubMedArticle[]> {
  const uniqueIds = new Set<string>();

  for (const query of queries) {
    const ids = await searchPubMed(
      query,
      retmax
    );

    for (const id of ids) {
      uniqueIds.add(id);
    }

    /*
     * Keep requests below NCBI's
     * recommended request frequency.
     */
    await wait(350);
  }

  const ids = [...uniqueIds];

  const articles =
    await fetchPubMedSummaries(ids);

  await wait(350);

  const fetchedData =
    await fetchPubMedAbstracts(ids);

  return articles.map((article) => {
    const electronicPublicationDate =
      fetchedData.publicationDates.get(
        article.pmid
      );

    return {
      ...article,

      publicationDate:
        electronicPublicationDate ??
        article.publicationDate,

      publicationDateType:
        electronicPublicationDate
          ? "electronic"
          : article.publicationDateType,

      abstract:
        fetchedData.abstracts.get(
          article.pmid
        ) ?? "",
    };
  });
}

export function getDefaultPubMedQueries(): string[] {
  return [...DEFAULT_QUERIES];
}