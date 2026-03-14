"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Contacts", href: "/admin/contacts" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r lg:flex lg:flex-col" style={{ borderColor: 'var(--navy-dark)', background: 'var(--off-white)' }}>
      <div className="border-b px-6 py-6" style={{ borderColor: 'var(--navy-dark)' }}>
        <Link href="/admin" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--navy)' }}>
            Safety101
          </p>
          <h1 className="mt-2 text-xl font-bold" style={{ color: 'var(--text-dark)' }}>Admin Panel</h1>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={
                  isActive
                    ? {
                        background: 'var(--navy)',
                        color: 'white',
                        fontWeight: 600,
                      }
                    : {
                        color: 'var(--text-dark)',
                        background: 'transparent',
                        transition: 'background 0.2s, color 0.2s',
                      }
                }
                className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:!bg-[var(--yellow)] hover:!text-black"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-4" style={{ borderColor: 'var(--navy-dark)' }}>
        <Link
          href="/"
          style={{ color: 'var(--text-dark)' }}
          className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:!bg-[var(--yellow)] hover:!text-black"
        >
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}