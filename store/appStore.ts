import { create } from "zustand";
import { Product, Store } from "@/lib/api/types";
import { ProductsAPI } from "@/lib/api/products";
import { StoresAPI } from "@/lib/api/stores";

interface AppState {
  // Data
  products: Product[];
  stores: Store[];
  selectedProduct: Product | null;

  // Loading states
  loadingProducts: boolean;
  loadingStores: boolean;
  loadingProduct: boolean;

  // Error states
  productsError: string | null;
  storesError: string | null;
  productError: string | null;

  // Actions
  loadProducts: () => Promise<void>;
  loadStores: () => Promise<void>;
  loadProductById: (id: string | number) => Promise<void>;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (categorySlug: string) => Promise<Product[]>;

  // Utility functions
  filterProducts: (term: string) => Product[];
  clearErrors: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  products: [],
  stores: [],
  selectedProduct: null,
  loadingProducts: false,
  loadingStores: false,
  loadingProduct: false,
  productsError: null,
  storesError: null,
  productError: null,

  // Actions
  loadProducts: async () => {
    set({ loadingProducts: true, productsError: null });
    try {
      const response = await ProductsAPI.getFeaturedProducts(20);
      if (response.success) {
        set({ products: response.data, loadingProducts: false });
      } else {
        set({
          productsError: response.error || "Erro ao carregar produtos",
          loadingProducts: false,
        });
      }
    } catch (error) {
      console.error("Error loading products:", error);
      set({
        productsError:
          error instanceof Error ? error.message : "Erro de conexão",
        loadingProducts: false,
      });
    }
  },

  loadStores: async () => {
    set({ loadingStores: true, storesError: null });
    try {
      const response = await StoresAPI.getStores();
      if (response.success) {
        set({ stores: response.data, loadingStores: false });
      } else {
        set({
          storesError: response.error || "Erro ao carregar lojas",
          loadingStores: false,
        });
      }
    } catch (error) {
      console.error("Error loading stores:", error);
      set({
        storesError: error instanceof Error ? error.message : "Erro de conexão",
        loadingStores: false,
      });
    }
  },

  loadProductById: async (id) => {
    set({ loadingProduct: true, productError: null });
    try {
      const response = await ProductsAPI.getProduct(id);
      if (response.success) {
        set({ selectedProduct: response.data, loadingProduct: false });
      } else {
        set({
          productError: response.error || "Produto não encontrado",
          loadingProduct: false,
        });
      }
    } catch (error) {
      console.error("Error loading product:", error);
      set({
        productError:
          error instanceof Error ? error.message : "Erro de conexão",
        loadingProduct: false,
      });
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await ProductsAPI.searchProducts(query, 20);
      if (response.success) {
        return response.data;
      } else {
        console.error("Error searching products:", response.error);
        return [];
      }
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },

  getProductsByCategory: async (categorySlug) => {
    try {
      const response = await ProductsAPI.getProductsByCategory(
        categorySlug,
        1,
        20
      );
      if (response.success) {
        return response.data;
      } else {
        console.error(
          "Error getting products by category: API returned unsuccessful response"
        );
        return [];
      }
    } catch (error) {
      console.error("Error getting products by category:", error);
      return [];
    }
  },

  // Utility functions
  filterProducts: (term) => {
    const { products } = get();
    const termLower = term.toLowerCase();

    return products.filter(
      (product) =>
        product.model.toLowerCase().includes(termLower) ||
        product.brand.toLowerCase().includes(termLower) ||
        product.description?.toLowerCase().includes(termLower)
    );
  },

  clearErrors: () => {
    set({
      productsError: null,
      storesError: null,
      productError: null,
    });
  },
}));
