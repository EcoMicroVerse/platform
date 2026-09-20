
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Linkedin,
  Youtube,
  Instagram,
  Globe,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { social } from "@/config/social";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07121f] text-white overflow-hidden">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07121f]/30 via-[#07121f]/70 to-[#07121f]" />

        <div className="relative z-10 w-full max-w-6xl text-center animate-fade-in">

          {/* Founder Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-sm text-teal-300">
            <Sparkles size={16} />
            Founder Edition v0.2
          </div>

          {/* Hero Image */}
          <div className="mt-8">
            <Image
              src="/images/coming-soon-hero.png"
              alt="EcoMicroVerse Coming Soon"
              width={1400}
              height={2200}
              priority
              className="mx-auto w-full max-w-4xl rounded-3xl border border-teal-400/20 shadow-2xl"
            />
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
              bacteriophages, microbial ecology, methane-oxidising bacteria,
              metagenomics, metatranscriptomics, bioinformatics and research
              continuity.
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

            <div className="flex flex-wrap items-center justify-center gap-5">

              <Link href={social.x} target="_blank">
                <Globe className="transition hover:scale-110 hover:text-teal-300" />
              </Link>

              <Link href={social.bluesky} target="_blank">
                <div className="text-xl transition hover:scale-110 hover:text-teal-300">
                  🦋
                </div>
              </Link>

              <Link href={social.linkedin} target="_blank">
                <Linkedin className="transition hover:scale-110 hover:text-teal-300" />
              </Link>

              <Link href={social.youtube} target="_blank">
                <Youtube className="transition hover:scale-110 hover:text-teal-300" />
              </Link>

              <Link href={social.instagram} target="_blank">
                <Instagram className="transition hover:scale-110 hover:text-teal-300" />
              </Link>

              <Link href={social.threads} target="_blank">
                <ExternalLink className="transition hover:scale-110 hover:text-teal-300" />
              </Link>

            </div>

          </div>

          {/* Footer */}
          <footer className="mt-20 border-t border-slate-800 pt-8 text-sm text-slate-500">

            <p>Founder Build v0.2</p>

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