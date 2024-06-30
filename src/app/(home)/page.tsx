"use client";

import Desktop from "@/components/desktop/desktop";
import Dock from "@/components/dock/dock";
import ReduxProvider from "@/store/redux-provider";

export default function Home() {
  return (
    <ReduxProvider>
      <main className="flex min-h-screen flex-col bg-[url('/windows-98-cloud.jpg')] box-border">
        <Desktop />
        <Dock />
      </main>
    </ReduxProvider>
  );
}
