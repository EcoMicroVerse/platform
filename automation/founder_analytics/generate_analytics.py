from pathlib import Path
from collections import Counter
import yaml

ROOT = Path(__file__).resolve().parents[2]

approved_dir = ROOT / "content" / "approved"
dashboard_dir = ROOT / "content" / "dashboard"

collections = Counter()
methods = Counter()
priorities = Counter()
scores = []

for folder in approved_dir.iterdir():

    metadata = folder / "metadata.yml"

    if not metadata.exists():
        continue

    data = yaml.safe_load(metadata.read_text())

    collections[data.get("recommended_collection", "GENERAL")] += 1

    priorities[data.get("priority", "unknown")] += 1

    if data.get("score") is not None:
        scores.append(data["score"])

    for term in data.get("matched_terms", []):
        methods[term["term"]] += 1

analytics = {
    "collections": dict(collections),
    "methods": dict(methods.most_common(10)),
    "priorities": dict(priorities),

    "average_score": round(sum(scores)/len(scores),1) if scores else 0,

    "health_score": round(
        (
            (round(sum(scores)/len(scores),1) if scores else 0) * 0.6
            + len(collections) * 20
        ),
        1
    ),

    "collection_chart": [
        {"name": k, "value": v}
        for k, v in collections.items()
    ],

    "method_chart": [
        {"name": k, "value": v}
        for k, v in methods.most_common(5)
    ],

    "priority_chart": [
        {"name": k, "value": v}
        for k, v in priorities.items()
    ],
}

(dashboard_dir/"analytics.yml").write_text(
    yaml.safe_dump(
        analytics,
        sort_keys=False,
        allow_unicode=True
    )
)

print("Analytics generated.")
