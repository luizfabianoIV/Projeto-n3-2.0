import Stripe from "stripe";
import { NextResponse } from "next/server";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email não recebido." },
        { status: 400 }
      );
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: [item.image], // ✔ permitido
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: lineItems,

      success_url: `${process.env.NEXT_PUBLIC_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Erro ao criar checkout" },
      { status: 500 }
    );
  }
}