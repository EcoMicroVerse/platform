"use client";

import { Activity, Database, GitBranch, Network } from "lucide-react";

type Props = {
  health: {
    sources: number;
    entities: number;
    graphNodes: number;
    graphEdges: number;
  };
};

export default function WorkspacePlatformHealth({ health }: Props) {
  const stats = [
    {
      label: "Sources",
      value: health.sources,
      icon: Database,
      description: "Registered scientific sources",
    },
    {
      label: "Entities",
      value: health.entities,
      icon: Activity,
      description: "Knowledge-base entities",
    },
    {
      label: "Graph Nodes",
      value: health.graphNodes,
      icon: Network,
      description: "Knowledge graph nodes",
    },
    {
      label: "Graph Links",
      value: health.graphEdges,
      icon: GitBranch,
      description: "Knowledge graph relationships",
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Platform Health</h2>
        <p className="text-sm text-muted-foreground">
          Current state of the research intelligence infrastructure.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-background p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg border p-2">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}