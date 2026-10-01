import { neon } from "@neondatabase/serverless";

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

export async function generateEmvId(
  collection: string
): Promise<string> {
  const normalizedCollection = collection.trim().toUpperCase();

  if (!normalizedCollection) {
    throw new Error("Collection is required to generate an EMV ID.");
  }

  const sql = getSql();

  const rows = await sql`
    INSERT INTO emv_counters (
      collection,
      next_number
    )
    VALUES (
      ${normalizedCollection},
      2
    )
    ON CONFLICT (collection)
    DO UPDATE SET
      next_number = emv_counters.next_number + 1,
      updated_at = NOW()
    RETURNING next_number - 1 AS generated_number;
  `;

  const generatedNumber = Number(
    rows[0]?.generated_number
  );

  if (!Number.isInteger(generatedNumber) || generatedNumber < 1) {
    throw new Error(
      `Unable to generate EMV number for collection: ${normalizedCollection}`
    );
  }

  const now = new Date();

  const yearMonth =
    String(now.getUTCFullYear()).slice(-2) +
    String(now.getUTCMonth() + 1).padStart(2, "0");

  return `EMV-${normalizedCollection}${yearMonth}-${String(
    generatedNumber
  ).padStart(4, "0")}`;
}