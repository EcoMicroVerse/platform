from pathlib import Path
import json
import yaml

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"

updated = 0

for folder in APPROVED.iterdir():

    if not folder.is_dir():
        continue

    timeline_file = folder / "timeline.yml"

    if not timeline_file.exists():
        continue

    text = timeline_file.read_text().strip()

    try:
        data = json.loads(text)
    except Exception:
        continue

    timeline_file.write_text(
        yaml.dump(data, sort_keys=False)
    )

    updated += 1

print(f"Updated {updated} timeline files.")
