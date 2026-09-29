
import {
  Search,
  CircleCheck,
  Folder,
  Rocket,
} from "lucide-react";

function iconFor(type: string) {
  switch (type) {
    case "scanner":
      return Search;
    case "approval":
      return CircleCheck;
    case "dashboard":
      return Folder;
    case "publish":
      return Rocket;
    default:
      return Folder;
  }
}

export default function ActivityTimeline({
  events,
}: {
  events: any[];
}) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Editorial Activity
      </h2>

      <div className="space-y-5">

        {events.map((event, i) => {
          const Icon = iconFor(event.type);

          return (
            <div key={i} className="flex gap-4">

              <div className="mt-1">
                <Icon className="h-5 w-5 text-teal-300" />
              </div>

              <div className="flex-1">

                <p className="font-medium text-white">
                  {event.title}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {new Date(event.timestamp).toLocaleString()}
                </p>

                <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {event.collection}
                </span>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}