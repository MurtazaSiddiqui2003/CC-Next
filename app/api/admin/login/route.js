import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ error: "Admin is not configured yet. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Vercel." }, { status: 503 });
  }

  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!safeEqual(body.password || "", password)) {
    return NextResponse.json({ error: "That password doesn’t match." }, { status: 401 });
  }

  const issuedAt = String(Date.now());
  const signature = createHmac("sha256", secret).update(issuedAt).digest("hex");
  const response = NextResponse.json({ ok: true });
  response.cookies.set("portfolio_admin", issuedAt + "." + signature, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
