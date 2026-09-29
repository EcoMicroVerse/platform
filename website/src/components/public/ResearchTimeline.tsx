
type Event = {
  year: string;
  title: string;
  description: string;
};

type Props = {
  events?: Event[];
};

export default function ResearchTimeline({
  events = [],
}: Props) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-[#061426] p-8 text-slate-400">
        Timeline coming soon.
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Research Timeline
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Evolution of this research
      </h2>

      <div className="mt-8 space-y-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex gap-5"
          >
            <div className="flex flex-col items-center">
              <div className="h-4 w-4 rounded-full bg-teal-400"/>

              {index < events.length - 1 && (
                <div className="mt-2 h-full w-px bg-teal-500/30"/>
              )}
            </div>

            <div>
              <div className="text-sm text-teal-300">
                {event.year}
              </div>

              <h3 className="mt-1 text-xl font-semibold text-white">
                {event.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}