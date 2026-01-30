import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductsAPI } from "@/lib/api/products";
import ProductDetailClient from "@/components/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for known products
export async function generateStaticParams() {
  try {
    const response = await ProductsAPI.getProducts({}, 1, 100); // Get all products
    if (response.success) {
      return response.data.map((product) => ({
        id: product.id.toString(),
      }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  // Fallback to empty array if API fails
  return [];
}

// Generate metadata for each product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await ProductsAPI.getProduct(id);

    if (!response.success || !response.data) {
      return {
        title: "Produto não encontrado",
      };
    }

    const product = response.data;

    return {
      title: `${product.model} - ${product.brand}`,
      description:
        product.description ||
        `${product.model} da marca ${product.brand}. Preço: R$ ${
          product.promotionalPrice || product.price
        }`,
      openGraph: {
        title: `${product.model} - ${product.brand} | Ótica Popular`,
        description:
          product.description ||
          `${product.model} da marca ${product.brand}. Preço: R$ ${
            product.promotionalPrice || product.price
          }`,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.model,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Produto não encontrado",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;
  let relatedProducts = [];

  try {
    const [productResponse, relatedResponse] = await Promise.all([
      ProductsAPI.getProduct(id),
      ProductsAPI.getRelatedProducts(id, 4),
    ]);

    if (!productResponse.success || !productResponse.data) {
      notFound();
    }

    product = productResponse.data;
    relatedProducts = relatedResponse.success ? relatedResponse.data : [];
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
