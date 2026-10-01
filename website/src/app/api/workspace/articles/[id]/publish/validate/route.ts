import { NextResponse } from "next/server";

import { getArticleById } from "@/lib/articleStore";
import {
  validateArticleForPublication,
} from "@/lib/articlePublicationValidation";

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
          error: `Article not found: ${id}`,
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
    console.error(
      "Article publication validation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown validation error.",
      },
      { status: 500 }
    );
  }
}
