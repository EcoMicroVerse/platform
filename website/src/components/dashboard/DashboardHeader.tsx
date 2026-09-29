export default function DashboardHeader() {
  return (
    <header className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-10">
      <div className="text-xs uppercase tracking-[0.35em] text-teal-300">
        EcoMicroVerse Editorial Studio
      </div>

      <h1 className="mt-4 text-5xl font-bold">
        Editorial Studio
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-slate-300">
        The private publishing workspace where Research Objects are reviewed,
        refined, connected through the Knowledge Graph, and prepared for
        autonomous publication across EcoMicroVerse.
      </p>
    </header>
  );
}