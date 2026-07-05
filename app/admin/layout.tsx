import type { Metadata } from "next";
import { Search, ExternalLink } from "lucide-react";
import { supabaseConfigured } from "@/lib/supabase/config";
import { AdminNavSidebar, AdminNavMobile } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "Admin · Eat Your Green", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#f1f2f4] text-[#202223]">
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f2f4] text-[#202223]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 bg-white border-b border-[#e1e3e5] flex items-center gap-3 px-3 sm:px-4">
        <span className="flex items-center gap-2 font-semibold text-[#1a1a1a] shrink-0">
          <span className="h-6 w-6 rounded-md bg-emerald-700 flex items-center justify-center text-white text-xs">🌱</span>
          <span className="hidden sm:inline">Eat Your Green</span>
        </span>
        <div className="flex-1 max-w-xl mx-auto hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              placeholder="Search your store"
              aria-label="Search"
              className="w-full h-9 rounded-lg bg-[#f1f2f4] border border-[#e1e3e5] pl-9 pr-3 text-sm outline-none focus:border-neutral-400"
            />
          </div>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener"
          className="hidden sm:inline-flex items-center gap-1 text-sm text-[#005bd3] hover:underline shrink-0"
        >
          <ExternalLink className="h-4 w-4" /> View store
        </a>
        <form action="/admin/logout" method="post" className="shrink-0 ml-auto sm:ml-0">
          <button className="text-sm text-neutral-600 hover:text-neutral-900">Sign out</button>
        </form>
      </header>

      <div className="md:flex">
        {/* Sidebar — desktop */}
        <aside className="hidden md:block md:w-[228px] md:shrink-0 md:fixed md:top-14 md:bottom-0 md:left-0 bg-[#f1f2f4] border-r border-[#e1e3e5] px-3 py-3 overflow-y-auto">
          <AdminNavSidebar />
        </aside>

        {/* Nav — mobile */}
        <div className="md:hidden bg-white border-b border-[#e1e3e5]">
          <AdminNavMobile />
        </div>

        {/* Content */}
        <div className="md:pl-[228px] flex-1 min-w-0">
          <main className="mx-auto max-w-5xl px-4 py-5 md:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
