from pathlib import Path
import yaml
import json

ROOT = Path(__file__).resolve().parents[2]

INBOX = ROOT / "content" / "inbox"
APPROVED = ROOT / "content" / "approved"
OUTPUT = ROOT / "website" / "public" / "dashboard"

OUTPUT.mkdir(parents=True, exist_ok=True)


def load_yaml(folder):
    """Load all inbox YAML files."""
    items = []

    if not folder.exists():
        return items

    for f in sorted(folder.glob("*.yml")):
        items.append(yaml.safe_load(f.read_text()))

    return items


def load_research_objects():
    """Load metadata from approved Research Objects."""
    objects = []

    if not APPROVED.exists():
        return objects

    for folder in sorted(APPROVED.iterdir()):
        metadata = folder / "metadata.yml"

        if metadata.exists():
            obj = yaml.safe_load(metadata.read_text())

            if obj is None:
                obj = {}

            # Ensure every object has an EMV ID
            obj.setdefault("emv_id", folder.name)

            objects.append(obj)

    return objects


# ---------- Build Dashboard ----------

review_queue = load_yaml(INBOX)
approved_objects = load_research_objects()

dashboard = {
    "stats": {
        "inbox": len(review_queue),
        "approved": len(approved_objects),
    },
    "review_queue": review_queue,
    "approved_items": [
        {
            "emv_id": obj.get("emv_id"),
            "title": obj.get("title", ""),
            "collection": obj.get("collection", ""),
            "priority": obj.get("priority", ""),
        }
        for obj in approved_objects
    ],
    "approved_objects": approved_objects,
}

# ---------- Export ----------

with open(OUTPUT / "dashboard.json", "w") as f:
    json.dump(dashboard, f, indent=2)

print("Dashboard exported.")
print(f"Output: {OUTPUT/'dashboard.json'}")
print(
    f"Inbox: {dashboard['stats']['inbox']} | Approved: {dashboard['stats']['approved']}"
)