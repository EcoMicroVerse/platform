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
    await requirePermission("articles.read");

    const { id } = await req.json();

    const folder = path.join(ROOT, "content", "approved", id);

    const metadata = yaml.load(
      await fs.readFile(
        path.join(folder, "metadata.yml"),
        "utf8"
      )
    );

    const notes = await fs.readFile(
      path.join(folder, "founder_notes.md"),
      "utf8"
    );

    const summary = await fs.readFile(
      path.join(folder, "summary.md"),
      "utf8"
    );

    const timeline = yaml.load(
      await fs.readFile(
        path.join(folder, "timeline.yml"),
        "utf8"
      )
    );

    return NextResponse.json({
      metadata,
      notes,
      summary,
      timeline,
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
          error: "You do not have permission to read articles.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Object not found",
      },
      { status: 404 }
    );
  }
}