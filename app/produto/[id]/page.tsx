"use client";
import BtnWhatsapp from "../../../components/BtnWhatsapp";
import { useParams } from "next/navigation";
import { PRODUTOS } from "../../../constants"; 
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Heart, Share2, ShieldCheck, CreditCard } from "lucide-react";

export default function PaginaProduto() {
  const params = useParams();
  const [fotoSelecionada, setFotoSelecionada] = useState(0);

  // Busca o produto correto na lista PRODUTOS usando o ID da URL
  const produto = PRODUTOS.find((p) => p.id.toString() === params.id);

  if (!produto) return <div className="p-20 text-center">Produto não encontrado.</div>;

  // Simulando as fotos extras (Frente, Lado, Modelo)
  const fotos = [produto.imagem, produto.imagemHover, produto.imagem];

  return (
    <main className="min-h-screen bg-white pb-20 mt-10 font-rubik">
        <BtnWhatsapp />
      <div className="container mx-auto px-6">

        {/* Navegação/Breadcrumb */}
        <nav className="font-rubik text-[10px] text-slate-400 uppercase font-black mb-10 flex gap-2 tracking-widest">
          <span>Início</span> / <span>{produto.marca}</span> / <span className="text-slate-900">{produto.modelo}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* lado esquerdo */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            {/* Miniaturas */}
            <div className="flex md:flex-col gap-4 order-2 md:order-1">
              {fotos.map((foto, i) => (
                <button 
                  key={i} 
                  onClick={() => setFotoSelecionada(i)}
                  className={`w-20 h-20 border-2 rounded-2xl overflow-hidden transition-all ${fotoSelecionada === i ? 'border-otica-roxo shadow-lg' : 'border-slate-100 opacity-60'}`}
                >
                  <Image src={foto} alt="Mini" width={80} height={80} className="object-contain p-2" />
                </button>
              ))}
            </div>

            {/* Imagem Principal */}
            <div className="flex-1 bg-[#F8F9FA] rounded-[48px] flex items-center justify-center p-12 relative group order-1 md:order-2">
              <Image 
                src={fotos[fotoSelecionada]} 
                alt={produto.modelo} 
                width={600} 
                height={400} 
                className="object-contain transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-8 right-8 bg-pink-100 text-pink-600 font-black px-5 py-1.5 rounded-full text-xs">
                -27% OFF
              </div>
            </div>
          </div>

          {/* LADO DIREITO: INFORMAÇÕES E BOTÕES */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <p className="text-otica-roxo font-black text-xs uppercase tracking-[0.3em] mb-2 font-rubik">{produto.marca}</p>
              <h1 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-4 font-rubik">
                {produto.modelo}
              </h1>
              <p className="text-slate-400 line-through text-lg font-rubik">De R$ 220,00</p>
              <div className="flex items-center gap-4 font-rubik">
                <h2 className="text-5xl font-black text-otica-roxo font-rubik">R$ 159,99</h2>
                <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-lg font-rubik">3% OFF PIX</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 flex items-center gap-2 font-medium font-rubik">
                <CreditCard size={18} className="text-otica-roxo" /> em até 6x de R$ 26,67 sem juros
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-4">
              <button className="w-full bg-slate-900 text-white font-black py-6 rounded-[24px] flex items-center justify-center gap-3 hover:bg-otica-roxo transition-all uppercase tracking-widest text-sm shadow-xl shadow-slate-200">
                <ShoppingBag size={20} /> Comprar Armação
              </button>
              
              <button className="w-full bg-pink-50 text-pink-600 font-black py-6 rounded-[24px] flex items-center justify-center gap-3 hover:bg-pink-100 transition-all uppercase tracking-widest text-sm border-2 border-pink-100">
                Precisa de Lentes? <span className="bg-pink-600 text-white px-2 py-0.5 rounded text-[9px]">CLIQUE AQUI</span>
              </button>
            </div>

            {/* Garantias */}
            <div className="font-rubik grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 p-4 rounded-3xl flex flex-col items-center text-center gap-2">
                <ShieldCheck className="text-otica-roxo" size={24} />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Segurança Total</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-3xl flex flex-col items-center text-center gap-2">
                <Heart className="text-pink-500" size={24} />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Favorito da Galera</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}