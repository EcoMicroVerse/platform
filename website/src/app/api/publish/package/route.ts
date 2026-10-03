import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

import { requireSafePathSegment } from "@/lib/emvIdStore";

export async function POST(request: Request) {
  try {
    await requirePermission("articles.edit");

    const body = await request.json();

    const id = requireSafePathSegment(
      body.id,
      "Publication package ID"
    );

    if (
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      throw new Error(
        "Publication package title is required."
      );
    }

    const title = body.title.trim();

    const jobsDir = path.join(
      process.cwd(),
      "content",
      "publication_jobs"
);

    await fs.mkdir(jobsDir, { recursive: true });

    const timestamp = new Date().toISOString();

    const publication = {
      id,
      title,
      status: "draft",
      created: timestamp,
      updated: timestamp,

      channels: {
        website: {
          title,
        },

        newsletter: {
          subject: `EcoMicroVerse • ${title}`,
        },

        linkedin: {
          text: `${title}\n\nRead more on EcoMicroVerse.`,
        },

        bluesky: {
          text: title,
        },

        x: {
          text: title,
        },
      },
    };

    await fs.writeFile(
      path.join(jobsDir, `${id}.json`),
      JSON.stringify(publication, null, 2)
    );

    return NextResponse.json({
      success: true,
      publication,
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
          error:
            "You do not have permission to create publication packages.",
        },
        { status: 403 }
      );
    }

    console.error(
      "Failed to create publication package:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create publication package.",
      },
      { status: 500 }
    );
  }
}