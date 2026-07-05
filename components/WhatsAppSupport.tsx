"use client";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

// Floating WhatsApp support button — shows on every page except admin.
export default function WhatsAppSupport() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <a
      href="https://chat.whatsapp.com/CbmN4dn73H7BBBsJkBimku"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-[90] bottom-24 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg px-4 py-3 hover:opacity-95 active:scale-95 transition"
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="hidden sm:inline font-semibold text-sm whitespace-nowrap">Chat with us</span>
    </a>
  );
}
