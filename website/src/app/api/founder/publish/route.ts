import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(): Promise<Response> {
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
}