import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json(
        { error: "Nie jesteś zalogowany" },
        { status: 401 }
      );
    }
    const { email, currentPassword, repeatCurrentPassword, newPassword } =
      await req.json();

    if (currentPassword !== repeatCurrentPassword) {
      return NextResponse.json(
        { error: "Hasła nie pasują do siebie" },
        { status: 400 }
      );
    }

    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Nie znaleziono użytkownika" },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Nieprawidłowe hasło" },
        { status: 400 }
      );
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma?.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return NextResponse.json("Hasło zostało zmienione", { status: 200 });
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
