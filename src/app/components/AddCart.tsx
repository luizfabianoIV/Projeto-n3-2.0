"use client";

import { useCartStore } from "@/store";
import { ProductType } from "@/app/types/ProductType";

export default function AddCart({ product }: { product: ProductType }) {
  const addProduct = useCartStore((s) => s.addProduct);

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addProduct({ ...product, quantity: product.quantity ?? 1 });
  };

  return (
    <button
      onClick={handleAdd}
      className="
        mt-1 px-4 py-2 w-full
        bg-gradient-to-r from-blue-600 to-blue-500
        text-white font-semibold
        rounded-full shadow-md
        hover:from-blue-500 hover:to-blue-400 hover:shadow-lg
        active:scale-95
        transition-all
      "
    >
      Adicionar ao Carrinho
    </button>
  );
}