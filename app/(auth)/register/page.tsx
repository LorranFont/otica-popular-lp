"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await register(formData);

    if (success) {
      router.push("/profile");
    } else {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-otica-roxo uppercase italic tracking-tighter">
            Criar Conta
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Cadastre-se na Ótica Popular de Parnaíba.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              required
              type="text"
              placeholder="Nome Completo"
              value={formData.name}
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => updateFormData("name", e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              required
              type="email"
              placeholder="E-mail"
              value={formData.email}
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => updateFormData("email", e.target.value)}
            />
          </div>

          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              required
              type="tel"
              placeholder="WhatsApp"
              value={formData.phone}
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => updateFormData("phone", e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              required
              type="password"
              placeholder="Senha"
              value={formData.password}
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => updateFormData("password", e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              required
              type="password"
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) =>
                updateFormData("confirmPassword", e.target.value)
              }
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-otica-roxo text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl uppercase text-xs tracking-widest disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Finalizar Cadastro <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-otica-roxo font-black">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}
