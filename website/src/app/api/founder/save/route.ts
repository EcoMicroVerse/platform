import fs from "fs/promises";
import path from "path";
import * as yaml from "js-yaml";

const ROOT = path.resolve(process.cwd(), "..");

export async function POST(req: Request) {
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

  try {
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

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}