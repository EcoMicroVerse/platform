import { Search, CircleCheck, Newspaper, Rocket } from "lucide-react";

export default function TodaysMission({
  status,
  approved,
}: {
  status: {
    scannerToday: boolean;
    pendingReview: number;
    weeklyPulse: boolean;
    dashboardReady: boolean;
  };
  approved: number;
}) {
  return (
    <section className="rounded-2xl border border-teal-500/20 bg-gradient-to-r from-[#0b2235] to-[#07121f] p-6 backdrop-blur">

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-white">
          Today's Mission
        </h2>

        <p className="mt-1 text-slate-400">
          Your EcoMicroVerse editorial priorities.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="flex items-start gap-3">
          <CircleCheck className="mt-1 h-5 w-5 text-yellow-300" />
          <div>
            <p className="text-white font-medium">
              Review {status.pendingReview} papers
            </p>
            <p className="text-sm text-slate-400">
              Founder Review queue
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Search className="mt-1 h-5 w-5 text-teal-300" />
          <div>
            <p className="text-white font-medium">
              {status.scannerToday
                ? "Scanner completed today"
                : "Run Literature Scanner"}
            </p>
            <p className="text-sm text-slate-400">
              Discovery workflow
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Rocket className="mt-1 h-5 w-5 text-green-300" />
          <div>
            <p className="text-white font-medium">
              {approved} Research Objects ready
            </p>
            <p className="text-sm text-slate-400">
              Knowledge assets
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Newspaper className="mt-1 h-5 w-5 text-blue-300" />
          <div>
            <p className="text-white font-medium">
              {status.weeklyPulse
                ? "Weekly Pulse generated"
                : "Weekly Pulse pending"}
            </p>
            <p className="text-sm text-slate-400">
              Editorial report
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}