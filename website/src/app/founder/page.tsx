
export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  loadInbox,
  loadApproved,
  loadTimeline,
  loadWorkflowStatus,
  loadFounderBrief,
  loadAnalytics,
  loadMomentum,
  loadWeeklyDigest,
  loadEditorialReadiness,
  loadWeeklyHighlights,
  loadFounderRecommendations,
  loadNewsletterPreview,
  loadExportStudio,
  loadPublishingQueue,
  loadPublicationJobs,
  loadApprovedForPublishing,
} from "@/lib/dashboard";

import { loadArticle } from "@/lib/public";
import { requireComingSoonAccess } from "@/lib/comingSoon";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ReviewQueue from "@/components/dashboard/ReviewQueue";
import ApprovedList from "@/components/dashboard/ApprovedList";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import QuickActions from "@/components/dashboard/QuickActions";
import TodaysMission from "@/components/dashboard/TodaysMission";
import FounderAssistant from "@/components/dashboard/FounderAssistant";
import FounderGraphSection from "@/components/dashboard/FounderGraphSection";
import EditorialSummary from "@/components/dashboard/EditorialSummary";
import FounderBrief from "@/components/dashboard/FounderBrief";
import FounderAnalytics from "@/components/dashboard/FounderAnalytics";
import HealthGauge from "@/components/dashboard/HealthGauge";
import ActivityCalendar from "@/components/dashboard/ActivityCalendar";
import MomentumCard from "@/components/dashboard/MomentumCard";
import EditorialChecklist from "@/components/founder/EditorialChecklist";
import EditorialIntelligence from "@/components/founder/EditorialIntelligence";
import WeeklyDigest from "@/components/dashboard/WeeklyDigest";
import WeeklyHighlights from "@/components/dashboard/WeeklyHighlights";
import FounderRecommendations from "@/components/dashboard/FounderRecommendations";
import NewsletterExport from "@/components/dashboard/NewsletterExport";
import ExportStudio from "@/components/dashboard/ExportStudio";
import PublishingControlCenterClient from "@/components/dashboard/PublishingControlCenterClient";
import PublicationJobs from "@/components/dashboard/PublicationJobs";
import PublishingWizard from "@/components/dashboard/PublishingWizard";
import SocialStudio from "@/components/dashboard/SocialStudio";
import { generateSocialPosts } from "@/lib/social";
import InstagramCarousel from "@/components/dashboard/InstagramCarousel";
import EditorialCopilot from "@/components/dashboard/EditorialCopilot";
import { analyzeArticle, type CopilotReport } from "@/lib/copilot";
import ContentQuality from "@/components/dashboard/ContentQuality";
import {
  suggestCollection,
  type CollectionSuggestion,
} from "@/lib/classifier";
import CollectionRecommendation from "@/components/dashboard/CollectionRecommendation";
import { optimizeTitles } from "@/lib/titleOptimizer";
import TitleStudio from "@/components/dashboard/TitleStudio";
import {
  generateQualityReport,
  type QualityReport,
} from "@/lib/quality";
import EditorialQualityPanel from "@/components/dashboard/EditorialQualityPanel";
import EditorialWorkspace from "@/components/dashboard/EditorialWorkspace";

export default async function FounderPage() {
  await requireComingSoonAccess("/founder");
  const inbox = await loadInbox();
  const approved = await loadApproved();
  const timeline = await loadTimeline();
  const workflowStatus = await loadWorkflowStatus();
  const founderBrief = await loadFounderBrief();
  const analytics = await loadAnalytics();
  const momentum = await loadMomentum();
  const weeklyDigest = await loadWeeklyDigest();
  const weeklyHighlights = await loadWeeklyHighlights();
  const recommendations = await loadFounderRecommendations();
  const newsletterPreview = await loadNewsletterPreview();
  const exportStudio = await loadExportStudio();
  const publishingQueue = await loadPublishingQueue();
  const publicationJobs = await loadPublicationJobs();
  const readiness = await loadEditorialReadiness();
  const publishingArticles = await loadApprovedForPublishing();
  let socialPosts: any[] = [];

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  socialPosts = generateSocialPosts(firstArticle);
}

let copilotReport: CopilotReport = {
  score: 0,
  readiness: "Needs Work",
  strengths: [],
  improvements: [],
  sections: [],
};

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  copilotReport = analyzeArticle(firstArticle);
}

let collectionSuggestion: CollectionSuggestion = {
  current: "Unknown",
  suggested: "Unknown",
  confidence: 0,
  reasons: [],
};

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  collectionSuggestion =
    suggestCollection(firstArticle);
}

let optimizedTitles = {
  canonical: "No article selected",
  website: "No article selected",
  linkedin: "",
  x: "",
  newsletter: "",
  instagram: "",
};

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  optimizedTitles =
    optimizeTitles(firstArticle);
}

let qualityReport: QualityReport = {
  overall: 0,
  verdict: "Needs Major Review",
  metrics: [],
};

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  qualityReport = generateQualityReport(
    copilotReport,
    collectionSuggestion,
    optimizedTitles,
    socialPosts,
    firstArticle.timeline?.events?.length ?? 0
  );
}

let workspaceArticle = {
  title: "No article selected",
  collection: "Unknown",
  score: 0,
};

if (approved.length > 0) {
  const firstArticle = await loadArticle(
    approved[0].emv_id
  );

  workspaceArticle = {
    title: firstArticle.metadata.title,
    collection:
      firstArticle.metadata.recommended_collection,
    score: firstArticle.metadata.score,
  };
}

  const averageReadiness =
    readiness.length === 0
      ? 0
      : Math.round(
          readiness.reduce(
            (sum: number, item: any) => sum + item.score,
            0
          ) / readiness.length
        );

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl p-8">

        {/* Editorial Studio Header */}
        <DashboardHeader />

        <div className="mt-8">
  <EditorialWorkspace article={workspaceArticle}/>
</div>

        {/* Editorial Readiness */}
        <div className="mt-8">
          <EditorialChecklist
            metadataComplete={averageReadiness > 0}
            summaryPresent={readiness.every((r: any) => r.summary)}
            articlePresent={readiness.every((r: any) => r.article)}
            timelinePresent={readiness.every((r: any) => r.timeline)}
            citationsPresent={readiness.every((r: any) => r.citations)}
          />
        </div>

        {/* Editorial Roadmap */}
        <section className="mt-8 rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
          <div className="text-xs uppercase tracking-widest text-teal-300">
            Editorial Roadmap
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            Editorial Pipeline Progress
          </h2>

          <p className="mt-2 text-slate-400">
            The private editorial workflow for transforming AI-generated
            drafts into publication-ready Research Objects.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-teal-500/20 bg-[#082028] p-5">
              <div className="text-sm text-teal-300">
                Completed
              </div>

              <div className="mt-2 text-2xl font-bold">
                AI Draft
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Research Object generation pipeline established.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-[#082028] p-5">
              <div className="text-sm text-yellow-300">
                Current
              </div>

              <div className="mt-2 text-2xl font-bold">
                Editorial Review
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Editorial quality control and scientific validation.
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-[#082028] p-5">
              <div className="text-sm text-slate-300">
                Next
              </div>

              <div className="mt-2 text-2xl font-bold">
                One-click Publish
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Automated publishing with newsletter and social generation.
              </p>
            </div>

          </div>
        </section>

        {/* Editorial Intelligence */}
        <div className="mt-8">
          <EditorialIntelligence reports={readiness} />
        </div>

        {/* Editorial Studio Statistics */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <StatCard
            title="Inbox"
            value={inbox.length}
            subtitle="Awaiting Editorial Review"
          />

          <StatCard
            title="Approved"
            value={approved.length}
            subtitle="Research Objects created"
          />

          <StatCard
            title="Published"
            value={publishingQueue.published}
            subtitle="Website articles"
          />

        </div>

        {/* Editorial Brief */}
        <div className="mt-8">
          <FounderBrief brief={founderBrief} />
        </div>

        {/* Editorial Analytics */}
        <div className="mt-8">
          <FounderAnalytics analytics={analytics} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">

          <ActivityCalendar calendar={momentum.calendar} />

          <div className="space-y-6">
            <HealthGauge score={analytics.health_score} />

            <MomentumCard
              streak={momentum.streak}
              total={momentum.total_events}
            />
          </div>

        </div>

        {/* Editorial Workflow */}
        <div className="mt-8">
          <TodaysMission
            status={workflowStatus}
            approved={approved.length}
          />
        </div>

        <div className="mt-8">
          <QuickActions status={workflowStatus} />
        </div>

        <div className="mt-6">
          <EditorialSummary approved={approved.length} />
        </div>

        {/* Editorial Assistant */}
        <div className="mt-8">
          <FounderAssistant />
        </div>

        {/* Editorial Knowledge Graph */}
        <div className="mt-8">
          <FounderGraphSection />
        </div>

        {/* Weekly Scientific Intelligence */}
        <div className="mt-8">
          <WeeklyDigest digest={weeklyDigest} />
        </div>

        <div className="mt-8">
          <WeeklyHighlights highlights={weeklyHighlights} />
        </div>

        <div className="mt-8">
          <FounderRecommendations recommendations={recommendations} />
        </div>

        <div className="mt-8">
          <NewsletterExport preview={newsletterPreview} />
        </div>

        <div className="mt-8">
          <ExportStudio exportData={exportStudio} />
        </div>

        <div className="mt-8">
  <SocialStudio posts={socialPosts} />
</div>

<div className="mt-8">
  <EditorialCopilot report={copilotReport}/>
</div>

<div className="mt-8">
  <ContentQuality sections={copilotReport.sections}/>
</div>

<div className="mt-8">
  <CollectionRecommendation
    suggestion={collectionSuggestion}
  />
</div>

<div className="mt-8">
  <TitleStudio titles={optimizedTitles}/>
</div>

<div className="mt-8">
  <EditorialQualityPanel report={qualityReport}/>
</div>

<div className="mt-8">
  <InstagramCarousel
    title={
      approved.length
        ? approved[0].title
        : "Research Object"
    }
    summary={
      socialPosts.find(
        (p: any) => p.platform === "Instagram"
      )?.body ?? ""
    }
  />
</div>

        {/* Editorial Command Center */}
        <div className="mt-8">
          <PublishingControlCenterClient
            queue={publishingQueue.ready}
            published={publishingQueue.published}
          />
        </div>

        {/* Publishing Wizard */}
        <div className="mt-8">
          <PublishingWizard articles={publishingArticles} />
        </div>

        {/* Publication Jobs */}
        <div className="mt-8">
          <PublicationJobs jobs={publicationJobs} />
        </div>

        {/* Editorial Studio Panels */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <ReviewQueue items={inbox} />

          <ApprovedList items={approved} />

          <ActivityTimeline events={timeline} />

        </div>

      </div>
    </main>
  );
}