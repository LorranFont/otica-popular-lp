"use client";
import { User, Package, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <p className="text-slate-400">Carregando...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">
          Minha Conta
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Options Sidebar */}
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 p-4 bg-otica-roxo text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-100">
              <User size={18} /> Dados Pessoais
            </button>
            <button className="flex items-center gap-3 p-4 bg-white text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
              <a href="/profile/orders">
                {" "}
                <Package size={18} /> Meus Pedidos{" "}
              </a>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-4 bg-white text-pink-500 rounded-2xl font-bold text-sm hover:bg-pink-50 transition-all mt-4"
            >
              <LogOut size={18} /> Sair
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
            <h2 className="text-xl font-black mb-6 uppercase text-otica-roxo">
              Dados Cadastrados
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Nome Completo
                </label>
                <p className="text-slate-900 font-bold">{user.name}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  E-mail
                </label>
                <p className="text-slate-900 font-bold">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Telefone
                  </label>
                  <p className="text-slate-900 font-bold">{user.phone}</p>
                </div>
              )}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Localização
                </label>
                <p className="text-slate-900 font-bold">Parnaíba - PI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
