type Channel = {
  title?: string;
  body: string;
};

type Props = {
  exportData: {
    newsletter: Channel;
    founderBrief: Channel;
    linkedin: Channel;
    bluesky: Channel;
    x: Channel;
  };
};

export default function ExportStudio({
  exportData,
}: Props) {
  const channels = [
    ["Newsletter", exportData.newsletter],
    ["Founder Brief", exportData.founderBrief],
    ["LinkedIn", exportData.linkedin],
    ["Bluesky", exportData.bluesky],
    ["X", exportData.x],
  ] as const;

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Export Studio
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Multi-Channel Content Generator
      </h2>

      <p className="mt-3 text-slate-400">
        Every channel is generated from the same approved Research Object.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {channels.map(([name, channel]) => (
          <div
            key={name}
            className="rounded-xl border border-slate-800 bg-[#082028] p-5"
          >
            <div className="text-xs uppercase tracking-wider text-teal-300">
              {name}
            </div>

            {channel.title && (
              <h3 className="mt-2 font-semibold">
                {channel.title}
              </h3>
            )}

            <p className="mt-3 text-sm text-slate-300 line-clamp-5">
              {channel.body}
            </p>

            <div className="mt-5">
              <button className="rounded-lg border border-teal-500/20 px-3 py-2 text-sm text-teal-300 transition hover:bg-teal-500/10">
                Preview
              </button>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}