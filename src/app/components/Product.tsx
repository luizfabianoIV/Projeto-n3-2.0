import { ProductType } from "../types/ProductType";
import ProductImage from "./Productimage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const price = product.price ?? 0;
  const installment = price / 12;
  const cashPrice = price * 0.90; 

  return (
    <div
      className="flex flex-col bg-white border border-gray-300 shadow-md hover:shadow-xl rounded-2xl p-4 text-gray-900  w-full max-w-[260px] transition-all">

      {/* IMAGEM */}
      <Link
        href={`/product/${product.id}`}
        className="
          relative w-full h-48
          rounded-xl overflow-hidden
          bg-gray-100
        "
      >
        <ProductImage product={product} fill />
      </Link>

      {/* NOME */}
      <h2 className="mt-3 font-semibold text-sm line-clamp-2 min-h-[40px]">
        {product.name}
      </h2>

      {/* PREÇO */}
      <p className="text-xl font-extrabold text-blue-600 mt-2">
        {formatPrice(price)}
      </p>

      {/* PARCELAMENTO */}
      <p className="text-xs text-gray-500 mt-1">
        em até <span className="font-semibold">12x de {formatPrice(installment)}</span> sem juros
      </p>

      {/* À VISTA */}
      <p className="text-sm text-green-600 font-semibold mt-1">
        à vista {formatPrice(cashPrice)}
      </p>

      {/* BOTÃO */}
      <div className="mt-4">
        <AddCart product={product} />
      </div>

    </div>
  );
}