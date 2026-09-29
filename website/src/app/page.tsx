import { loadPublicHomepage } from "@/lib/public";

import PublicHero from "@/components/public/PublicHero";
import FeaturedArticle from "@/components/public/FeaturedArticle";
import LatestResearch from "@/components/public/LatestResearch";
import CollectionPreview from "@/components/public/CollectionPreview";
import DailyDiscovery from "@/components/public/DailyDiscovery";
import { loadTodayDiscovery } from "@/lib/daily";

export default async function HomePage() {
  const data = await loadPublicHomepage();
  const daily = await loadTodayDiscovery();

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-7xl space-y-12 p-8">
        <PublicHero />
      <div className="mt-6 text-sm text-slate-400">
  Press <kbd className="rounded bg-slate-800 px-2 py-1">Ctrl</kbd> + <kbd className="rounded bg-slate-800 px-2 py-1">K</kbd> to search EcoMicroVerse.
</div>
        <div className="mt-10">
  <DailyDiscovery data={daily}/>
</div>
        <FeaturedArticle article={data.featured} />

        <LatestResearch articles={data.latest} />

        <CollectionPreview collections={data.collections} />
        
      </div>
    </main>
  );
}