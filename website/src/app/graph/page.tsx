
import Link from "next/link";
import { loadKnowledgeGraph } from "@/lib/knowledgeGraph";
import KnowledgeGraph from "@/components/graph/KnowledgeGraph";

export default async function GraphPage() {
  const graph = await loadKnowledgeGraph();

  const nodeMap = new Map(
    graph.nodes.map((node: any) => [node.id, node])
  );

  const getLabel = (id: string) =>
    nodeMap.get(id)?.label ?? id;

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl space-y-10 p-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-teal-300">
            Home
          </Link>

          <span>→</span>

          <span className="text-slate-300">
            Knowledge Graph
          </span>
        </div>

        {/* Hero */}
        <section>
          <div className="text-sm uppercase tracking-[0.3em] text-teal-300">
            Scientific Knowledge Graph
          </div>

          <h1 className="mt-3 text-5xl font-bold">
            Research Connections
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Explore how software, methods, organisms and scientific concepts
            connect across EcoMicroVerse Research Objects.
          </p>
        </section>

        {/* Statistics */}
        <section className="grid gap-6 md:grid-cols-4">
  <div className="rounded-2xl bg-[#061426] p-6">
    <div className="text-sm uppercase text-teal-300">
      Nodes
    </div>

    <div className="mt-2 text-4xl font-bold">
      {graph.nodes.length}
    </div>
  </div>

  <div className="rounded-2xl bg-[#061426] p-6">
    <div className="text-sm uppercase text-teal-300">
      Relationships
    </div>

    <div className="mt-2 text-4xl font-bold">
      {graph.edges.length}
    </div>
  </div>

  <div className="rounded-2xl bg-[#061426] p-6">
    <div className="text-sm uppercase text-teal-300">
      Entity Types
    </div>

    <div className="mt-2 text-4xl font-bold">
      {new Set(graph.nodes.map((n:any)=>n.type)).size}
    </div>
  </div>

  <div className="rounded-2xl bg-[#061426] p-6">
    <div className="text-sm uppercase text-teal-300">
      Aliases
    </div>

    <div className="mt-2 text-4xl font-bold">
      {Object.keys(graph.aliases).length}
    </div>
  </div>
</section>

        {/* Scientific Entities */}
        <section className="rounded-3xl border border-slate-800 bg-[#061426] p-8">
          <h2 className="text-2xl font-semibold">
            Scientific Entities
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {graph.nodes.map((node: any) => (
              <div
                key={node.id}
                className="rounded-full border border-teal-500/20 bg-teal-500/10 px-5 py-3 text-lg text-teal-300"
              >
                {node.label}
              </div>
            ))}
          </div>
        </section>

        {/* Current Relationships */}
        <section className="rounded-3xl border border-slate-800 bg-[#061426] p-8">
          <h2 className="text-2xl font-semibold">
            Current Relationships
          </h2>

          <KnowledgeGraph
  nodes={graph.nodes}
  links={graph.edges}
/>

          <div className="mt-8 space-y-5">
            {graph.edges.map((edge: any, index: number) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/20 p-4"
              >
                <span className="font-semibold text-white">
                  {getLabel(edge.source)}
                </span>

                <span className="rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-300">
                  {edge.relation}
                </span>

                <span className="font-semibold text-white">
                  {getLabel(edge.target)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Next */}
        <section className="rounded-3xl border border-teal-500/20 bg-gradient-to-r from-[#082028] to-[#061426] p-8">
          <div className="text-sm uppercase tracking-[0.3em] text-teal-300">
            Coming Next
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            Interactive Scientific Network
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            Soon you'll be able to click scientific concepts,
            explore relationships visually,
            and navigate connected Research Objects.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-teal-500/10 px-4 py-2 text-teal-300">
              Clickable Nodes
            </span>

            <span className="rounded-full bg-teal-500/10 px-4 py-2 text-teal-300">
              Force-directed Graph
            </span>

            <span className="rounded-full bg-teal-500/10 px-4 py-2 text-teal-300">
              Relationship Explorer
            </span>
          </div>
        </section>

        {/* Back button */}
        <div>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
          >
            Back to Homepage
          </Link>
        </div>

      </div>
    </main>
  );
}