import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, UtensilsCrossed, BookOpen, LogOut } from "lucide-react";

const navItems = [
  { href: "/painel", icon: LayoutDashboard, label: "Painel" },
  { href: "/painel/clientes", icon: Users, label: "Clientes" },
  { href: "/painel/receitas", icon: UtensilsCrossed, label: "Receitas" },
  { href: "/painel/conteudos", icon: BookOpen, label: "Conteúdos" },
];

export default async function NutricionistasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "nutritionist") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-svh bg-surface flex">
      {/* Sidebar (tablet+) */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-border p-4 fixed h-full">
        <div className="flex items-center gap-1 mb-8 px-2">
          <span className="text-lg font-bold text-primary">APPetit</span>
          <span className="text-lg font-bold text-accent">+</span>
          <span className="text-xs text-muted ml-1">Nutricionista</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-surface-alt transition-colors"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-error hover:bg-error/5 transition-colors w-full"
          >
            <LogOut size={18} />
            Sair
          </button>
        </form>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-60 p-5 max-w-4xl">{children}</main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-muted"
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
