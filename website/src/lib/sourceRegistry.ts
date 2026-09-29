import { loadYaml } from "./registryManager";

export type Source = {
  name: string;
  id: string;
  enabled: boolean;
  category: string;
  frequency: string;
};

const DEFAULT_SOURCES: Source[] = [
  {
    name: "PubMed",
    id: "pubmed",
    enabled: true,
    category: "Literature",
    frequency: "daily",
  },
  {
    name: "bioRxiv",
    id: "biorxiv",
    enabled: true,
    category: "Preprint",
    frequency: "daily",
  },
  {
    name: "arXiv",
    id: "arxiv",
    enabled: true,
    category: "Preprint",
    frequency: "daily",
  },
  {
    name: "Nature Microbiology",
    id: "nature_microbiology",
    enabled: true,
    category: "Journal",
    frequency: "weekly",
  },
  {
    name: "ISME Journal",
    id: "isme",
    enabled: true,
    category: "Journal",
    frequency: "weekly",
  },
];

type SourceRegistry = {
  sources?: Source[];
};

export async function loadSources(): Promise<Source[]> {
  const registry = await loadYaml<SourceRegistry>(
    "content/sources/sources.yml",
    {
      sources: DEFAULT_SOURCES,
    }
  );

  return registry.sources ?? DEFAULT_SOURCES;
}