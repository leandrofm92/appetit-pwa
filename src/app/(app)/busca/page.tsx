"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, ChefHat, Clock, Flame } from "lucide-react";

const MOCK_RECIPES = [
  {
    id: "1",
    title: "Vitamina de Banana com Aveia",
    ingredients: ["banana", "aveia", "leite", "mel"],
    calories: 210,
    time: 5,
    category: "Café da manhã",
    tags: ["rápido", "saudável"],
  },
  {
    id: "2",
    title: "Panqueca de Banana",
    ingredients: ["banana", "ovos", "aveia", "canela"],
    calories: 280,
    time: 15,
    category: "Café da manhã",
    tags: ["fitness", "sem glúten"],
  },
  {
    id: "3",
    title: "Bowl de Quinoa com Legumes",
    ingredients: ["quinoa", "cenoura", "brócolis", "tomate", "azeite"],
    calories: 320,
    time: 25,
    category: "Almoço",
    tags: ["vegano", "proteico"],
  },
  {
    id: "4",
    title: "Salada de Frango Grelhado",
    ingredients: ["frango", "alface", "tomate", "pepino", "limão"],
    calories: 260,
    time: 20,
    category: "Almoço",
    tags: ["low carb", "proteico"],
  },
  {
    id: "5",
    title: "Omelete de Legumes",
    ingredients: ["ovos", "espinafre", "tomate", "queijo", "sal"],
    calories: 230,
    time: 10,
    category: "Jantar",
    tags: ["rápido", "proteico"],
  },
];

function searchRecipes(query: string, ingredients: string[]) {
  if (!query && ingredients.length === 0) return [];

  return MOCK_RECIPES.filter((recipe) => {
    const matchesTitle =
      !query || recipe.title.toLowerCase().includes(query.toLowerCase());

    const matchesIngredients =
      ingredients.length === 0 ||
      ingredients.every((ing) =>
        recipe.ingredients.some((ri) =>
          ri.toLowerCase().includes(ing.toLowerCase())
        )
      );

    return matchesTitle || matchesIngredients;
  });
}

export default function BuscaPage() {
  const [query, setQuery] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<typeof MOCK_RECIPES>([]);

  function addIngredient() {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setIngredientInput("");
  }

  function removeIngredient(ing: string) {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  }

  function handleSearch() {
    const found = searchRecipes(query, ingredients);
    setResults(found);
    setSearched(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  }

  return (
    <div className="py-5 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Busca por Ingredientes</h1>
        <p className="text-muted text-sm mt-1">
          Adicione os ingredientes que tem em casa e encontre receitas para não desperdiçar
        </p>
      </div>

      {/* Search inputs */}
      <div className="space-y-3">
        <Input
          placeholder="Pesquisar por nome de receita..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <div className="flex gap-2">
          <Input
            placeholder="Ex: banana, frango, aveia..."
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={addIngredient} variant="outline" size="md" className="shrink-0">
            Adicionar
          </Button>
        </div>

        {/* Ingredient chips */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <button
                key={ing}
                onClick={() => removeIngredient(ing)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {ing}
                <X size={14} />
              </button>
            ))}
          </div>
        )}

        <Button onClick={handleSearch} className="w-full">
          <Search size={18} />
          Buscar Receitas
        </Button>
      </div>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-sm text-muted mb-3">
            {results.length === 0
              ? "Nenhuma receita encontrada"
              : `${results.length} receita${results.length > 1 ? "s" : ""} encontrada${results.length > 1 ? "s" : ""}`}
          </p>
          <div className="space-y-3">
            {results.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ChefHat size={14} className="text-primary" />
                        <span className="text-xs text-muted">{recipe.category}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Flame size={12} className="text-accent" />
                          {recipe.calories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {recipe.time} min
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.tags.map((tag) => (
                          <Badge key={tag} variant="muted" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted">
                      Ingredientes:{" "}
                      <span className="text-foreground">
                        {recipe.ingredients.join(", ")}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!searched && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-primary" />
          </div>
          <p className="text-muted text-sm">
            Adicione ingredientes ou pesquise por nome
            <br />
            para encontrar receitas
          </p>
        </div>
      )}
    </div>
  );
}
