import Link from "next/link";
import type { Metadata } from "next";
import { supabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Admin · Eat Your Green", robots: { index: false, follow: false } };

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/content", label: "Content" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
          <span className="font-semibold text-emerald-800">🌱 Eat Your Green · Admin</span>
          {supabaseConfigured && (
            <nav className="flex gap-4 text-sm">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-neutral-600 hover:text-emerald-700">
                  {n.label}
                </Link>
              ))}
            </nav>
          )}
          <form action="/admin/logout" method="post" className="ml-auto">
            <button className="text-sm text-neutral-500 hover:text-neutral-800">Sign out</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
