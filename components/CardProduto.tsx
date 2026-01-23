import Image from "next/image";

interface CardProdutoProps {
  imagem: string;
  imagemHover: string;
  modelo: string;
  marca: string;
}

export default function CardProduto({ imagem, imagemHover, modelo, marca }: CardProdutoProps) {
  return (
    <div className="group cursor-pointer flex flex-col items-center">
      <div className="relative w-full aspect-[4/3] transition-all duration-500">
        
        {/* Imagem Principal */}
        <Image 
          src={imagem} 
          alt={modelo} 
          fill
          className="object-contain transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95"
        />

        {/* Imagem Secundária */}
        <Image 
          src={imagemHover} 
          alt={`${modelo} lateral`} 
          fill
          className="object-contain opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110"
        />
        
      </div>

      {/* Informações do Produto */}
      <div className="mt-2 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-otica-roxo/40">
          {marca}
        </p>
        <h4 className="text-slate-800 font-bold text-lg group-hover:text-otica-roxo transition-colors">
          {modelo}
        </h4>
      </div>
    </div>
  );
}