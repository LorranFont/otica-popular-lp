import Image from "next/image";
import {
  MessageCircle,
  MapPin,
  Glasses,
  Sun,
  BookOpen,
  Instagram,
  Facebook,
} from "lucide-react";
import CardUnidade from "../components/CardUnidade";
import { UNIDADES } from "../constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      {/* 1. Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <Image
          src="/logo_otica.png"
          alt="Ótica Popular Logo"
          width={150}
          height={50}
          className="object-contain"
        />
        <div className="flex gap-4 items-center">
          <a
            href="#"
            className="text-slate-400 hover:text-otica-roxo transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-otica-roxo transition-colors"
          >
            <Facebook size={20} />
          </a>
          <button className="bg-green-500 text-white p-2.5 rounded-full hover:bg-green-600 transition-all shadow-sm">
            <MessageCircle size={20} />
          </button>
        </div>
      </header>

      {/* 2. Banner Principal "Suave" (Hero) */}
      <section className="relative bg-otica-roxo overflow-hidden py-16 md:py-24">
        {/* Elementos Decorativos */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-otica-amarelo/10 rounded-l-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              Modelos exclusivos para{" "}
              <span className="text-otica-amarelo">todos os estilos.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 font-medium">
              Há 18 anos cuidando da visão de quem mais amamos em Parnaíba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-otica-amarelo text-otica-roxo font-extrabold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform uppercase tracking-wider text-sm">
                Compre Agora
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-10 py-4 rounded-full hover:bg-white/20 transition-all text-sm uppercase">
                Ver Promoções
              </button>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center italic text-white/20">
            Foto da Modelo Aqui
          </div>
        </div>
      </section>

      {/* 3. Categorias */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-center text-slate-400 uppercase tracking-[0.2em] text-xs font-bold mb-12">
          O que você procura?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Glasses, label: "Armações" },
            { icon: Sun, label: "Óculos de Sol" },
            { icon: BookOpen, label: "Lentes" },
            { icon: MessageCircle, label: "Exame de Vista" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 bg-white shadow-sm border border-slate-100 rounded-[24px] flex items-center justify-center text-otica-roxo group-hover:bg-otica-roxo group-hover:text-white transition-all duration-300 mb-4">
                <item.icon size={32} />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-otica-roxo transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Unidades */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-black text-otica-roxo mb-4">
              Encontre uma Ótica Popular
            </h3>
            <p className="text-slate-500 font-medium">
              Estamos estrategicamente localizados para melhor lhe atender em
              Parnaíba.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {UNIDADES.map((unidade) => (
              <CardUnidade
                key={unidade.id}
                nome={unidade.nome}
                endereco={unidade.endereco}
                bairro={unidade.bairro}
                linkWhats={unidade.linkWhats}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p className="font-bold text-otica-roxo/50 mb-2">
          Ótica Popular © Parnaíba-PI
        </p>
        <p>Sua visão é a nossa missão desde 2008</p>
      </footer>
    </main>
  );
}
