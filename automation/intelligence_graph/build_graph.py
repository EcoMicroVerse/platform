from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]

APPROVED = ROOT / "content" / "approved"
OUTPUT = ROOT / "content" / "graph"

nodes = {}
edges = []

def add_node(node_id, node_type, title):
    nodes[node_id] = {
        "id": node_id,
        "type": node_type,
        "title": title,
    }

for folder in APPROVED.iterdir():

    metadata = folder / "metadata.yml"

    if not metadata.exists():
        continue

    data = yaml.safe_load(metadata.read_text())

    paper_id = folder.name

    add_node(paper_id, "paper", data.get("title"))

    collection = data.get("recommended_collection")

    if collection:

        add_node(collection, "collection", collection)

        edges.append({
            "from": paper_id,
            "to": collection,
            "type": "belongs_to",
        })

    for profile in data.get("profile_matches", []):

        name = profile["name"]

        add_node(name, "profile", name)

        edges.append({
            "from": paper_id,
            "to": name,
            "type": "tagged_with",
        })

    for term in data.get("matched_terms", []):

        term_name = term["term"]

        add_node(term_name, "method", term_name)

        edges.append({
            "from": paper_id,
            "to": term_name,
            "type": "uses",
        })

OUTPUT.mkdir(parents=True, exist_ok=True)

with open(OUTPUT / "nodes.yml", "w") as f:
    yaml.safe_dump(list(nodes.values()), f, sort_keys=False)

with open(OUTPUT / "edges.yml", "w") as f:
    yaml.safe_dump(edges, f, sort_keys=False)

print(f"Nodes: {len(nodes)}")
print(f"Edges: {len(edges)}")