"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", padding: "40px 20px", fontFamily: "DM Sans, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/">
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#a8d5a2", marginBottom: "20px" }}>
            ← Back
          </button>
        </Link>

        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 30px 0", color: "#1a1a1a" }}>
          Your Campaigns
        </h1>

        <div style={{ display: "grid", gap: "20px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "20px",
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 8px 0", color: "#1a1a1a" }}>
                  Campaign {i}
                </h2>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  {Math.floor(Math.random() * 100)} prospects • {Math.floor(Math.random() * 50)} sent
                </p>
              </div>
              <Link href="/review">
                <button style={{
                  padding: "8px 16px",
                  background: "#a8d5a2",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                  Review
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
