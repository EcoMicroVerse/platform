import fs from "fs/promises";
import path from "path";
import * as yaml from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function POST(req: Request) {

  const { id } = await req.json();

  const folder = path.join(ROOT, "content", "approved", id);

  try {

    const metadata = yaml.load(
      await fs.readFile(path.join(folder,"metadata.yml"),"utf8")
    );

    const notes = await fs.readFile(
      path.join(folder,"founder_notes.md"),
      "utf8"
    );

    const summary = await fs.readFile(
      path.join(folder,"summary.md"),
      "utf8"
    );

    const timeline = yaml.load(
      await fs.readFile(path.join(folder,"timeline.yml"),"utf8")
    );

    return Response.json({
      metadata,
      notes,
      summary,
      timeline,
    });

  } catch {

    return Response.json({
      error:"Object not found",
    },{status:404});

  }

}