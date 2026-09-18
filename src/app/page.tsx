import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import type { Product, ProductsResponse } from "@/types/Product";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock"
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const data: ProductsResponse = await response.json();

  return data.products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900">
          ShopHub
        </h1>

        <p className="mt-2 text-gray-600">
          Catálogo de productos
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-xl bg-white p-4 shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-contain"
              />

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                {product.title}
              </h2>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                ${product.price}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Stock: {product.stock}
              </p>
              <AddToCartButton product={product} />
              <Link
                href={`/products/${product.id}`}
                className="mt-4 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}