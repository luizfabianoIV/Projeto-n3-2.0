"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  async function pagar(method: string) {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethod: method,
        items: [
          // você vai substituir pelos produtos do carrinho
          { name: "Produto Exemplo", price: 99.9, quantity: 1 },
        ],
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 bg-[#1a1c22] text-white p-8 rounded-2xl shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-orange-400">
        Pagamento Seguro
      </h1>

      <p className="text-gray-300 mb-4">
        Escolha a forma de pagamento:
      </p>

      <div className="grid gap-4">

        {/* Pagamento com Cartão */}
        <button
          onClick={() => pagar("card")}
          disabled={loading}
          className="bg-gray-800 border border-gray-600 hover:border-orange-400 hover:text-orange-400 transition px-4 py-3 rounded-xl text-left"
        >
          💳 Cartão de Crédito / Débito
        </button>

        {/* Pagamento com Pix */}
        <button
          onClick={() => pagar("pix")}
          disabled={loading}
          className="bg-gray-800 border border-gray-600 hover:border-orange-400 hover:text-orange-400 transition px-4 py-3 rounded-xl text-left"
        >
          ⚡ Pagar com Pix
        </button>
      </div>

      {loading && (
        <p className="text-orange-400 mt-4 animate-pulse">
          Redirecionando para pagamento...
        </p>
      )}
    </div>
  );
}