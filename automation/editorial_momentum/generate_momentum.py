from pathlib import Path
from collections import Counter
from datetime import datetime, timedelta
import yaml

ROOT = Path(__file__).resolve().parents[2]

approved_dir = ROOT / "content" / "approved"
dashboard_dir = ROOT / "content" / "dashboard"

dashboard_dir.mkdir(exist_ok=True)

daily = Counter()
events = []

for folder in approved_dir.iterdir():

    timeline = folder / "timeline.yml"

    if not timeline.exists():
        continue

    data = yaml.safe_load(timeline.read_text()) or {}

    for item in data.get("timeline", []):

        date = item.get("date")

        if not date:
            continue

        daily[date] += 1
        events.append(item)

today = datetime.today()

calendar = []

for i in range(365):

    day = today - timedelta(days=364-i)
    date = day.strftime("%Y-%m-%d")

    calendar.append({
        "date": date,
        "count": daily.get(date,0)
    })

streak = 0

cursor = today

while True:

    key = cursor.strftime("%Y-%m-%d")

    if daily.get(key,0) > 0:
        streak += 1
        cursor -= timedelta(days=1)
    else:
        break

momentum = {
    "generated": today.strftime("%Y-%m-%d"),
    "streak": streak,
    "total_events": len(events),
    "calendar": calendar,
}

(dashboard_dir / "momentum.yml").write_text(
    yaml.safe_dump(momentum, sort_keys=False)
)

print("Momentum generated.")
