from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]

scripts = [
    "generate_article.py",
    "generate_seo.py",
    "generate_social.py",
    "generate_newsletter.py",
]

print("Starting publishing pipeline...")

for script in scripts:

    print(f"Running {script}...")

    subprocess.run(
        [
            sys.executable,
            str(ROOT / "automation" / "editorial_pipeline" / script),
        ],
        check=True,
    )

    print(f"Completed {script}")

print("Publishing pipeline completed.")