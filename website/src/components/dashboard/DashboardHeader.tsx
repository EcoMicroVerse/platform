export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Founder Command Center
        </h1>

        <p className="mt-2 text-slate-400">
          Private editorial workspace powering EcoMicroVerse.
        </p>
      </div>

      <div className="rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-2 text-sm text-teal-300">
        Founder Edition
      </div>

    </div>
  );
}