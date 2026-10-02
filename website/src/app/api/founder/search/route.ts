import { NextResponse } from "next/server";
import { repositorySearch } from "@/lib/founderSearch";
import {
  findNodeByTitle,
  findConnectedPapers,
} from "@/lib/graph";
import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

export async function POST(req: Request) {
  try {
    await requirePermission("candidates.read");

    const { query } = await req.json();

    const node = await findNodeByTitle(query);

    if (node) {
      const papers = await findConnectedPapers(node.id);

      if (papers.length) {
        return NextResponse.json({
          results: papers.map((paper: any) => ({
            source: "Graph",
            title: paper.title,
            collection: node.title,
            priority: "connected",
          })),
        });
      }
    }

    const results = await repositorySearch(query);

    return NextResponse.json({ results });
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
          error: "You do not have permission to search candidates.",
        },
        { status: 403 }
      );
    }

    console.error("Founder search failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Search failed.",
      },
      { status: 500 }
    );
  }
}