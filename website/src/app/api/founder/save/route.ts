import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as yaml from "js-yaml";
import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

const ROOT = path.resolve(process.cwd(), "..");

export async function POST(req: Request) {
  try {
    await requirePermission("articles.edit");

    const {
      id,
      notes,
      summary,
      timeline,
    } = await req.json();

    const folder = path.join(
      ROOT,
      "content",
      "approved",
      id
    );

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