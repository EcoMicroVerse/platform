import {
  getAllEntities,
  getEntityInfo,
} from "./entityIntelligence";

let namesCache: string[] | null = null;

let entityCache:
  | Map<string, any>
  | null = null;

// Existing helper
export async function getEntityNames() {
  if (namesCache) return namesCache;

  const entities =
    await getAllEntities();

  namesCache = entities.map(
    (entity) => entity.name
  );

  return namesCache;
}

// New helper (Step 13.12.5)
export async function getEntityMap() {
  if (entityCache) return entityCache;

  const entities =
    await getAllEntities();

  entityCache = new Map(
    entities.map((entity) => [
      entity.name.toLowerCase(),
      entity,
    ])
  );

  return entityCache;
}

// Fast lookup helper
export async function getCachedEntity(
  name: string
) {
  const map =
    await getEntityMap();

  return (
    map.get(name.toLowerCase()) ??
    null
  );
}