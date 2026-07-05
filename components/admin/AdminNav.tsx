"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, BarChart3, Mail, BookOpen, Pencil } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Home", icon: Home },
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
    <nav className="space-y-0.5">
      {NAV.map((n) => {
        const Icon = n.icon;
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active
                ? "bg-white font-semibold text-[#1a1a1a] shadow-sm"
                : "text-[#404040] hover:bg-[#e3e3e3]"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-emerald-700" : "text-[#5c5f62]"}`} />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNavMobile() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1.5 overflow-x-auto px-3 py-2">
      {NAV.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
              active ? "bg-emerald-700 text-white" : "text-[#404040] bg-[#f1f2f4]"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
