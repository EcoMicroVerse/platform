
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCitationButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copyLink}
      className="flex items-center gap-2 rounded-lg border border-teal-500/30 px-4 py-2 text-sm text-teal-300 transition hover:bg-teal-500/10"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Citation Link
        </>
      )}
    </button>
  );
}