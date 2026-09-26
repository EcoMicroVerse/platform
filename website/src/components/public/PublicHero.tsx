import Link from "next/link";

export default function PublicHero() {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-10">
      <div className="text-sm uppercase tracking-[0.3em] text-teal-300">
        EcoMicroVerse
      </div>

      <h1 className="mt-4 text-5xl font-bold leading-tight text-white">
        Research Intelligence for the Microbial World
      </h1>

      <p className="mt-6 max-w-3xl text-lg text-slate-300">
        A scientific magazine that discovers,
        curates and connects bacteriophage,
        prophage, microbial ecology and
        bioinformatics research.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/search"
          className="rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
        >
          Explore Research
        </Link>
      </div>
    </section>
  );
}