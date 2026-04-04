import { NextResponse } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  getAdminSessionCookieOptions,
} from "@/lib/adminAuth";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/admin-login", request.url));
  response.cookies.set(ADMIN_AUTH_COOKIE, "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}