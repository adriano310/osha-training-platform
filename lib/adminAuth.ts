import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "andrade_safety_admin_session";

const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || getAdminPassword();
}

function createSignature(payload: string): string {
  const secret = getSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeCompare(value: string, expected: string): boolean {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function isAdminAuthConfigured(): boolean {
  return getAdminPassword().length > 0;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  const provided = password.trim();
  if (!expected || !provided) return false;
  return safeCompare(provided, expected);
}

export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${SESSION_VERSION}:${expiresAt}`;
  const signature = createSignature(payload);
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function isAdminSessionTokenValid(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [version, expiresAtRaw, signature] = decoded.split(":");

    if (!version || !expiresAtRaw || !signature) return false;
    if (version !== SESSION_VERSION) return false;

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

    const payload = `${version}:${expiresAtRaw}`;
    const expectedSignature = createSignature(payload);
    if (!expectedSignature) return false;

    return safeCompare(signature, expectedSignature);
  } catch {
    return false;
  }
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export async function isAdminRequestAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  return isAdminSessionTokenValid(token);
}

export async function ensureAdminApiAuth() {
  const authenticated = await isAdminRequestAuthenticated();
  if (authenticated) return null;

  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401 },
  );
}