import { brand } from "@/config/brand";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 py-10">

      <div className="mx-auto max-w-6xl px-6 text-center">

        <SocialLinks />

        <p className="mt-6 text-slate-400 text-sm">
          {brand.tagline}
        </p>

        <p className="mt-2 text-slate-500 text-sm">
          {brand.website}
        </p>

      </div>

    </footer>
  );
}