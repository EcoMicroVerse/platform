import { Sparkles } from "lucide-react";
import { brand } from "@/config/brand";

export default function FounderBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-sm text-teal-300">
      <Sparkles size={16} />
      Founder Edition • {brand.version}
    </div>
  );
}