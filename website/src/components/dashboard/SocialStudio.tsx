
"use client";

import { useState } from "react";
import {
  Building2,
  MessageCircle,
  Image,
  Copy,
  Check,
} from "lucide-react";

import PlatformIcon from "./PlatformIcon";

type Post = {
  platform: string;
  title: string;
  body: string;
};

export default function SocialStudio({
  posts,
}: {
  posts: Post[];
}) {
  const [copied, setCopied] = useState("");

  async function copy(text: string, platform: string) {
    await navigator.clipboard.writeText(text);
    setCopied(platform);

    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Editorial Studio
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Social Studio
      </h2>

      <p className="mt-2 text-slate-400">
        Platform-specific publication drafts generated from a single Research Object.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        {posts.map((post) => {
          
          return (
            <div
              key={post.platform}
              className="rounded-2xl border border-slate-800 bg-[#082028] p-5"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <PlatformIcon platform={post.platform}/>

                  <div>
                    <div className="font-semibold">
                      {post.platform}
                    </div>

                    <div className="text-xs text-slate-400">
                      {post.title}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copy(post.body, post.platform)
                  }
                  className="rounded-lg border border-teal-500/20 p-2 hover:bg-teal-500/10"
                >
                  {copied === post.platform ? (
                    <Check className="h-4 w-4 text-teal-300" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-300" />
                  )}
                </button>

              </div>

              <div className="mt-5 rounded-xl bg-[#07121f] p-4 text-sm text-slate-300 whitespace-pre-wrap">
                {post.body}
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}