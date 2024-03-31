import { OrderProduct, ProductWithQuantity } from "@/app/types/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import path from "path";

export async function POST(req: Request) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json(
        { error: "Nie jesteś zalogowany" },
        { status: 401 }
      );
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const { cart, deliveryPrice } = await req.json();

    const lineItems = cart.map((item: ProductWithQuantity) => ({
      price_data: {
        currency: "pln",
        product_data: {
          name: item.name,
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
      success_url: `${process.env.HOST_NAME}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.HOST_NAME}/cancel?sessionId={CHECKOUT_SESSION_ID}`,
    });

    const newOrder = await prisma.order.create({
      data: {
        userId: session.user?.email as string,
        total:
          cart.reduce(
            (acc: number, item: ProductWithQuantity) =>
              acc + item.price * item.quantity,
            0
          ) + deliveryPrice,
        delivery: deliveryPrice,
        status: "paid",
        orderProducts: {
          createMany: {
            data: cart.map((item: OrderProduct) => ({
              productId: item.name,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })),
          },
        },
      },
      include: {
        orderProducts: true,
      },
    });

    if (!newOrder) {
      throw new Error("Nie udało się utworzyć zamówienia");
    }
    return NextResponse.json({ id: checkoutSession.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
