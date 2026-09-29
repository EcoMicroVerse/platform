
import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";

const DAILY_DIR = path.join(
  process.cwd(),
  "content",
  "daily"
);

export async function loadTodayDiscovery() {
  const files = (await fs.readdir(DAILY_DIR))
    .filter((f) => f.endsWith(".yml"))
    .sort()
    .reverse();

  if (files.length === 0) return null;

  const file = await fs.readFile(
    path.join(DAILY_DIR, files[0]),
    "utf8"
  );

  return load(file) as any;
}