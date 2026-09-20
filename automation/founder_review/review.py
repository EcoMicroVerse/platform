
from pathlib import Path
import yaml
import sys

ROOT = Path(__file__).resolve().parents[2]

sys.path.append(str(ROOT / "memory-engine"))
sys.path.append(str(ROOT / "automation" / "source_scanner"))

from id_generator import generate
from founder_log import record
from gatekeeper import classify

INBOX = ROOT / "content" / "inbox"
APPROVED = ROOT / "content" / "approved"


def list_papers():
    files = sorted(INBOX.glob("*.yml"))

    print("\nFounder Review Queue\n")

    for i, f in enumerate(files, 1):
        data = yaml.safe_load(f.read_text())

        print(f"[{i}] {data['title']}")
        print(f"    Priority: {data['priority']}")
        print(f"    Collection: {data['recommended_collection']}")
        print(f"    Score: {data['score']}")
        print()


def approve(index):
    files = sorted(INBOX.glob("*.yml"))
    file = files[index]

    data = yaml.safe_load(file.read_text())

    collection = data["recommended_collection"]

    emv_id = generate(collection)

    folder = APPROVED / emv_id
    assets = folder / "assets"

    assets.mkdir(parents=True, exist_ok=True)

    data["status"] = "approved"
    data["founder_decision"] = "approve"
    data["emv_id"] = emv_id

    with open(folder / "metadata.yml", "w") as f:
        yaml.safe_dump(data, f, sort_keys=False)

    (folder / "summary.md").write_text("# Pending summary\n")
    (folder / "founder_notes.md").write_text("# Founder notes\n")
    (folder / "timeline.yml").write_text("timeline: []\n")
    (folder / "citations.yml").write_text("citations: []\n")

    file.unlink()

    record(
        data["title"],
        "approve",
        data["priority"],
        [(p["name"], p["score"]) for p in data["profile_matches"]],
    )

    print(f"\nApproved: {emv_id}")


if __name__ == "__main__":

    list_papers()

    choice = input("Approve paper number (Enter to exit): ").strip()

    if choice:
        approve(int(choice) - 1)