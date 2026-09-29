
"use client";

import { useState } from "react";

import WorkspaceTabs from "./WorkspaceTabs";

type Props = {
  overview: React.ReactNode;
  publishing: React.ReactNode;
  calendar: React.ReactNode;
  ai: React.ReactNode;
  analytics: React.ReactNode;
  settings: React.ReactNode;
};

export default function WorkspaceShell({
  overview,
  publishing,
  calendar,
  ai,
  analytics,
  settings,
}: Props) {
  const [tab, setTab] = useState("overview");

  return (
    <>
      <WorkspaceTabs onChange={setTab} />

      <div className="mt-8">
        {tab === "overview" && overview}
        {tab === "publishing" && publishing}
        {tab === "calendar" && calendar}
        {tab === "ai" && ai}
        {tab === "analytics" && analytics}
        {tab === "settings" && settings}
      </div>
    </>
  );
}