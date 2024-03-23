import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(req: Request) {
  try {
    const { email, currentPassword, repeatCurrentPassword, newPassword } =
      await req.json();

    if (currentPassword !== repeatCurrentPassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(currentPassword, 12);

    if (!bcrypt.compare(hashedPassword, user.hashedPassword)) {
      return new NextResponse("Invalid password", { status: 400 });
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

    return new NextResponse("Password changed", { status: 200 });
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
}
