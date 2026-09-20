
import {
  ArrowRight,
  Linkedin,
  Youtube,
  Instagram,
  Globe,
  ExternalLink,
} from "lucide-react";

import { social } from "@/config/social";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <section className="relative flex min-h-screen items-center justify-center p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f]/40 to-[#07121f]" />

        <div className="relative max-w-6xl w-full text-center animate-fade-in">

          <Image
            src="/images/coming-soon-hero.png"
            alt="EcoMicroVerse Coming Soon"
            width={1400}
            height={2200}
            priority
            className="mx-auto rounded-3xl shadow-2xl border border-teal-400/20"
          />

          <div className="mt-10 space-y-6">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              EcoMicroVerse
            </h1>

            <p className="text-xl text-teal-300 tracking-[0.3em] uppercase">
              Connecting Microbial Knowledge
            </p>

            <p className="max-w-3xl mx-auto text-slate-300 text-lg">
              Building an AI-powered research intelligence platform connecting
              bacteriophages, microbial ecology, methane-oxidising bacteria,
              metagenomics, metatranscriptomics and bioinformatics.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">

              <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
                <h2 className="text-teal-300 font-semibold mb-3">Vision</h2>
                <p className="text-slate-300 text-sm">
                  A world where microbial knowledge drives healthier ecosystems
                  and a more sustainable future.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
                <h2 className="text-teal-300 font-semibold mb-3">Mission</h2>
                <p className="text-slate-300 text-sm">
                  Curate, connect and share reliable scientific knowledge
                  through AI-assisted research intelligence.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
                <h2 className="text-teal-300 font-semibold mb-3">Motto</h2>
                <p className="italic text-slate-300">
                  Microbes Today. A Healthier Tomorrow.
                </p>
              </div>

            </div>

            
<div className="mt-10">
  <p className="text-slate-400 mb-5 tracking-wide">
    Follow the Founder Journey
  </p>

  <div className="flex justify-center gap-5 flex-wrap">

    <a href={social.x} target="_blank" rel="noreferrer">
      <Globe className="hover:text-teal-300 transition hover:scale-110" />
    </a>

    <a href={social.bluesky} target="_blank" rel="noreferrer"
       className="hover:text-teal-300 transition hover:scale-110">
      🦋
    </a>

    <a href={social.linkedin} target="_blank" rel="noreferrer">
      <Linkedin className="hover:text-teal-300 transition hover:scale-110" />
    </a>

    <a href={social.youtube} target="_blank" rel="noreferrer">
      <Youtube className="hover:text-teal-300 transition hover:scale-110" />
    </a>

    <a href={social.instagram} target="_blank" rel="noreferrer">
      <Instagram className="hover:text-teal-300 transition hover:scale-110" />
    </a>

    <a href={social.threads} target="_blank" rel="noreferrer"
       className="hover:text-teal-300 transition hover:scale-110">
      <ExternalLink />
    </a>

  </div>
</div>