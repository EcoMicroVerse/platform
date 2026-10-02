import {
  loadApproved,
  loadInbox,
  loadPublicationJobs,
  loadApprovedForPublishing,
  loadSchedulerQueue,
  loadPublishingQueue,
} from "@/lib/dashboard";

import WorkspaceHealthBar from "@/components/workspace/WorkspaceHealthBar";
import WorkspaceMission from "@/components/workspace/WorkspaceMission";
import WorkspacePublishingQueue from "@/components/workspace/WorkspacePublishingQueue";
import WorkspaceAISuggestions from "@/components/workspace/WorkspaceAISuggestions";
import WorkspaceCalendar from "@/components/workspace/WorkspaceCalendar";
import SchedulerEditor from "@/components/workspace/SchedulerEditor";
import WorkspaceMorningBrief from "@/components/workspace/WorkspaceMorningBrief";
import WorkspaceDailyFocus from "@/components/workspace/WorkspaceDailyFocus";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";
import { loadSources } from "@/lib/sourceRegistry";
import WorkspaceSources from "@/components/workspace/WorkspaceSources";
import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";
import { loadPlatformHealth } from "@/lib/platformHealth";
import WorkspacePlatformHealth from "@/components/workspace/WorkspacePlatformHealth";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/authorization";
import AccountMenu from "@/components/account/AccountMenu";



export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in?next=/workspace");
  }

  if (!user.permissions.includes("workspace.read")) {
    redirect("/unauthorized");
  }

  const health = await loadPlatformHealth();
  const inbox = await loadInbox();
  const approved = await loadApproved();
  const jobs = await loadPublicationJobs();
  const sources = await loadSources();

  const publishingArticles = (
    await loadApprovedForPublishing()
  ).map((article: any) => ({
    emv_id: article.emv_id ?? article.id,
    title: article.title,
    recommended_collection:
      article.recommended_collection,
  }));

  const schedulerQueue =
    await loadSchedulerQueue();

  const publishingQueue =
    await loadPublishingQueue();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl p-8">

  <div className="mb-6 flex justify-end">
    <AccountMenu
      name={user.name}
      email={user.email}
      role={user.roles.map((role) => role.name).join(", ")}
    />
  </div>

  <SectionHeader
          eyebrow="Editorial Workspace"
          title="Mission Control"
          description="The operational hub for publishing, AI assistance and platform health."
          icon={<LayoutDashboard className="h-7 w-7" />}
        />

        <WorkspaceShell
          overview={
            <>
              <WorkspaceMorningBrief
                inbox={inbox.length}
                approved={approved.length}
                scheduled={publishingQueue.scheduled}
              />

              <div className="mt-8">
                <WorkspaceHealthBar
                  inbox={inbox.length}
                  approved={approved.length}
                  jobs={jobs.length}
                />
              </div>

              <div className="mt-8">
                <WorkspaceMission
                  inbox={inbox.length}
                  approved={approved.length}
                />
              </div>
            </>
          }
          publishing={
            <WorkspacePublishingQueue
              articles={publishingArticles}
            />
          }
          calendar={
            <>
              <WorkspaceCalendar
                queue={schedulerQueue}
              />

              <div className="mt-8">
                <SchedulerEditor />
              </div>
            </>
          }
          ai={
            <>
              <WorkspaceAISuggestions />
              <WorkspaceSources sources={sources}/>
              <WorkspacePlatformHealth health={health}/>

              <div className="mt-8">
                <WorkspaceDailyFocus />
              </div>
            </>
          }
          analytics={
  <EMVCard>
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold text-white">
          Analytics
        </h3>
        <p className="mt-2 text-slate-300">
          Activity, publishing momentum, editorial quality trends, and
          platform health will appear here as the Analytics workspace is
          migrated.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#082028] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-teal-300" />
            <span className="font-medium text-white">
              Publishing Activity
            </span>
          </div>

          <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300">
            Coming Next
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-300">
          Soon you'll see publishing streaks, weekly output, quality trends,
          and editorial insights in one place.
        </p>
      </div>
    </div>
  </EMVCard>
}
settings={
  <EMVCard>
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold text-white">
          Workspace Settings
        </h3>
        <p className="mt-2 text-slate-300">
          Export Studio, platform preferences, and publishing settings will
          move here as the Settings workspace is completed.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#082028] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-teal-300" />
            <span className="font-medium text-white">
              Export Studio
            </span>
          </div>

          <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300">
            Migration Planned
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-300">
          Newsletter exports, LinkedIn/X/Bluesky publishing templates, and
          platform preferences will be managed from this tab.
        </p>
      </div>
    </div>
  </EMVCard>
}
        />

      </div>
    </main>
  );
}