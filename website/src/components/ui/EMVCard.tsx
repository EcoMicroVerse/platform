
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function EMVCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-[#061426] p-6 ${className}`}
    >
      {children}
    </div>
  );
}