from pathlib import Path
import yaml
import json

ROOT = Path(__file__).resolve().parents[2]

GRAPH = ROOT / "content" / "graph"
OUTPUT = ROOT / "website" / "public" / "graph"

OUTPUT.mkdir(parents=True, exist_ok=True)

nodes = yaml.safe_load((GRAPH/"nodes.yml").read_text())
edges = yaml.safe_load((GRAPH/"edges.yml").read_text())

graph = {
    "nodes": nodes,
    "edges": edges
}

with open(OUTPUT/"graph.json","w") as f:
    json.dump(graph,f,indent=2)

print("Graph exported.")
print(f"Nodes: {len(nodes)}")
print(f"Edges: {len(edges)}")