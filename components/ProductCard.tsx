import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import ImageWithFallback from "./ImageWithFallback";
import { useToastContext } from "./ToastProvider";

interface ProductCardProps {
  id: number | string;
  image: string;
  hoverImage: string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
}

export default function ProductCard({
  id,
  image,
  hoverImage,
  model,
  brand,
  price,
  promotionalPrice,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { success } = useToastContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Prevent event bubbling

    addItem({
      id,
      model,
      brand,
      price,
      promotionalPrice,
      image,
    });

    // Show success toast
    success("Produto adicionado!", `${model} foi adicionado ao seu carrinho`);
  };

  const finalPrice = promotionalPrice || price;
  const hasDiscount = !!promotionalPrice;

  return (
    <div className="group cursor-pointer flex flex-col items-center font-rubik">
      <Link href={`/product/${id}`} className="w-full">
        <div className="relative w-full aspect-[4/3] transition-all duration-500 bg-slate-50 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={model}
            fill
            className="object-contain transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95 p-4"
          />
          <ImageWithFallback
            src={hoverImage}
            alt={`${model} - vista alternativa`}
            fill
            className="object-contain opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110 p-4"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((price - finalPrice) / price) * 100)}%
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 text-center w-full">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-otica-roxo/40">
          {brand}
        </p>
        <h4 className="text-slate-800 font-bold text-lg group-hover:text-otica-roxo transition-colors">
          {model}
        </h4>

        {/* Price Display */}
        <div className="mt-1 flex flex-col items-center mb-3">
          {hasDiscount ? (
            <>
              <span className="text-slate-400 line-through text-[10px]">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-otica-roxo font-black text-xl">
                R$ {finalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-slate-800 font-black text-xl">
              R$ {finalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-otica-roxo text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-otica-roxo/90 transition-colors flex items-center justify-center gap-2"
          aria-label={`Adicionar ${model} ao carrinho`}
        >
          <ShoppingCart size={16} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
