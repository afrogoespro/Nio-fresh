"use client";

import { useState } from "react";
import Link from "next/link";

const mockProspects = [
  { id: 1, name: "Sarah Chen", company: "TechCorp", title: "VP Sales" },
  { id: 2, name: "Mike Johnson", company: "StartupXYZ", title: "Founder" },
  { id: 3, name: "Lisa Wang", company: "Enterprise Inc", title: "Director of Operations" },
];

export default function Review() {
  const [activeId, setActiveId] = useState(1);
  const [reviewed, setReviewed] = useState<number[]>([]);

  const prospect = mockProspects.find((p) => p.id === activeId);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", padding: "40px 20px", fontFamily: "DM Sans, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/dashboard">
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#a8d5a2", marginBottom: "20px" }}>
            ← Back
          </button>
        </Link>

        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 30px 0", color: "#1a1a1a" }}>
          Review Prospects
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "20px" }}>
          {/* List */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #ddd", overflow: "hidden" }}>
            {mockProspects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px 16px",
                  textAlign: "left",
                  background: activeId === p.id ? "#1a1a1a" : "transparent",
                  color: activeId === p.id ? "#f5f0e8" : "#1a1a1a",
                  border: "none",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "4px" }}>{p.name}</div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>{p.company}</div>
              </button>
            ))}
          </div>

          {/* Detail */}
          {prospect && (
            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #ddd", padding: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 12px 0", color: "#1a1a1a" }}>
                {prospect.name}
              </h2>
              <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                {prospect.title} at {prospect.company}
              </p>

              <div style={{ marginTop: "20px", padding: "16px", background: "#f5f0e8", borderRadius: "6px" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#999", textTransform: "uppercase" }}>
                  Draft Email
                </p>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#1a1a1a" }}>
                  Hey {prospect.name}, I noticed you're leading sales at {prospect.company}. We help teams like yours automate outreach...
                </p>
              </div>

              <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
                <button style={{
                  padding: "10px 20px",
                  background: "#a8d5a2",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}>
                  Send
                </button>
                <button style={{
                  padding: "10px 20px",
                  background: "#ddd",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}>
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
