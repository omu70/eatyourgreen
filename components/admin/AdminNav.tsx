"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, BarChart3, Mail, BookOpen, Pencil } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Home", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Sales", icon: ShoppingBag },
  { href: "/admin/visitors", label: "Visitors", icon: BarChart3 },
  { href: "/admin/leads", label: "Email sign-ups", icon: Mail },
  { href: "/admin/products", label: "Books", icon: BookOpen },
  { href: "/admin/content", label: "Website text & photos", icon: Pencil },
];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminNavSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV.map((n) => {
        const Icon = n.icon;
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              active ? "bg-emerald-700 text-white" : "text-neutral-700 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" /> {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNavMobile() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1.5 overflow-x-auto px-3 pb-2">
      {NAV.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
              active ? "bg-emerald-700 text-white" : "text-neutral-700 bg-neutral-100"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
