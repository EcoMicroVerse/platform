
type Job = {
  id: string;
  title: string;
  status: "draft" | "scheduled" | "published";
};

type Props = {
  jobs: Job[];
};

export default function PublicationJobs({
  jobs,
}: Props) {
  const grouped = {
    draft: jobs.filter((job) => job.status === "draft"),
    scheduled: jobs.filter((job) => job.status === "scheduled"),
    published: jobs.filter((job) => job.status === "published"),
  };

  const columns = [
    {
      title: "Draft",
      colour: "border-slate-700",
      jobs: grouped.draft,
    },
    {
      title: "Scheduled",
      colour: "border-yellow-500/30",
      jobs: grouped.scheduled,
    },
    {
      title: "Published",
      colour: "border-teal-500/30",
      jobs: grouped.published,
    },
  ];

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Publication Jobs
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Editorial Publishing Queue
      </h2>

      <p className="mt-3 text-slate-400">
        Every publication is tracked before becoming a live website update.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.title}
            className={`rounded-xl border ${column.colour} bg-[#082028] p-5`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{column.title}</h3>

              <span className="rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-300">
                {column.jobs.length}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {column.jobs.length === 0 ? (
                <div className="text-sm text-slate-500">
                  No jobs yet.
                </div>
              ) : (
                column.jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-lg border border-slate-800 bg-[#061426] p-3"
                  >
                    <div className="text-xs text-teal-300">
                      {job.id}
                    </div>

                    <div className="mt-1 text-sm font-medium text-white">
                      {job.title}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}