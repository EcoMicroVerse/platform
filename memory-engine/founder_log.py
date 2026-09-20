
from pathlib import Path
from datetime import datetime
import csv

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / "memory-engine" / "founder_decisions.csv"

if not LOG.exists():
    with open(LOG, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(
            [
                "timestamp",
                "title",
                "decision",
                "priority",
                "profiles",
            ]
        )


def record(title, decision, priority, profiles):
    with open(LOG, "a", newline="") as f:
        writer = csv.writer(f)

        writer.writerow(
            [
                datetime.utcnow().isoformat(),
                title,
                decision,
                priority,
                "; ".join(p[0] for p in profiles),
            ]
        )


if __name__ == "__main__":
    record(
        "DeepVir",
        "approve",
        "high",
        [("Phage Core", 60), ("Tool Intelligence", 40)],
    )

    print("Founder decision recorded.")