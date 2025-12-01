"use client";

import { useState } from "react";

export default function FreteCalculator() {
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function calcularFrete() {
    setError("");
    setFrete(null);

    if (cep.length !== 8) {
      setError("CEP inválido");
      return;
    }

    try {
      const response = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setFrete(data.frete);
    } catch {
      setError("Erro ao calcular frete");
    }
  }

  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex gap-2">
        <input
          className="border p-2 rounded-lg flex-1"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
        />
        <button
          onClick={calcularFrete}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          OK
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {frete !== null && (
        <p className="text-green-700 mt-2">
          Frete: <strong>R$ {frete.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
}