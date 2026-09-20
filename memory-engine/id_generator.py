
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUNTER_DIR = ROOT / "memory-engine" / "counters"

COUNTER_DIR.mkdir(exist_ok=True)


def next_number(collection):
    counter_file = COUNTER_DIR / f"{collection}.txt"

    if counter_file.exists():
        value = int(counter_file.read_text())
    else:
        value = 0

    value += 1
    counter_file.write_text(str(value))

    return value


def generate(collection):
    now = datetime.utcnow()
    number = next_number(collection)

    return f"EMV-{collection}{now:%y%m}-{number:04d}"


if __name__ == "__main__":
    print(generate("TPHAGE"))
    print(generate("GENERAL"))