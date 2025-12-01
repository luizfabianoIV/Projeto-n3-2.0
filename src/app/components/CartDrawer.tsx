"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    toggleCart,
    increaseQty,
    decreaseQty,
    removeById,
  } = useCartStore();
  const { user } = useUser();

  const [showLogin, setShowLogin] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🔥 Função que chama o checkout no Stripe
  const handleCheckout = async () => {
  try {
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        email: userEmail, // ← AGORA ESTÁ SENDO ENVIADO
      }),
    });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redireciona para pagamento Stripe
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] 
      bg-white text-black shadow-xl border-l
      transform transition-all duration-300 p-5 z-50 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        className="text-3xl font-light absolute right-4 top-4 text-black"
        onClick={toggleCart}
      >
        ×
      </button>

      {showLogin ? (
        <div className="mt-10">
          <SignIn />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mt-2 mb-4">Meu Carrinho</h2>
          <p className="font-medium mb-3">Produtos:</p>

          <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-3 items-center border border-gray-300 rounded-lg p-3 shadow-sm bg-white"
              >
                <button
                  className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
                  onClick={() => removeById(item.id)}
                >
                  ×
                </button>

                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.name}
                  className="rounded"
                />

                <div className="flex flex-col flex-1 text-black">
                  <span className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </span>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center overflow-hidden">
                      <button
                        className="px-2 py-1 bg-orange-600 text-white rounded-l hover:bg-orange-400"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>

                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 border-y">
                        {item.quantity}
                      </span>

                      <button
                        className="px-2 py-1 bg-orange-600 text-white rounded-r hover:bg-orange-400"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-base text-black">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-lg font-semibold text-black">
              Subtotal: {formatPrice(total)}
            </p>

            {/* Se NÃO estiver logado → abre modal */}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                  Finalizar compra
                </button>
              </SignInButton>
            </SignedOut>

            {/* Se estiver logado → chama checkout */}
            <SignedIn>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Finalizar compra
              </button>
            </SignedIn>
          </div>
        </>
      )}
    </div>
  );
}