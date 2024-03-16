import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany();
    return NextResponse.json(allProducts);
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
