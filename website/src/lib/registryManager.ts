import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

const CACHE = new Map<string, unknown>();

export async function loadYaml<T>(
  relativePath: string,
  fallback: T
): Promise<T> {
  if (CACHE.has(relativePath)) {
    return CACHE.get(relativePath) as T;
  }

  const file = path.join(ROOT, relativePath);

  try {
    const content = await fs.readFile(file, "utf8");

    const parsed = load(content) as T;

    CACHE.set(relativePath, parsed);

    return parsed;
  } catch {
    CACHE.set(relativePath, fallback);

    return fallback;
  }
}

export function clearRegistryCache() {
  CACHE.clear();
}