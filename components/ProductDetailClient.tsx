"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number | string;
  image: string;
  hoverImage: string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const finalPrice = product.promotionalPrice || product.price;
  const hasDiscount = !!product.promotionalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - finalPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      model: product.model,
      brand: product.brand,
      price: product.price,
      promotionalPrice: product.promotionalPrice,
      image: product.image,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.model} - ${product.brand}`,
          text: `Confira este produto da Ótica Popular`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-otica-roxo transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
              <Image
                src={currentImage}
                alt={product.model}
                fill
                className="object-contain p-8"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentImage(product.image)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImage === product.image
                    ? "border-otica-roxo"
                    : "border-slate-200"
                }`}
              >
                <Image
                  src={product.image}
                  alt={`${product.model} - vista 1`}
                  fill
                  className="object-contain p-2"
                />
              </button>
              <button
                onClick={() => setCurrentImage(product.hoverImage)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImage === product.hoverImage
                    ? "border-otica-roxo"
                    : "border-slate-200"
                }`}
              >
                <Image
                  src={product.hoverImage}
                  alt={`${product.model} - vista 2`}
                  fill
                  className="object-contain p-2"
                />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-otica-roxo/60 mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-black text-slate-900 mb-4">
                {product.model}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < 4
                          ? "text-yellow-400 fill-current"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  (4.0) • 127 avaliações
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {hasDiscount ? (
                <>
                  <p className="text-slate-400 line-through text-lg">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-3xl font-black text-otica-roxo">
                    R$ {finalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    Você economiza R$ {(product.price - finalPrice).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-black text-slate-900">
                  R$ {finalPrice.toFixed(2)}
                </p>
              )}
              <p className="text-sm text-slate-600">
                ou 12x de R$ {(finalPrice / 12).toFixed(2)} sem juros
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-otica-roxo text-white font-bold py-4 px-6 rounded-xl hover:bg-otica-roxo/90 transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 border-2 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-slate-300 text-slate-700 hover:border-slate-400"
                  }`}
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                  {isWishlisted ? "Favoritado" : "Favoritar"}
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 border-2 border-slate-300 text-slate-700 font-medium py-3 px-4 rounded-xl hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Detalhes do Produto</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Marca:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Modelo:</span>
                  <span className="font-medium">{product.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Garantia:</span>
                  <span className="font-medium">12 meses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Origem:</span>
                  <span className="font-medium">Nacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  image={relatedProduct.image}
                  hoverImage={relatedProduct.hoverImage}
                  model={relatedProduct.model}
                  brand={relatedProduct.brand}
                  price={relatedProduct.price}
                  promotionalPrice={relatedProduct.promotionalPrice}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
