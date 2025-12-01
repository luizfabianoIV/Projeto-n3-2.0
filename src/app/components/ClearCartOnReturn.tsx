"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store";

export default function ClearCartOnReturn() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  // apenas força rerender (caso queira usar algo do store)
  useCartStore((s) => s.cart);

  // acesso direto ao set do zustand
  const set = useCartStore.setState;

  useEffect(() => {
    if (!sessionId) return;

    // 🔥 limpa carrinho
    set({ cart: [] });

    // 🔥 fecha o carrinho
    set({ isOpen: false });

    // 🔥 limpa persistência local
    localStorage.removeItem("cart-storage");

    // 🔥 remove o session_id da URL (evita tela branca no voltar)
    window.history.replaceState(null, "", "/");

  }, [sessionId]);

  return null;
}