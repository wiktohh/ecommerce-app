import prisma from "@/app/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

type SortOrder = "asc" | "desc";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 2;
    const limit = req.nextUrl.searchParams.get("limit") || 5;
    const sort: SortOrder =
      (req.nextUrl.searchParams.get("sort") as SortOrder) || "asc";

    let shop = req.nextUrl.searchParams.get("shop");
    const shops = shop?.split("-") as string[];

    let category = req.nextUrl.searchParams.get("category");
    const categories = category?.split("-") as string[];

    let whereCondition = {};

    if (category && categories.length > 0) {
      whereCondition = {
        category: {
          in: categories,
        },
      };
    }

    if (shop && shops.length > 0) {
      whereCondition = {
        ...whereCondition,
        shop: {
          in: shops,
        },
      };
    }

    console.clear();

    const productsLength = await prisma.product.count({
      where: whereCondition,
    });

    const products = await prisma.product.findMany({
      take: Number(limit) || 10,
      skip: (Number(page) - 1) * Number(limit) || 0,
      orderBy: {
        price: sort,
      },
      where: whereCondition,
    });

    return NextResponse.json({ products, productsLength });
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
