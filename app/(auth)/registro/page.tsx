"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";

export default function PaginaRegistro() {
  // Estados preparados para o Backend
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    senha: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aqui entrará a chamada da API 
    console.log("Dados prontos para o banco:", formData);
    setTimeout(() => setLoading(false), 1500); // Simulando resposta
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-otica-roxo uppercase italic tracking-tighter">Criar Conta</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Cadastre-se na Ótica Popular de Parnaíba.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="text" 
              placeholder="Nome Completo" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="email" 
              placeholder="E-mail" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="tel" 
              placeholder="WhatsApp" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              required
              type="password" 
              placeholder="Senha" 
              className="w-full bg-slate-50 border-2 border-transparent py-4 px-12 rounded-2xl outline-none focus:border-otica-roxo/20 transition-all text-sm"
              onChange={(e) => setFormData({...formData, senha: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-otica-roxo text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl uppercase text-xs tracking-widest disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Finalizar Cadastro <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </main>
  );
}