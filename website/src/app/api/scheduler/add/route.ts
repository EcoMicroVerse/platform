import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { load, dump } from "js-yaml";

import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

const SCHEDULER_FILE = path.join(
  process.cwd(),
  "content",
  "scheduler",
  "queue.yml"
);

export async function POST(request: Request) {
  try {
    await requirePermission("assignments.manage");

    const body = await request.json();

    if (
      typeof body.date !== "string" ||
      Number.isNaN(
        new Date(body.date).getTime()
      )
    ) {
      throw new Error(
        "A valid scheduler date is required."
      );
    }

    if (
      typeof body.type !== "string" ||
      !body.type.trim()
    ) {
      throw new Error(
        "Scheduler item type is required."
      );
    }

    if (
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      throw new Error(
        "Scheduler item title is required."
      );
    }

    const file = SCHEDULER_FILE;

    const text = await fs.readFile(
      file,
      "utf8"
    );

    const data = load(text) as {
      queue: any[];
    };

    data.queue.push({
      date: body.date,
      type: body.type.trim(),
      status: "scheduled",
      title: body.title.trim(),
    });

    data.queue.sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

    await fs.writeFile(
      file,
      dump(data)
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (
      error instanceof AuthenticationRequiredError
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    if (
      error instanceof PermissionDeniedError
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You do not have permission to manage assignments.",
        },
        { status: 403 }
      );
    }

    console.error(
      "Failed to add scheduler item:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to add scheduler item.",
      },
      { status: 500 }
    );
  }
}