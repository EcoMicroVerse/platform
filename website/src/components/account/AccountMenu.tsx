"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Shield, UserCircle } from "lucide-react";
import { authClient } from "@/lib/auth/client";

type Props = {
  name: string;
  email: string;
  role: string;
};

export default function AccountMenu({
  name,
  email,
  role,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error);
        setSigningOut(false);
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-xl border border-teal-500/20 bg-[#061426] px-3 py-2 transition hover:border-teal-400/40 hover:bg-[#082028]"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 text-teal-300">
          <UserCircle className="h-5 w-5" />
        </div>

        <div className="hidden text-left sm:block">
          <p className="max-w-[180px] truncate text-sm font-medium text-white">
            {name}
          </p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1a2a] shadow-2xl"
        >
          <div className="border-b border-slate-800 px-4 py-4">
            <p className="font-medium text-white">{name}</p>
            <p className="mt-1 truncate text-sm text-slate-400">{email}</p>

            <span className="mt-3 inline-flex rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
              {role}
            </span>
          </div>

          <div className="p-2">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-[#082028]"
            >
              <UserCircle className="h-4 w-4 text-teal-300" />
              <span>My Account</span>
            </Link>

            <Link
              href="/account#security"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-[#082028]"
            >
              <Shield className="h-4 w-4 text-teal-300" />
              <span>Security</span>
            </Link>
          </div>

          <div className="border-t border-slate-800 p-2">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              <span>{signingOut ? "Signing out…" : "Sign out"}</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
