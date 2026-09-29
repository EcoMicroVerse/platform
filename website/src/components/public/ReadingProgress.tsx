"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress((window.scrollY / total) * 100);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-teal-400 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}