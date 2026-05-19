import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  UtensilsCrossed,
  BookOpen,
  Video,
  ChevronRight,
  Flame,
  Target,
} from "lucide-react";

const quickActions = [
  { icon: Search, label: "Buscar Ingredientes", href: "/busca", color: "text-accent", bg: "bg-accent/10" },
  { icon: UtensilsCrossed, label: "Receitas", href: "/receitas", color: "text-primary", bg: "bg-primary/10" },
  { icon: BookOpen, label: "Conteúdos", href: "/conteudos", color: "text-accent", bg: "bg-accent/10" },
  { icon: Video, label: "Consultas", href: "/dashboard/consultas", color: "text-primary", bg: "bg-primary/10" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name = user.user_metadata?.name || user.email?.split("@")[0] || "Usuário";
  const firstName = name.split(" ")[0];

  return (
    <div className="py-5 space-y-6">
      {/* Greeting */}
      <div>
        <p className="text-muted text-sm">Olá,</p>
        <h1 className="text-2xl font-bold text-foreground">{firstName} 👋</h1>
      </div>

      {/* Premium Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white">
        <Badge className="bg-white/20 text-white mb-3 border-0">Plano Gratuito</Badge>
        <h2 className="font-bold text-lg mb-1">Faça upgrade para Premium</h2>
        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          Acesse plano alimentar personalizado e videoconsultas com nutricionistas.
        </p>
        <Link href="/planos">
          <Button variant="accent" size="sm">
            Ver Planos
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Acesso rápido</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ icon: Icon, label, href, color, bg }) => (
            <Link key={href} href={href}>
              <Card className="hover:shadow-elevated transition-shadow active:scale-[0.98]">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={color} size={20} />
                  </div>
                  <span className="text-sm font-semibold text-foreground leading-tight">
                    {label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Summary (mock) */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Resumo do dia</h2>
        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Flame className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">Calorias</p>
                  <p className="font-semibold text-foreground">— kcal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">Meta</p>
                  <p className="font-semibold text-foreground">—</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted text-center">
              Faça upgrade para ver seu acompanhamento nutricional diário
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Recipe */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Receita em destaque</h2>
          <Link href="/receitas" className="text-primary text-sm font-medium">
            Ver todas
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <UtensilsCrossed size={48} className="text-primary/40" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-1">
              Bowl de Quinoa com Legumes
            </h3>
            <p className="text-muted text-xs mb-3">
              320 kcal · 25 min · 2 porções
            </p>
            <Link href="/receitas">
              <Button variant="outline" size="sm" className="w-full">
                Ver Receita
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
