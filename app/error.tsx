"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    const msg = `${error?.name || ""} ${error?.message || ""}`;
    const isChunk = /chunk|Loading chunk|dynamically imported|module script failed|Failed to fetch/i.test(msg);
    if (isChunk && typeof window !== "undefined") {
      try {
        if (!sessionStorage.getItem("eyg_chunk_reload")) {
          sessionStorage.setItem("eyg_chunk_reload", "1");
          window.location.reload();
        }
      } catch {
        /* ignore */
      }
    }
  }, [error]);

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
      <div>
        <h2 style={{ color: "#1F6B3D", fontSize: "20px", fontWeight: 700 }}>This page didn&rsquo;t load fully.</h2>
        <p style={{ color: "#2B2B28", marginTop: "8px" }}>Please try again — it usually works on the second go.</p>
        <button
          onClick={() => reset()}
          style={{ marginTop: "16px", background: "#EE6240", color: "#fff", border: 0, borderRadius: "999px", padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
