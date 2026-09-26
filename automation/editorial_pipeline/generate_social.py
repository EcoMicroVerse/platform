from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"

for folder in APPROVED.iterdir():

    metadata = yaml.safe_load(
        (folder/"metadata.yml").read_text()
    )

    social = {
        "linkedin":
            f"New on EcoMicroVerse: {metadata['title']}",
        "x":
            f"{metadata['title']} #Phage #Bioinformatics",
        "bluesky":
            f"Latest EMV Research Object: {metadata['title']}"
    }

    (folder/"social.yml").write_text(
        yaml.dump(social, sort_keys=False)
    )

print("Social drafts generated.")
