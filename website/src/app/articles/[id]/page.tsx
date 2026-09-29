import {
  loadArticle,
  loadRelatedResearch,
} from "@/lib/public";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReadingCompanion from "@/components/public/ReadingCompanion";
import ResearchTimeline from "@/components/public/ResearchTimeline";
import { Network } from "lucide-react";
import ScientificSection from "@/components/public/ScientificSection";
import ReadingProgress from "@/components/public/ReadingProgress";
import CopyCitationButton from "@/components/public/CopyCitationButton";
import ResearchObjectInspector from "@/components/public/ResearchObjectInspector";
import CitationExplorer from "@/components/public/CitationExplorer";
import TimelineIntelligence from "@/components/public/TimelineIntelligence";
import PublicationHistory from "@/components/public/PublicationHistory";
import ResearchAssistant from "@/components/public/ResearchAssistant"
import { createMarkdownComponents } from "@/components/entities/MarkdownComponents";
import SemanticRelatedSection from "@/components/public/SemanticRelatedSection";
import { getSemanticRelated } from "@/lib/semanticRelated";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  const data = await loadArticle(id);

  const related = await loadRelatedResearch(id);

  const semanticRelated = await getSemanticRelated(data);

  const markdownComponents = await createMarkdownComponents();

  const words = data.article.split(/\s+/).length;

  const readingTime = Math.max(
    1,
    Math.round(words / 200)
  );

  const publicationHistory = [
  {
    stage: "Draft Created",
    date: "Editorial Workspace",
    icon: "draft" as const,
  },
  {
    stage: "Scientific Review",
    date: "Editorial Validation",
    icon: "review" as const,
  },
  {
    stage: "Approved",
    date: "Research Object Complete",
    icon: "approved" as const,
  },
  {
    stage: "Published",
    date: "EcoMicroVerse",
    icon: "published" as const,
  },
];

  
const headings = [
  "Executive Summary",
  ...(data.methodology ? ["Methodology"] : []),
  ...(data.results ? ["Results"] : []),
  ...(data.discussion ? ["Discussion"] : []),
  ...(data.limitations ? ["Limitations"] : []),
  ...(data.future_work ? ["Future Work"] : []),
  ...(data.key_takeaways ? ["Key Takeaways"] : []),
  ...data.article
    .split("\n")
    .filter((line: string) => line.startsWith("##"))
    .map((line: string) =>
      line.replace(/^##\s*/, "")
    ),
];

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <ReadingProgress />
      <div className="mx-auto max-w-6xl p-8">

        {/* Breadcrumb */}

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link
            href="/"
            className="hover:text-teal-300"
          >
            Home
          </Link>

          <span>→</span>

          <Link
            href={`/collections/${data.metadata.recommended_collection}`}
            className="hover:text-teal-300"
          >
            {data.metadata.recommended_collection}
          </Link>

          <span>→</span>

          <span className="text-slate-300">
            Research Object
          </span>
        </div>

        {/* Hero */}

        <header className="mb-12 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-8">

          <div className="text-xs uppercase tracking-widest text-teal-300">
            {data.metadata.recommended_collection}
          </div>

          <h1 className="mt-4 text-5xl font-bold leading-tight">
            {data.metadata.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">

            <span className="rounded-full bg-teal-500/10 px-3 py-1 text-teal-300">
              Editorial Score {data.metadata.score}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              {data.metadata.type}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              {readingTime} min read
            </span>

          </div>

        </header>

        
<div className="mb-8 rounded-2xl border border-slate-800 bg-[#061426] p-5">
  <div className="flex flex-wrap items-center justify-between gap-4">

    <div>
      <div className="text-xs uppercase tracking-widest text-slate-400">
        EcoMicroVerse Research Object
      </div>

      <div className="mt-2 font-mono text-teal-300">
        {id}
      </div>
    </div>

    <CopyCitationButton />

  </div>
</div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Main Article */}

          <article
  className="
    prose
    prose-invert
    prose-lg
    max-w-none
    prose-headings:text-white
    prose-headings:font-bold
    prose-p:text-slate-300
    prose-li:text-slate-300
    prose-strong:text-white
    prose-a:text-teal-300
    prose-code:text-teal-300
    prose-hr:border-slate-700
  "
>

            <div
  id="executive-summary"
  className="mb-10 rounded-xl border border-teal-500/20 bg-[#061426] p-6"
>

              <div className="mb-3 text-xs uppercase tracking-widest text-teal-300">
                Executive Summary
              </div>
              <div className="my-8 border-t border-slate-800" />

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.summary}
              </ReactMarkdown>

              
<div className="mt-8 space-y-6">

  <ScientificSection
    title="Methodology"
    content={data.methodology}
  />

  <ScientificSection
    title="Results"
    content={data.results}
  />

  <ScientificSection
    title="Discussion"
    content={data.discussion}
  />

  <ScientificSection
    title="Limitations"
    content={data.limitations}
    defaultOpen={false}
  />

  <ScientificSection
    title="Future Work"
    content={data.future_work}
    defaultOpen={false}
  />

  <ScientificSection
    title="Key Takeaways"
    content={data.key_takeaways}
    defaultOpen={true}
  />

</div>

            </div>

            <TimelineIntelligence
  events={data.timeline?.events ?? []}
/>
            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={markdownComponents}
>
  {data.article}
</ReactMarkdown>

            <div className="mt-16">
  <CitationExplorer
    citations={data.citations?.references ?? []}
  />
</div>

<div className="mt-16">
  <PublicationHistory
    history={publicationHistory}
  />
</div>

<div className="mt-16">
  <ResearchAssistant
    articleTitle={data.metadata.title}
  />
</div>
            
            {/* Related Research */}

            <section className="mt-16">

              <h2 className="mb-6 text-3xl font-bold text-white">
                Related Research
              </h2>

              {related.length === 0 ? (

                <div className="rounded-2xl bg-[#061426] p-8 text-center text-slate-400">
  <Network className="mx-auto mb-4 h-10 w-10 text-slate-500" />

  <p>
    As EcoMicroVerse grows, related Research Objects will automatically
    appear here.
  </p>
</div>

              ) : (

                <div className="grid gap-5 md:grid-cols-2">

                  {related.map((article: any) => (

                    <Link
                      key={article.emv_id}
                      href={`/articles/${article.emv_id}`}
                      className="group"
                    >

                      <article className="rounded-2xl border border-slate-800 bg-[#061426] p-5 transition hover:-translate-y-1 hover:border-teal-500/30">

                        <div className="flex items-center justify-between">

                          <span className="text-xs uppercase tracking-wider text-teal-300">
                            {article.recommended_collection}
                          </span>

                          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
                            Match {article.similarity}
                          </span>

                        </div>

                        <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-teal-300">
                          {article.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">

                          {(article.matched_terms ?? [])
                            .slice(0, 3)
                            .map((term: any) => (

                              <span
                                key={typeof term === "string" ? term : term.term}
                                className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                              >
                                {typeof term === "string"
                                  ? term
                                  : term.term}
                              </span>

                            ))}

                        </div>

                      </article>

                    </Link>

                  ))}

                </div>

              )}

            </section>

            {/* Footer */}

            <footer className="mt-16 border-t border-slate-800 pt-10">

              <div className="rounded-2xl bg-[#061426] p-8">

                <div className="text-xs uppercase tracking-widest text-teal-300">
                  EcoMicroVerse Editorial
                </div>

                <p className="mt-4 text-slate-300">
                  Every Research Object is curated through the EcoMicroVerse editorial workflow before publication.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                    {data.metadata.recommended_collection}
                  </span>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                    Editorial Score {data.metadata.score}
                  </span>

                </div>

              </div>

            </footer>

          </article>

          {/* Sidebar */}

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">

            <div className="rounded-xl bg-[#061426] p-6">

              <ResearchObjectInspector
  article={data}
  readingTime={readingTime}
/>
              <h3 className="font-semibold">
                On this page
              </h3>

              <div className="mt-4 space-y-2 text-sm">

                {headings.length === 0 ? (

                  <div className="text-slate-500">
                    No section headings detected.
                  </div>

                ) : (

                  headings.map((heading: string, index: number) => (

                    <div
                      key={index}
                      className="border-l border-slate-700 pl-3 text-slate-300 transition hover:border-teal-400 hover:text-white"
                    >
                      <a
  href={`#${heading
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
  className="block"
>
  {heading}
</a>
                    </div>

                  ))

                )}

              </div>

            </div>

          </aside>

        </div>

      </div>
      <SemanticRelatedSection
  articles={semanticRelated}
/>
    </main>
  );
}