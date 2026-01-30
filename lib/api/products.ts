import {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductFilters,
} from "./types";
import { MOCK_PRODUCTS } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate network errors occasionally
const shouldSimulateError = () => Math.random() < 0.05; // 5% chance of error

export class ProductsAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  /**
   * Get all products with optional filtering and pagination
   */
  static async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Product>> {
    await delay(300 + Math.random() * 700); // 300-1000ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro de conexão com o servidor. Tente novamente.");
    }

    let filteredProducts = [...MOCK_PRODUCTS];

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === filters.category
      );
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter((p) =>
        p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => (p.promotionalPrice || p.price) >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => (p.promotionalPrice || p.price) <= filters.maxPrice!
      );
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.inStock === filters.inStock
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.model.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      success: true,
    };
  }

  /**
   * Get a single product by ID
   */
  static async getProduct(id: string | number): Promise<ApiResponse<Product>> {
    await delay(200 + Math.random() * 500); // 200-700ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar produto. Tente novamente.");
    }

    const product = MOCK_PRODUCTS.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!product) {
      return {
        data: {} as Product,
        success: false,
        error: "Produto não encontrado",
      };
    }

    return {
      data: product,
      success: true,
    };
  }

  /**
   * Get featured/highlighted products
   */
  static async getFeaturedProducts(
    limit: number = 8
  ): Promise<ApiResponse<Product[]>> {
    await delay(250 + Math.random() * 500); // 250-750ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar produtos em destaque.");
    }

    // Get products with promotional prices or highest rated
    const featuredProducts = MOCK_PRODUCTS.filter((p) => p.inStock)
      .sort((a, b) => {
        // Prioritize products with promotional prices
        if (a.promotionalPrice && !b.promotionalPrice) return -1;
        if (!a.promotionalPrice && b.promotionalPrice) return 1;
        // Then by price (ascending)
        return (
          (a.promotionalPrice || a.price) - (b.promotionalPrice || b.price)
        );
      })
      .slice(0, limit);

    return {
      data: featuredProducts,
      success: true,
    };
  }

  /**
   * Get related products based on category or brand
   */
  static async getRelatedProducts(
    productId: string | number,
    limit: number = 4
  ): Promise<ApiResponse<Product[]>> {
    await delay(200 + Math.random() * 400); // 200-600ms delay

    const currentProduct = MOCK_PRODUCTS.find(
      (p) => p.id.toString() === productId.toString()
    );

    if (!currentProduct) {
      return {
        data: [],
        success: false,
        error: "Produto não encontrado",
      };
    }

    const relatedProducts = MOCK_PRODUCTS.filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.inStock &&
        (p.brand === currentProduct.brand ||
          p.category === currentProduct.category)
    )
      .sort((a, b) => {
        // Prioritize same brand
        if (
          a.brand === currentProduct.brand &&
          b.brand !== currentProduct.brand
        )
          return -1;
        if (
          a.brand !== currentProduct.brand &&
          b.brand === currentProduct.brand
        )
          return 1;
        // Then by similar price
        const currentPrice =
          currentProduct.promotionalPrice || currentProduct.price;
        const aPriceDiff = Math.abs(
          (a.promotionalPrice || a.price) - currentPrice
        );
        const bPriceDiff = Math.abs(
          (b.promotionalPrice || b.price) - currentPrice
        );
        return aPriceDiff - bPriceDiff;
      })
      .slice(0, limit);

    return {
      data: relatedProducts,
      success: true,
    };
  }

  /**
   * Search products
   */
  static async searchProducts(
    query: string,
    limit: number = 10
  ): Promise<ApiResponse<Product[]>> {
    await delay(300 + Math.random() * 500); // 300-800ms delay

    if (!query.trim()) {
      return {
        data: [],
        success: true,
      };
    }

    const searchTerm = query.toLowerCase().trim();
    const searchResults = MOCK_PRODUCTS.filter(
      (p) =>
        p.model.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    )
      .sort((a, b) => {
        // Prioritize exact matches in model name
        const aModelMatch = a.model.toLowerCase().includes(searchTerm);
        const bModelMatch = b.model.toLowerCase().includes(searchTerm);
        if (aModelMatch && !bModelMatch) return -1;
        if (!aModelMatch && bModelMatch) return 1;

        // Then by brand match
        const aBrandMatch = a.brand.toLowerCase().includes(searchTerm);
        const bBrandMatch = b.brand.toLowerCase().includes(searchTerm);
        if (aBrandMatch && !bBrandMatch) return -1;
        if (!aBrandMatch && bBrandMatch) return 1;

        return 0;
      })
      .slice(0, limit);

    return {
      data: searchResults,
      success: true,
    };
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(
    categorySlug: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ category: categorySlug }, page, limit);
  }

  /**
   * Get products by brand
   */
  static async getProductsByBrand(
    brand: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ brand }, page, limit);
  }
}
