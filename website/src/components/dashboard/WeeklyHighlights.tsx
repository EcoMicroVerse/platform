
type Props = {
  highlights: string[];
};

export default function WeeklyHighlights({
  highlights,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Weekly Highlights
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Editorial Summary
      </h2>

      <div className="mt-6 space-y-4">

        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <div className="mt-2 h-2 w-2 rounded-full bg-teal-400"/>

            <div className="text-slate-300">
              {item}
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}