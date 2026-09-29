import { loadYaml } from "./registryManager";
import type { PubMedArticle } from "./pubmedScanner";

type TopicDefinition = {
  id: string;
  name: string;
  keywords: string[];
};

type TopicRegistry = {
  topics?: TopicDefinition[];
};

export type TopicMatch = {
  id: string;
  name: string;
  matchedKeywords: string[];
  score: number;
};

export type RelevanceResult = {
  score: number;
  tier: "high" | "medium" | "low" | "minimal";
  topics: TopicMatch[];
  matchedKeywords: string[];
};

const DEFAULT_TOPICS: TopicDefinition[] = [
  {
    id: "phage",
    name: "Phage",
    keywords: ["bacteriophage", "phage", "phages"],
  },
  {
    id: "prophage",
    name: "Prophage",
    keywords: ["prophage", "prophages", "lysogenic", "lysogeny"],
  },
  {
    id: "viral_ecology",
    name: "Viral Ecology",
    keywords: [
      "viral ecology",
      "virus-host interaction",
      "phage-host interaction",
      "virome",
      "viral diversity",
    ],
  },
  {
    id: "methanotroph",
    name: "Methanotroph",
    keywords: [
      "methanotroph",
      "methanotrophs",
      "methane-oxidizing bacteria",
      "methane oxidizing bacteria",
      "methane monooxygenase",
      "pmoA",
      "mmoX",
    ],
  },
  {
    id: "metagenomics",
    name: "Metagenomics",
    keywords: [
      "metagenome",
      "metagenomic",
      "metagenomics",
      "shotgun metagenomics",
    ],
  },
  {
    id: "metatranscriptomics",
    name: "Metatranscriptomics",
    keywords: [
      "metatranscriptome",
      "metatranscriptomic",
      "metatranscriptomics",
    ],
  },
  {
    id: "freshwater",
    name: "Freshwater",
    keywords: [
      "freshwater",
      "freshwater lake",
      "freshwater lakes",
      "lake",
      "lakes",
      "river",
      "rivers",
    ],
  },
  {
    id: "marine",
    name: "Marine",
    keywords: [
      "marine",
      "ocean",
      "oceans",
      "seawater",
      "marine microbiome",
    ],
  },
  {
    id: "bioinformatics",
    name: "Bioinformatics",
    keywords: [
      "bioinformatics",
      "computational biology",
      "genome analysis",
      "genomic analysis",
      "sequence analysis",
      "prophage prediction",
    ],
  },
  {
    id: "genome_assembly",
    name: "Genome Assembly",
    keywords: [
      "genome assembly",
      "genome assemblies",
      "assembly",
      "contig",
      "contigs",
    ],
  },
  {
    id: "mag",
    name: "MAG",
    keywords: [
      "metagenome-assembled genome",
      "metagenome assembled genome",
      "metagenome-assembled genomes",
      "mag",
      "mags",
    ],
  },
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function containsKeyword(
  text: string,
  keyword: string
): boolean {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return false;
  }

  return text.includes(normalizedKeyword);
}

async function loadTopics(): Promise<TopicDefinition[]> {
  const registry = await loadYaml<TopicRegistry>(
    "content/intelligence/pubmed-topics.yml",
    {
      topics: DEFAULT_TOPICS,
    }
  );

  return registry.topics ?? DEFAULT_TOPICS;
}

export async function scorePubMedArticle(
  article: PubMedArticle
): Promise<RelevanceResult> {
  const topics = await loadTopics();

  const title = normalizeText(article.title);
  const abstract = normalizeText(article.abstract);

  const matches: TopicMatch[] = [];

  for (const topic of topics) {
    const matchedKeywords: string[] = [];
    let score = 0;

    for (const keyword of topic.keywords) {
      const inTitle = containsKeyword(title, keyword);
      const inAbstract = containsKeyword(
        abstract,
        keyword
      );

      if (inTitle) {
        matchedKeywords.push(keyword);
        score += 5;
      } else if (inAbstract) {
        matchedKeywords.push(keyword);
        score += 2;
      }
    }

    if (score > 0) {
      matches.push({
        id: topic.id,
        name: topic.name,
        matchedKeywords,
        score,
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  const totalScore = Math.min(
    matches.reduce(
      (sum, topic) => sum + topic.score,
      0
    ),
    100
  );

  let tier: RelevanceResult["tier"];

  if (totalScore >= 20) {
    tier = "high";
  } else if (totalScore >= 10) {
    tier = "medium";
  } else if (totalScore >= 4) {
    tier = "low";
  } else {
    tier = "minimal";
  }

  return {
    score: totalScore,
    tier,
    topics: matches,
    matchedKeywords: [
      ...new Set(
        matches.flatMap(
          (topic) => topic.matchedKeywords
        )
      ),
    ],
  };
}