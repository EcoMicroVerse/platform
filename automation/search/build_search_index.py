from pathlib import Path
import yaml
import json

ROOT = Path(__file__).resolve().parents[2]

approved_dir = ROOT / "content" / "approved"
output_dir = ROOT / "content" / "search"

output_dir.mkdir(exist_ok=True)

index = []

for folder in approved_dir.iterdir():

    metadata_file = folder / "metadata.yml"

    if not metadata_file.exists():
        continue

    metadata = yaml.safe_load(metadata_file.read_text())

    summary = ""

    summary_file = folder / "summary.md"

    if summary_file.exists():
        summary = summary_file.read_text()

    index.append({

        "id": metadata["emv_id"],
        "title": metadata["title"],
        "collection": metadata["recommended_collection"],
        "type": metadata["type"],
        "score": metadata["score"],
        "priority": metadata["priority"],
        "summary": summary,

        "profiles":[
            p["name"]
            for p in metadata.get("profile_matches",[])
        ],

        "methods":[
            t["term"]
            for t in metadata.get("matched_terms",[])
        ],

    })

(output_dir/"search_index.json").write_text(
    json.dumps(index,indent=2)
)

print(f"Indexed {len(index)} Research Objects.")
