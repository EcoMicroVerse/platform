import { neon } from "@neondatabase/serverless";

export type CandidateStatus =
  | "discovered"
  | "reviewed"
  | "approved"
  | "rejected";

export type CandidateDecision = {
  status: CandidateStatus;
  updatedAt: string;
};

type CandidateDecisionRow = {
  candidate_id: string;
  status: CandidateStatus;
  updated_at: string;
};

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function getSql() {
  return neon(getDatabaseUrl());
}

function defaultDecision(): CandidateDecision {
  return {
    status: "discovered",
    updatedAt: "",
  };
}

export async function getCandidateDecision(
  candidateId: string
): Promise<CandidateDecision> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      candidate_id,
      status,
      updated_at
    FROM candidate_decisions
    WHERE candidate_id = ${candidateId}
    LIMIT 1;
  `;

  if (rows.length === 0) {
    return defaultDecision();
  }

  const row = rows[0] as CandidateDecisionRow;

  return {
    status: row.status,
    updatedAt: row.updated_at,
  };
}

export async function getAllCandidateDecisions(): Promise<
  Record<string, CandidateDecision>
> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      candidate_id,
      status,
      updated_at
    FROM candidate_decisions
    ORDER BY updated_at DESC;
  `;

  const decisions: Record<string, CandidateDecision> = {};

  for (const rawRow of rows) {
    const row = rawRow as CandidateDecisionRow;

    decisions[row.candidate_id] = {
      status: row.status,
      updatedAt: row.updated_at,
    };
  }

  return decisions;
}

export async function setCandidateStatus(
  candidateId: string,
  status: CandidateStatus
): Promise<CandidateDecision> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO candidate_decisions (
      candidate_id,
      status,
      updated_at
    )
    VALUES (
      ${candidateId},
      ${status},
      NOW()
    )
    ON CONFLICT (candidate_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      updated_at = NOW()
    RETURNING
      candidate_id,
      status,
      updated_at;
  `;

  const row = rows[0] as CandidateDecisionRow;

  return {
    status: row.status,
    updatedAt: row.updated_at,
  };
}