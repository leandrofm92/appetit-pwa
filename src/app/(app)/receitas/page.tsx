"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Flame, ChefHat, Bookmark, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Todos", "Café da manhã", "Almoço", "Jantar", "Snacks", "Fitness"];

const MOCK_RECIPES = [
  {
    id: "1",
    title: "Bowl de Quinoa com Legumes",
    description: "Nutritivo e fácil de preparar, ideal para o almoço",
    category: "Almoço",
    calories: 320,
    time: 25,
    servings: 2,
    tags: ["vegano", "proteico"],
    color: "from-green-100 to-emerald-100",
  },
  {
    id: "2",
    title: "Panqueca de Banana Fitness",
    description: "Café da manhã perfeito sem glúten e cheio de energia",
    category: "Café da manhã",
    calories: 280,
    time: 15,
    servings: 1,
    tags: ["fitness", "sem glúten"],
    color: "from-yellow-100 to-orange-100",
  },
  {
    id: "3",
    title: "Salada de Frango Grelhado",
    description: "Leve, proteica e cheia de sabor para o dia a dia",
    category: "Almoço",
    calories: 260,
    time: 20,
    servings: 1,
    tags: ["low carb", "proteico"],
    color: "from-red-100 to-pink-100",
  },
  {
    id: "4",
    title: "Omelete de Espinafre",
    description: "Jantar rápido, rico em ferro e proteínas",
    category: "Jantar",
    calories: 230,
    time: 10,
    servings: 1,
    tags: ["rápido", "vegetariano"],
    color: "from-emerald-100 to-teal-100",
  },
  {
    id: "5",
    title: "Granola Caseira",
    description: "Snack saudável para comer com iogurte ou fruta",
    category: "Snacks",
    calories: 180,
    time: 30,
    servings: 8,
    tags: ["vegano", "sem açúcar"],
    color: "from-amber-100 to-yellow-100",
  },
  {
    id: "6",
    title: "Wraps de Frango com Abacate",
    description: "Lanche prático e nutritivo para o dia",
    category: "Snacks",
    calories: 350,
    time: 15,
    servings: 2,
    tags: ["proteico", "saudável"],
    color: "from-lime-100 to-green-100",
  },
];

export default function ReceitasPage() {
  const [selected, setSelected] = useState("Todos");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = MOCK_RECIPES.filter((r) => {
    const matchesCategory = selected === "Todos" || r.category === selected;
    const matchesQuery =
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.tags.some((t) => t.includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  function toggleSave(id: string) {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  return (
    <div className="py-5 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Receitas</h1>
        <p className="text-muted text-sm mt-1">
          {MOCK_RECIPES.length} receitas desenvolvidas por nutricionistas
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Pesquisar receitas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
              selected === cat
                ? "bg-primary text-white"
                : "bg-white border border-border text-muted hover:border-primary hover:text-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">
            Nenhuma receita encontrada
          </div>
        ) : (
          filtered.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
              {/* Image placeholder */}
              <div className={`h-36 bg-gradient-to-br ${recipe.color} flex items-center justify-center relative`}>
                <ChefHat size={40} className="text-white/40" />
                <button
                  onClick={() => toggleSave(recipe.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                >
                  <Bookmark
                    size={16}
                    className={saved.includes(recipe.id) ? "text-primary fill-primary" : "text-muted"}
                  />
                </button>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="muted" className="text-xs">{recipe.category}</Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{recipe.title}</h3>
                <p className="text-muted text-xs mb-3 leading-relaxed">{recipe.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Flame size={13} className="text-accent" />
                    {recipe.calories} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {recipe.time} min
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat size={13} />
                    {recipe.servings} {recipe.servings > 1 ? "porções" : "porção"}
                  </span>
                </div>

                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="primary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
