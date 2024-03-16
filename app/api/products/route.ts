import prisma from "@/app/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = req.nextUrl.searchParams.get("limit") || 10;

    const productsLength = await prisma.product.count();

    const popularProducts = await prisma.product.findMany({
      take: Number(limit) || 10,
      skip: (Number(page) - 1) * Number(limit) || 0,
    });
    return NextResponse.json({ popularProducts, productsLength });
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
