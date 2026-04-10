"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_AUTH_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string") {
    redirect("/admin-login?error=invalid");
  }

  if (!isAdminAuthConfigured()) {
    redirect("/admin-login?error=not-configured");
  }

  if (!verifyAdminPassword(password)) {
    redirect("/admin-login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_AUTH_COOKIE,
    createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );

  redirect("/admin");
}