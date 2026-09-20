
from pathlib import Path
from datetime import datetime
import feedparser
import yaml

from config import OUTPUT_DIR, SOURCES_FILE
from gatekeeper import classify

ROOT = Path(__file__).resolve().parents[2]
SEEN_FILE = ROOT / ".emv" / "seen_items.yml"


def load_sources():
    with open(SOURCES_FILE, "r") as f:
        return yaml.safe_load(f)


def load_seen():
    if SEEN_FILE.exists():
        with open(SEEN_FILE, "r") as f:
            return yaml.safe_load(f) or {}
    return {}


def save_seen(seen):
    with open(SEEN_FILE, "w") as f:
        yaml.safe_dump(seen, f)


def save_inbox(item):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S_%f")
    filename = OUTPUT_DIR / f"{timestamp}.yml"

    with open(filename, "w") as f:
        yaml.safe_dump(item, f, sort_keys=False)


def scan_rss(source, seen):
    print("  Scanning RSS...")

    feed = feedparser.parse(source["url"])

    if not feed.entries:
        print("    No RSS entries found.")
        return 0

    new_items = 0

    for entry in feed.entries[:10]:
        uid = entry.get("id") or entry.get("link")

        if uid in seen:
            continue

        seen[uid] = True

        classification = classify(entry.get("title", ""))

        save_inbox(
            {
                "status": "review",
                "collection": source["name"],
                "title": entry.get("title"),
                "link": entry.get("link"),
                "published": entry.get("published"),
                "type": source.get("type"),
                "emv_id": None,
                "priority": classification["priority"],
                "score": classification["score"],
                "recommended_collection": classification["recommended_collection"],
                "profile_matches": classification["profiles"],
                "matched_terms": classification["matched_terms"],
                "founder_decision": "pending",
                "summary": None,
                "why_it_matters": None,
            }
        )

        new_items += 1

    print(f"    Added {new_items} new item(s).")
    return new_items


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    sources = load_sources()
    seen = load_seen()

    total_new = 0

    print("\nEcoMicroVerse Literature Scanner v1.1\n")

    for collection, entries in sources["collections"].items():
        print(f"\n[{collection}]")

        for source in entries:
            print(f"- {source['name']}")

            if source.get("access") == "rss":
                total_new += scan_rss(source, seen)
            else:
                print(f"  Skipping ({source.get('access', 'website')})")

    save_seen(seen)

    print("\n--------------------------------")
    print(f"New items discovered: {total_new}")
    print(f"Inbox location: {OUTPUT_DIR}")
    print("--------------------------------")


if __name__ == "__main__":
    main()