import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { query, category } = await req.json();

    let whereCondition = {};

    if (query && query.length > 2) {
      whereCondition = {
        name: {
          contains: query.toLowerCase(),
          mode: "insensitive",
        },
      };
    }

    if (category && category !== "all") {
      whereCondition = {
        ...whereCondition,
        category: {
          contains: category.toLowerCase(),
        },
      };
    }

    const products = await prisma?.product.findMany({
      where: whereCondition,
      take: 5,
    });
    if (products?.length === 0) {
      return new NextResponse("No products found", { status: 200 });
    }
    return NextResponse.json(products);
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
