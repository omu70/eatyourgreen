import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { supabaseConfigured } from "@/lib/supabase/config";
import { AdminNavSidebar, AdminNavMobile } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "Admin · Eat Your Green", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-neutral-100 text-neutral-900">
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-neutral-200 z-30">
        <div className="px-5 py-4 border-b border-neutral-100">
          <span className="font-semibold text-emerald-800">🌱 Eat Your Green</span>
          <p className="text-[11px] text-neutral-400 mt-0.5">Store admin</p>
        </div>
        <AdminNavSidebar />
        <div className="px-3 py-4 border-t border-neutral-100 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
          >
            <ExternalLink className="h-4 w-4 shrink-0" /> View my website
          </a>
          <form action="/admin/logout" method="post">
            <button className="w-full text-left rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-50">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Top bar — mobile */}
      <header className="md:hidden sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="px-4 py-3 flex items-center gap-3">
          <span className="font-semibold text-emerald-800 text-sm">🌱 Eat Your Green</span>
          <a href="/" target="_blank" rel="noopener" className="ml-auto text-xs text-emerald-700">
            View site
          </a>
          <form action="/admin/logout" method="post">
            <button className="text-xs text-neutral-500">Sign out</button>
          </form>
        </div>
        <AdminNavMobile />
      </header>

      {/* Content */}
      <div className="md:pl-60">
        <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}
