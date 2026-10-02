import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

export async function POST(request: Request) {
  try {
    await requirePermission("articles.edit");

    const body = await request.json();

    const jobsDir = path.resolve(
      process.cwd(),
      "..",
      "content",
      "publication_jobs"
    );

    await fs.mkdir(jobsDir, { recursive: true });

    const timestamp = new Date().toISOString();

    const publication = {
      id: body.id,
      title: body.title,
      status: "draft",
      created: timestamp,
      updated: timestamp,

      channels: {
        website: {
          title: body.title,
        },

        newsletter: {
          subject: `EcoMicroVerse • ${body.title}`,
        },

        linkedin: {
          text: `${body.title}\n\nRead more on EcoMicroVerse.`,
        },

        bluesky: {
          text: `${body.title}`,
        },

        x: {
          text: body.title,
        },
      },
    };

    await fs.writeFile(
      path.join(jobsDir, `${body.id}.json`),
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
          error: "You do not have permission to create publication packages.",
        },
        { status: 403 }
      );
    }

    console.error("Failed to create publication package:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create publication package.",
      },
      { status: 500 }
    );
  }
}