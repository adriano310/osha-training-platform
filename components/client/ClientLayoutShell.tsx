"use client";
import Navbar from "../client/navbar";
import Footer from "../client/footer";
import { usePathname } from "next/navigation";

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
