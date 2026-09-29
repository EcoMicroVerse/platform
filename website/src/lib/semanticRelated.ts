import { loadApproved } from "./dashboard";
import { getAllEntities } from "./entityIntelligence";

export type RelatedArticle = {
  id: string;
  title: string;
  collection: string;
  score: number;
  sharedEntities: string[];
  reason: string;
};

function findEntities(text: string, entities: string[]) {
  const lower = text.toLowerCase();

  return entities.filter((entity) =>
    lower.includes(entity.toLowerCase())
  );
}

export async function getSemanticRelated(
  current: any
): Promise<RelatedArticle[]> {
  const approved = await loadApproved();

  const entityNames = (
    await getAllEntities()
  ).map((entity) => entity.name);

  const currentText = JSON.stringify(current);

  const currentEntities = findEntities(
    currentText,
    entityNames
  );

  const results: RelatedArticle[] = [];

  for (const article of approved) {
    const currentId =
      current.emv_id ??
      current.id ??
      "";

    const articleId =
      (article as any).emv_id ??
      (article as any).id ??
      "";

    if (articleId === currentId)
      continue;

    const articleText =
      JSON.stringify(article);

    const articleEntities =
      findEntities(
        articleText,
        entityNames
      );

    const shared =
      currentEntities.filter((entity) =>
        articleEntities.includes(entity)
      );

    let score =
      shared.length * 10;

    const articleCollection =
      (article as any).recommended_collection ??
      "General";

    const currentCollection =
      current.recommended_collection ??
      "General";

    if (
      articleCollection === currentCollection
    ) {
      score += 20;
    }

    if (score === 0)
      continue;

    const reason =
      articleCollection === currentCollection
        ? "Same editorial collection"
        : `Shares ${shared.length} scientific entit${
            shared.length === 1
              ? "y"
              : "ies"
          }`;

    results.push({
      id: articleId,
      title: article.title,
      collection: articleCollection,
      score,
      sharedEntities: shared,
      reason,
    });
  }

  return results
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, 4);
}