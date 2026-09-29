
"use client";

import { useState } from "react";

type Article = {
  id: string;
  title: string;
};

type Props = {
  articles: Article[];
};

export default function PublishingWizard({
  articles,
}: Props) {
  const [selected, setSelected] = useState(
    articles[0]?.id ?? ""
  );

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const article =
    articles.find((a) => a.id === selected);

  async function generatePackage() {
    if (!article) return;

    setLoading(true);

    setMessage("");

    const response = await fetch(
      "/api/publish/package",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(article),
      }
    );

    const data = await response.json();

    if (data.success) {
      setMessage(
        `Publication package created for ${article.id}`
      );
    } else {
      setMessage("Unable to create package.");
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Publishing Wizard
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Select Research Object
      </h2>

      <p className="mt-3 text-slate-400">
        Choose an approved Research Object before creating a publication package.
      </p>

      <div className="mt-8">

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#082028] px-4 py-3 text-white"
        >
          {articles.map((article) => (
            <option
              key={article.id}
              value={article.id}
            >
              {article.id} — {article.title}
            </option>
          ))}
        </select>

      </div>

      {article && (
        <div className="mt-6 rounded-xl border border-teal-500/20 bg-[#082028] p-5">

          <div className="text-xs text-teal-300">
            Selected
          </div>

          <div className="mt-2 text-xl font-semibold">
            {article.title}
          </div>

          <div className="mt-1 text-sm text-slate-400">
            {article.id}
          </div>

          <button
            onClick={generatePackage}
            disabled={loading}
            className="mt-6 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400 disabled:opacity-60"
          >
            {loading
              ? "Generating..."
              : "Generate Publication Package"}
          </button>

          {message && (
            <div className="mt-4 rounded-lg border border-teal-500/20 bg-[#061426] p-3 text-sm text-teal-300">
              {message}
            </div>
          )}

        </div>
      )}

    </section>
  );
}