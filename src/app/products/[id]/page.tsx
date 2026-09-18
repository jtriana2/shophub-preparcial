import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import type { Product } from "@/types/Product";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error("No se pudo cargar el producto");
  }

  return response.json();
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-80 w-full object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-2 text-gray-500">
              {product.brand ?? product.category}
            </p>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              ${product.price}
            </p>

            <p className="mt-2 text-gray-600">
              Stock: {product.stock}
            </p>
            
            <AddToCartButton product={product} />

            <p className="mt-6 leading-7 text-gray-700">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}