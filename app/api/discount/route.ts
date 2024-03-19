import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { discountCode } = await req.json();
    const discount = await prisma.discount.findUnique({
      where: {
        code: discountCode.toUpperCase(),
      },
    });
    if (discount) {
      return NextResponse.json({ isValid: true });
    }
    return NextResponse.json({ isValid: false });
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
