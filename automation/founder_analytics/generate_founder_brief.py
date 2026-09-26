from pathlib import Path
from collections import Counter
from datetime import datetime
import yaml

ROOT = Path(__file__).resolve().parents[2]

approved_dir = ROOT / "content" / "approved"
inbox_dir = ROOT / "content" / "inbox"
dashboard_dir = ROOT / "content" / "dashboard"

dashboard_dir.mkdir(exist_ok=True)

approved = []
scores = []
collections = Counter()
methods = Counter()
high_priority = 0

# Read all approved Research Objects
for folder in approved_dir.iterdir():

    metadata_file = folder / "metadata.yml"

    if not metadata_file.exists():
        continue

    data = yaml.safe_load(metadata_file.read_text())

    approved.append(data)

    if data.get("score") is not None:
        scores.append(data["score"])

    if data.get("recommended_collection"):
        collections[data["recommended_collection"]] += 1

    if data.get("priority") == "high":
        high_priority += 1

    for term in data.get("matched_terms", []):
        methods[term["term"]] += 1

# Calculate metrics
processed = len(list(inbox_dir.glob("*.yml")))
approved_count = len(approved)
avg_score = round(sum(scores) / len(scores), 1) if scores else 0

top_collection = (
    collections.most_common(1)[0][0]
    if collections
    else "GENERAL"
)

top_method = (
    methods.most_common(1)[0][0]
    if methods
    else "None"
)

# Context-aware insights
recent_focus = (
    top_collection
    if top_collection != "GENERAL"
    else "your repository"
)

next_action = (
    f"Consider reviewing {top_collection} next."
    if collections
    else "Your repository is ready for the next scan."
)

message = (
    f"Since your latest repository update, "
    f"{processed} papers are awaiting review, "
    f"{approved_count} Research Objects are available, "
    f"and '{top_method}' is currently the strongest emerging theme."
)

# Final Founder Brief
brief = {
    "generated": datetime.today().strftime("%Y-%m-%d"),
    "processed": processed,
    "approved": approved_count,
    "average_score": avg_score,
    "high_priority": high_priority,
    "top_collection": top_collection,
    "top_method": top_method,
    "message": message,
    "next_action": next_action,
    "focus": recent_focus,
}

# Save YAML
(dashboard_dir / "founder_brief.yml").write_text(
    yaml.safe_dump(brief, sort_keys=False, allow_unicode=True)
)

print("Founder Brief generated.")