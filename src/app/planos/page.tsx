import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, Leaf, Video } from "lucide-react";

const CONTENT_PLANS = [
  {
    id: "free",
    name: "Acesso Gratuito",
    price: null,
    priceDisplay: "Grátis",
    period: null,
    description:
      "Experimenta as funcionalidades base da plataforma, sem compromisso.",
    features: [
      "Motor de busca de ingredientes",
      "Receitas básicas",
      "Experimentação inicial da plataforma",
    ],
    missing: [
      "Vídeos premium",
      "Literacia alimentar avançada",
      "Consultas com nutricionista",
    ],
    cta: "Plano atual",
    disabled: true,
    highlight: false,
    badge: null,
    stripePriceId: null,
  },
  {
    id: "content-monthly",
    name: "Conteúdo Mensal",
    price: 499,
    priceDisplay: "€4,99",
    period: "mês",
    description:
      "Acesso ilimitado a vídeos premium e atualizações de literacia alimentar, por um valor mensal acessível.",
    features: [
      "Vídeos premium ilimitados",
      "Atualizações de literacia alimentar",
      "Motor de busca de ingredientes",
      "Todas as receitas",
    ],
    missing: ["Consultas com nutricionista"],
    cta: "Subscrever Mensal",
    disabled: false,
    highlight: false,
    badge: null,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CONTENT_MONTHLY_PRICE_ID,
  },
  {
    id: "content-yearly",
    name: "Conteúdo Anual",
    price: 4999,
    priceDisplay: "€49,99",
    period: "ano",
    description:
      "Todas as ferramentas e conteúdos da plataforma durante um ano, com desconto face ao plano mensal.",
    features: [
      "Vídeos premium ilimitados",
      "Atualizações de literacia alimentar",
      "Motor de busca de ingredientes",
      "Todas as ferramentas e conteúdos",
      "Poupança de ~10€ face ao mensal",
    ],
    missing: ["Consultas com nutricionista"],
    cta: "Subscrever Anual",
    disabled: false,
    highlight: true,
    badge: "Melhor valor",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CONTENT_YEARLY_PRICE_ID,
  },
];

const COACHING_PLANS = [
  {
    id: "consult-single",
    name: "Consulta Individual",
    price: 5000,
    priceDisplay: "€50,00",
    period: null,
    description:
      "Uma consulta de nutrição personalizada, ideal para uma avaliação inicial pontual. Acesso total à aplicação incluído.",
    features: [
      "1 consulta de nutrição personalizada",
      "Avaliação nutricional inicial",
      "Acesso total à aplicação (de brinde)",
    ],
    missing: [],
    cta: "Marcar Consulta",
    disabled: false,
    highlight: false,
    badge: null,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_CONSULT_SINGLE_PRICE_ID,
  },
  {
    id: "quarterly",
    name: "Acompanhamento Trimestral",
    price: 13000,
    priceDisplay: "€130,00",
    period: null,
    description:
      "3 consultas de nutrição a um ritmo trimestral, com acesso à plataforma incluído. Uma solução mais económica por sessão.",
    features: [
      "3 consultas de nutrição",
      "Seguimento personalizado",
      "Acesso à plataforma (de brinde)",
      "~€43 por consulta",
    ],
    missing: [],
    cta: "Começar Trimestral",
    disabled: false,
    highlight: false,
    badge: null,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_QUARTERLY_PRICE_ID,
  },
  {
    id: "annual-coaching",
    name: "Acompanhamento Anual",
    price: 40000,
    priceDisplay: "€400,00",
    period: null,
    description:
      "A solução mais completa: 10 consultas de nutrição ao longo do ano e acesso total à plataforma, para um acompanhamento clínico rigoroso.",
    features: [
      "10 consultas de nutrição",
      "Acompanhamento clínico rigoroso",
      "Acesso total à plataforma (de brinde)",
      "~€40 por consulta",
    ],
    missing: [],
    cta: "Começar Anual",
    disabled: false,
    highlight: true,
    badge: "Mais completo",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_COACHING_PRICE_ID,
  },
];

interface Plan {
  id: string;
  name: string;
  price: number | null;
  priceDisplay: string;
  period: string | null;
  description: string;
  features: string[];
  missing: string[];
  cta: string;
  disabled: boolean;
  highlight: boolean;
  badge: string | null;
  stripePriceId: string | null | undefined;
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-2xl border-2 p-6 bg-white flex flex-col transition-shadow ${
        plan.highlight ? "border-primary shadow-elevated" : "border-border"
      }`}
    >
      {plan.badge && (
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-1">
        <span className="text-base font-bold text-foreground">{plan.name}</span>
      </div>
      <p className="text-muted text-xs mb-4 leading-relaxed">{plan.description}</p>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-foreground">{plan.priceDisplay}</span>
        {plan.period && (
          <span className="text-muted text-sm">/{plan.period}</span>
        )}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 size={15} className="text-primary-mid shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{f}</span>
          </li>
        ))}
        {plan.missing.map((f) => (
          <li key={f} className="flex items-start gap-2.5 opacity-35">
            <CheckCircle2 size={15} className="text-muted shrink-0 mt-0.5" />
            <span className="text-sm text-muted line-through">{f}</span>
          </li>
        ))}
      </ul>

      {plan.disabled ? (
        <Button variant="secondary" className="w-full mt-auto" disabled>
          {plan.cta}
        </Button>
      ) : (
        <form action="/api/stripe/checkout" method="post" className="mt-auto">
          <input type="hidden" name="priceId" value={plan.stripePriceId || ""} />
          <Button
            type="submit"
            className="w-full"
            variant={plan.highlight ? "primary" : "outline"}
          >
            {plan.cta}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function PlanosPage() {
  return (
    <div className="min-h-svh bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/dashboard" className="p-1.5 -ml-1.5 text-muted">
            <ChevronLeft size={22} />
          </Link>
          <h1 className="font-semibold text-foreground">Planos</h1>
        </div>
      </header>

      <div className="px-5 py-8 max-w-2xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Escolhe o teu plano
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
            Começa gratuitamente e evolui ao teu ritmo — seja para consumir conteúdos
            ou para um acompanhamento nutricional personalizado.
          </p>
        </div>

        {/* Content plans */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
              <Leaf size={16} className="text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-sm">Acesso a Conteúdos</h2>
              <p className="text-muted text-xs">Receitas, vídeos e literacia alimentar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTENT_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Coaching plans */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Video size={16} className="text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-sm">Acompanhamento Nutricional</h2>
              <p className="text-muted text-xs">Consultas personalizadas com nutricionista</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COACHING_PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="text-muted text-xs text-center mt-4 leading-relaxed">
            Todos os planos de acompanhamento incluem acesso total à plataforma gratuitamente.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">Perguntas frequentes</h2>
          {[
            {
              q: "Posso cancelar a subscrição a qualquer momento?",
              a: "Sim. As subscrições mensais e anuais podem ser canceladas a qualquer momento, sem penalizações.",
            },
            {
              q: "Os planos de acompanhamento incluem acesso à app?",
              a: "Sim. Todos os planos de consultas incluem acesso total à plataforma como complemento, sem custo adicional.",
            },
            {
              q: "Como funcionam as consultas de nutrição?",
              a: "As consultas são realizadas por videochamada diretamente na aplicação, com nutricionistas certificados.",
            },
            {
              q: "Os nutricionistas são certificados?",
              a: "Sim. Todos os nutricionistas são licenciados e registados na Ordem dos Nutricionistas.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border border-border rounded-xl p-4 bg-white">
              <p className="font-medium text-sm text-foreground mb-1.5">{q}</p>
              <p className="text-muted text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
