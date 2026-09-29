
type Preview = {
  title: string;
  summary: string;
  articles: number;
};

type Props = {
  preview: Preview;
};

export default function NewsletterExport({
  preview,
}: Props) {
  const channels = [
    "Newsletter",
    "Founder Brief",
    "LinkedIn",
    "Bluesky",
    "X",
  ];

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">
      <div className="text-xs uppercase tracking-widest text-teal-300">
        Export Engine
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Newsletter Preview
      </h2>

      <p className="mt-3 text-slate-400">
        One editorial source powering multiple publication channels.
      </p>

      <div className="mt-8 rounded-2xl bg-[#082028] p-6">
        <div className="text-sm uppercase tracking-wide text-teal-300">
          Next Issue
        </div>

        <h3 className="mt-2 text-2xl font-semibold">
          {preview.title}
        </h3>

        <p className="mt-3 text-slate-300">
          {preview.summary}
        </p>

        <div className="mt-5 text-sm text-slate-400">
          {preview.articles} Research Object
          {preview.articles !== 1 ? "s" : ""} included.
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {channels.map((channel) => (
          <div
            key={channel}
            className="rounded-xl border border-slate-800 bg-[#082028] p-4 text-center"
          >
            <div className="text-xs uppercase tracking-wide text-teal-300">
              Ready
            </div>

            <div className="mt-2 text-sm font-medium">
              {channel}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}