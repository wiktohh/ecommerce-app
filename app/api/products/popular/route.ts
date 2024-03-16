import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const popularProducts = await prisma.product.findMany({
      take: 10,
    });
    return NextResponse.json(popularProducts);
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
