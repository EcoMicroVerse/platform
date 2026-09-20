
import { GlassCard } from "@/components";
import { brand } from "@/config/brand";

export default function Dashboard() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          Founder Command Center
        </h1>

        <p className="mt-3 text-slate-400">
          Private dashboard for {brand.name}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <GlassCard title="Weekly Pulse">
            0 new papers this week
          </GlassCard>

          <GlassCard title="Research Memory">
            Weekly summaries will appear here.
          </GlassCard>

          <GlassCard title="Tool Forge">
            GitHub releases will appear here.
          </GlassCard>

          <GlassCard title="Conference Watch">
            Upcoming deadlines will appear here.
          </GlassCard>

          <GlassCard title="Career Hub">
            New academic jobs will appear here.
          </GlassCard>

          <GlassCard title="Social Queue">
            Scheduled posts will appear here.
          </GlassCard>

        </div>

      </div>
    </main>
  );
}