import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";
import type { PubMedArticle } from "./pubmedScanner";

const WEBSITE_ROOT = process.cwd();

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

export type ViralContext =
  | "phage-associated"
  | "bacterial-virus-associated"
  | "broader-viral"
  | "non-viral";

export type ViralEvidence =
  | "direct"
  | "associated"
  | "incidental"
  | "none";

export type ResearchFocus =
  | "phage-focused"
  | "prophage-focused"
  | "viral-ecology-focused"
  | "bacterial-virus-focused"
  | "microbial-context"
  | "broader-viral"
  | "non-viral";

export type RelevanceResult = {
  score: number;
  tier: "high" | "medium" | "low" | "minimal";
  topics: TopicMatch[];
  matchedKeywords: string[];
  viralContext: ViralContext;
  viralEvidence: ViralEvidence;
  researchFocus: ResearchFocus;
};

const DEFAULT_TOPICS: TopicDefinition[] = [
  {
    id: "phage",
    name: "Phage",
    keywords: [
      "bacteriophage",
      "phage",
      "phages",
      "bacteriophages",
      "cyanophage",
      "myophage",
      "podophage",
      "siphovirus",
    ],
  },
  {
    id: "prophage",
    name: "Prophage",
    keywords: [
      "prophage",
      "prophages",
      "lysogenic",
      "lysogeny",
      "lysogenic cycle",
      "prophage induction",
      "temperate phage",
    ],
  },
  {
    id: "viral_ecology",
    name: "Viral Ecology",
    keywords: [
      "viral ecology",
      "virus-host interaction",
      "virus host interaction",
      "phage-host interaction",
      "phage host interaction",
      "viral community",
      "viral communities",
      "viral diversity",
      "viral dynamics",
      "viral populations",
      "viral population",
      "viral assemblage",
      "viral assemblages",
      "virome",
      "viromes",
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
      "particulate methane monooxygenase",
      "soluble methane monooxygenase",
      "pmoA",
      "mmoX",
    ],
  },
  {
    id: "metagenomics",
    name: "Metagenomics",
    keywords: [
      "metagenome",
      "metagenomes",
      "metagenomic",
      "metagenomics",
      "shotgun metagenomics",
      "environmental genomics",
    ],
  },
  {
    id: "metatranscriptomics",
    name: "Metatranscriptomics",
    keywords: [
      "metatranscriptome",
      "metatranscriptomes",
      "metatranscriptomic",
      "metatranscriptomics",
      "transcriptome",
      "environmental transcriptomics",
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
      "limnology",
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
      "marine microbiota",
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
      "viral prediction",
    ],
  },
  {
    id: "genome_assembly",
    name: "Genome Assembly",
    keywords: [
      "genome assembly",
      "genome assemblies",
      "assembly",
      "de novo assembly",
      "contig",
      "contigs",
      "scaffolding",
    ],
  },
  {
    id: "mag",
    name: "MAG",
    keywords: [
      "metagenome-assembled genome",
      "metagenome assembled genome",
      "metagenome-assembled genomes",
      "MAG",
      "MAGs",
    ],
  },
  {
    id: "viruses",
    name: "Viruses",
    keywords: [
      "virus",
      "viruses",
      "viral",
      "bacteriovirus",
      "bacterial virus",
      "bacterial viruses",
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

/**
 * Match a keyword as a standalone word or phrase.
 *
 * This prevents matches such as:
 *
 * bacteriophage -> phage
 * cyanophages   -> phages
 *
 * from being counted as separate independent signals.
 */
function containsKeyword(
  text: string,
  keyword: string
): boolean {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return false;
  }

  const escapedKeyword =
    normalizedKeyword.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapedKeyword}(?=$|[^a-z0-9])`,
    "i"
  );

  return pattern.test(text);
}

/**
 * Return all matching keywords, preferring longer terms
 * when one keyword contains another.
 *
 * Example:
 *
 * "bacteriophage" should match:
 *   bacteriophage
 *
 * rather than:
 *   bacteriophage + phage
 */
function getMatchedKeywords(
  text: string,
  keywords: string[]
): string[] {
  const orderedKeywords = [...keywords].sort(
    (a, b) => b.length - a.length
  );

  const matches: string[] = [];

  for (const keyword of orderedKeywords) {
    if (!containsKeyword(text, keyword)) {
      continue;
    }

    const normalizedKeyword =
      normalizeText(keyword);

    const overlapsExisting = matches.some(
      (existing) => {
        const normalizedExisting =
          normalizeText(existing);

        return (
          normalizedExisting.includes(
            normalizedKeyword
          ) ||
          normalizedKeyword.includes(
            normalizedExisting
          )
        );
      }
    );

    if (!overlapsExisting) {
      matches.push(keyword);
    }
  }

  return matches;
}

async function loadTopics(): Promise<TopicDefinition[]> {
  const file = path.join(
    WEBSITE_ROOT,
    "content",
    "intelligence",
    "pubmed-topics.yml"
  );

  try {
    const content = await fs.readFile(
      file,
      "utf8"
    );

    const registry =
      load(content) as TopicRegistry;

    return registry.topics ?? DEFAULT_TOPICS;
  } catch {
    return DEFAULT_TOPICS;
  }
}

function determineViralContext(
  text: string
): ViralContext {
  const phageSignals = [
    "bacteriophage",
    "bacteriophages",
    "phage",
    "phages",
    "prophage",
    "prophages",
    "lysogenic",
    "lysogeny",
    "temperate phage",
    "phage-host interaction",
    "phage host interaction",
  ];

  const bacterialVirusSignals = [
    "bacteriovirus",
    "bacterial virus",
    "bacterial viruses",
  ];

  const bacterialContextSignals = [
    "bacterium",
    "bacteria",
    "bacterial",
    "microbial",
    "microbiome",
    "microbiota",
    "prokaryote",
    "prokaryotic",
    "host bacterium",
    "host bacteria",
  ];

  const viralSignals = [
    "virus",
    "viruses",
    "viral",
    "virome",
    "viral community",
    "viral communities",
    "viral diversity",
    "viral ecology",
    "viral dynamics",
    "viral populations",
    "viral population",
    "viral assemblage",
    "viral assemblages",
    "virus-host interaction",
    "virus host interaction",
  ];

  const hasPhageContext =
    phageSignals.some((signal) =>
      containsKeyword(text, signal)
    );

  if (hasPhageContext) {
    return "phage-associated";
  }

  const hasBacterialVirusContext =
    bacterialVirusSignals.some((signal) =>
      containsKeyword(text, signal)
    );

  if (hasBacterialVirusContext) {
    return "bacterial-virus-associated";
  }

  const hasViralContext =
    viralSignals.some((signal) =>
      containsKeyword(text, signal)
    );

  if (!hasViralContext) {
    return "non-viral";
  }

  const hasBacterialContext =
    bacterialContextSignals.some((signal) =>
      containsKeyword(text, signal)
    );

  if (hasBacterialContext) {
    return "bacterial-virus-associated";
  }

  return "broader-viral";
}

function determineViralEvidence(
  title: string,
  abstract: string,
  context: ViralContext
): ViralEvidence {
  if (context === "non-viral") {
    return "none";
  }

  const directSignals = [
    "bacteriophage",
    "bacteriophages",
    "phage",
    "phages",
    "prophage",
    "prophages",
    "cyanophage",
    "myophage",
    "podophage",
    "siphovirus",
    "bacterial virus",
    "bacterial viruses",
    "bacteriovirus",
    "viral ecology",
    "virus-host interaction",
    "virus host interaction",
    "phage-host interaction",
    "phage host interaction",
    "virome",
    "viromes",
    "cyanophage",
    "cyanophages",
    "myophage",
    "myophages",
    "podophage",
    "podophages",
    "siphovirus",
    "siphoviruses",
  ];

  const titleMatches =
    getMatchedKeywords(
      title,
      directSignals
    );

  if (titleMatches.length > 0) {
    return "direct";
  }

  const abstractMatches =
    getMatchedKeywords(
      abstract,
      directSignals
    );

  if (abstractMatches.length >= 2) {
    return "associated";
  }

  if (abstractMatches.length === 1) {
    return "incidental";
  }

  return "incidental";
}

function determineResearchFocus(
  title: string,
  abstract: string,
  viralContext: ViralContext,
  viralEvidence: ViralEvidence
): ResearchFocus {
  if (viralContext === "non-viral") {
    return "non-viral";
  }

  const prophageSignals = [
    "prophage",
    "prophages",
    "prophage induction",
    "lysogenic",
    "lysogeny",
    "lysogenic cycle",
    "temperate phage",
  ];

  const phageSignals = [
    "bacteriophage",
    "bacteriophages",
    "phage",
    "phages",
    "cyanophage",
    "myophage",
    "podophage",
    "siphovirus",
    "phage-host interaction",
    "phage host interaction",
  ];

  const bacterialVirusSignals = [
    "bacteriovirus",
    "bacterial virus",
    "bacterial viruses",
  ];

  const viralEcologySignals = [
    "viral ecology",
    "viral community",
    "viral communities",
    "viral diversity",
    "viral dynamics",
    "viral population",
    "viral populations",
    "viral assemblage",
    "viral assemblages",
    "virome",
    "viromes",
    "virus-host interaction",
    "virus host interaction",
  ];

  const titleProphage = getMatchedKeywords(
    title,
    prophageSignals
  );

  const titlePhage = getMatchedKeywords(
    title,
    phageSignals
  );

  const titleBacterialVirus = getMatchedKeywords(
    title,
    bacterialVirusSignals
  );

  const titleViralEcology = getMatchedKeywords(
    title,
    viralEcologySignals
  );

  /*
   * Title-level signals are the strongest indication of research focus.
   */

  if (titleProphage.length > 0) {
    return "prophage-focused";
  }

  if (titlePhage.length > 0) {
    return "phage-focused";
  }

  if (titleBacterialVirus.length > 0) {
    return "bacterial-virus-focused";
  }

  if (titleViralEcology.length > 0) {
    return "viral-ecology-focused";
  }

  /*
   * If the title does not explicitly identify the subject,
   * examine the abstract for repeated, specific signals.
   */

  const abstractProphage = getMatchedKeywords(
    abstract,
    prophageSignals
  );

  const abstractPhage = getMatchedKeywords(
    abstract,
    phageSignals
  );

  const abstractBacterialVirus = getMatchedKeywords(
    abstract,
    bacterialVirusSignals
  );

  const abstractViralEcology = getMatchedKeywords(
    abstract,
    viralEcologySignals
  );

  if (abstractProphage.length >= 2) {
    return "prophage-focused";
  }

  if (abstractPhage.length >= 2) {
    return "phage-focused";
  }

  if (abstractBacterialVirus.length >= 2) {
    return "bacterial-virus-focused";
  }

  if (abstractViralEcology.length >= 2) {
    return "viral-ecology-focused";
  }

  /*
   * A single viral/phage signal without stronger evidence
   * indicates that the subject is probably contextual rather
   * than the main research focus.
   */

  if (
    viralContext === "phage-associated" ||
    viralContext === "bacterial-virus-associated"
  ) {
    if (
      viralEvidence === "incidental" ||
      viralEvidence === "associated"
    ) {
      return "microbial-context";
    }

    if (viralContext === "bacterial-virus-associated") {
      return "bacterial-virus-focused";
    }

    return "microbial-context";
  }

  if (viralContext === "broader-viral") {
    return "broader-viral";
  }

  return "non-viral";
}

function getTopicWeight(topicId: string) {
  if (topicId === "viruses") {
    return {
      title: 2,
      abstract: 1,
    };
  }

  return {
    title: 5,
    abstract: 2,
  };
}

function getResearchFocusBoost(
  focus: ResearchFocus,
  evidence: ViralEvidence
): number {
  if (evidence === "none" || evidence === "incidental") {
    return 0;
  }

  switch (focus) {
    case "prophage-focused":
      if (evidence === "direct") return 14;
      if (evidence === "associated") return 9;
      return 0;

    case "phage-focused":
      if (evidence === "direct") return 12;
      if (evidence === "associated") return 8;
      return 0;

    case "bacterial-virus-focused":
      if (evidence === "direct") return 10;
      if (evidence === "associated") return 6;
      return 0;

    case "viral-ecology-focused":
      if (evidence === "direct") return 10;
      if (evidence === "associated") return 6;
      return 0;

    case "microbial-context":
      if (evidence === "associated") return 2;
      return 0;

    case "broader-viral":
      return 0;

    case "non-viral":
      return 0;

    default:
      return 0;
  }
}

export async function scorePubMedArticle(
  article: PubMedArticle
): Promise<RelevanceResult> {
  const topics = await loadTopics();

  const title = normalizeText(
    article.title
  );

  const abstract = normalizeText(
    article.abstract
  );

  const combinedText =
    `${title} ${abstract}`;

  const viralContext = determineViralContext(combinedText);
const viralEvidence = determineViralEvidence(
  title,
  abstract,
  viralContext
);

const researchFocus = determineResearchFocus(
  title,
  abstract,
  viralContext,
  viralEvidence
);

const matches: TopicMatch[] = [];

  for (const topic of topics) {
    const titleMatches =
      getMatchedKeywords(
        title,
        topic.keywords
      );

    const abstractMatches =
      getMatchedKeywords(
        abstract,
        topic.keywords
      );

    const matchedKeywords = [
      ...new Set([
        ...titleMatches,
        ...abstractMatches,
      ]),
    ];

    if (
      matchedKeywords.length === 0
    ) {
      continue;
    }

    const weight =
      getTopicWeight(topic.id);

    const titleScore =
      titleMatches.length *
      weight.title;

    const abstractScore =
      abstractMatches.filter(
        (keyword) =>
          !titleMatches.includes(keyword)
      ).length *
      weight.abstract;

    const score =
      titleScore +
      abstractScore;

    if (score > 0) {
      matches.push({
        id: topic.id,
        name: topic.name,
        matchedKeywords,
        score,
      });
    }
  }

  matches.sort(
    (a, b) => b.score - a.score
  );

  const topicScore =
    matches.reduce(
      (sum, topic) =>
        sum + topic.score,
      0
    );

  const researchFocusBoost = getResearchFocusBoost(
    researchFocus,
    viralEvidence
);

  const totalScore = Math.min(
    topicScore + researchFocusBoost,
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
    ...new Set(matches.flatMap(topic => topic.matchedKeywords)),
  ],
  viralContext,
  viralEvidence,
  researchFocus,
};
}