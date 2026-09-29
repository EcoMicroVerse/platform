
export type QualityMetric = {
  label: string;
  score: number;
};

export type QualityReport = {
  overall: number;
  verdict:
    | "Publish Ready"
    | "Needs Minor Review"
    | "Needs Major Review";
  metrics: QualityMetric[];
};

export function generateQualityReport(
  copilot: any,
  collection: any,
  titles: any,
  socialPosts: any[],
  graphNodes = 0
): QualityReport {
  const readiness = copilot.score;

  const content =
    copilot.sections.length === 0
      ? 0
      : Math.round(
          (copilot.sections.filter(
            (s: any) => s.status === "Good"
          ).length /
            copilot.sections.length) *
            100
        );

  const collectionScore =
    collection.confidence;

  const titleScore = Math.min(
    100,
    titles.website.length > 20
      ? 95
      : 70
  );

  const socialScore =
    socialPosts.length === 5
      ? 100
      : socialPosts.length * 20;

  const graphScore = Math.min(
    100,
    graphNodes * 8
  );

  const metrics = [
    {
      label: "Readiness",
      score: readiness,
    },
    {
      label: "Content",
      score: content,
    },
    {
      label: "Collection",
      score: collectionScore,
    },
    {
      label: "Title",
      score: titleScore,
    },
    {
      label: "Social",
      score: socialScore,
    },
    {
      label: "Graph",
      score: graphScore,
    },
  ];

  const overall = Math.round(
    metrics.reduce(
      (sum, metric) => sum + metric.score,
      0
    ) / metrics.length
  );

  const verdict =
    overall >= 90
      ? "Publish Ready"
      : overall >= 75
      ? "Needs Minor Review"
      : "Needs Major Review";

  return {
    overall,
    verdict,
    metrics,
  };
}