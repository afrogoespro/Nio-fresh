"use client";

import { useState } from "react";
import Link from "next/link";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("");
  const [icp, setIcp] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", padding: "40px 20px", fontFamily: "DM Sans, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link href="/">
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#a8d5a2", marginBottom: "20px" }}>
            ← Back
          </button>
        </Link>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 20px 0", color: "#1a1a1a" }}>
              Tell us about your business
            </h1>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="What do you do? Who do you help?"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                minHeight: "120px",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => setStep(2)}
              disabled={!business.trim()}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                background: business.trim() ? "#a8d5a2" : "#ddd",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "8px",
                cursor: business.trim() ? "pointer" : "not-allowed",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 20px 0", color: "#1a1a1a" }}>
              Who's your ideal customer?
            </h1>
            <textarea
              value={icp}
              onChange={(e) => setIcp(e.target.value)}
              placeholder="Job titles, industries, company size..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                minHeight: "120px",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: "12px 24px",
                  background: "#ddd",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Back
              </button>
              <Link href="/dashboard" style={{ flex: 1 }}>
                <button
                  disabled={!icp.trim()}
                  style={{
                    width: "100%",
                    padding: "12px 24px",
                    background: icp.trim() ? "#a8d5a2" : "#ddd",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "8px",
                    cursor: icp.trim() ? "pointer" : "not-allowed",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Continue to Dashboard
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
