import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAdminRequestAuthenticated();
  if (!authenticated) {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="ml-0 lg:ml-72 flex min-h-screen flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}