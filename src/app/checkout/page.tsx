"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface CheckoutForm {
  name: string;
  email: string;
  payment: string;
  terms: boolean;
}

export default function CheckoutPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    payment: "",
    terms: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function handleTermsChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      terms: event.target.checked,
    }));
  }

  const validName = form.name.trim().length >= 5;

  const validEmail =
    form.email.trim().length > 0 &&
    form.email.includes("@");

  const isValid =
    validName &&
    validEmail &&
    form.payment !== "" &&
    form.terms &&
    cart.length > 0;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setLoading(true);
    setCompleted(false);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    clearCart();

    setForm({
      name: "",
      email: "",
      payment: "",
      terms: false,
    });

    setTouched({
      name: false,
      email: false,
    });

    setLoading(false);
    setCompleted(true);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Volver al catálogo
          </Link>
        </div>

        {completed && (
          <p className="mb-6 rounded-lg bg-green-100 p-4 text-green-800">
            Pedido completado correctamente.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">

          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">
              Resumen de compra
            </h2>

            {cart.length === 0 ? (
              <p className="mt-6 text-gray-500">
                El carrito está vacío.
              </p>
            ) : (
              <>
                <div className="mt-6 space-y-4">

                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex gap-4">

                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-20 w-20 object-contain"
                        />

                        <div>
                          <p className="font-semibold">
                            {item.product.title}
                          </p>

                          <p>
                            Precio: ${item.product.price}
                          </p>

                          <p>
                            Subtotal: $
                            {(
                              item.product.price *
                              item.quantity
                            ).toFixed(2)}
                          </p>

                          <div className="mt-2 flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.product.id
                                )
                              }
                              className="rounded bg-gray-200 px-3 py-1"
                            >
                              -
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.product.id
                                )
                              }
                              className="rounded bg-gray-200 px-3 py-1"
                            >
                              +
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(
                                  item.product.id
                                )
                              }
                              className="text-red-600"
                            >
                              Eliminar
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="mt-6 border-t pt-4">
                  <p>
                    Productos: {totalItems}
                  </p>

                  <p className="text-xl font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-3 text-red-600"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="rounded-xl bg-white p-6 shadow">

            <h2 className="text-2xl font-bold">
              Datos del comprador
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              <div>
                <label
                  htmlFor="name"
                  className="block font-medium"
                >
                  Nombre completo
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full rounded border p-2"
                />

                {touched.name && !validName && (
                  <p className="text-sm text-red-600">
                    El nombre debe tener mínimo 5 caracteres.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-medium"
                >
                  Correo
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-full rounded border p-2"
                />

                {touched.email && !validEmail && (
                  <p className="text-sm text-red-600">
                    Correo inválido.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="payment"
                  className="block font-medium"
                >
                  Método de pago
                </label>

                <select
                  id="payment"
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border p-2"
                >
                  <option value="">
                    Seleccione
                  </option>

                  <option value="credit">
                    Tarjeta de crédito
                  </option>

                  <option value="debit">
                    Tarjeta débito
                  </option>

                  <option value="cash">
                    Efectivo
                  </option>
                </select>
              </div>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleTermsChange}
                />

                Acepto términos y condiciones
              </label>

              <button
                type="submit"
                disabled={!isValid}
                className="w-full rounded bg-blue-600 px-4 py-3 font-semibold text-white disabled:bg-gray-400"
              >
                {loading
                  ? "Procesando..."
                  : "Confirmar pedido"}
              </button>

            </form>

          </section>

        </div>
      </div>
    </main>
  );
}