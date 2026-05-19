"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Todos", "Nutrição", "Fitness", "Saúde", "Mindfulness"];

const MOCK_ARTICLES = [
  {
    id: "1",
    title: "Como calcular suas necessidades calóricas",
    excerpt: "Entenda a TMB (Taxa Metabólica Basal) e como adaptar sua alimentação às suas metas.",
    category: "Nutrição",
    type: "article",
    read_time: 8,
    author: "Dra. Ana Paula",
    specialization: "Nutricionista Clínica",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "2",
    title: "Alimentação pré e pós-treino: o guia completo",
    excerpt: "O que comer antes e depois do exercício para maximizar seus resultados sem perder saúde.",
    category: "Fitness",
    type: "video",
    read_time: 12,
    author: "Dr. Carlos Mendes",
    specialization: "Nutrição Esportiva",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "3",
    title: "Mindful Eating: comer com atenção plena",
    excerpt: "Técnicas para desenvolver uma relação saudável com a comida e eliminar a compulsão alimentar.",
    category: "Mindfulness",
    type: "article",
    read_time: 6,
    author: "Dra. Mariana Costa",
    specialization: "Comportamento Alimentar",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "4",
    title: "Microbiota intestinal e imunidade",
    excerpt: "A ciência por trás da saúde intestinal e como ela afeta todo o seu organismo.",
    category: "Saúde",
    type: "article",
    read_time: 10,
    author: "Dr. João Lima",
    specialization: "Nutrição Funcional",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "5",
    title: "Jejum Intermitente: mitos e verdades",
    excerpt: "O que a ciência realmente diz sobre o jejum intermitente e para quem ele é indicado.",
    category: "Nutrição",
    type: "video",
    read_time: 15,
    author: "Dra. Ana Paula",
    specialization: "Nutricionista Clínica",
    color: "from-yellow-400 to-amber-500",
  },
];

export default function ConteudosPage() {
  const [selected, setSelected] = useState("Todos");

  const filtered = MOCK_ARTICLES.filter(
    (a) => selected === "Todos" || a.category === selected
  );

  return (
    <div className="py-5 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Conteúdos Educativos</h1>
        <p className="text-muted text-sm mt-1">
          Artigos e vídeos com pesquisa científica validada
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
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

      {/* Content list */}
      <div className="space-y-4">
        {filtered.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-elevated transition-shadow cursor-pointer">
            {/* Thumbnail */}
            <div className={`h-32 bg-gradient-to-br ${article.color} flex items-center justify-center relative`}>
              {article.type === "video" ? (
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Play size={22} className="text-white ml-0.5" fill="white" />
                </div>
              ) : (
                <BookOpen size={36} className="text-white/60" />
              )}
              <Badge
                className="absolute top-3 left-3 bg-black/30 text-white border-0 backdrop-blur-sm"
              >
                {article.type === "video" ? "Vídeo" : "Artigo"}
              </Badge>
            </div>

            <CardContent className="p-4">
              <Badge variant="muted" className="text-xs mb-2">{article.category}</Badge>
              <h3 className="font-semibold text-foreground mb-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed mb-3">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {article.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{article.author}</p>
                    <p className="text-[10px] text-muted">{article.specialization}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock size={12} />
                  {article.read_time} min
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
