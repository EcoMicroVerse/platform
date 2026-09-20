import { ReactNode } from "react";

interface GlassCardProps {
  title: string;
  children: ReactNode;
}

export default function GlassCard({
  title,
  children,
}: GlassCardProps) {
  return (
    <div className="rounded-2xl border border-teal-400/20 bg-slate-900/40 p-6 backdrop-blur">
      <h3 className="mb-3 text-lg font-semibold text-teal-300">
        {title}
      </h3>

      <div className="text-sm leading-7 text-slate-300">
        {children}
      </div>
    </div>
  );
}