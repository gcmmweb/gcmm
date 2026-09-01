"use client"

// Shown by app/[[...catchall]]/page.tsx when PLASMIC_SERVER.maybeFetchComponentData
// throws (e.g. a timeout reaching Plasmic's API). Deliberately has zero
// dependency on Plasmic itself, so it can render even when Plasmic is down.

export function SiteUnavailableFallback({ pathname }: { pathname?: string }) {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "inherit",
      }}
    >
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", color: "#1a3c6e", marginBottom: "16px" }}>
          We&apos;re having a temporary issue
        </h1>
        <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#333", marginBottom: "24px" }}>
          This page couldn&apos;t load right now. This is usually brief — please
          try again in a moment.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "#1a3c6e",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "8px",
            border: "none",
            fontWeight: 600,
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "24px",
          }}
        >
          Try again
        </button>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
          Need to reach us directly? Call{" "}
          <a href="tel:18776745630" style={{ color: "#1a3c6e" }}>
            1-877-674-5630
          </a>{" "}
          or email{" "}
          <a href="mailto:info@gcmm.ca" style={{ color: "#1a3c6e" }}>
            info@gcmm.ca
          </a>
          .
        </p>
      </div>
    </main>
  )
}
