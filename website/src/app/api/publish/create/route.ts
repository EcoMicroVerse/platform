
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
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
}