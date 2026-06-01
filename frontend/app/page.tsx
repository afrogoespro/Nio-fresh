"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", padding: "40px 20px", fontFamily: "DM Sans, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "700", margin: "0 0 16px 0", color: "#1a1a1a" }}>
            Put Your Outreach on Autopilot
          </h1>
          <p style={{ fontSize: "18px", color: "#666", margin: 0, maxWidth: "600px", lineHeight: "1.6" }}>
            Find the right prospects, write in your voice, send personalized emails automatically. All it takes is telling us about your business.
          </p>
        </div>

        {/* CTA */}
        <Link href="/onboarding">
          <button style={{
            padding: "14px 32px",
            background: "#a8d5a2",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Started
          </button>
        </Link>

        {/* Demo Section */}
        <div style={{ marginTop: "80px", padding: "40px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 20px 0", color: "#1a1a1a" }}>
            How It Works
          </h2>
          <ol style={{ paddingLeft: "20px", color: "#666", lineHeight: "1.8" }}>
            <li style={{ marginBottom: "12px" }}>Tell us about your business and who you want to reach</li>
            <li style={{ marginBottom: "12px" }}>We find prospects that match your ideal customer</li>
            <li style={{ marginBottom: "12px" }}>Generate personalized emails in your voice</li>
            <li>Send automatically with smart timing</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
