import { ProductsAPI } from "@/lib/api/products";
import { StoresAPI } from "@/lib/api/stores";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  try {
    // Fetch data from API services
    const [productsResponse, storesResponse] = await Promise.all([
      ProductsAPI.getFeaturedProducts(8),
      StoresAPI.getStores(),
    ]);

    // Handle potential API errors gracefully
    const products = productsResponse.success ? productsResponse.data : [];
    const stores = storesResponse.success ? storesResponse.data : [];

    // Log any API errors for debugging
    if (!productsResponse.success) {
      console.error("Failed to fetch products:", productsResponse.error);
    }
    if (!storesResponse.success) {
      console.error("Failed to fetch stores:", storesResponse.error);
    }

    return <HomeClient products={products} stores={stores} />;
  } catch (error) {
    console.error("Error loading homepage data:", error);

    // Fallback to empty arrays if API fails completely
    return <HomeClient products={[]} stores={[]} />;
  }
}
