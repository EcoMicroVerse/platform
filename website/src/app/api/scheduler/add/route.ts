
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { load, dump } from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function POST(request: Request) {
  const body = await request.json();

  const file = path.join(
    ROOT,
    "content",
    "scheduler",
    "queue.yml"
  );

  const text = await fs.readFile(file, "utf8");

  const data = load(text) as {
    queue: any[];
  };

  data.queue.push({
    date: body.date,
    type: body.type,
    status: "scheduled",
    title: body.title,
  });

  data.queue.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  await fs.writeFile(file, dump(data));

  return NextResponse.json({
    success: true,
  });
}