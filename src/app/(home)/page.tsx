import Desktop from "@/components/desktop/desktop";
import Dock from "@/components/dock/dock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[url('/windows-98-cloud.jpg')] box-border">
      <Desktop />
      <Dock />
    </main>
  );
}
