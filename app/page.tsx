 "use client";
 import Image from "next/image";
 import { useRef, useEffect, useState } from "react";
 import {
   MessageCircle,
   Glasses,
   Sun,
   BookOpen,
   Instagram,
   Facebook,
   ChevronLeft,
   ChevronRight,
 } from "lucide-react";
 import CardUnidade from "../components/CardUnidade";
 import CardProduto from "../components/CardProduto";
 import { UNIDADES, PRODUTOS, CATEGORIAS } from "../constants";

 export default function Home() {
   const carouselRef = useRef<HTMLDivElement>(null);
   const [isPaused, setIsPaused] = useState(false);
 
   const scroll = (direction: "left" | "right") => {
     if (carouselRef.current) {
       const scrollAmount = carouselRef.current.offsetWidth;
       carouselRef.current.scrollBy({
         left: direction === "left" ? -scrollAmount : scrollAmount,
         behavior: "smooth",
       });
     }
   };
 
   useEffect(() => {
     const interval = setInterval(() => {
       if (!isPaused && carouselRef.current) {
         const maxScroll =
           carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
 
         if (carouselRef.current.scrollLeft >= maxScroll - 10) {
           carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
         } else {
           carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
         }
       }
     }, 3000);
 
     return () => clearInterval(interval);
   }, [isPaused]);
 
   return (
     <main className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      {/* 1. Header */}
      <header className="bg-white border-b border-slate-100 py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Lado Esquerdo */}
  <div className="flex items-center gap-8">
    <Image 
      src="/logo_otica.png" 
      alt="Ótica Popular Logo" 
      width={120} 
      height={35} 
      className="object-contain"
    />

    {/* Centro: Categorias */}
    <nav className="hidden lg:flex items-center gap-6">
      {CATEGORIAS.map((cat) => (
        <a 
          key={cat.label}
          href={cat.href}
          className="text-[13px] font-bold text-slate-500 hover:text-otica-roxo uppercase tracking-wider transition-colors"
        >
          {cat.label}
        </a>
      ))}
    </nav>
  </div>

  {/* Lado Direito */}
  <div className="flex items-center gap-4">
    <a href="#unidades" className="hidden md:block text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">
      Lojas
    </a>
    
    <a 
      href="https://wa.me/seu-numero" 
      target="_blank" 
      className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#128C7E] transition-all shadow-md"
    >
      <Image 
        src="/logo_whats.png" 
        alt="logo-whatsapp" 
        width={18} 
        height={18} 
        
      />
      <span className="font-bold text-xs">Falar agora</span>
    </a>
  </div>
      </header>

      {/* 2. Banner Principal */}
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

      {/* 3. Vitrine de Produtos */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Destaques
              </h3>
              <p className="text-slate-500 font-medium">
                As melhores grifes em Parnaíba
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
          >
            {PRODUTOS.map((produto) => (
              <div
                key={produto.id}
                className="min-w-[85%] md:min-w-[calc(25%-1.5rem)] snap-center"
              >
                <CardProduto
                  imagem={produto.imagem}
                  imagemHover={produto.imagemHover}
                  modelo={produto.modelo}
                  marca={produto.marca}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Unidades */}
      <section
        id="unidades"
        className="bg-white py-24 border-y border-slate-100 scroll-mt-20 "
      >
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

      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6 flex flex-col items-center">
          {/* Logo no Footer */}
          <Image
            src="/logo_otica.png"
            alt="Ótica Popular Logo"
            width={120}
            height={40}
            className="grayscale opacity-50 mb-8"
          />

          {/* Redes Sociais */}
          <div className="flex gap-8 mb-8">
            <a
              href="#"
              className="text-slate-400 hover:text-otica-roxo transition-colors flex flex-col items-center gap-1"
            >
              <Instagram size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Instagram
              </span>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-otica-roxo transition-colors flex flex-col items-center gap-1"
            >
              <Facebook size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Facebook
              </span>
            </a>
          </div>

          {/* Info de Copyright */}
          <div className="text-center text-slate-400 text-xs border-t border-slate-200 pt-8 w-full max-w-xs">
            <p className="font-bold text-otica-roxo/40 mb-1">
              Ótica Popular - Parnaíba/PI
            </p>
            <p>© 2026 | Sua visão é a nossa missão.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
