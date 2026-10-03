import { NextResponse } from "next/server";

import { getArticleById } from "@/lib/articleStore";
import {
  validateArticleForPublication,
} from "@/lib/articlePublicationValidation";

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

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<Response> {
  try {
    await requirePermission("articles.read");

    const { id } = await context.params;

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
          error: "Article not found.",
        },
        { status: 404 }
      );
    }

    const validation =
      validateArticleForPublication(article);

    return NextResponse.json({
      success: true,
      valid: validation.valid,

      article: {
        id: article.id,
        title: article.title,
        status: article.status,
        collection: article.collection,

        relevanceScore:
          article.relevanceScore,
        relevanceTier:
          article.relevanceTier,
        editorialPriority:
          article.editorialPriority,

        sourcePmid:
          article.sourcePmid,
        sourceDoi:
          article.sourceDoi,
        sourceJournal:
          article.sourceJournal,
        sourcePublicationDate:
          article.sourcePublicationDate,
        sourcePublicationDateType:
          article.sourcePublicationDateType,
      },

      checks: validation.checks,
      fields: validation.fields,
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
            "You do not have permission to read articles.",
        },
        { status: 403 }
      );
    }

    console.error(
      "Article publication validation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to validate article for publication.",
      },
      { status: 500 }
    );
  }
}