import { ApiResponse, Store } from "./types";
import { MOCK_STORES } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate network errors occasionally
const shouldSimulateError = () => Math.random() < 0.03; // 3% chance of error

export class StoresAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  /**
   * Get all active stores
   */
  static async getStores(): Promise<ApiResponse<Store[]>> {
    await delay(200 + Math.random() * 400); // 200-600ms delay

    if (shouldSimulateError()) {
      throw new Error(
        "Erro ao carregar informações das lojas. Tente novamente."
      );
    }

    const activeStores = MOCK_STORES.filter((store) => store.isActive);

    return {
      data: activeStores,
      success: true,
    };
  }

  /**
   * Get a single store by ID
   */
  static async getStore(id: string | number): Promise<ApiResponse<Store>> {
    await delay(150 + Math.random() * 300); // 150-450ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao carregar informações da loja.");
    }

    const store = MOCK_STORES.find((s) => s.id.toString() === id.toString());

    if (!store) {
      return {
        data: {} as Store,
        success: false,
        error: "Loja não encontrada",
      };
    }

    if (!store.isActive) {
      return {
        data: {} as Store,
        success: false,
        error: "Loja temporariamente indisponível",
      };
    }

    return {
      data: store,
      success: true,
    };
  }

  /**
   * Get stores by city
   */
  static async getStoresByCity(city: string): Promise<ApiResponse<Store[]>> {
    await delay(200 + Math.random() * 400); // 200-600ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao buscar lojas na cidade especificada.");
    }

    const cityStores = MOCK_STORES.filter(
      (store) =>
        store.isActive && store.city.toLowerCase() === city.toLowerCase()
    );

    return {
      data: cityStores,
      success: true,
    };
  }

  /**
   * Get stores by neighborhood
   */
  static async getStoresByNeighborhood(
    neighborhood: string
  ): Promise<ApiResponse<Store[]>> {
    await delay(200 + Math.random() * 400); // 200-600ms delay

    const neighborhoodStores = MOCK_STORES.filter(
      (store) =>
        store.isActive &&
        store.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );

    return {
      data: neighborhoodStores,
      success: true,
    };
  }

  /**
   * Find nearest stores based on coordinates
   */
  static async getNearestStores(
    lat: number,
    lng: number,
    radiusKm: number = 50
  ): Promise<ApiResponse<Store[]>> {
    await delay(300 + Math.random() * 500); // 300-800ms delay

    if (shouldSimulateError()) {
      throw new Error("Erro ao buscar lojas próximas.");
    }

    // Simple distance calculation (Haversine formula approximation)
    const calculateDistance = (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ): number => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLng = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const nearbyStores = MOCK_STORES.filter(
      (store) => store.isActive && store.coordinates
    )
      .map((store) => ({
        ...store,
        distance: calculateDistance(
          lat,
          lng,
          store.coordinates!.lat,
          store.coordinates!.lng
        ),
      }))
      .filter((store) => store.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    return {
      data: nearbyStores,
      success: true,
    };
  }

  /**
   * Get store operating hours
   */
  static async getStoreHours(
    id: string | number
  ): Promise<ApiResponse<{ storeId: string; hours: string; isOpen: boolean }>> {
    await delay(100 + Math.random() * 200); // 100-300ms delay

    const store = MOCK_STORES.find((s) => s.id.toString() === id.toString());

    if (!store) {
      return {
        data: {} as any,
        success: false,
        error: "Loja não encontrada",
      };
    }

    // Simple logic to determine if store is currently open
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

    let isOpen = false;
    if (currentDay >= 1 && currentDay <= 5) {
      // Monday to Friday
      isOpen = currentHour >= 8 && currentHour < 18;
    } else if (currentDay === 6) {
      // Saturday
      isOpen = currentHour >= 8 && currentHour < 14;
    }

    return {
      data: {
        storeId: store.id.toString(),
        hours: store.openingHours || "Horário não informado",
        isOpen,
      },
      success: true,
    };
  }
}
