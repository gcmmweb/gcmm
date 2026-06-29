import React from "react"

export default function GivingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Give Online</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Your generosity helps us reach millions with the Gospel.
      </p>
      <div
        style={{
          width: "100%",
          height: "800px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://gcmmusa.churchcenter.com/giving"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="auto"
          title="Church Center Giving Form"
        />
      </div>
    </div>
  )
}