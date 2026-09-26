
export function interpretQuery(query: string) {
  const q = query.toLowerCase();

  if (
    q.includes("high priority") ||
    q.includes("important")
  ) {
    return {
      intent: "high_priority",
      collection: null,
    };
  }

  if (
    q.includes("phage")
  ) {
    return {
      intent: "collection",
      collection: "TPHAGE",
    };
  }

  if (
    q.includes("approved")
  ) {
    return {
      intent: "approved",
      collection: null,
    };
  }

  if (
    q.includes("timeline") ||
    q.includes("changed")
  ) {
    return {
      intent: "timeline",
      collection: null,
    };
  }

  return {
    intent: "keyword",
    keyword: query,
  };
}