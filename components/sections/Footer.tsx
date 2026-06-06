import Link from "next/link";
import Image from "next/image";
import { Instagram, Lock } from "lucide-react";
import { footer } from "@/data/content";
import { getContent } from "@/lib/site-data";

export default async function Footer() {
  const c = await getContent();
  const year = new Date().getFullYear();
  const email = c.supportEmail || footer.email;
  const instagram = c.instagram || footer.instagram;
  const payments = c.payments || footer.payments;
  const logo = c.logo || "/images/logo.png";
  const showEmail = email && !email.startsWith("TODO");
  return (
    <footer className="bg-forest text-white/80 pt-12 pb-28 md:pb-12">
      <div className="container-page">
        <div className="flex flex-col md:flex-row gap-8 md:items-start md:justify-between">
          <div>
            <Image src={logo} alt="Eat Your Green" width={200} height={64} className="h-14 w-auto" />
            <p className="mt-3 small max-w-xs">
              Two simple, gentle books that help Indian parents get fussy kids to enjoy greens.
            </p>
            <p className="mt-3 small flex items-center gap-2">
              <Lock className="h-4 w-4 text-leaf" /> {footer.secureNote}
            </p>
            <p className="mt-2 small text-white/60">Pay with {payments}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 small">
            <Link className="hover:text-white" href="/books/the-eat-your-green-guide">The Guide</Link>
            <Link className="hover:text-white" href="/books/the-eat-your-green-complete-toolkit">Complete Toolkit</Link>
            <Link className="hover:text-white" href="/author">Author</Link>
            <Link className="hover:text-white" href="/about">About</Link>
            <Link className="hover:text-white" href="/faq">FAQ</Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
            <Link className="hover:text-white" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms">Terms of Service</Link>
            <Link className="hover:text-white" href="/refund-policy">Refund Policy</Link>
            <a className="hover:text-white flex items-center gap-1" href={instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 small flex flex-col md:flex-row gap-2 md:justify-between">
          <span>© {year} Eat Your Green. All rights reserved.</span>
          {showEmail && <span>{email}</span>}
        </div>
      </div>
    </footer>
  );
}
