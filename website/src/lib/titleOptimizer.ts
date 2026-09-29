
export type OptimizedTitles = {
  canonical: string;
  website: string;
  linkedin: string;
  x: string;
  newsletter: string;
  instagram: string;
};

function shorten(title: string, max: number) {
  if (title.length <= max) return title;

  return title.slice(0, max - 1).trim() + "…";
}

export function optimizeTitles(article: any): OptimizedTitles {
  const title = article.metadata.title;

  const collection =
    article.metadata.recommended_collection;

  return {
    canonical: title,

    website: title,

    linkedin: shorten(
      `New research: ${title}`,
      110
    ),

    x: shorten(
      `${title} 🧵`,
      70
    ),

    newsletter: shorten(
      `${collection}: ${title}`,
      85
    ),

    instagram: shorten(
      title.replace(/^Isolation and characterization of\s*/i, ""),
      45
    ),
  };
}