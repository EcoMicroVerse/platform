
export default function ChangelogPage() {
  const releases = [
    {
      id: "EMV-R2509-0.2.1",
      title: "Founder Landing Page Polish",
      status: "Current",
      date: "September 2025",
      changes: [
        "Removed duplicate hero artwork",
        "Added official social media icons",
        "Refined homepage copy",
        "Improved background styling",
        "Updated metadata for production",
      ],
    },
    {
      id: "EMV-R2509-0.2",
      title: "Founder Landing Page",
      status: "Released",
      date: "September 2025",
      changes: [
        "First public landing page",
        "Vision, Mission and Motto added",
        "Social media integration",
        "Founder Edition branding",
      ],
    },
    {
      id: "EMV-R2509-0.1",
      title: "Infrastructure Complete",
      status: "Released",
      date: "September 2025",
      changes: [
        "Domain connected",
        "Cloudflare configured",
        "GitHub repository connected",
        "Vercel deployment completed",
        "HTTPS enabled",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#07121f] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold mb-3">EcoMicroVerse Changelog</h1>

        <p className="text-slate-400 mb-12">
          A transparent record of how EcoMicroVerse evolves from Founder Build
          to a global research intelligence platform.
        </p>

        <div className="space-y-8">
          {releases.map((release) => (
            <div
              key={release.id}
              className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{release.title}</h2>
                  <p className="text-teal-300 font-mono text-sm">
                    {release.id}
                  </p>
                </div>

                <span className="rounded-full border border-teal-400/30 px-3 py-1 text-xs text-teal-300">
                  {release.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-400">{release.date}</p>

              <ul className="mt-4 list-disc list-inside space-y-2 text-slate-300">
                {release.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}