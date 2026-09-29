
"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";

export default function EditorialAssistant() {
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const ask = async () => {
    if (!question.trim()) return;

    const res = await fetch("/api/founder/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: question }),
    });

    const data = await res.json();

    setResults(data.results || []);
  };

  return (
    <section className="rounded-3xl border border-teal-900/40 bg-[#061426] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-7 w-7 text-teal-400" />

        <div>
          <h2 className="text-3xl font-bold">
            AI Editorial Assistant
          </h2>

          <p className="text-slate-400">
            Repository-aware editorial co-founder
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#04101c] p-5">

        <p className="text-slate-300">
          Ask questions about your EcoMicroVerse repository.
        </p>

        <div className="mt-4 flex gap-3">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask about inbox, approved papers, collections..."
            className="flex-1 rounded-xl border border-slate-700 bg-[#081a1d] px-4 py-3 text-white outline-none focus:border-teal-500"
          />

          <button
            onClick={ask}
            className="rounded-xl bg-teal-500 px-5 text-black hover:bg-teal-400"
          >
            <Send className="h-5 w-5" />
          </button>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        {[
          "High priority papers",
          "Approved phage tools",
          "Weekly summary",
          "Editorial timeline",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-teal-300 hover:border-teal-500"
          >
            {item}
          </button>
        ))}

      </div>

      {results.length > 0 && (
        <div className="mt-8 space-y-4">

          <h3 className="text-lg font-semibold text-white">
            Repository Answers
          </h3>

          {results.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-700 bg-[#081a1d] p-4"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-white">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {item.collection}
                  </p>

                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-teal-300">
                  <span
  className={`rounded-full px-3 py-1 text-xs ${
    item.source === "Graph"
      ? "bg-teal-600 text-white"
      : "bg-slate-800 text-teal-300"
  }`}
>
  {item.source}
</span>
                </span>

              </div>

              {item.priority && (
                <div className="mt-3 flex items-center gap-3 text-sm">

                  <span className="text-yellow-300">
                    {item.priority}
                  </span>

                  {item.score && (
                    <span className="text-slate-400">
                      Score {item.score}
                    </span>
                  )}

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </section>
  );
}