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

/**
 * Validates a value before it is used as a filesystem path segment.
 *
 * This deliberately does not require the value to match the current
 * EMV ID format, because some existing content may use legacy IDs.
 */
export function isSafePathSegment(
  value: unknown
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  if (trimmed === "." || trimmed === "..") {
    return false;
  }

  if (trimmed.includes("/") || trimmed.includes("\\")) {
    return false;
  }

  if (trimmed.includes("\0")) {
    return false;
  }

  if (trimmed.includes("..")) {
    return false;
  }

  if (trimmed.startsWith("~")) {
    return false;
  }

  return true;
}

/**
 * Returns a validated filesystem path segment or throws a
 * controlled error that can be handled by the calling route.
 */
export function requireSafePathSegment(
  value: unknown,
  fieldName: string
): string {
  if (!isSafePathSegment(value)) {
    throw new Error(
      `${fieldName} must be a valid path identifier.`
    );
  }

  return value.trim();
}

export async function generateEmvId(
  collection: string
): Promise<string> {
  const normalizedCollection =
    collection.trim().toUpperCase();

  if (!normalizedCollection) {
    throw new Error(
      "Collection is required to generate an EMV ID."
    );
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
      next_number =
        emv_counters.next_number + 1,
      updated_at = NOW()
    RETURNING
      next_number - 1 AS generated_number;
  `;

  const generatedNumber = Number(
    rows[0]?.generated_number
  );

  if (
    !Number.isInteger(generatedNumber) ||
    generatedNumber < 1
  ) {
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