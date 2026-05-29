import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";
import { getDownloads } from "@/data/books";

export const metadata: Metadata = {
  title: "Thank You — Download Your Book",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ value?: string; plan?: string }>;
}) {
  const sp = await searchParams;
  const plan = sp.plan || "guide";
  const downloads = getDownloads(plan);
  const value = Number(sp.value) || downloads.reduce((sum, d) => sum + d.price, 0);
  return <ThankYouClient value={value} plan={plan} downloads={downloads} />;
}
