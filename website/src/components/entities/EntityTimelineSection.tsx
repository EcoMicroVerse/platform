
import EntityTimelineCard from "./EntityTimelineCard";

type Props = {
  timeline: any[];
};

export default function EntityTimelineSection({
  timeline,
}: Props) {
  return (
    <section className="mt-16">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Entity History
      </div>

      <h2 className="mt-2 text-3xl font-bold">
        Timeline View
      </h2>

      <div className="mt-8 space-y-6">
        {timeline.map(
          (event, index) => (
            <EntityTimelineCard
              key={index}
              event={event}
            />
          )
        )}
      </div>

    </section>
  );
}