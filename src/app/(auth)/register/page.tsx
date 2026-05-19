"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: "client" },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-5 pt-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Conta criada!</h2>
          <p className="text-muted text-sm leading-relaxed">
            Enviamos um link de confirmação para{" "}
            <span className="font-medium text-foreground">{email}</span>.
            <br />
            Verifique sua caixa de entrada.
          </p>
        </div>
        <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
          Ir para o Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Criar conta grátis</h1>
        <p className="text-muted text-sm mt-1">
          Comece a cuidar da sua alimentação hoje
        </p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <Input
          id="name"
          type="text"
          label="Nome completo"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <Input
          id="email"
          type="email"
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          error={error}
        />

        <Button type="submit" disabled={loading} className="w-full mt-1">
          {loading ? "Criando conta..." : "Criar conta grátis"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted">
        Ao criar uma conta, você concorda com nossos{" "}
        <Link href="/termos" className="text-primary">
          Termos de Uso
        </Link>{" "}
        e{" "}
        <Link href="/privacidade" className="text-primary">
          Política de Privacidade
        </Link>
        .
      </p>

      <p className="text-center text-sm text-muted">
        Já tem conta?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Entrar
        </Link>
      </p>
    </div>
  );
}
