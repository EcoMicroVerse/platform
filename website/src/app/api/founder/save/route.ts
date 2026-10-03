import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as yaml from "js-yaml";
import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

import {
  requireSafePathSegment,
} from "@/lib/emvIdStore";

const APPROVED_DIR = path.join(
  process.cwd(),
  "content",
  "approved"
);

export async function POST(req: Request) {
  try {
    await requirePermission("articles.edit");

    const {
  id: rawId,
  notes,
  summary,
  timeline,
} = await req.json();

const id = requireSafePathSegment(
  rawId,
  "Article ID"
);

if (typeof notes !== "string") {
  throw new Error(
    "Founder notes must be a string."
  );
}

if (typeof summary !== "string") {
  throw new Error(
    "Article summary must be a string."
  );
}

if (
  timeline === null ||
  typeof timeline !== "object"
) {
  throw new Error(
    "Timeline must be an object."
  );
}

    const folder = path.join(
  APPROVED_DIR,
  id
);

await fs.mkdir(folder, {
  recursive: true,
});

await fs.writeFile(
  path.join(folder, "founder_notes.md"),
  notes
);

    await fs.writeFile(
      path.join(folder, "summary.md"),
      summary
    );

    await fs.writeFile(
      path.join(folder, "timeline.yml"),
      yaml.dump({
        timeline,
      })
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof AuthenticationRequiredError) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    if (error instanceof PermissionDeniedError) {
      return NextResponse.json(
        {
          success: false,
          error: "You do not have permission to edit articles.",
        },
        { status: 403 }
      );
    }

    console.error("Failed to save founder content:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save founder content.",
      },
      { status: 500 }
    );
  }
}