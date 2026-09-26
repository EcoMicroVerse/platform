from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"


def load_markdown(path):
    if path.exists():
        return path.read_text().strip()
    return ""


for folder in APPROVED.iterdir():

    if not folder.is_dir():
        continue

    metadata_file = folder / "metadata.yml"

    if not metadata_file.exists():
        continue

    metadata = yaml.safe_load(metadata_file.read_text())

    summary = load_markdown(folder / "summary.md")
    notes = load_markdown(folder / "founder_notes.md")

    article = f"""# {metadata['title']}

## Executive Summary

{summary if summary else "Summary pending."}

---

## Why This Matters

This research contributes to the field of **{metadata.get('recommended_collection','GENERAL')}** and was prioritised by EcoMicroVerse because it aligns with our scientific intelligence pipeline.

---

## Key Highlights

- Priority: **{metadata.get('priority','unknown')}**
- EMV Score: **{metadata.get('score','N/A')}**
- Collection: **{metadata.get('recommended_collection','GENERAL')}**
- Publication Type: **{metadata.get('type','unknown')}**

---

## Founder Editorial Note

{notes if notes else "Founder commentary pending."}

---

## Continue Exploring

This article includes an AI-generated Reading Companion, Citation Trail, and Family Tree inside EcoMicroVerse.

---

## Citation

Original source: {metadata.get('link')}
"""

    (folder / "article.md").write_text(article)

print("AI article drafts generated.")
