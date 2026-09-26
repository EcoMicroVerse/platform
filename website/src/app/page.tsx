import { loadPublicHomepage } from "@/lib/public";

import PublicHero from "@/components/public/PublicHero";
import FeaturedArticle from "@/components/public/FeaturedArticle";
import LatestResearch from "@/components/public/LatestResearch";
import CollectionPreview from "@/components/public/CollectionPreview";

export default async function HomePage() {
  const data = await loadPublicHomepage();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl space-y-12 p-8">
        <PublicHero />

        <FeaturedArticle article={data.featured} />

        <LatestResearch articles={data.latest} />

        <CollectionPreview collections={data.collections} />
      </div>
    </main>
  );
}