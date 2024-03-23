import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  console.clear();
  try {
    const { email } = await req.json();
    console.log(email);

    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    console.log(user);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const orders = await prisma?.order.findMany({
      where: {
        userId: email,
      },
      include: {
        orderProducts: true,
      },
    });

    console.log(orders);

    if (!orders) {
      return new NextResponse("No orders found", { status: 404 });
    }
    return NextResponse.json(orders);
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
