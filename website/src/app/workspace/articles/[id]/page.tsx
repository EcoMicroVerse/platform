import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getArticleById } from "@/lib/articleStore";
import { getCurrentUser } from "@/lib/auth/authorization";
import ArticleDraftEditor from "./ArticleDraftEditor";

type ArticleDraftPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticleDraftPage({
  params,
}: ArticleDraftPageProps) {
  const { id } = await params;

  // --------------------------------------------------
  // Authentication
  // --------------------------------------------------

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/sign-in?next=/workspace/articles/${id}`);
  }

  // --------------------------------------------------
  // Article read permission
  // --------------------------------------------------

  if (!user.permissions.includes("articles.read")) {
    redirect("/unauthorized");
  }

  // --------------------------------------------------
  // Editorial permissions
  // --------------------------------------------------

  const canEditArticles =
    user.permissions.includes("articles.edit");

  const canReviewArticles =
    user.permissions.includes("articles.review");

  const canApproveArticles =
    user.permissions.includes("articles.approve");

  const canPublishArticles =
    user.permissions.includes("articles.publish");

  // --------------------------------------------------
  // Load article
  // --------------------------------------------------

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  // --------------------------------------------------
  // Page
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/workspace/candidates"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Candidate Inbox
          </Link>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              EcoMicroVerse Editorial Workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Article Draft
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Edit and save the research object before it enters the
              review and publication workflow.
            </p>
          </div>
        </div>

        <ArticleDraftEditor
          article={article}
          canEditArticles={canEditArticles}
          canReviewArticles={canReviewArticles}
          canApproveArticles={canApproveArticles}
          canPublishArticles={canPublishArticles}
        />
      </div>
    </main>
  );
}