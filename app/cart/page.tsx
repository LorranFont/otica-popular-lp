"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useToastContext } from "@/components/ToastProvider";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();
  const { success, warning } = useToastContext();
  const [isClearing, setIsClearing] = useState(false);

  const handleUpdateQuantity = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      warning("Produto removido", "Item foi removido do carrinho");
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string | number, model: string) => {
    removeItem(id);
    warning("Produto removido", `${model} foi removido do carrinho`);
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      success("Carrinho limpo", "Todos os itens foram removidos");
      setIsClearing(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-slate-600 mb-8">
              Que tal adicionar alguns produtos incríveis?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-otica-roxo text-white font-bold py-3 px-6 rounded-lg hover:bg-otica-roxo/90 transition-colors"
            >
              <ArrowLeft size={20} />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-6 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Meu Carrinho</h1>
            <p className="text-slate-600">
              {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-otica-roxo hover:text-otica-roxo/80 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Continuar Comprando
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const finalPrice = item.promotionalPrice || item.price;
              const hasDiscount = !!item.promotionalPrice;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.model}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 truncate">
                            {item.model}
                          </h3>
                          <p className="text-sm text-slate-500">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.model)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        {hasDiscount ? (
                          <>
                            <span className="text-slate-400 line-through text-sm">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-otica-roxo font-bold">
                              {formatPrice(finalPrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-900 font-bold">
                            {formatPrice(finalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            {formatPrice(finalPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="w-full py-3 text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
            >
              {isClearing ? "Limpando..." : "Limpar Carrinho"}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-otica-roxo">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              {isAuthenticated ? (
                <button className="w-full bg-otica-roxo text-white font-bold py-4 rounded-lg hover:bg-otica-roxo/90 transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={20} />
                  Finalizar Compra
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login?redirect=/cart"
                    className="w-full bg-otica-roxo text-white font-bold py-4 rounded-lg hover:bg-otica-roxo/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Fazer Login para Continuar
                  </Link>
                  <p className="text-xs text-slate-500 text-center">
                    Ou{" "}
                    <Link
                      href="/register"
                      className="text-otica-roxo hover:underline"
                    >
                      crie uma conta
                    </Link>{" "}
                    para finalizar sua compra
                  </p>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Compra 100% segura e protegida
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
