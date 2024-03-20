import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const publishStripeKey = process.env.NEXT_STRIPE_PUBLISHABLE_KEY;
  if (publishStripeKey) {
    return new NextResponse(publishStripeKey, { status: 200 });
  }
  return new NextResponse("Error", { status: 500 });
}
