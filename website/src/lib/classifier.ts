
export type CollectionSuggestion = {
  current: string;
  suggested: string;
  confidence: number;
  reasons: string[];
};

const COLLECTION_RULES = {
  TPhage: [
    "virulent",
    "lytic",
    "isolation",
    "plaque",
    "host range",
  ],
  Prophages: [
    "prophage",
    "lysogeny",
    "induction",
    "phaster",
    "phigaro",
  ],
  Tools: [
    "software",
    "pipeline",
    "workflow",
    "tool",
    "algorithm",
  ],
  "Microbial Ecology": [
    "community",
    "freshwater",
    "ecosystem",
    "ecology",
    "environment",
  ],
  Metagenomics: [
    "metagenome",
    "MAG",
    "assembly",
    "contigs",
    "binning",
  ],
} as const;

export function suggestCollection(
  article: any
): CollectionSuggestion {
  const text = [
    article.metadata?.title,
    article.summary,
    article.methodology,
    article.results,
    article.discussion,
  ]
    .join(" ")
    .toLowerCase();

  let bestCollection =
    article.metadata.recommended_collection;

  let bestScore = 0;

  const reasons: string[] = [];

  Object.entries(COLLECTION_RULES).forEach(
    ([collection, keywords]) => {
      let score = 0;

      keywords.forEach((word) => {
        if (text.includes(word)) {
          score++;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestCollection = collection;
      }
    }
  );

  COLLECTION_RULES[
    bestCollection as keyof typeof COLLECTION_RULES
  ]?.forEach((word) => {
    if (text.includes(word)) {
      reasons.push(`Detected "${word}"`);
    }
  });

  return {
    current:
      article.metadata.recommended_collection,
    suggested: bestCollection,
    confidence: Math.min(
      100,
      60 + bestScore * 10
    ),
    reasons,
  };
}