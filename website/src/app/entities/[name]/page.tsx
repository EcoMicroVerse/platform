
import { getEntityInfo } from "@/lib/entityIntelligence";
import { getEntityTimeline } from "@/lib/entityTimeline";
import EntityTimelineSection from "@/components/entities/EntityTimelineSection";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function EntityPage({
  params,
}: Props) {
  const { name } = await params;

  const entity =
    await getEntityInfo(name);

  if (!entity) {
    notFound();
  }

  const timeline =
    await getEntityTimeline(name);

  return (
    <main className="min-h-screen bg-[#07121f] text-white">

      <div className="mx-auto max-w-6xl p-8">

        <div className="text-xs uppercase tracking-widest text-teal-300">
          Scientific Entity
        </div>

        <h1 className="mt-3 text-5xl font-bold">
          {entity.name}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          {entity.description}
        </p>

        <EntityTimelineSection
          timeline={timeline}
        />

      </div>

    </main>
  );
}