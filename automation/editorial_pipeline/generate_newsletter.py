from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"

for folder in APPROVED.iterdir():

    metadata = yaml.safe_load(
        (folder/"metadata.yml").read_text()
    )

    text = f"""## {metadata['title']}

Collection: {metadata.get('recommended_collection','GENERAL')}

Read why this research matters in EcoMicroVerse.
"""

    (folder/"newsletter.md").write_text(text)

print("Newsletter snippets generated.")
