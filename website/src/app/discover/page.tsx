
import fs from "fs/promises";
import path from "path";
import { load } from "js-yaml";
import Link from "next/link";
import { requireComingSoonAccess } from "@/lib/comingSoon";
import { Calendar, Flame, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function loadDiscoveries() {
  const dir = path.join(process.cwd(), "content", "daily");

  try {
    const files = (await fs.readdir(dir))
      .filter((f) => f.endsWith(".yml"))
      .sort()
      .reverse();

    const discoveries = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(dir, file),
          "utf8"
        );

        return load(content) as any;
      })
    );

    return discoveries;
  } catch {
    return [];
  }
}

export default async function DiscoverPage() {
  await requireComingSoonAccess("/discover");
  const discoveries = await loadDiscoveries();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-6xl p-8">

        {/* Hero */}

        <div className="mb-10 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-8">

          <div className="flex items-center gap-3">

            <Flame className="h-8 w-8 text-teal-300"/>

            <div>

              <div className="text-xs uppercase tracking-widest text-teal-300">
                EcoMicroVerse
              </div>

              <h1 className="text-4xl font-bold">
                Daily Discovery Archive
              </h1>

            </div>

          </div>

          <p className="mt-5 max-w-3xl text-slate-300">
            Explore scientific anniversaries, forgotten breakthroughs,
            and the discoveries that shaped microbiology, bacteriophage
            research, prophage biology, and bioinformatics.
          </p>

        </div>

        {/* Discovery list */}

        <div className="space-y-6">

          {discoveries.length === 0 ? (

            <div className="rounded-2xl border border-slate-800 bg-[#061426] p-10 text-center text-slate-400">
              No Daily Discoveries have been published yet.
            </div>

          ) : (

            discoveries.map((item: any, index: number) => (

              <article
                key={index}
                className="rounded-2xl border border-slate-800 bg-[#061426] p-6 transition hover:border-teal-500/30"
              >

                <div className="flex flex-wrap items-center gap-4 text-sm text-teal-300">

                  <span className="flex items-center gap-2">

                    <Calendar className="h-4 w-4"/>

                    {item.date}

                  </span>

                  <span>{item.featured.category}</span>

                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  {item.featured.title}
                </h2>

                <p className="mt-4 text-slate-300">
                  {item.featured.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {item.featured.chain?.map((step: string) => (

                    <span
                      key={step}
                      className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                    >
                      {step}
                    </span>

                  ))}

                </div>

                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 text-teal-300 hover:text-teal-200"
                >

                  Back to Homepage

                  <ArrowRight className="h-4 w-4"/>

                </Link>

              </article>

            ))

          )}

        </div>

      </div>
    </main>
  );
}