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

import {
  publishResearchObjectToGitHub,
} from "@/lib/githubPublisher";

import {
  requirePermission,
  AuthenticationRequiredError,
  PermissionDeniedError,
} from "@/lib/auth/authorization";

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
    await requirePermission("articles.publish");
    await requirePermission("articles.read");

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
     * Generate the complete Research Object.
     *
     * This creates the local Research Object and also
     * returns the exact same files in memory for GitHub.
     *
     * If this fails, Neon remains APPROVED.
     */
    const publication =
      await publishArticleResearchObject(article);

    /*
     * Step 3:
     * Publish the exact generated Research Object
     * to the configured GitHub base branch.
     *
     * If GitHub publication fails, Neon remains APPROVED.
     */
    const githubPublication =
      await publishResearchObjectToGitHub({
        emvId: article.id,
        files: publication.githubFiles,
        commitMessage:
          `Publish ${article.id}: ${article.title}`,
      });

    /*
     * Step 4:
     * Only after GitHub confirms the commit do we
     * change the Neon article status to PUBLISHED.
     */
    const publishedArticle =
      await updateArticleStatus(
        article.id,
        "published"
      );

    /*
     * Step 5:
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

      github: {
        owner: githubPublication.owner,
        repository: githubPublication.repo,
        branch: githubPublication.branch,
        commitSha: githubPublication.commitSha,
        commitUrl: githubPublication.commitUrl,
        filesPublished:
          githubPublication.filesPublished,
      },

      publicUrl:
        `/articles/${article.id}`,
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
          error:
            "You do not have permission to publish articles.",
        },
        { status: 403 }
      );
    }

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