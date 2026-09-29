
"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  BrainCircuit,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import EMVCard from "@/components/ui/EMVCard";
import EMVButton from "@/components/ui/EMVButton";

type Message = {
  role: "user" | "assistant";
  text: string;
};

type Props = {
  articleTitle: string;
};

export default function ResearchAssistant({
  articleTitle,
}: Props) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `I'm the EcoMicroVerse Research Assistant. I can help explain "${articleTitle}", its entities, citations and timeline.`,
    },
  ]);

  function send() {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      {
        role: "assistant",
        text: `Research Assistant preview: "${question}" will soon search Research Objects, entities, citations and timelines.`,
      },
    ]);

    setInput("");
  }

  const suggestions = [
    "Summarise this article",
    "Explain PHASTER",
    "Show related Research Objects",
    "Explain the timeline",
  ];

  return (
    <EMVCard className="border-teal-500/20">
      <SectionHeader
        eyebrow="AI Research Assistant"
        title="Scientific Copilot"
        description="Ask questions about this Research Object."
        icon={<BrainCircuit className="h-6 w-6" />}
      />

      <div className="mt-8 h-80 space-y-4 overflow-y-auto rounded-xl border border-slate-800 bg-[#082028] p-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 ${
              message.role === "assistant"
                ? "border border-teal-500/20 bg-teal-500/10"
                : "bg-slate-800"
            }`}
          >
            <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
              {message.role === "assistant" && (
                <Sparkles className="h-4 w-4" />
              )}

              {message.role === "assistant"
                ? "EcoMicroVerse AI"
                : "You"}
            </div>

            <p className="text-slate-200">
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <EMVButton
  key={item}
  variant="secondary"
  onClick={() => setInput(item)}
            className="rounded-full px-3 py-2 text-sm"
          >
            {item}
          </EMVButton>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about this Research Object..."
          className="flex-1 rounded-xl border border-slate-700 bg-[#082028] px-4 py-3 text-white outline-none focus:border-teal-500"
        />

        <EMVButton onClick={send}>
          <Send className="h-5 w-5" />
        </EMVButton>
      </div>
    </EMVCard>
  );
}