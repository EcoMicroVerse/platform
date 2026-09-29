import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export type EntityInfo = {
  name: string;
  type: string;
  description: string;
  collections: string[];
  related: string[];
  articles: string[];
};

/**
 * Shared in-memory Entity Database.
 *
 * The database is populated from:
 *
 * EcoMicroVerse/content/entities/*.yml
 *
 * once per server process.
 */
export const ENTITY_DB: Record<
  string,
  EntityInfo
> = {};

let loaded = false;

/**
 * Load all entity YAML files.
 *
 * If the directory is temporarily unavailable,
 * return an empty database rather than crashing
 * the application.
 */
async function loadDatabase() {
  if (loaded) {
    return ENTITY_DB;
  }

  const folder = path.join(
    ROOT,
    "content",
    "entities"
  );

  try {
    const files = await fs.readdir(folder);

    for (const file of files) {
      if (!file.endsWith(".yml")) {
        continue;
      }

      try {
        const content =
          await fs.readFile(
            path.join(folder, file),
            "utf8"
          );

        const entity =
          load(content) as EntityInfo;

        if (!entity?.name) {
          continue;
        }

        ENTITY_DB[entity.name] =
          entity;
      } catch {
        /*
         * Ignore an individual malformed
         * entity file rather than preventing
         * the entire entity database from loading.
         */
        continue;
      }
    }
  } catch {
    /*
     * If content/entities does not exist,
     * return an empty database.
     */
  }

  loaded = true;

  return ENTITY_DB;
}

/**
 * Return a single entity by name.
 */
export async function getEntityInfo(
  name: string
): Promise<EntityInfo | null> {
  const db =
    await loadDatabase();

  return db[name] ?? null;
}

/**
 * Return every loaded entity.
 */
export async function getAllEntities(): Promise<
  EntityInfo[]
> {
  const db =
    await loadDatabase();

  return Object.values(db);
}

/**
 * Return the number of loaded entities.
 */
export async function getEntityCount(): Promise<number> {
  const db =
    await loadDatabase();

  return Object.keys(db).length;
}