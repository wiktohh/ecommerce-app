import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const isUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (isUser) return new NextResponse("Użytkownik istnieje", { status: 400 });

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
