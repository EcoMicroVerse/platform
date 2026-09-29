import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";
import type { ReviewItem, ApprovedItem } from "./types";

const ROOT = path.resolve(process.cwd(), "..");

export async function loadInbox(): Promise<ReviewItem[]> {
  const dir = path.join(ROOT, "content", "inbox");
  const files = await fs.readdir(dir);

  const items: ReviewItem[] = [];

  for (const file of files.filter(f => f.endsWith(".yml"))) {
    const content = await fs.readFile(path.join(dir, file), "utf8");
    items.push(load(content) as ReviewItem);
  }

  return items;
}

export async function loadApproved(): Promise<ApprovedItem[]> {
  const dir = path.join(ROOT, "content", "approved");
  const folders = await fs.readdir(dir);

  const objects: ApprovedItem[] = [];

  for (const folder of folders) {
    const metadata = path.join(dir, folder, "metadata.yml");

    try {
      const content = await fs.readFile(metadata, "utf8");
      objects.push(load(content) as ApprovedItem);
    } catch {}
  }

  return objects;
}

export interface TimelineEvent {
  timestamp: string;
  type: string;
  title: string;
  collection: string;
}

export async function loadTimeline(): Promise<TimelineEvent[]> {
  const file = path.join(ROOT, "memory-engine", "founder_timeline.yml");

  try {
    const content = await fs.readFile(file, "utf8");
    const parsed = load(content) as { events?: TimelineEvent[] };

    return (parsed.events ?? []).sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );
  } catch {
    return [];
  }
}
export interface WorkflowStatus {
  scannerToday: boolean;
  pendingReview: number;
  weeklyPulse: boolean;
  dashboardReady: boolean;
}
export async function loadWorkflowStatus() {
  return {
    scannerToday: true,
    pendingReview: 18,
    weeklyPulse: false,
    dashboardReady: true,
  };
}

export async function loadFounderBrief() {
  const file = path.join(
    ROOT,
    "content",
    "dashboard",
    "founder_brief.yml"
  );

  const content = await fs.readFile(file, "utf8");

  return load(content) as any;
}

export async function loadAnalytics() {
  const file = path.join(
    ROOT,
    "content",
    "dashboard",
    "analytics.yml"
  );

  const content = await fs.readFile(file, "utf8");

  return load(content) as any;
}
export async function loadMomentum() {

  const file = path.join(
    ROOT,
    "content",
    "dashboard",
    "momentum.yml"
  );

  const content = await fs.readFile(file,"utf8");

  return load(content) as any;

}