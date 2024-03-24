import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const nextPathname = req.nextUrl.pathname;

  if (!token && nextPathname.startsWith("/account")) {
    return NextResponse.redirect(`${process.env.HOST_NAME}/auth`);
  }
}

export const config = {
  matcher: ["/account", "/account/password", "/account/orders"],
};
