import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_AUTH_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  isAdminSessionTokenValid,
  verifyAdminPassword,
} from "@/lib/adminAuth";

type SearchParams = Promise<{ error?: string }>;

async function loginAction(formData: FormData) {
  "use server";

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

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  if (code === "invalid") return "Invalid admin password.";
  if (code === "not-configured") {
    return "Admin login is not configured. Set ADMIN_PASSWORD in your environment.";
  }
  return "Unable to sign in right now.";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params.error);

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  if (isAdminSessionTokenValid(token)) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Safety101
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to access the admin dashboard.
        </p>

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Admin Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign In
          </button>
        </form>

        <Link
          href="/"
          className="mt-4 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}