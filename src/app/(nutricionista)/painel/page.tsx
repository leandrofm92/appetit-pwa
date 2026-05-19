import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  UtensilsCrossed,
  BookOpen,
  Video,
  CalendarClock,
  PlusCircle,
  TrendingUp,
} from "lucide-react";

const MOCK_APPOINTMENTS = [
  { id: "1", client: "Maria Silva", time: "14:00", date: "Hoje", status: "confirmed" },
  { id: "2", client: "João Santos", time: "15:30", date: "Hoje", status: "pending" },
  { id: "3", client: "Ana Costa", time: "09:00", date: "Amanhã", status: "confirmed" },
];

const MOCK_STATS = [
  { icon: Users, label: "Clientes ativos", value: "12", color: "text-primary", bg: "bg-primary/10" },
  { icon: CalendarClock, label: "Consultas esta semana", value: "8", color: "text-accent", bg: "bg-accent/10" },
  { icon: UtensilsCrossed, label: "Receitas publicadas", value: "24", color: "text-primary", bg: "bg-primary/10" },
  { icon: BookOpen, label: "Conteúdos publicados", value: "15", color: "text-accent", bg: "bg-accent/10" },
];

export default async function PainelPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = user?.user_metadata?.name || "Nutricionista";
  const firstName = name.split(" ")[0];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">Bem-vindo,</p>
          <h1 className="text-2xl font-bold text-foreground">Dr(a). {firstName}</h1>
        </div>
        <Badge variant="primary">Nutricionista</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {MOCK_STATS.map(({ icon: Icon, label, value, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={color} size={18} />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted mt-0.5 leading-snug">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Ações rápidas</h2>
        <div className="flex flex-col gap-2">
          <Link href="/painel/receitas/nova">
            <Button variant="outline" className="w-full justify-start gap-3">
              <PlusCircle size={18} className="text-primary" />
              Nova Receita
            </Button>
          </Link>
          <Link href="/painel/conteudos/novo">
            <Button variant="outline" className="w-full justify-start gap-3">
              <PlusCircle size={18} className="text-accent" />
              Novo Conteúdo Educativo
            </Button>
          </Link>
          <Link href="/painel/planos/novo">
            <Button variant="outline" className="w-full justify-start gap-3">
              <PlusCircle size={18} className="text-primary" />
              Criar Plano Alimentar
            </Button>
          </Link>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Próximas consultas</h2>
          <Link href="/painel/consultas" className="text-primary text-sm font-medium">
            Ver todas
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_APPOINTMENTS.map((appt) => (
            <Card key={appt.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {appt.client[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{appt.client}</p>
                      <p className="text-xs text-muted">
                        {appt.date} · {appt.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={appt.status === "confirmed" ? "success" : "muted"}
                      className="text-xs"
                    >
                      {appt.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </Badge>
                    <Link href={`/consulta/${appt.id}`}>
                      <Button size="sm" variant="ghost">
                        <Video size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Desempenho</h2>
        </div>
        <Card>
          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Satisfação", value: "4.9★" },
                { label: "Retenção", value: "87%" },
                { label: "Novos/mês", value: "+3" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
