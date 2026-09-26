"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchPage(){

  const [query,setQuery]=useState("");

  const [results,setResults]=useState<any[]>([]);

  useEffect(()=>{

    if(!query){

      setResults([]);
      return;

    }

    fetch(
      `/api/search?q=${encodeURIComponent(query)}`
    )
      .then(r=>r.json())
      .then(setResults);

  },[query]);

  return(

    <main className="min-h-screen bg-[#07121f] text-white">

      <div className="mx-auto max-w-5xl p-8">

        <h1 className="text-4xl font-bold">
          Scientific Search
        </h1>

        <p className="mt-3 text-slate-400">
          Search across Research Objects, methods,
          collections and knowledge connections.
        </p>

        <div className="mt-8 relative">

          <Search className="absolute left-4 top-4 text-slate-400"/>

          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search viral dark matter, workflow..."
            className="w-full rounded-2xl border border-slate-700 bg-[#061426] py-4 pl-12 pr-4 outline-none focus:border-teal-400"
          />

        </div>

        <div className="mt-8 space-y-5">

          {results.map(result=>(

            <Link
              key={result.id}
              href={`/articles/${result.id}`}
              className="block rounded-2xl border border-slate-800 bg-[#061426] p-6 transition hover:border-teal-500/30"
            >

              <div className="flex flex-wrap gap-2 text-xs">

                <span className="rounded-full bg-teal-500/10 px-3 py-1 text-teal-300">
                  {result.collection}
                </span>

                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Match {result.searchScore}
                </span>

              </div>

              <h2 className="mt-3 text-xl font-semibold">
                {result.title}
              </h2>

              <p className="mt-3 text-slate-400 line-clamp-3">
                {result.summary.replace(/^#+\s*/gm,"")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {result.methods.map((method:string)=>(
                  <span
                    key={method}
                    className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                  >
                    {method}
                  </span>
                ))}

              </div>

            </Link>

          ))}

          {query && results.length===0 &&(

            <div className="rounded-2xl border border-slate-800 bg-[#061426] p-10 text-center text-slate-400">

              No matching Research Objects found.

            </div>

          )}

        </div>

      </div>

    </main>

  );

}
