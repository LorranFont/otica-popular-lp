import Image from "next/image";
import Link from "next/link";

interface CardProdutoProps {
  id: number | string;
  imagem: string;
  imagemHover: string;
  modelo: string;
  marca: string;
  preco: number;          
  precoPromocional?: number; 
}

export default function CardProduto({ id, imagem, imagemHover, modelo, marca, preco, precoPromocional }: CardProdutoProps) {
  return (
    <Link href={`/produto/${id}`} className="group cursor-pointer flex flex-col items-center font-rubik">
      <div className="relative w-full aspect-[4/3] transition-all duration-500">
        <Image src={imagem} alt={modelo} fill className="object-contain transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95" />
        <Image src={imagemHover} alt={`${modelo} lateral`} fill className="object-contain opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-otica-roxo/40">{marca}</p>
        <h4 className="text-slate-800 font-bold text-lg group-hover:text-otica-roxo transition-colors">{modelo}</h4>
        
        {/* Exibição dos Preços */}
        <div className="mt-1 flex flex-col items-center">
          {precoPromocional ? (
            <>
              <span className="text-slate-400 line-through text-[10px]">R$ {preco.toFixed(2)}</span>
              <span className="text-otica-roxo font-black text-xl">R$ {precoPromocional.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-slate-800 font-black text-xl">R$ {preco.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}