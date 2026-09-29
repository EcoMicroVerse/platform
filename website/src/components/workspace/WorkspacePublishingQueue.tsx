
import {
  Rocket,
  Calendar,
} from "lucide-react";

import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";
import StatusBadge from "@/components/ui/StatusBadge";

type Article = {
  emv_id: string;
  title: string;
  recommended_collection?: string;
};

type Props = {
  articles: Article[];
};

export default function WorkspacePublishingQueue({
  articles,
}: Props) {
  return (
    <EMVCard className="border-teal-500/20">

      <div className="flex items-center justify-between">

        <div>

          <div className="text-xs uppercase tracking-widest text-teal-300">
            Publishing
          </div>

          <h3 className="mt-2 text-2xl font-bold">
            Publishing Queue
          </h3>

        </div>

        <Rocket className="h-6 w-6 text-teal-300"/>

      </div>

      <div className="mt-6 space-y-4">

        {articles.length === 0 ? (

          <div className="rounded-xl border border-slate-800 bg-[#082028] p-5 text-slate-400">
            No approved Research Objects waiting.
          </div>

        ) : (

          articles.slice(0, 5).map((article) => (

            <div
              key={article.emv_id}
              className="rounded-xl border border-slate-800 bg-[#082028] p-5"
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <div className="font-semibold">
                    {article.title}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">

                    <StatusBadge
                      label={article.recommended_collection ?? "General"}
                    />

                  </div>

                </div>

                <EMVButton variant="secondary">
                  Publish
                </EMVButton>

              </div>

            </div>

          ))

        )}

      </div>

      <div className="mt-6 flex justify-between">

        <EMVButton variant="ghost">
          View all
        </EMVButton>

        <EMVButton variant="secondary">
          <Calendar className="mr-2 h-4 w-4"/>

          Schedule
        </EMVButton>

      </div>

    </EMVCard>
  );
}