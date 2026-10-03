import GraphExplorer from "@/components/graph/GraphExplorer";
import { loadGraph } from "@/lib/graph";
import { getAllEntities } from "@/lib/entityIntelligence";
import { requireComingSoonAccess } from "@/lib/comingSoon";

export default async function GraphPage() {
  await requireComingSoonAccess("/graph");
  const graph = await loadGraph();
  const entities = await getAllEntities();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-8">

          <div className="text-xs uppercase tracking-widest text-teal-300">
            EcoMicroVerse Intelligence
          </div>

          <h1 className="mt-3 text-5xl font-bold">
            Microbial Knowledge Graph
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Explore relationships between Research Objects,
            microbial groups,
            bioinformatics tools,
            historical discoveries,
            and scientific methods.
          </p>

        </div>

        <GraphExplorer
          graph={graph}
          entities={entities}
        />

      </div>

    </main>
  );
}