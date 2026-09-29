import { Database } from "lucide-react";

type Props = {
  sources: any[];
};

export default function WorkspaceSources({
  sources,
}: Props) {
  return (
    <div className="rounded-3xl border border-teal-500/20 bg-[#061426] p-6">

      <div className="flex items-center gap-3">

        <Database className="h-5 w-5 text-teal-300"/>

        <div>

          <div className="text-xs uppercase tracking-wider text-teal-300">
            Research Sources
          </div>

          <h3 className="text-xl font-semibold">
            Intelligence Registry
          </h3>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between rounded-xl bg-[#082028] px-4 py-3"
          >

            <div>

              <div className="font-medium">
                {source.name}
              </div>

              <div className="text-xs text-slate-400">
                {source.frequency}
              </div>

            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs ${
                source.enabled
                  ? "bg-teal-500/10 text-teal-300"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {source.enabled
                ? "Enabled"
                : "Disabled"}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}