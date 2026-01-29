// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// Product Types
export interface Product {
  id: number | string;
  image: string;
  hoverImage: string;
  model: string;
  brand: string;
  price: number;
  promotionalPrice?: number;
  category: string;
  description?: string;
  specifications?: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

// Store Types
export interface Store {
  id: number | string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  whatsappLink: string;
  openingHours?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  promotionalPrice?: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

// Exam Types
export interface ExamAppointment {
  id: string;
  userId?: string;
  name: string;
  phone: string;
  email?: string;
  storeId: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}

// Contact Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  createdAt: string;
  updatedAt: string;
}
