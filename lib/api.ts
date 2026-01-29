// Configuration for future APIs
// This file centralizes API configurations and can be easily adapted
// when real APIs are implemented

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// HTTP client configuration
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// API endpoints (for when they are implemented)
export const API_ENDPOINTS = {
  // Products
  products: "/products",
  product: (id: string | number) => `/products/${id}`,
  productsByCategory: (category: string) => `/products/category/${category}`,

  // Cart
  cart: "/cart",
  addToCart: "/cart/add",
  removeFromCart: (id: string | number) => `/cart/remove/${id}`,

  // User
  user: "/user",
  login: "/auth/login",
  register: "/auth/register",

  // Stores
  stores: "/stores",

  // Orders
  orders: "/orders",
  createOrder: "/orders/create",
} as const;

// Types for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Custom hooks for when APIs are implemented
export const useApi = () => {
  return {
    // Products
    getProducts: () => apiClient.get(API_ENDPOINTS.products),
    getProduct: (id: string | number) =>
      apiClient.get(API_ENDPOINTS.product(id)),

    // Cart
    addToCart: (productId: string | number, quantity: number) =>
      apiClient.post(API_ENDPOINTS.addToCart, { productId, quantity }),

    // User
    login: (email: string, password: string) =>
      apiClient.post(API_ENDPOINTS.login, { email, password }),

    // Orders
    createOrder: (orderData: Record<string, unknown>) =>
      apiClient.post(API_ENDPOINTS.createOrder, orderData),
  };
};
