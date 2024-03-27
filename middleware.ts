import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isToken =
    req.cookies.get("__Secure-next-auth.session-token") ||
    req.cookies.get("next-auth.session-token");
  const nextPathname = req.nextUrl.pathname;

  if (!isToken && nextPathname.startsWith("/account")) {
    return NextResponse.redirect(`${process.env.HOST_NAME}/auth`);
  }
}

export const config = {
  matcher: ["/account", "/account/password", "/account/orders"],
};
