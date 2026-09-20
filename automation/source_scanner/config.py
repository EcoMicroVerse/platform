
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

SOURCES_FILE = ROOT / ".emv" / "sources.yml"
RULES_FILE = ROOT / ".emv" / "source_rules.yml"

OUTPUT_DIR = ROOT / "content" / "inbox"