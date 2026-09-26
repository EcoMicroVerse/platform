import {
  loadInbox,
  loadApproved,
  loadTimeline,
} from "./dashboard";

import { interpretQuery } from "./queryInterpreter";

export async function repositorySearch(query: string) {
  const parsed = interpretQuery(query);
  const q = query.toLowerCase();

  const inbox = await loadInbox();
  const approved = await loadApproved();
  const timeline = await loadTimeline();

  const results: any[] = [];

  // Intent: Show all high-priority inbox papers
if (parsed.intent === "high_priority") {
  return inbox
    .filter((item: any) => item.priority === "high")
    .map((item: any) => ({
      source: "Inbox",
      title: item.title,
      collection: item.recommended_collection || item.collection || "GENERAL",
      priority: item.priority,
      score: item.score,
    }));
}
// Intent: Show approved Research Objects
if (parsed.intent === "approved") {
  return approved.map((item: any) => ({
    source: "Approved",
    title: item.title,
    collection: item.collection || "GENERAL",
    priority: item.priority,
    score: item.score,
  }));
}
// Intent: Show Founder Timeline events
if (parsed.intent === "timeline") {
  return timeline.map((event: any) => ({
    source: "Timeline",
    title: event.title,
    collection: event.collection,
  }));
}
// Intent: Show papers belonging to the TPHAGE collection
if (
  parsed.intent === "collection" &&
  parsed.collection
) {
  return inbox
    .filter(
      (item: any) =>
        item.recommended_collection === parsed.collection
    )
    .map((item: any) => ({
      source: "Inbox",
      title: item.title,
      collection: item.recommended_collection,
      priority: item.priority,
      score: item.score,
    }));
}
  inbox.forEach((item: any) => {
    const text = JSON.stringify(item).toLowerCase();

    if (text.includes(q)) {
      results.push({
        source: "Inbox",
        title: item.title,
        collection: item.recommended_collection || "GENERAL",
        priority: item.priority,
        score: item.score,
      });
    }
  });

  approved.forEach((item: any) => {
    const text = JSON.stringify(item).toLowerCase();

    if (text.includes(q)) {
      results.push({
        source: "Approved",
        title: item.title,
        collection: item.collection,
        priority: item.priority,
        score: item.score,
      });
    }
  });

  timeline.forEach((event: any) => {
    if (event.title.toLowerCase().includes(q)) {
      results.push({
        source: "Timeline",
        title: event.title,
        collection: event.collection,
      });
    }
  });

  return results.slice(0, 10);
}