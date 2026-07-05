import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You — Download Your Book",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ value?: string; plan?: string; oid?: string; pid?: string; sig?: string; token?: string }>;
}) {
  const sp = await searchParams;
  return (
    <ThankYouClient
      value={Number(sp.value) || 0}
      plan={sp.plan || "guide"}
      oid={sp.oid || ""}
      pid={sp.pid || ""}
      sig={sp.sig || ""}
      token={sp.token || ""}
    />
  );
}
