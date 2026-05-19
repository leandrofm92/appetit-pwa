"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, UtensilsCrossed, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Início" },
  { href: "/busca", icon: Search, label: "Busca" },
  { href: "/receitas", icon: UtensilsCrossed, label: "Receitas" },
  { href: "/conteudos", icon: BookOpen, label: "Conteúdos" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border bottom-nav-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-lg mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                isActive ? "text-primary" : "text-muted"
              )}
            >
              <Icon
                size={22}
                className={cn(
                  "transition-all duration-200",
                  isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
