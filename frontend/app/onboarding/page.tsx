"use client";

import { useState } from "react";
import Link from "next/link";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("");
  const [voiceProfile, setVoiceProfile] = useState({ name: "", personality: "", examples: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceChat = async () => {
    if (!business.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voice/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_description: business }),
      });
      const data = await res.json();
      setVoiceProfile(data);
      setStep(2);
    } catch (error) {
      console.error("Voice chat failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }} className="animate-fade-in">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link href="/">
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "var(--accent)", marginBottom: "40px", fontWeight: "600" }}>
            ← Back
          </button>
        </Link>

        {step === 1 && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 12px 0", color: "var(--text)" }}>
              Tell us about your business
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-light)", margin: "0 0 24px 0" }}>
              Describe what you do, your products, and who you help.
            </p>
            <textarea
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="We help SaaS companies automate their outreach..."
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: `1px solid var(--border)`,
                fontSize: "14px",
                minHeight: "140px",
                fontFamily: "'DM Sans', inherit",
                boxSizing: "border-box",
                color: "var(--text)",
                background: "var(--white)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
            <button
              onClick={handleVoiceChat}
              disabled={!business.trim() || isLoading}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                background: business.trim() && !isLoading ? "var(--accent)" : "#ddd",
                color: "var(--text)",
                border: "none",
                borderRadius: "8px",
                cursor: business.trim() && !isLoading ? "pointer" : "not-allowed",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (business.trim() && !isLoading) {
                  e.currentTarget.style.background = "var(--accent-dark)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = business.trim() && !isLoading ? "var(--accent)" : "#ddd";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {isLoading ? "Analyzing..." : "Next"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 12px 0", color: "var(--text)" }}>
              Voice Profile
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-light)", margin: "0 0 24px 0" }}>
              Here's how we'll write emails in your voice.
            </p>

            <div style={{ padding: "16px", background: "var(--white)", borderRadius: "8px", border: `1px solid var(--border)`, marginBottom: "24px" }}>
              <p style={{ fontSize: "12px", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0", fontWeight: "600" }}>
                Your Voice
              </p>
              <p style={{ fontSize: "16px", color: "var(--text)", margin: "0 0 12px 0", fontWeight: "600" }}>
                {voiceProfile.personality || "Professional & Friendly"}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-light)", lineHeight: "1.6", margin: 0 }}>
                {voiceProfile.examples?.[0] || "Emails will be personalized and conversational"}
              </p>
            </div>

            <Link href="/dashboard">
              <button style={{
                width: "100%",
                padding: "12px 24px",
                background: "var(--accent)",
                color: "var(--text)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "var(--accent-dark)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Continue to Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
