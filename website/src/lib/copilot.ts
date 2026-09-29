

export type SectionReport = {
  name: string;
  status: "Good" | "Short" | "Missing";
  words: number;
  suggestion: string;
};

export type CopilotReport = {
  score: number;
  strengths: string[];
  improvements: string[];
  readiness: "Ready" | "Almost Ready" | "Needs Work";
  sections: SectionReport[];
};


function evaluateSection(
  name: string,
  content: string | undefined,
  minimumWords: number
): SectionReport {
  const words =
    content?.trim()
      ? content.trim().split(/\s+/).length
      : 0;

  if (words === 0) {
    return {
      name,
      status: "Missing",
      words,
      suggestion: `Add a ${name} section.`,
    };
  }

  if (words < minimumWords) {
    return {
      name,
      status: "Short",
      words,
      suggestion: `Expand ${name.toLowerCase()} with more scientific detail.`,
    };
  }

  return {
    name,
    status: "Good",
    words,
    suggestion: "",
  };
}

export function analyzeArticle(article: any): CopilotReport {
  const strengths: string[] = [];
  const improvements: string[] = [];

  let score = 0;

  
const sections = [
  evaluateSection(
    "Executive Summary",
    article.summary,
    60
  ),
  evaluateSection(
    "Methodology",
    article.methodology,
    80
  ),
  evaluateSection(
    "Results",
    article.results,
    80
  ),
  evaluateSection(
    "Discussion",
    article.discussion,
    100
  ),
  evaluateSection(
    "Future Work",
    article.future_work,
    40
  ),
];

  function check(
    value: any,
    success: string,
    failure: string,
    points = 10
  ) {
    if (value && String(value).trim().length > 0) {
      strengths.push(success);
      score += points;
    } else {
      improvements.push(failure);
    }
  }

  check(article.metadata?.title,
    "Title is present.",
    "Add a descriptive title.");

  check(article.summary,
    "Executive Summary included.",
    "Add an Executive Summary.");

  check(article.article,
    "Full article written.",
    "Write the full article.");

  check(article.methodology,
    "Methodology documented.",
    "Add a Methodology section.");

  check(article.results,
    "Results included.",
    "Expand the Results section.");

  check(article.discussion,
    "Discussion available.",
    "Add scientific discussion.");

  check(article.timeline?.events?.length,
    "Timeline created.",
    "Add a research timeline.");

  check(article.citations?.length,
    "Citations included.",
    "Add citations.");

  const readiness =
    score >= 80
      ? "Ready"
      : score >= 60
      ? "Almost Ready"
      : "Needs Work";

  
sections.forEach((section) => {
  if (section.status === "Short") {
    improvements.push(section.suggestion);
  }

  if (section.status === "Good") {
    strengths.push(
      `${section.name} is well developed.`
    );
  }
});
  
   
return {
  score,
  strengths,
  improvements,
  readiness,
  sections,
};
}