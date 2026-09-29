
type Props = {
  queue: number;
  published: number;
};

export default function PublishingControlCenter({
  queue,
  published,
}: Props) {
  const actions = [
    {
      title: "Publish Now",
      description: "Generate publication package.",
    },
    {
      title: "Schedule",
      description: "Queue next publication.",
    },
    {
      title: "Newsletter",
      description: "Prepare next digest.",
    },
    {
      title: "Archive",
      description: "Preserve publication history.",
    },
  ];

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Publishing Control Centre
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Autonomous Publishing
      </h2>

      <p className="mt-3 text-slate-400">
        Manage publication workflows before enabling live platform integrations.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
          <div className="text-sm text-slate-400">
            Ready to Publish
          </div>

          <div className="mt-2 text-4xl font-bold">
            {queue}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#082028] p-5">
          <div className="text-sm text-slate-400">
            Published
          </div>

          <div className="mt-2 text-4xl font-bold">
            {published}
          </div>
        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        {actions.map((action) => (
          <button
            key={action.title}
            className="rounded-xl border border-teal-500/20 bg-[#082028] p-5 text-left transition hover:border-teal-400 hover:bg-[#0a2436]"
          >
            <div className="font-semibold text-white">
              {action.title}
            </div>

            <div className="mt-2 text-sm text-slate-400">
              {action.description}
            </div>

            <div className="mt-4 text-xs text-teal-300">
              Coming soon →
            </div>
          </button>
        ))}

      </div>

    </section>
  );
}