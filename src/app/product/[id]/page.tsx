import Stripe from "stripe";
import ProductImage from "../../components/Productimage";
import { formatPrice } from "@/lib/utils";
import AddCart from "../../components/AddCart";
import FreteCalculator from "../../components/FreteCalculator";

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  const produto = await stripe.products.retrieve(id);

  const price = await stripe.prices.list({
    product: produto.id,
  });

  return {
    id: produto.id,
    price: price.data[0]?.unit_amount ?? 0,
    name: produto.name,
    image: produto.images[0],            // <-- AQUI É ARRAY
    description: produto.description,
    currency: price.data[0]?.currency ?? "BRL",
    quantity: 1,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const installment = product.price / 5;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">

      {/* --- FOTO DO PRODUTO --- */}
      <div className="flex flex-col items-center">
        <div className="bg-gray-300 p-6 rounded-2xl shadow-xl w-full max-w-[480px]">
          <ProductImage product={product} /> 
        </div>
        <p className="text-gray-400 text-xs mt-3">
          Imagem meramente ilustrativa
        </p>
      </div>

      {/* --- INFORMAÇÕES DO PRODUTO --- */}
      <div className="flex flex-col gap-6">

        <h1 className="text-2xl font-extrabold leading-tight text-black">
          {product.name}
        </h1>

        <div>
          <p className="text-4xl font-bold text-blue-400">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            5x de <strong>{formatPrice(installment)}</strong> sem juros
          </p>
        </div>

        <div className="bg-gray-300 rounded-xl p-4 text-sm text-black">
          <p>📦 Envio imediato</p>
          <p>🛡 Garantia de 3 meses</p>
          <p>🔄 Devolução garantida em 7 dias</p>
          <p>💳 Parcele em até 5x sem juros</p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-1">Descrição</h3>
          <p className="text-black text-sm leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        <FreteCalculator />

        <AddCart product={product} />
      </div>
    </div>
  );
}