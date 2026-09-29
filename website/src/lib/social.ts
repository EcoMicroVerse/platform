
export type SocialPost = {
  platform: string;
  title: string;
  body: string;
};

export function generateSocialPosts(article: any): SocialPost[] {
  const title = article.metadata.title;
  const summary =
    article.summary
      ?.replace(/\n+/g, " ")
      .slice(0, 220) ?? "";

  const collection =
    article.metadata.recommended_collection;

  return [
    {
      platform: "LinkedIn",
      title: "Professional Editorial",
      body: `New research from EcoMicroVerse explores "${title}". ${summary}

Why it matters: this work advances research within ${collection}.

#EcoMicroVerse #Microbiology #Bacteriophages`,
    },

    {
      platform: "X",
      title: "Scientific Thread",
      body: `🧵 New Research Object

${title}

${summary}

Read more →`,
    },

    {
      platform: "Threads",
      title: "Long-form Discussion",
      body: `One of this week's fascinating discoveries:

${title}

${summary}

What questions should researchers explore next?`,
    },

    {
      platform: "Bluesky",
      title: "Research Summary",
      body: `${title}

${summary}

#Science #Microbiology`,
    },

    {
      platform: "Instagram",
      title: "Carousel Draft",
      body: `Slide 1: ${title}

Slide 2: Key finding

Slide 3: Why it matters

Caption:
${summary}`,
    },
  ];
}