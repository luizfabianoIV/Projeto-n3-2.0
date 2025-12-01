"use server";

import { stripe } from "@/lib/stripe";

export async function fetchProducts({ lastProductId, query }: { lastProductId?: string, query?: string }) {

  const params: any = { limit: query ? 100 : 12 };

  if (lastProductId) params.starting_after = lastProductId;

  const { data: products, has_more } = await stripe.products.list(params);

  let filtered = [...products];

  if (query) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const formatedProducts = await Promise.all(
    filtered.map(async (product) => {
      const price = await stripe.prices.list({ product: product.id });

      return {
        id: product.id,
        price: price.data[0]?.unit_amount ?? 0,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0]?.currency,
      };
    })
  );

  return { formatedProducts, has_more };
}
