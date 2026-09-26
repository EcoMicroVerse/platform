from pathlib import Path
import yaml
import requests
import re

ROOT = Path(__file__).resolve().parents[2]
APPROVED = ROOT / "content" / "approved"

OPENALEX = "https://api.openalex.org/works"


# ==========================================================
# Build search profile
# ==========================================================

def build_search_profile(metadata):

    keywords = []

    title = metadata.get("title", "")

    if title:
        keywords.extend(re.findall(r"[A-Za-z0-9-]{4,}", title))

    for item in metadata.get("matched_terms", []):
        if item.get("term"):
            keywords.append(item["term"])

    for profile in metadata.get("profile_matches", []):
        if profile.get("name"):
            keywords.append(profile["name"])

    seen = set()
    final = []

    for word in keywords:
        if word.lower() not in seen:
            seen.add(word.lower())
            final.append(word)

    return final


# ==========================================================
# OpenAlex API
# ==========================================================

def search_openalex(query):

    try:

        r = requests.get(
            OPENALEX,
            params={
                "search": query,
                "per-page": 15
            },
            timeout=20
        )

        r.raise_for_status()

        return r.json()["results"]

    except Exception as e:

        print("OpenAlex search error:", e)
        return []


def get_work(openalex_id):

    if not openalex_id:
        return None

    try:

        r = requests.get(openalex_id, timeout=20)
        r.raise_for_status()

        return r.json()

    except Exception:

        return None


def get_children(cited_by_url):

    if not cited_by_url:
        return []

    try:

        r = requests.get(
            cited_by_url,
            params={"per-page": 3},
            timeout=20
        )

        r.raise_for_status()

        return r.json()["results"]

    except Exception:

        return []


# ==========================================================
# Scoring
# ==========================================================

def score_paper(metadata, paper):

    score = 0

    title = (paper.get("display_name") or "").lower()

    concepts = " ".join(
        c["display_name"].lower()
        for c in paper.get("concepts", [])
    )

    for item in metadata.get("matched_terms", []):

        term = item["term"].lower()

        if term in title:
            score += 40

        if term in concepts:
            score += 20

    score += min(
        paper.get("cited_by_count", 0),
        500
    ) / 20

    return score


# ==========================================================
# Classification
# ==========================================================

def classify(paper, current_year):

    year = paper.get("publication_year") or 0
    citations = paper.get("cited_by_count", 0)

    title = (paper.get("display_name") or "").lower()

    if "review" in title:
        return "Review"

    if year < current_year and citations >= 50:
        return "Landmark"

    if year > current_year:
        return "Follow-up"

    if year == current_year:
        return "Current Era"

    return "Related"


# ==========================================================
# AI explanation
# ==========================================================

def explain(category, metadata):

    terms = [
        x["term"]
        for x in metadata.get("matched_terms", [])
    ]

    if category == "Landmark":
        return (
            "This is one of the earlier influential papers that helped establish this research area."
        )

    if category == "Follow-up":
        return (
            "This study extends the ideas presented in the current work and shows how the field progressed."
        )

    if category == "Current Era":
        return (
            "This paper sits alongside the current study and reflects today's state of research."
        )

    if category == "Review":
        return (
            "This review provides broader context before exploring more specialised studies."
        )

    return (
        f"This paper shares themes such as "
        f"{', '.join(terms[:2]) or 'related research topics'}."
    )


# ==========================================================
# Main
# ==========================================================

updated = 0

for folder in APPROVED.iterdir():

    if not folder.is_dir():
        continue

    metadata_file = folder / "metadata.yml"

    if not metadata_file.exists():
        continue

    metadata = yaml.safe_load(metadata_file.read_text())

    terms = build_search_profile(metadata)

    query = " ".join(terms[:6])

    current_year = metadata.get("published")

    if current_year is None:
        current_year = 2026

    results = search_openalex(query)

    scored = []

    current_title = metadata.get("title", "").lower()

    for paper in results:

        paper_title = (paper.get("display_name") or "").lower()

        # Don't recommend the current paper itself
        if paper_title == current_title:
            continue

        score = score_paper(metadata, paper)

        if score < 20:
            continue

        scored.append((score, paper))

    scored.sort(key=lambda x: x[0], reverse=True)

    recommendations = []

    for score, paper in scored[:5]:

        category = classify(paper, current_year)

        recommendations.append({
            "category": category,
            "title": paper.get("display_name"),
            "year": paper.get("publication_year"),
            "doi": paper.get("doi"),
            "citations": paper.get("cited_by_count", 0),
            "relevance_score": round(score, 1),
            "openalex": paper.get("id"),
            "why_read_next": explain(category, metadata),
        })

    # ---------- Citation Trail ----------

    landmark = next(
        (r for r in recommendations if r["category"] == "Landmark"),
        None,
    )

    follow_up = next(
        (r for r in recommendations if r["category"] == "Follow-up"),
        None,
    )

    citation_trail = {
        "landmark": landmark,
        "current": metadata["title"],
        "follow_up": follow_up,
    }

    # ---------- Family Tree ----------

    family_tree = {
        "parents": [],
        "siblings": [],
        "children": [],
    }

    if results:

        current_work = get_work(results[0]["id"])

        if current_work:

            # Parents
            for parent in current_work.get("referenced_works", [])[:3]:

                work = get_work(parent)

                if work:
                    family_tree["parents"].append({
                        "title": work.get("display_name"),
                        "year": work.get("publication_year"),
                        "citations": work.get("cited_by_count", 0),
                        "openalex": work.get("id"),
                    })

            # Children
            children = get_children(
                current_work.get("cited_by_api_url")
            )

            for child in children[:3]:
                family_tree["children"].append({
                    "title": child.get("display_name"),
                    "year": child.get("publication_year"),
                    "citations": child.get("cited_by_count", 0),
                    "openalex": child.get("id"),
                })

            # Siblings
            for paper in results[1:4]:
                family_tree["siblings"].append({
                    "title": paper.get("display_name"),
                    "year": paper.get("publication_year"),
                    "citations": paper.get("cited_by_count", 0),
                    "openalex": paper.get("id"),
                })

    # ---------- Final output ----------

    reading_path = {
        "paper": metadata["emv_id"],
        "search_terms": terms,
        "citation_trail": citation_trail,
        "family_tree": family_tree,
        "recommended": recommendations,
    }

    (folder / "reading_path.yml").write_text(
        yaml.dump(reading_path, sort_keys=False)
    )

    updated += 1

print(f"Updated {updated} Reading Paths.")