"use client";

import { usePathname } from "next/navigation";

function getPageTitle(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/bookings")) return "Bookings";
  if (pathname.startsWith("/admin/contacts")) return "Contacts";
  return "Admin";
}

export default function AdminTopbar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div>
          <p className="text-sm text-slate-500">Andrade Safety Admin</p>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        </div>

        <a
          href="/admin/logout"
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Log Out
        </a>
      </div>
    </header>
  );
}