import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { social } from "@/config/social";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07121f] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

  <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl animate-pulse"/>

  <div className="absolute right-20 bottom-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"/>

  <div className="absolute left-1/2 top-1/3 h-60 w-60 rounded-full bg-emerald-400/5 blur-3xl"/>
</div>
      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f]/30 via-[#07121f]/70 to-[#07121f]" />

        <div className="relative z-10 w-full max-w-6xl text-center animate-fade-in">

          {/* Founder Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-sm text-teal-300">
            <Sparkles size={16} />
            Founder Edition v0.2
          </div>

          {/* Heading */}
          <div className="mt-10 space-y-4">
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              EcoMicroVerse
            </h1>

            <p className="text-sm uppercase tracking-[0.35em] text-teal-300 md:text-base">
              Connecting Microbial Knowledge
            </p>

            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
              Building an AI-powered research intelligence platform connecting
              bacteriophages, microbial ecology, metagenomics, metatranscriptomics, 
              bioinformatics and research continuity.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="mt-12">
            <h2 className="text-4xl font-semibold tracking-[0.25em] text-white md:text-5xl">
              COMING{" "}
              <span className="text-teal-300">SOON</span>
            </h2>

            <p className="mt-4 text-slate-400">
              A new home for microbial discovery.
            </p>
          </div>

          {/* Vision Mission Motto */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
              <h3 className="mb-3 text-lg font-semibold text-teal-300">
                Our Vision
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                A world where microbial knowledge drives healthier ecosystems
                and a more sustainable future.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
              <h3 className="mb-3 text-lg font-semibold text-teal-300">
                Our Mission
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                Curate, connect and share reliable scientific knowledge through
                AI-assisted research intelligence.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
              <h3 className="mb-3 text-lg font-semibold text-teal-300">
                Our Motto
              </h3>

              <p className="text-sm italic leading-7 text-slate-300">
                Microbes Today.
                <br />
                A Healthier Tomorrow.
              </p>
            </div>

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



{/* Socials */}
<div className="mt-14">

  <p className="mb-6 text-slate-400">
    Connect with EcoMicroVerse
  </p>

  <div className="flex flex-wrap items-center justify-center gap-6">

    {/* X */}
    <Link href={social.x} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6 22H2.9l7.3-8.4L1 2h6.5l4.4 5.8L18.9 2z"/>
      </svg>
    </Link>

    {/* Bluesky */}
    <Link href={social.bluesky} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 600 530" fill="currentColor" className="hover:text-teal-300">
        <path d="M300 230C260 160 150 60 90 30c-30-15-50 10-45 40 10 70 90 190 150 210-50-5-140 25-140 95 0 65 70 95 130 65 35-18 75-60 115-130 40 70 80 112 115 130 60 30 130 0 130-65 0-70-90-100-140-95 60-20 140-140 150-210 5-30-15-55-45-40-60 30-170 130-210 200z"/>
      </svg>
    </Link>

    {/* LinkedIn */}
    <Link href={social.linkedin} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1C12.7 8.8 14.6 8 16.8 8 21.3 8 22 10.9 22 15v9h-5v-8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-5V8z"/>
      </svg>
    </Link>

    {/* YouTube */}
    <Link href={social.youtube} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
        <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.8 2.5 12 2.5 12 2.5h-.1s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1C.6 4.5.5 6.2.5 6.2S.2 8.2.2 10.3v1.5c0 2.1.3 4.1.3 4.1s.2 1.7.9 2.4c.9.9 2.1.9 2.7 1 2 .2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-2 .3-4.1v-1.5c0-2.1-.3-4.1-.3-4.1zM9.8 15V8.8l6 3.1-6 3.1z"/>
      </svg>
    </Link>

    {/* Instagram */}
    <Link href={social.instagram} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm11 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-6 2a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
    </Link>

    {/* Threads */}
    <Link href={social.threads} target="_blank" className="hover:scale-110 transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="hover:text-teal-300">
        <path d="M16.7 10.5c-.3-2.3-1.8-3.8-4.5-3.8-2.7 0-4.6 1.6-4.6 4 0 2.2 1.6 3.6 4.3 3.6h1.8c-.2 1.7-1.1 2.5-2.8 2.5-1.3 0-2.3-.5-3.2-1.4l-1.4 1.6c1.2 1.3 2.8 2 4.7 2 3.5 0 5.5-2.1 5.5-5.7v-.6c1-.3 1.6-1.1 1.6-2.1 0-1-.5-1.8-1.4-2.1zm-2.3 1.2v-.2c.4.1.7.3.7.7s-.3.6-.7.7v-1.2z"/>
      </svg>
    </Link>

  </div>

</div>

          {/* Footer */}
          <footer className="mt-20 border-t border-slate-800 pt-8 text-sm text-slate-500">

            <p className="mt-2">
              EcoMicroVerse • Connecting Microbial Knowledge
            </p>

            <p className="mt-1">ecomicroverse.bio</p>

          </footer>

        </div>
      </section>
    </main>
  );
}