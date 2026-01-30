"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Calendar,
  UserCheck,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import StoreCard from "../components/StoreCard";

interface Product {
  id: number | string;
  image: string;
  hoverImage: string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
}

interface Store {
  id: number | string;
  name: string;
  address: string;
  neighborhood: string;
  whatsappLink: string;
  phone?: string;
  openingHours?: string;
}

interface HomeClientProps {
  products: Product[];
  stores: Store[];
}

export default function HomeClient({ products, stores }: HomeClientProps) {
  // States and refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: "As marcas que você só encontra aqui.",
      subtitle: "Modelos exclusivos para todos os estilos.",
      img: "/banner-1.jpg",
      color: "bg-otica-roxo",
    },
    {
      id: 2,
      title: "Volta às aulas com estilo.",
      subtitle: "Lentes Kodak com descontos especiais.",
      img: "/banner-2.jpg",
      color: "bg-slate-900",
    },
  ];

  const examSteps = [
    {
      id: 1,
      icon: <UserCheck size={24} />,
      title: "Preencha os dados",
      desc: "Informe seu nome e WhatsApp no formulário.",
    },
    {
      id: 2,
      icon: <ClipboardList size={24} />,
      title: "Escolha o local",
      desc: "Selecione a unidade Centro ou São Sebastião.",
    },
    {
      id: 3,
      icon: <Calendar size={24} />,
      title: "Agende a data",
      desc: "Nossa equipe confirmará o horário via WhatsApp.",
    },
    {
      id: 4,
      icon: <CheckCircle size={24} />,
      title: "Realize o exame",
      desc: "Cuide da sua visão com nossos parceiros.",
    },
  ];

  // Auto-play do Banner Principal
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentBanner((prev) =>
          prev === banners.length - 1 ? 0 : prev + 1
        );
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  const scrollProducts = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-rubik text-slate-900">
      {/* BANNER PRINCIPAL */}
      <section
        className="relative h-[500px] md:h-[600px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${banner.color}`}
          >
            <div className="container mx-auto h-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative">
              <div className="max-w-xl text-center md:text-left pt-12 md:pt-0">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase italic tracking-tighter">
                  {banner.title}
                </h1>
                <p className="text-white/80 text-lg mb-8 font-medium">
                  {banner.subtitle}
                </p>
                <button className="bg-otica-amarelo text-otica-roxo font-black px-12 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform uppercase text-sm">
                  Compre Agora
                </button>
              </div>
              <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center italic text-white/20">
                Foto do Modelo {banner.id}
              </div>
            </div>
          </div>
        ))}
        {/* Indicadores do Banner */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`h-1.5 transition-all rounded-full ${
                i === currentBanner ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Ir para banner ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section className="py-24 bg-white font-rubik">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase">
                Destaques
              </h2>
              <p className="text-slate-500 font-medium italic">
                O seu estilo em Parnaíba
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollProducts("left")}
                className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"
                aria-label="Produtos anteriores"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollProducts("right")}
                className="p-3 rounded-full border border-slate-200 hover:bg-otica-roxo hover:text-white transition-all shadow-sm"
                aria-label="Próximos produtos"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[85%] md:min-w-[calc(25%-1.5rem)] snap-center"
              >
                <ProductCard
                  id={product.id}
                  image={product.image}
                  hoverImage={product.hoverImage}
                  model={product.model}
                  brand={product.brand}
                  price={product.price}
                  promotionalPrice={product.promotionalPrice}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO EXAME */}
      <section className="bg-otica-roxo py-24 font-rubik">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block italic">
              ● Facilitamos sua consulta
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
              Como funciona o{" "}
              <span className="text-otica-amarelo">Exame de Vista</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Agende seu exame com clínicas parceiras em Parnaíba-PI de forma
              rápida e simples pelo nosso site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {examSteps.map((step) => (
              <div
                key={step.id}
                className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-otica-amarelo mb-8 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-white font-black text-xl mb-3">
                  {step.id}. {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="bg-otica-amarelo text-otica-roxo font-black px-10 py-4 rounded-2xl uppercase text-sm hover:scale-105 transition-transform shadow-xl">
              Agendar Agora
            </button>
            <div className="flex gap-4 text-white/30 text-[10px] font-bold uppercase tracking-widest italic">
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-otica-amarelo" />{" "}
                Pagamento Facilitado
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-otica-amarelo" /> Dados
                Protegidos (LGPD)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section
        id="unidades"
        className="bg-[#F8F9FA] py-24 border-y border-slate-100 scroll-mt-20 font-rubik"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-center text-otica-roxo mb-12 uppercase">
            Nossas Unidades
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                name={store.name}
                address={store.address}
                neighborhood={store.neighborhood}
                whatsappLink={store.whatsappLink}
                phone={store.phone}
                openingHours={store.openingHours}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-otica-roxo text-white pt-16 pb-8 font-rubik">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            <div className="flex flex-col gap-6">
              <Image
                src="/logo_otica.png"
                alt="Logo Ótica Popular"
                width={140}
                height={40}
                className="opacity-80"
              />
              <p className="text-white/60 text-sm italic">
                &ldquo;Sua visão é a nossa missão.&rdquo;
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-otica-amarelo transition-colors"
                >
                  <Instagram size={20} className="text-white/40" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-otica-amarelo transition-colors"
                >
                  <Facebook size={20} className="text-white/40" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">
                Institucional
              </h4>
              <ul className="text-sm text-white/70 space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mais Óticas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">
                Suporte
              </h4>
              <ul className="text-sm text-white/70 space-y-3">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs text-otica-amarelo mb-6">
                Contato
              </h4>
              <p className="text-sm text-white/70 mb-4">
                <a
                  href="mailto:otica.pi@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  otica.pi@gmail.com
                </a>
              </p>
              <p className="text-xs font-bold">
                <a
                  href="tel:+5586999391222"
                  className="hover:text-otica-amarelo transition-colors"
                >
                  (86) 9939-1222
                </a>
              </p>
            </div>
          </div>
          <p className="text-center pt-8 text-[10px] uppercase text-white/30 tracking-widest">
            © 2026 Ótica Popular - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}
