
type Props = {
  event: any;
};

export default function EntityTimelineCard({
  event,
}: Props) {
  return (
    <div className="flex gap-5">

      <div className="w-20 text-teal-300 font-semibold">
        {event.year}
      </div>

      <div className="flex-1 rounded-xl border border-slate-800 bg-[#082028] p-5">

        <div className="font-semibold">
          {event.title}
        </div>

        <p className="mt-2 text-sm text-slate-300">
          {event.description}
        </p>

        <div className="mt-3 text-xs text-slate-500">
          {event.source}
        </div>

      </div>

    </div>
  );
}