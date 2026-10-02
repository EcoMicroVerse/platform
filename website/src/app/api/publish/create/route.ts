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

    const job = {
      id: body.id,
      title: body.title,
      status: "draft",
      created: timestamp,
      updated: timestamp,
      channels: {
        website: true,
        newsletter: true,
        linkedin: false,
        bluesky: false,
        x: false,
      },
    };

    await fs.writeFile(
      path.join(jobsDir, `${body.id}.json`),
      JSON.stringify(job, null, 2)
    );

    return NextResponse.json({
      success: true,
      job,
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
          error: "You do not have permission to create publication jobs.",
        },
        { status: 403 }
      );
    }

    console.error("Failed to create publication job:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create publication job.",
      },
      { status: 500 }
    );
  }
}