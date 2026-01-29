"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ProductsAPI } from "@/lib/api/products";
import { useApiWithParams } from "@/lib/hooks/useApi";
import ImageWithFallback from "./ImageWithFallback";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface SearchResult {
  id: string | number;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  category: string;
}

export default function SearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: searchResults = [],
    loading,
    execute: search,
  } = useApiWithParams(ProductsAPI.searchProducts, { immediate: false });

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens and set initial query
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      if (initialQuery) {
        setQuery(initialQuery);
      }
    }
  }, [isOpen, initialQuery]);

  // Debounced search
  useEffect(() => {
    if (query.trim().length > 2) {
      const timer = setTimeout(() => {
        search(query.trim());
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, search]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      // Add to recent searches
      const updated = [
        searchTerm,
        ...recentSearches.filter((s) => s !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recent-searches", JSON.stringify(updated));

      setQuery(searchTerm);
      search(searchTerm);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent-searches");
  };

  const popularSearches = [
    "Ray-Ban",
    "Oakley",
    "Óculos de Sol",
    "Óculos de Grau",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-slate-200">
            <Search className="text-slate-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar produtos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              className="flex-1 text-lg outline-none placeholder:text-slate-400"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Clock size={16} />
                        Buscas Recentes
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        Limpar
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Buscas Populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1 bg-otica-roxo/10 hover:bg-otica-roxo/20 text-otica-roxo rounded-full text-sm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-otica-roxo"></div>
                  </div>
                ) : searchResults && searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 mb-4">
                      {searchResults?.length} resultado
                      {searchResults?.length !== 1 ? "s" : ""} encontrado
                      {searchResults?.length !== 1 ? "s" : ""}
                    </h3>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.model}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 truncate">
                            {product.model}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {product.brand}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {product.promotionalPrice ? (
                              <>
                                <span className="text-slate-400 line-through text-sm">
                                  R$ {product.price.toFixed(2)}
                                </span>
                                <span className="text-otica-roxo font-bold">
                                  R$ {product.promotionalPrice.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-slate-900 font-bold">
                                R$ {product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500">
                      Nenhum produto encontrado para "{query}"
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                      Tente buscar por marca, modelo ou categoria
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
