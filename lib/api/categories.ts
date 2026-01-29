import { ApiResponse, Category } from "./types";
import { MOCK_CATEGORIES } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate network errors occasionally
const shouldSimulateError = () => Math.random() < 0.02; // 2% chance of error

export class CategoriesAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  /**
   * Get all active categories
   */
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    await delay(150 + Math.random() * 300); // 150-450ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar categorias. Tente novamente.");
    }

    const activeCategories = MOCK_CATEGORIES.filter(
      (category) => category.isActive
    ).sort((a, b) => b.productCount - a.productCount); // Sort by product count

    return {
      data: activeCategories,
      success: true,
    };
  }

  /**
   * Get a single category by ID
   */
  static async getCategory(
    id: string | number
  ): Promise<ApiResponse<Category>> {
    await delay(100 + Math.random() * 200); // 100-300ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar categoria.");
    }

    const category = MOCK_CATEGORIES.find(
      (c) => c.id.toString() === id.toString()
    );

    if (!category) {
      return {
        data: {} as Category,
        success: false,
        error: "Categoria não encontrada",
      };
    }

    if (!category.isActive) {
      return {
        data: {} as Category,
        success: false,
        error: "Categoria não disponível",
      };
    }

    return {
      data: category,
      success: true,
    };
  }

  /**
   * Get a category by slug
   */
  static async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    await delay(100 + Math.random() * 200); // 100-300ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar categoria.");
    }

    const category = MOCK_CATEGORIES.find((c) => c.slug === slug && c.isActive);

    if (!category) {
      return {
        data: {} as Category,
        success: false,
        error: "Categoria não encontrada",
      };
    }

    return {
      data: category,
      success: true,
    };
  }

  /**
   * Get categories with products
   */
  static async getCategoriesWithProducts(): Promise<ApiResponse<Category[]>> {
    await delay(150 + Math.random() * 300); // 150-450ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar categorias com produtos.");
    }

    const categoriesWithProducts = MOCK_CATEGORIES.filter(
      (category) => category.isActive && category.productCount > 0
    ).sort((a, b) => b.productCount - a.productCount);

    return {
      data: categoriesWithProducts,
      success: true,
    };
  }

  /**
   * Get popular categories (most products)
   */
  static async getPopularCategories(
    limit: number = 6
  ): Promise<ApiResponse<Category[]>> {
    await delay(120 + Math.random() * 250); // 120-370ms delay

    const popularCategories = MOCK_CATEGORIES.filter(
      (category) => category.isActive && category.productCount > 0
    )
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, limit);

    return {
      data: popularCategories,
      success: true,
    };
  }

  /**
   * Search categories
   */
  static async searchCategories(
    query: string
  ): Promise<ApiResponse<Category[]>> {
    await delay(200 + Math.random() * 300); // 200-500ms delay

    if (!query.trim()) {
      return {
        data: [],
        success: true,
      };
    }

    const searchTerm = query.toLowerCase().trim();
    const searchResults = MOCK_CATEGORIES.filter(
      (category) =>
        category.isActive &&
        (category.name.toLowerCase().includes(searchTerm) ||
          category.description?.toLowerCase().includes(searchTerm) ||
          category.slug.toLowerCase().includes(searchTerm))
    ).sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.name.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name.toLowerCase().includes(searchTerm);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      // Then by product count
      return b.productCount - a.productCount;
    });

    return {
      data: searchResults,
      success: true,
    };
  }
}
