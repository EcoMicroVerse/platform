
import EntityLink from "@/components/entities/EntityLink";
import { requireComingSoonAccess } from "@/lib/comingSoon";

export default async function Demo() {
  await requireComingSoonAccess("/entity-demo");
  return (
    <main className="min-h-screen bg-[#07121f] text-white">

      <div className="mx-auto max-w-4xl p-8">

        <h1 className="mb-6 text-4xl font-bold">
          Entity Demo
        </h1>

        <p className="text-lg leading-relaxed">

          <EntityLink name="PHASTER"/> is one of the most widely used prophage prediction tools.

        </p>

        <p className="mt-6 text-lg leading-relaxed">

          <EntityLink name="Methanotroph"/> interactions with phages remain an active research area.

        </p>

      </div>

    </main>
  );
}