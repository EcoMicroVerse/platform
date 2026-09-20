
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]
PROFILES_FILE = ROOT / ".emv" / "profiles.yml"

COLLECTION_MAP = {
    frozenset(["Phage Core"]): "PHAGE",
    frozenset(["Tool Intelligence"]): "TNEW",
    frozenset(["Metagenomics"]): "META",
    frozenset(["Microbial Ecology"]): "ECO",
    frozenset(["Methane Cycle"]): "METH",
    frozenset(["Conference Watch"]): "CONF",
    frozenset(["Career Watch"]): "JOB",
    frozenset(["Phage Core", "Tool Intelligence"]): "TPHAGE",
}


def load_profiles():
    with open(PROFILES_FILE, "r") as f:
        return yaml.safe_load(f)["profiles"]


def classify(title: str):
    title_lower = title.lower()
    profiles = load_profiles()

    profile_scores = {}
    term_matches = {}

    for profile in profiles.values():
        if not profile.get("enabled", False):
            continue

        profile_name = profile["name"]
        score = 0

        for term, weight in profile.get("keywords", {}).items():
            if term.lower() in title_lower:
                score += weight

                if term not in term_matches:
                    term_matches[term] = {
                        "term": term,
                        "score": 0,
                        "profiles": [],
                    }

                term_matches[term]["score"] += weight
                term_matches[term]["profiles"].append(profile_name)

        if score > 0:
            profile_scores[profile_name] = score

    total_score = sum(profile_scores.values())

    if total_score >= 150:
        priority = "critical"
    elif total_score >= 80:
        priority = "high"
    elif total_score >= 40:
        priority = "medium"
    else:
        priority = "low"

    profile_matches = [
        {"name": name, "score": score}
        for name, score in sorted(
            profile_scores.items(),
            key=lambda x: x[1],
            reverse=True,
        )
    ]

    matched_terms = sorted(
        term_matches.values(),
        key=lambda x: x["score"],
        reverse=True,
    )

    names = frozenset(profile_scores.keys())
    recommended_collection = COLLECTION_MAP.get(names)

    if recommended_collection is None:
        if "Phage Core" in names and "Tool Intelligence" in names:
            recommended_collection = "TPHAGE"
        elif "Phage Core" in names:
            recommended_collection = "PHAGE"
        elif "Tool Intelligence" in names:
            recommended_collection = "TNEW"
        elif "Metagenomics" in names:
            recommended_collection = "META"
        elif "Microbial Ecology" in names:
            recommended_collection = "ECO"
        else:
            recommended_collection = "GENERAL"

    return {
        "score": total_score,
        "priority": priority,
        "recommended_collection": recommended_collection,
        "profiles": profile_matches,
        "matched_terms": matched_terms,
    }


if __name__ == "__main__":

    tests = [
        "DeepVir: A reproducible workflow for large-scale viral dark matter discovery",
        "Benchmarking PHASTER and VirSorter2 for prophage detection",
        "Metagenome assembly improves freshwater viral ecology studies",
    ]

    print("\nEcoMicroVerse Gatekeeper v2\n")

    for title in tests:
        result = classify(title)

        print("=" * 70)
        print(title)
        print(f"Score: {result['score']}")
        print(f"Priority: {result['priority']}")
        print(f"Collection: {result['recommended_collection']}")
        print("Profiles:")

        for p in result["profiles"]:
            print(f"  - {p['name']}: {p['score']}")

        print("Matched terms:")

        for t in result["matched_terms"]:
            print(f"  - {t['term']} ({t['score']}) -> {', '.join(t['profiles'])}")

        print()