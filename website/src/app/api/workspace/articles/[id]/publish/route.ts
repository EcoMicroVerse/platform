import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  getArticleById,
  updateArticleStatus,
} from "@/lib/articleStore";

import {
  publishArticleResearchObject,
} from "@/lib/articlePublisher";

import {
  validateArticleForPublication,
} from "@/lib/articlePublicationValidation";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  _request: Request,
  { params }: RouteContext
): Promise<Response> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID is required.",
        },
        { status: 400 }
      );
    }

    const article = await getArticleById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: `Article "${id}" was not found.`,
        },
        { status: 404 }
      );
    }

    /*
     * Step 1:
     * Validate the complete publication payload.
     *
     * This happens server-side so the publication
     * endpoint cannot be bypassed by skipping the UI.
     */
    const validation =
      validateArticleForPublication(article);

    if (!validation.valid) {
      const failedChecks = Object.entries(
        validation.checks
      )
        .filter(([, passed]) => !passed)
        .map(([name]) => name);

      return NextResponse.json(
        {
          success: false,
          error:
            "Article failed publication validation.",
          failedChecks,
          checks: validation.checks,
          fields: validation.fields,
        },
        { status: 409 }
      );
    }

    /*
     * Step 2:
     * Generate the filesystem Research Object.
     *
     * If this fails, the Neon article remains APPROVED.
     */
    const publication =
      await publishArticleResearchObject(article);

    /*
     * Step 3:
     * Only after successful Research Object generation
     * do we change the Neon status to PUBLISHED.
     */
    const publishedArticle =
      await updateArticleStatus(
        article.id,
        "published"
      );

    /*
     * Step 4:
     * Refresh the public article route and homepage.
     */
    revalidatePath(
      `/articles/${article.id}`
    );

    revalidatePath("/");

    return NextResponse.json({
      success: true,

      article: {
        id: publishedArticle.id,
        status: publishedArticle.status,
        publishedAt:
          publishedArticle.publishedAt,
      },

      publication: {
        directory: publication.directory,
        files: publication.files,
      },

      publicUrl:
        `/articles/${article.id}`,
    });
  } catch (error) {
    console.error(
      "Article publication failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown publication error.",
      },
      { status: 500 }
    );
  }
}
