from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"

for folder in APPROVED.iterdir():

    metadata_file = folder / "metadata.yml"

    if not metadata_file.exists():
        continue

    metadata = yaml.safe_load(metadata_file.read_text())

    seo = {
        "title": metadata["title"],
        "description": f"EcoMicroVerse summary of {metadata['title']}.",
        "keywords": [
            metadata.get("recommended_collection","GENERAL"),
            "phage",
            "bioinformatics",
            "microbiology"
        ]
    }

    (folder/"seo.yml").write_text(
        yaml.dump(seo, sort_keys=False)
    )

print("SEO metadata generated.")
