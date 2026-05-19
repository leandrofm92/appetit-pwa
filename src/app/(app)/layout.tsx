import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col max-w-lg mx-auto">
      <Header />
      <main className="flex-1 pb-24 px-4">{children}</main>
      <BottomNav />
    </div>
  );
}
