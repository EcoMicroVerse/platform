
import { ArrowRight } from "lucide-react";

import { FounderBadge, GlassCard, Footer } from "@/components";
import { brand } from "@/config/brand";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07121f] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-20 bottom-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
        <div className="absolute left-1/2 top-1/3 h-60 w-60 rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-6xl text-center animate-fade-in">
          <FounderBadge />

          <div className="mt-10 space-y-5">
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              {brand.name}
            </h1>

            <p className="text-sm uppercase tracking-[0.35em] text-teal-300 md:text-base">
              {brand.tagline}
            </p>

            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
              Building an AI-powered research intelligence platform connecting
              bacteriophages, microbial ecology, metagenomics,
              metatranscriptomics, bioinformatics and research continuity.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="mt-14">
            <h2 className="text-4xl font-semibold tracking-[0.25em] md:text-5xl">
              COMING{" "}
              <span className="text-teal-300">SOON</span>
            </h2>

            <p className="mt-4 text-slate-400">
              A new home for microbial discovery.
            </p>
          </div>

          {/* Vision Mission Motto */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <GlassCard title="Our Vision">
              A world where microbial knowledge drives healthier ecosystems and
              a more sustainable future.
            </GlassCard>

            <GlassCard title="Our Mission">
              Curate, connect and share reliable scientific knowledge through
              AI-assisted research intelligence.
            </GlassCard>

            <GlassCard title="Our Motto">
              <span className="italic">
                Microbes Today.
                <br />
                A Healthier Tomorrow.
              </span>
            </GlassCard>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-teal-400 px-8 py-4 text-teal-300 transition hover:bg-teal-500 hover:text-white"
            >
              Follow the Founder Journey
              <ArrowRight size={18} />
            </button>
          </div>

          <Footer />
        </div>
      </section>
    </main>
  );
}