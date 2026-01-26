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
   MenuIcon,
 } from "lucide-react";
 import CardUnidade from "../components/CardUnidade";
 import CardProduto from "../components/CardProduto";
 import BtnWhatsapp from "../components/BtnWhatsapp";
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
    <nav className="hidden lg:flex items-center gap-8">
          {CATEGORIAS.map((cat) => (
            <a 
              key={cat.label}
              href={cat.href}
              className="text-[12px] font-black text-slate-500 hover:text-otica-roxo uppercase tracking-[0.15em] transition-all"
            >
              {cat.label}
            </a>
          ))}
        </nav>
        {/* BotãoMobile (Hambúrguer) */}
        <div className="lg:hidden">
            <MenuIcon className="w-6 h-6 text-slate-500 hover:text-otica-roxo transition-colors" />
        </div>
  </div>

  {/* Lado Direito */}
  <div className="flex items-center gap-4">
    <a href="#unidades" className="hidden md:block text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">
      Lojas
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

      <footer className="bg-otica-roxo text-white py-16">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
      
      {/* 1. Branding e Missão */}
      <div className="flex flex-col gap-6">
        <Image 
          src="/logo_otica.png" 
          alt="Ótica Popular Logo" 
          width={120} 
          height={50} 
           
        />
        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
          ...
        </p>
      </div>

      {/* 2. Navegação Institucional */}
      <div>
        <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-otica-amarelo">Institucional</h4>
        <ul className="flex flex-col gap-4 text-sm text-white/80">
          <li><a href="#sobre" className="hover:text-white transition-colors">Sobre nós</a></li>
          <li><a href="#produtos" className="hover:text-white transition-colors">Produtos</a></li>
          <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Mais Óticas</a></li>
        </ul>
      </div>

      {/* 3. Ajuda e Suporte */}
      <div>
        <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-otica-amarelo">Suporte</h4>
        <ul className="flex flex-col gap-4 text-sm text-white/80">
          <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Política de privacidade</a></li>
        </ul>
      </div>

      {/* 4. Contato e Localização */}
      <div className="flex flex-col gap-6">
        <h4 className="font-black uppercase tracking-widest text-xs mb-2 text-otica-amarelo">Onde Estamos</h4>
        
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="font-bold mb-1">LOJA 1 - Centro</p>
            <p className="text-white/70">Endereço</p>
            <a href="tel:86999391222" className="flex items-center gap-2 mt-1 hover:text-green-400 transition-colors">
              (86) 9939-1222 <MessageCircle size={16} />
            </a>
          </div>

          <div>
            <p className="font-bold mb-1">LOJA 2 - São Sebastião</p>
            <p className="text-white/70">Av. João Silva Filho, 9999</p>
            <a href="tel:86995956868" className="flex items-center gap-2 mt-1 hover:text-green-400 transition-colors">
              (86) 99595-6868 <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Redes e Copyright */}
    <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-6">
        <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Facebook size={20} /></a>
        <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Instagram size={20} /></a>
      </div>
      
      <div className="text-center md:text-right">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">© 2026 Ótica Popular. Todos os direitos reservados.</p>
        <p className="text-white/20 text-[9px]">Desenvolvido por Lorran Fontenele</p>
      </div>
    </div>
  </div>
</footer>
      <BtnWhatsapp />
    </main>
  );
}
