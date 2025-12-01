import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import Image from "next/image";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function OrdersPage() {
  const { userId, sessionClaims } = await auth(); // ✔ correção

  // Se não estiver logado
  if (!userId) {
    return (
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h1 className="text-2xl font-semibold">Meus pedidos</h1>
        <p className="mt-4 text-gray-600">
          Você precisa estar logado para ver seus pedidos.
        </p>
      </div>
    );
  }

  const email = sessionClaims?.email;

  // busca sessões do stripe
  const sessions = await stripe.checkout.sessions.list({
    limit: 50
  });

  // filtra somente as do email logado + pagas
  const paidSessions = sessions.data.filter(
    (s) => s.payment_status === "paid" && s.customer_details?.email === email
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>

      {paidSessions.length === 0 && (
        <p className="text-gray-600">Você ainda não possui pedidos.</p>
      )}

      <div className="flex flex-col gap-6">
        {paidSessions.map(async (session) => {
          // buscar itens da sessão
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );

          return (
            <div
              key={session.id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">
                Pedido #{session.id.slice(-6)}
              </h2>

              <p className="text-gray-600">
                <strong>Status:</strong> {session.payment_status}
              </p>

              <p className="text-gray-600">
                <strong>Total:</strong>{" "}
                R$ {(session.amount_total! / 100).toFixed(2)}
              </p>

              <p className="text-gray-600">
                <strong>Data:</strong>{" "}
                {new Date(session.created * 1000).toLocaleDateString("pt-BR")}
              </p>

              {/* Itens */}
              <div className="mt-4">
                <p className="font-medium mb-2">Itens:</p>

                <div className="flex flex-col gap-3">
                  {lineItems.data.map((item) => {
                    const product = item.price?.product;

                    // 🔥 segurança: produto pode ser DeletedProduct
                    const image =
                      product &&
                      typeof product !== "string" &&
                      "images" in product &&
                      product.images.length > 0
                        ? product.images[0]
                        : null;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b pb-2"
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt={item.description || "Produto"}
                            width={60}
                            height={60}
                            className="rounded"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-200 rounded" />
                        )}

                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-gray-600">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}