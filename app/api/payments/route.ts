import { ProductWithQuantity } from "@/app/types/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const { cart, deliveryPrice } = await req.json();

    const lineItems = cart.map((item: ProductWithQuantity) => ({
      price_data: {
        currency: "pln",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (deliveryPrice > 0) {
      lineItems.push({
        price_data: {
          currency: "pln",
          product_data: {
            name: "Dostawa",
          },
          unit_amount: Math.round(deliveryPrice * 100),
        },
        quantity: 1,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.HOST_NAME}/success`,
      cancel_url: `${process.env.HOST_NAME}/cancel`,
    });

    return NextResponse.json({ id: checkoutSession.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}