"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "60px 20px", fontFamily: "'DM Sans', sans-serif" }} className="animate-fade-in">
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Logo/Brand */}
        <div style={{ marginBottom: "80px" }}>
          <h1 style={{ fontSize: "14px", fontWeight: "600", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 60px 0" }}>
            NIO
          </h1>

          <h2 style={{ fontSize: "56px", fontWeight: "700", lineHeight: "1.2", margin: "0 0 24px 0", color: "var(--text)", maxWidth: "700px" }}>
            Put Your Outreach on Autopilot
          </h2>
          <p style={{ fontSize: "18px", color: "var(--text-light)", margin: "0 0 40px 0", maxWidth: "600px", lineHeight: "1.7" }}>
            Find your ideal prospects. Write in your voice. Send automatically.
          </p>

          <Link href="/onboarding">
            <button style={{
              padding: "14px 32px",
              background: "var(--accent)",
              color: "var(--text)",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
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
              Get Started
            </button>
          </Link>
        </div>

        {/* How it works */}
        <div style={{ marginTop: "120px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 40px 0" }}>
            How it works
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
            {[
              { num: "1", title: "Tell us about your business", desc: "Describe what you do and who you want to reach" },
              { num: "2", title: "We find prospects", desc: "AI-powered research finds your ideal customers" },
              { num: "3", title: "Generate emails", desc: "Personalized messages written in your voice" },
              { num: "4", title: "Send on autopilot", desc: "Intelligent timing and follow-ups" },
            ].map((step) => (
              <div key={step.num} style={{ animation: `slideInLeft 0.5s ease-out ${step.num * 0.1}s both` }}>
                <div style={{ fontSize: "48px", fontWeight: "700", color: "var(--accent)", marginBottom: "12px" }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "8px" }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
