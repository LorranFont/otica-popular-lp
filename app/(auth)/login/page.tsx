"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";

export default function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aqui usa o signIn("credentials") do NextAuth
    // Isso é apenas um placeholder para simulação de login
    console.log("Tentando login com:", { email, senha });
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-otica-roxo uppercase italic tracking-tighter">Login</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Acesse sua conta para comprar.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="email" 
              placeholder="E-mail" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="password" 
              placeholder="Senha" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-otica-roxo text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Entrar <LogIn size={18} /></>}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Ainda não é cliente? <Link href="/registro" className="text-otica-roxo font-black">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
}