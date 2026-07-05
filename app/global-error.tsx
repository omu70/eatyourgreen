"use client";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
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
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#FBF7EF",
          color: "#1F6B3D",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Just a moment…</h1>
          <p style={{ color: "#2B2B28", fontSize: "15px", lineHeight: 1.5 }}>
            The page didn&rsquo;t load fully. A quick reload almost always fixes it.
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.removeItem("eyg_chunk_reload");
              } catch {
                /* ignore */
              }
              window.location.href = "/";
            }}
            style={{
              marginTop: "16px",
              background: "#1F6B3D",
              color: "#fff",
              border: 0,
              borderRadius: "999px",
              padding: "12px 26px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload the site
          </button>
        </div>
      </body>
    </html>
  );
}
