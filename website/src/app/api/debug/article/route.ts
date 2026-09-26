import { NextResponse } from "next/server";
import { loadArticle } from "@/lib/public";

export async function GET() {
  try {
    const article = await loadArticle("EMV-TPHAGE2609-0002");

    return NextResponse.json({
      ok: true,
      title: article.metadata.title,
      summaryLength: article.summary.length,
      articleLength: article.article.length,
      recommendations:
        article.readingPath?.recommended?.length ?? 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}