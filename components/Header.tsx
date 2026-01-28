"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { CATEGORIAS } from "@/constants";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const paginasCompactas = pathname.includes("/carrinho") || pathname.includes("/produto");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // O Header fica pequeno se der scroll OU se estiver nas páginas de compra
  const headerCompacto = isScrolled || paginasCompactas;

  return (
    <header className={`bg-otica-roxo border-b border-white/10 sticky top-0 z-[100] shadow-sm transition-all duration-500 ${
      headerCompacto ? "py-2" : "py-6"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 md:gap-12">
        
        {/* Ícones  */}
        <div className="flex items-center gap-4 order-3">
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <button className="text-white hover:text-otica-amarelo transition-colors">
           <a href="/login" className="flex items-center gap-1">
            <User size={headerCompacto ? 24 : 30} />
           </a>
          </button>
          <button className="relative text-white hover:text-otica-amarelo transition-colors">
           <a href="/carrinho" className="flex items-center gap-1">
            <ShoppingCart size={headerCompacto ? 24 : 30} />
           </a>
            <span className="absolute -top-1 -right-1 bg-white text-otica-roxo text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>

        {/* Busca e Nav Central */}
        <div className={`flex-1 max-w-3xl flex flex-col transition-all duration-500 order-2 ${
          headerCompacto ? "gap-0" : "gap-5"
        }`}>
          {/* Esconde a busca se estiver compacto */}
          <div className={`relative overflow-hidden transition-all duration-500 ${
            headerCompacto ? "h-0 opacity-0 pointer-events-none" : "h-[46px] opacity-100 mb-2"
          }`}>
            <input type="text" placeholder="Buscar..." className="w-full bg-white/10 border border-white/20 py-3 px-12 rounded-2xl text-white outline-none" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          </div>

          <nav className="hidden md:block">
            <ul className="flex justify-center gap-10">
              {CATEGORIAS.map(cat => (
                <li key={cat.label} className="whitespace-nowrap">
                  <a href={cat.href} className={`font-black uppercase tracking-widest transition-all ${
                    headerCompacto ? "text-[10px] text-white" : "text-[11px] text-white/60 hover:text-otica-amarelo"
                  }`}>
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logo Direita */}
        <div className="flex-shrink-0 order-1">
          <Image 
            src="/logo_otica.png" 
            alt="Logo" 
            width={headerCompacto ? 110 : 140} 
            height={40} 
            className="object-contain" 
          />
        </div>
      </div>
    </header>
  );
}