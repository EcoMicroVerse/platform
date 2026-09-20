import Link from "next/link";
import { brand } from "@/config/brand";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#07121f]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <Link href="/" className="font-semibold text-xl tracking-wide">
          {brand.name}
        </Link>

        <span className="text-xs text-teal-300 hidden md:block">
          Founder Edition
        </span>

      </div>
    </header>
  );
}