import { loadInbox, loadApproved } from "./dashboard";

export async function repositorySearch(query: string) {

  const q = query.toLowerCase();

  const inbox = await loadInbox();
  const approved = await loadApproved();

  const results: any[] = [];

  inbox.forEach((item: any) => {

    const text = JSON.stringify(item).toLowerCase();

    if (text.includes(q)) {
      results.push({
        source: "Inbox",
        title: item.title,
        collection: item.recommended_collection || item.collection,
        priority: item.priority,
      });
    }

  });

  approved.forEach((item: any) => {

    const text = JSON.stringify(item).toLowerCase();

    if (text.includes(q)) {
      results.push({
        source: "Approved",
        title: item.title,
        collection: item.recommended_collection || item.collection,
        priority: item.priority,
      });
    }

  });

  return results;
}