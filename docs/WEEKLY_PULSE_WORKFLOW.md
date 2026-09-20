# EcoMicroVerse Weekly Pulse Workflow

**Version:** 1.0

**Release:** EMV-R2509-0.5

**Owner:** Founder (EcoMicroVerse)

---

## Purpose

Weekly Pulse is EcoMicroVerse's flagship editorial product. Every week, the platform scans trusted scientific sources, identifies important research, generates concise summaries, connects related discoveries, and prepares content for publication across the website and social media.

The goal is to reduce information overload while preserving scientific accuracy.

---

## Weekly Editorial Pipeline

### Stage 1 — Source Scan

Input comes from `.emv/sources.yml`.

Current sources include:

* Nature Microbiology
* ISME Journal
* bioRxiv
* MGnify
* GitHub Releases
* Conference pages
* Job boards

Output:

* Candidate articles
* Tool releases
* Conference announcements
* Job opportunities

---

### Stage 2 — Keyword Filtering

Each item is checked against `.emv/source_rules.yml`.

Priority keywords include:

* bacteriophage
* prophage
* microbial ecology
* metagenome
* metatranscriptome
* viral ecology
* methane
* bioinformatics

Items outside the scope are ignored unless manually approved.

---

### Stage 3 — AI Summarisation

Each selected paper receives:

* 3-sentence summary
* Why it matters
* Methods used
* Key findings
* Suggested EMV collection

Prompt used:

`.emv/prompts/summarize.md`

---

### Stage 4 — Classification

Every object is assigned:

* EMV ID
* Collection
* Tags
* Related objects

Example:

EMV-A2509-0007

Collection:

PhageScope

Tags:

* prophage
* viral ecology
* freshwater

---

### Stage 5 — Research Memory Update

The Research Memory Engine stores:

* Weekly highlights
* Cross-paper links
* Emerging themes
* Previously discussed topics

This becomes the basis for future recall.

---

### Stage 6 — Social Draft Creation

Automatically prepare:

* X thread
* Bluesky post
* LinkedIn post
* Instagram caption
* Threads post

Nothing is published automatically.

Founder approval is always required.

---

### Stage 7 — Founder Review

Checklist:

* Scientific accuracy
* Correct taxonomy
* Working links
* Proper EMV IDs
* Grammar
* Duplicate detection

---

### Stage 8 — Publication

Publish to:

1. EcoMicroVerse website
2. Weekly Pulse archive
3. Social platforms

The Research Memory Engine is updated after publication.

---

## Weekly Deliverables

Every issue should include:

* Top research papers
* New phage tools
* Prophage discoveries
* Conference news
* Career opportunities
* One "Why It Matters" editorial insight

---

## Quality Standards

Every published item should be:

* Factually accurate
* Clearly sourced
* Concise
* Linked to related EMV content
* Assigned a permanent EMV ID

---

## Future Automation

The long-term automation will be handled by independent agents:

* Source Scanner
* Paper Summariser
* Taxonomy Classifier
* Memory Builder
* Social Writer
* Dashboard Updater
* Publisher

These agents will use `.emv/` as the single source of truth.
