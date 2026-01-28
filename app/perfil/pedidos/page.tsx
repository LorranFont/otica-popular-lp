"use client";
import { useState } from "react";
import { Package, Truck, CheckCircle2, Clock, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function MeusPedidos() {
  // Mock de dados de pedidos
  const [pedidos, setPedidos] = useState([
    {
      id: "8742",
      data: "28/01/2026",
      status: "Em transporte",
      total: 159.99,
      item: "Óculos Kira - Rose",
      imagem: "/produtos/oculos-1.png",
      lojaRetirada: "Unidade Centro (Riachuelo)"
    },
    {
      id: "8610",
      data: "15/12/2025",
      status: "Entregue",
      total: 350.00,
      item: "Oculos RayBan",
      imagem: "/produtos/oculos-2.png",
      lojaRetirada: "Unidade São Sebastião"
    }
  ]);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-[10px] font-black uppercase text-slate-400 mb-8 tracking-widest">
          <Link href="/perfil" className="hover:text-otica-roxo">Minha Conta</Link> 
          <span>/</span> 
          <span className="text-slate-900">Meus Pedidos</span>
        </nav>

        <h1 className="text-3xl font-black text-slate-900 mb-10 uppercase italic tracking-tighter">Histórico de Compras</h1>

        <div className="flex flex-col gap-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Info do Produto */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center p-2">
                    <img src={pedido.imagem} alt={pedido.item} className="object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-otica-roxo uppercase tracking-widest">Pedido #{pedido.id}</span>
                    <h3 className="text-lg font-bold text-slate-900">{pedido.item}</h3>
                    <p className="text-xs text-slate-400 font-medium">Comprado em {pedido.data}</p>
                  </div>
                </div>

                {/* Status e Valor */}
                <div className="flex flex-col md:items-end gap-2">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    pedido.status === "Entregue" ? "bg-green-100 text-green-600" : "bg-purple-100 text-otica-roxo animate-pulse"
                  }`}>
                    {pedido.status === "Entregue" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {pedido.status}
                  </div>
                  <p className="text-xl font-black text-slate-900">R$ {pedido.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Info de Logística */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <MapPin size={16} className="text-otica-roxo" />
                  <span>Retirada em: <strong className="text-slate-700">{pedido.lojaRetirada}</strong></span>
                </div>
                <button className="flex items-center gap-2 text-otica-roxo font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Ver Detalhes do Pedido <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {pedidos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold italic">Você ainda não realizou nenhum pedido.</p>
            <Link href="/" className="inline-block mt-6 bg-otica-roxo text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest">
              Ir para a loja
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}