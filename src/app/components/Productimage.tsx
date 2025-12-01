"use client";
import { useState } from "react";
import Image from "next/image";
import { ProductType } from "../types/ProductType";

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
};

export default function ProductImage({ product, fill }: ProductImageProps) {
  const [loading, setLoading] = useState(true);

  // Garantir que sempre tenha pelo menos 1 imagem
  const imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;

  return fill ? (
    <Image
      src={imageUrl}
      fill
      alt={product.name}
      className={`object-cover transition-all duration-700 ${
        loading ? "scale-110 blur-3xl grayscale" : "scale-100 blur-0 grayscale-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  ) : (
    <Image
      src={imageUrl}
      width={400}
      height={700}
      alt={product.name}
      className={`object-cover transition-all duration-700 ${
        loading ? "scale-110 blur-3xl grayscale" : "scale-100 blur-0 grayscale-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}