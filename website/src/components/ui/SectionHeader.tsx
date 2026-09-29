
import { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
}: Props) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="mt-1 text-teal-300">
          {icon}
        </div>
      )}

      <div>
        <div className="text-xs uppercase tracking-widest text-teal-300">
          {eyebrow}
        </div>

        <h2 className="mt-2 text-3xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}