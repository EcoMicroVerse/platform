
export interface ProfileMatch {
  name: string;
  score: number;
}

export interface MatchedTerm {
  term: string;
  score: number;
  profiles?: string[];
}

export interface ReviewItem {
  status: string;
  collection: string;
  title: string;
  link?: string;
  published?: string | null;
  type?: string;
  emv_id?: string | null;
  priority: "critical" | "high" | "medium" | "low";
  score: number;
  recommended_collection?: string;
  profile_matches: ProfileMatch[];
  matched_terms: MatchedTerm[];
  founder_decision?: string;
  summary?: string | null;
  why_it_matters?: string | null;
}

export interface ApprovedItem {
  emv_id: string;
  title: string;
  collection: string;
  priority?: string;
  profiles?: string[];
}