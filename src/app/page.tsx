import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLogo } from "@/components/brand/AppLogo";
import {
  Search,
  BookOpen,
  UtensilsCrossed,
  Video,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Motor de Busca por Ingredientes",
    description:
      "Tem uma banana madura? Pesquise o que tem em casa e descubra receitas que evitam desperdício — com índice nutricional completo.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: UtensilsCrossed,
    title: "Receitas Práticas & Fitness",
    description:
      "Centenas de receitas desenvolvidas por nutricionistas, com informações nutricionais e modo de preparo simplificado.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BookOpen,
    title: "Conteúdos Educativos",
    description:
      "Artigos, vídeos e guias sobre nutrição, saúde e bem-estar criados por especialistas com pesquisa científica.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Video,
    title: "Acompanhamento com Nutricionistas",
    description:
      "Plano alimentar personalizado e videoconsultas com nutricionistas especializados. Plano premium.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const plans = [
  {
    name: "Gratuito",
    price: "€0",
    period: "",
    features: [
      "Motor de busca de ingredientes",
      "Receitas básicas",
      "Experimentação da plataforma",
    ],
    cta: "Começar Grátis",
    href: "/register",
    highlight: false,
  },
  {
    name: "Conteúdo Mensal",
    price: "€4,99",
    period: "/mês",
    features: [
      "Vídeos premium ilimitados",
      "Literacia alimentar atualizada",
      "Todas as receitas",
    ],
    cta: "Subscrever",
    href: "/planos",
    highlight: false,
  },
  {
    name: "Conteúdo Anual",
    price: "€49,99",
    period: "/ano",
    features: [
      "Tudo do plano mensal",
      "Todas as ferramentas e conteúdos",
      "Poupança face ao mensal",
    ],
    cta: "Subscrever Anual",
    href: "/planos",
    highlight: true,
  },
  {
    name: "Acompanhamento Anual",
    price: "€400",
    period: "",
    features: [
      "10 consultas com nutricionista",
      "Acesso total à plataforma",
      "Acompanhamento clínico rigoroso",
    ],
    cta: "Saber Mais",
    href: "/planos",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-surface">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 h-14 max-w-5xl mx-auto">
          <AppLogo variant="wordmark" size="lg" />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center max-w-2xl mx-auto">
        <Badge variant="accent" className="mb-6">
          Nutrição inteligente
        </Badge>
        <h1 className="text-4xl font-bold text-foreground leading-tight mb-5">
          Nutra a mente.{" "}
          <span className="text-primary">Transforme</span> o corpo.
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-8">
          Conectamos você aos melhores especialistas em nutrição, com receitas
          personalizadas, conteúdos educativos e acompanhamento clínico — tudo
          num só lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Começar Gratuitamente
              <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href="/receitas">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver Receitas
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border">
          {[
            { value: "500+", label: "Receitas" },
            { value: "5", label: "Nutricionistas" },
            { value: "100%", label: "Científico" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-primary">{value}</div>
              <div className="text-sm text-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">
            Tudo o que você precisa para uma vida mais saudável
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="p-5 rounded-xl border border-border bg-surface">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={color} size={22} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-2">
            Planos simples, sem surpresas
          </h2>
          <p className="text-muted text-center mb-10">
            Comece grátis. Faça upgrade quando estiver pronto.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map(({ name, price, period, features, cta, href, highlight }) => (
              <div
                key={name}
                className={`p-5 rounded-2xl border-2 flex flex-col ${
                  highlight
                    ? "border-primary bg-white shadow-elevated"
                    : "border-border bg-white"
                }`}
              >
                {highlight && (
                  <Badge variant="primary" className="mb-3 self-start">
                    Mais popular
                  </Badge>
                )}
                <div className="text-base font-bold text-foreground mb-1">{name}</div>
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="text-2xl font-bold text-foreground">{price}</span>
                  <span className="text-muted text-xs">{period}</span>
                </div>
                <ul className="space-y-2 mb-5 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 size={14} className="text-primary-mid shrink-0 mt-0.5" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={href} className="block">
                  <Button
                    className="w-full"
                    size="sm"
                    variant={highlight ? "primary" : "outline"}
                  >
                    {cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/planos">
              <Button variant="ghost" size="sm">
                Ver todos os planos e detalhes
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <AppLogo variant="wordmark" size="sm" />
        </div>
        <p className="text-muted text-xs mb-1 tracking-widest uppercase">
          Nutrição inteligente para a vida real.
        </p>
        <p className="text-muted text-xs mt-3">
          © 2028 APPetit+. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
