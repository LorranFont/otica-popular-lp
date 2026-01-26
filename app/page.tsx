"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { User, ShoppingCart, Search, ChevronLeft, ChevronRight, MessageCircle, Instagram, Facebook, MapPin } from "lucide-react";
import { PRODUTOS, CATEGORIAS, UNIDADES } from "../constants";
import CardProduto from "../components/CardProduto";
import CardUnidade from "../components/CardUnidade";

export default function Home() {
  // Estados para o Carrossel do Banner Principal
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    { id: 1, title: "As marcas que você só encontra aqui.", subtitle: "Modelos exclusivos para todos os estilos.", img: "/banner-1.jpg", color: "bg-otica-roxo" },
    { id: 2, title: "Volta às aulas com estilo.", subtitle: "Lentes Kodak com descontos especiais.", img: "/banner-2.jpg", color: "bg-slate-900" }
  ];

  // Estados para o Carrossel de Produtos
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play do Banner Principal
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const scrollProdutos = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <header className="bg-otica-roxo border-b border-slate-100 sticky top-0 z-[100] shadow-sm py-4">
  <div className="container mx-auto px-6">
    <div className="flex items-center justify-between gap-8 md:gap-12">
      
      {/* Login e Carrinho */}
      <div className="flex items-center gap-4 order-1">
        <button className="p-2  rounded-full text-slate-600 text-white hover:text-otica-amarelo transition-all">
          <User size={30}/>
        </button>
        <button className="relative p-2  rounded-full text-slate-600 text-white hover:text-otica-amarelo transition-all">
          <ShoppingCart size={30}  />
          <span className="absolute -top-1 -right-1 bg-otica-roxo text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-white">
            0
          </span>
        </button>
      </div>

      {/* Busca e Categorias */}
      <div className="flex-1 max-w-2xl flex flex-col gap-4 order-2">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="O que você está buscando hoje?" 
            className="w-full bg-slate-100 border-2 border-transparent py-3 px-12 rounded-2xl text-sm outline-none focus:bg-white focus:border-otica-roxo/20 focus:shadow-md transition-all" 
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
        
        {/* Categorias */}
        <nav className="hidden md:block overflow-x-auto scrollbar-hide">
          <ul className="flex justify-center gap-8">
            {CATEGORIAS.map((cat) => (
              <li key={cat.label} className="whitespace-nowrap">
                <a 
                  href={cat.href} 
                  className="text-[10px] font-black text-slate-400 hover:text-otica-amarelo uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logo */}
      <div className="flex-shrink-0 order-3">
        <Image 
          src="/logo_otica.png" 
          alt="Ótica Popular" 
          width={140} 
          height={45} 
          className="object-contain" 
        />
      </div>

    </div>
  </div>
</header>

      {/* 2. BANNER PRINCIPAL */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"} ${banner.color}`}>
            <div className="container mx-auto h-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative">
              <div className="max-w-xl text-center md:text-left pt-12 md:pt-0">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase italic tracking-tighter">{banner.title}</h1>
                <p className="text-white/80 text-lg mb-8 font-medium">{banner.subtitle}</p>
                <button className="bg-otica-amarelo text-otica-roxo font-black px-12 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform uppercase text-sm">Compre Agora</button>
              </div>
              <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center italic text-white/20">Foto do Modelo {banner.id}</div>
            </div>
          </div>
        ))}
        {/* Indicadores do Banner */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrentBanner(i)} className={`h-1.5 transition-all rounded-full ${i === currentBanner ? "w-8 bg-white" : "w-2 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* 3. VITRINE DE PRODUTOS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div><h3 className="text-3xl font-black text-slate-900 uppercase">Destaques</h3><p className="text-slate-500 font-medium italic">O seu estilo em Parnaíba</p></div>
            <div className="flex gap-2">
              <button onClick={() => scrollProdutos("left")} className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"><ChevronLeft size={20} /></button>
              <button onClick={() => scrollProdutos("right")} className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div ref={carouselRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide">
            {PRODUTOS.map((produto) => (
              <div key={produto.id} className="min-w-[85%] md:min-w-[calc(25%-1.5rem)] snap-center">
                <CardProduto imagem={produto.imagem} imagemHover={produto.imagemHover} modelo={produto.modelo} marca={produto.marca} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UNIDADES */}
      <section id="unidades" className="bg-[#F8F9FA] py-24 border-y border-slate-100 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-black text-center text-otica-roxo mb-12 uppercase">Nossas Unidades</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {UNIDADES.map((unid) => <CardUnidade key={unid.id} {...unid} />)}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-otica-roxo text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            <div className="flex flex-col gap-6">
              <Image src="/logo_otica.png" alt="Logo" width={140} height={40} className="opacity-80" />
              <p className="text-white/60 text-sm italic">"Sua visão é a nossa missão."</p>
              <div className="flex gap-4"><Instagram size={20} className="text-white/40" /><Facebook size={20} className="text-white/40" /></div>
            </div>
            <div><h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">Institucional</h4><ul className="text-sm text-white/70 space-y-3"><li>Sobre nós</li><li>Produtos</li><li>Masi Óticas</li></ul></div>
            <div><h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">Suporte</h4><ul className="text-sm text-white/70 space-y-3"><li>FAQ</li><li>Termos</li><li>Privacidade</li></ul></div>
            <div><h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">Contato</h4><p className="text-sm text-white/70 mb-4">otica.pi@gmail.com</p><p className="text-xs font-bold">(86) 9939-1222</p></div>
          </div>
          <p className="text-center pt-8 text-[10px] uppercase text-white/30 tracking-widest">© 2026 Ótica Popular - Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  );
}