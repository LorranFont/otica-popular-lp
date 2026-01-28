"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { PRODUTOS } from "../../constants";

export default function PaginaCarrinho() {
  // Simulando o estado do carrinho que virá do banco
  const [itens, setItens] = useState([
    { ...PRODUTOS[0], quantidade: 1 },
    { ...PRODUTOS[1], quantidade: 2 },
  ]);

  const subtotal = itens.reduce((acc, item) => acc + (item.precoPromocional || item.preco) * item.quantidade, 0);
  const frete = 0; // Exemplo: frete grátis para Parnaíba

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl font-black text-slate-900 mb-10 uppercase italic tracking-tighter flex items-center gap-4">
          <ShoppingBag size={32} className="text-otica-roxo" /> Meu Carrinho
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LISTA DE PRODUTOS  */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {itens.length > 0 ? (
              itens.map((item) => (
                <div key={item.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-6">
                  {/* Imagem */}
                  <div className="w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0 p-2">
                    <Image src={item.imagem} alt={item.modelo} width={100} height={100} className="object-contain" />
                  </div>

                  {/* Detalhes */}
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-otica-roxo/40 uppercase tracking-widest">{item.marca}</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.modelo}</h3>
                    <p className="text-otica-roxo font-black mt-1">R$ {(item.precoPromocional || item.preco).toFixed(2)}</p>
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl">
                    <button className="p-1 hover:text-otica-roxo"><Minus size={16} /></button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantidade}</span>
                    <button className="p-1 hover:text-otica-roxo"><Plus size={16} /></button>
                  </div>

                  {/* Remover */}
                  <button className="font-rubik p-3 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">Seu carrinho está vazio.</p>
                <Link href="/" className="inline-block mt-6 bg-otica-roxo text-white px-8 py-3 rounded-full font-black text-xs uppercase">Voltar à loja</Link>
              </div>
            )}
          </div>

          {/* RESUMO DO PEDIDO  */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl sticky top-32">
              <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Resumo da Compra</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-900 font-bold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Frete (Parnaíba)</span>
                  <span className="text-green-500 font-bold uppercase text-[10px] bg-green-50 px-2 py-1 rounded">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-black text-slate-900 uppercase italic">Total</span>
                <span className="text-3xl font-black text-otica-roxo leading-none">R$ {subtotal.toFixed(2)}</span>
              </div>

              <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-otica-roxo transition-all shadow-xl uppercase text-xs tracking-widest mb-4">
                Finalizar Pedido <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> Pagamento 100% Seguro
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}