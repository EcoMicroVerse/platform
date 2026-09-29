
import { getEntityInfo } from "./entityIntelligence";

export async function answerQuestion(
  question: string
) {
  const q = question.toLowerCase();

  if (q.includes("phaster")) {
    return await getEntityInfo("PHASTER");
  }

  if (q.includes("phigaro")) {
    return await getEntityInfo("Phigaro");
  }

  if (q.includes("methanotroph")) {
    return await getEntityInfo("Methanotroph");
  }

  return null;
}