"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { CategoriesAPI } from "@/lib/api/categories";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useApi } from "@/lib/hooks/useApi";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = useCartStore((state) => state.totalItems);
  const { isAuthenticated } = useAuthStore();

  // Fetch categories using the API
  const { data: categories = [] } = useApi(() => CategoriesAPI.getCategories());

  const compactPages =
    pathname.includes("/cart") || pathname.includes("/product");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  // Header becomes small if scrolled OR if on purchase pages
  const isCompact = isScrolled || compactPages;

  return (
    <header
      className={`bg-otica-roxo border-b border-white/10 sticky top-0 z-[100] shadow-sm transition-all duration-500 ${
        isCompact ? "py-2" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 md:gap-12">
        {/* Icons */}
        <div className="flex items-center gap-4 order-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link
            href={isAuthenticated ? "/profile" : "/login"}
            className="text-white hover:text-otica-amarelo transition-colors"
          >
            <User size={isCompact ? 24 : 30} />
          </Link>
          <Link
            href="/cart"
            className="relative text-white hover:text-otica-amarelo transition-colors"
          >
            <ShoppingCart size={isCompact ? 24 : 30} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-otica-roxo text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Search and Central Nav */}
        <div
          className={`flex-1 max-w-3xl flex flex-col transition-all duration-500 order-2 ${
            isCompact ? "gap-0" : "gap-5"
          }`}
        >
          {/* Hide search if compact */}
          <form
            onSubmit={handleSearchSubmit}
            className={`relative overflow-hidden transition-all duration-500 ${
              isCompact
                ? "h-0 opacity-0 pointer-events-none"
                : "h-[46px] opacity-100 mb-2"
            }`}
          >
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 py-3 px-12 rounded-2xl text-white outline-none placeholder-white/50"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              size={18}
            />
          </form>

          <nav className="hidden md:block">
            <ul className="flex justify-center gap-10">
              {categories?.map((category) => (
                <li key={category.id} className="whitespace-nowrap">
                  <Link
                    href={`/category/${category.slug}`}
                    className={`font-black uppercase tracking-widest transition-all ${
                      isCompact
                        ? "text-[10px] text-white"
                        : "text-[11px] text-white/60 hover:text-otica-amarelo"
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logo Right */}
        <Link href="/" className="flex-shrink-0 order-1">
          <Image
            src="/logo_otica.png"
            alt="Logo Ótica Popular"
            width={isCompact ? 110 : 140}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
      />
    </header>
  );
}
