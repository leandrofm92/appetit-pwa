"use client";

import Link from "next/link";
import { Bell, ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/brand/AppLogo";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  className?: string;
}

export function Header({
  title,
  showBack = false,
  showNotifications = true,
  className,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-1.5 -ml-1.5 text-muted hover:text-foreground rounded-lg transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {isDashboard ? (
            <Link href="/" className="flex items-center">
              <AppLogo variant="wordmark" size="md" />
            </Link>
          ) : (
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
          )}
        </div>

        {showNotifications && (
          <Link
            href="/notificacoes"
            className="relative p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface-alt transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </Link>
        )}
      </div>
    </header>
  );
}
