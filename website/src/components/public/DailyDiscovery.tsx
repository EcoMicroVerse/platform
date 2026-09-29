
import {
  Flame,
  Calendar,
  Wrench,
  ArrowRight,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";
import EntityLink from "@/components/entities/EntityLink";

type Props = {
  data: any;
};

export default function DailyDiscovery({
  data,
}: Props) {
  if (!data) return null;

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-8">

      <SectionHeader
        eyebrow="EcoMicroVerse Daily Discovery"
        title="Discover Today"
        description="A scientific story worth discovering today."
        icon={<Flame className="h-6 w-6" />}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

        <EMVCard className="border-teal-500/20">
          <div className="text-sm text-teal-300">
            {data.featured.category}
          </div>

          <h3 className="mt-3 text-2xl font-bold">
            <EntityLink name="PHASTER"/>
          </h3>

          <p className="mt-4 text-slate-300">
            {data.featured.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {data.featured.chain.map((step: string) => (
              <span
                key={step}
                className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-sm text-teal-300"
              >
                {step}
              </span>
            ))}
          </div>

          <EMVButton variant="ghost" className="mt-6 flex items-center gap-2">
            Explore this discovery
            <ArrowRight className="h-4 w-4" />
          </EMVButton>
        </EMVCard>

        <div className="space-y-5">
          <MiniCard
            icon={<Calendar className="h-5 w-5" />}
            title="On This Day"
            text={data.on_this_day.title}
          />

          <MiniCard
            icon={<Wrench className="h-5 w-5" />}
            title="Tool Spotlight"
            text={data.tool_spotlight.name}
          />
        </div>

      </div>

    </section>
  );
}

function MiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <EMVCard>
      <div className="flex items-center gap-2 text-teal-300">
        {icon}
        {title}
      </div>

      <div className="mt-3 font-semibold">
        {text}
      </div>
    </EMVCard>
  );
}