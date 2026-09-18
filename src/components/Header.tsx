"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        <Link
          href="/checkout"
          className="rounded-lg bg-gray-800 px-4 py-2"
        >
          Checkout - Carrito: {totalItems}
        </Link>
      </div>
    </header>
  );
}