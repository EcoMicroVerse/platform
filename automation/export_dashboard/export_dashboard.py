
from pathlib import Path
import yaml
import json

ROOT = Path(__file__).resolve().parents[2]

INBOX = ROOT / "content" / "inbox"
APPROVED = ROOT / "content" / "approved"
OUTPUT = ROOT / "website" / "public" / "dashboard"

OUTPUT.mkdir(parents=True, exist_ok=True)


def load_yaml(folder):
    items = []

    if not folder.exists():
        return items

    for f in sorted(folder.glob("*.yml")):
        items.append(yaml.safe_load(f.read_text()))

    return items


def load_research_objects():
    objects = []

    if not APPROVED.exists():
        return objects

    for folder in sorted(APPROVED.iterdir()):
        metadata = folder / "metadata.yml"

        if metadata.exists():
            objects.append(yaml.safe_load(metadata.read_text()))

    return objects


dashboard = {
    "stats": {
        "inbox": len(list(INBOX.glob("*.yml"))),
        "approved": len(load_research_objects()),
    },
    "review_queue": load_yaml(INBOX),
    "approved_objects": load_research_objects(),
}

with open(OUTPUT / "dashboard.json", "w") as f:
    json.dump(dashboard, f, indent=2)

print("Dashboard exported.")
print(f"Output: {OUTPUT/'dashboard.json'}")