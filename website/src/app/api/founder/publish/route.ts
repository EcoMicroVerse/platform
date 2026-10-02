import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

export async function POST(): Promise<Response> {
  try {
    await requirePermission("articles.publish");

    const ROOT = path.resolve(process.cwd(), "..");

    return new Promise<Response>((resolve) => {
      const processRun = spawn("python", [
        path.join(
          ROOT,
          "automation",
          "editorial_pipeline",
          "publish_object.py"
        ),
      ]);

      let output = "";
      let error = "";

      processRun.stdout.on("data", (d) => {
        output += d.toString();
      });

      processRun.stderr.on("data", (d) => {
        error += d.toString();
      });

      processRun.on("close", (code) => {
        resolve(
          NextResponse.json({
            success: code === 0,
            output,
            error,
          })
        );
      });

      processRun.on("error", (err) => {
        resolve(
          NextResponse.json(
            {
              success: false,
              error: err.message,
            },
            { status: 500 }
          )
        );
      });
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
          error: "You do not have permission to publish articles.",
        },
        { status: 403 }
      );
    }

    console.error("Failed to start publishing pipeline:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to start publishing pipeline.",
      },
      { status: 500 }
    );
  }
}