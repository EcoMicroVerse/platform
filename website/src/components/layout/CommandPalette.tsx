
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Search } from "lucide-react";

import { useRouter } from "next/navigation";

type Props = {
  commands: any[];
};

export default function CommandPalette({
  commands,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handler
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, []);

  const filtered = useMemo(() => {
    return commands
      .filter((item) =>
        item.title
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [commands, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-6">

      <div className="mt-16 w-full max-w-2xl rounded-2xl border border-teal-500/20 bg-[#061426] shadow-2xl">

        <div className="flex items-center gap-3 border-b border-slate-800 p-5">

          <Search className="h-5 w-5 text-teal-300"/>

          <input
            autoFocus
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search entities, Research Objects, or commands..."
            className="w-full bg-transparent text-white outline-none"
          />

        </div>

        <div className="max-h-96 overflow-y-auto p-2">

          {filtered.map((item) => (
            <button
              key={item.route}
              onClick={() => {
                router.push(item.route);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-[#082028]"
            >

              <div>

                <div className="font-medium">
                  {item.title}
                </div>

                <div className="text-xs text-slate-400">
                  {item.category}
                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}