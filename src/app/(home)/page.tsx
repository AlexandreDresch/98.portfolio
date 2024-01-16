import Desktop from "@/components/ui/desktop";
import Dock from "@/components/ui/dock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[url('/windows-98-cloud.jpg')]">
      <Desktop />
      <Dock />
    </main>
  );
}
