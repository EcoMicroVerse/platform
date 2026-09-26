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
} from "@/lib/dashboard";

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

export default async function FounderPage() {
  const inbox = await loadInbox();
  const approved = await loadApproved();
  const timeline = await loadTimeline();
  const workflowStatus = await loadWorkflowStatus();
  const founderBrief = await loadFounderBrief();
  const analytics = await loadAnalytics();
  const momentum = await loadMomentum();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl p-8">

        <DashboardHeader />

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <StatCard
            title="Inbox"
            value={inbox.length}
            subtitle="Awaiting Founder review"
          />

          <StatCard
            title="Approved"
            value={approved.length}
            subtitle="Research Objects created"
          />

          <StatCard
            title="Published"
            value={0}
            subtitle="Website articles"
          />
          <div className="mt-8">
  <FounderBrief brief={founderBrief} />
</div>

<div className="mt-8">
  <FounderAnalytics analytics={analytics} />
</div>

<div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">

  <ActivityCalendar calendar={momentum.calendar}/>

  <div className="space-y-6">

    <HealthGauge score={analytics.health_score}/>

    <MomentumCard
      streak={momentum.streak}
      total={momentum.total_events}
    />

  </div>

</div>
        </div>

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
  <EditorialSummary
    approved={approved.length}
  />
</div>

<div className="mt-8">
  <FounderAssistant />
</div>

<div className="mt-8">
  <FounderGraphSection />
</div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

                    <ReviewQueue items={inbox} />

          <ApprovedList items={approved} />

          <ActivityTimeline events={timeline} />

        </div>

      </div>
    </main>
  );
}