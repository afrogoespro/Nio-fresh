"use client";

import Link from "next/link";
import { useState } from "react";

export default function Landing() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      q: "Will this spam people?",
      a: "No. Every email is unique and personalized. NIO caps sends at about 30 per day and spaces them out to feel natural. This isn't a blast tool — it's one-to-one outreach, automated."
    },
    {
      q: "Does it sound like a robot?",
      a: "NIO learns your writing style through a short training chat. It picks up your tone, your word choices, even phrases you like. Most people can't tell the difference."
    },
    {
      q: "What do I need to get started?",
      a: "A description of your business and about 15 minutes. NIO handles the rest — finding prospects, researching them, and writing the first batch of emails for you to review."
    },
    {
      q: "How do replies work?",
      a: "When someone replies, you get an email notification with their info. From there, you take the conversation — NIO hands it off to you once the door is open."
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f4f9f0", fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1a1a1a",
        borderRadius: "24px",
        padding: "12px 24px",
        display: "flex",
        gap: "32px",
        alignItems: "center",
        zIndex: 1000,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#f4f9f0" }}>nio</span>
        <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
          <a href="#how" style={{ color: "#999", textDecoration: "none", cursor: "pointer" }}>How it works</a>
          <a href="#why" style={{ color: "#999", textDecoration: "none", cursor: "pointer" }}>Why NIO</a>
          <a href="#faq" style={{ color: "#999", textDecoration: "none", cursor: "pointer" }}>FAQ</a>
        </div>
        <Link href="/agents">
          <button style={{
            background: "#a8d5a2",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "20px",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#96c88f";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#a8d5a2";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Book a demo
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "700", lineHeight: "1.2", marginBottom: "16px", color: "#1a1a1a" }}>
            Outreach that sounds like you wrote it.
          </h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px", lineHeight: "1.6" }}>
            NIO finds the right people, writes personalized emails in your voice, and sends them on autopilot. You just close the deals.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "12px" }}>
            <Link href="/agents">
              <button style={{
                background: "#1a1a1a",
                color: "#f4f9f0",
                border: "none",
                borderRadius: "24px",
                padding: "14px 32px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Book a demo →
              </button>
            </Link>
          </div>
          <p style={{ fontSize: "12px", color: "#999" }}>No credit card. 15-minute setup.</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ paddingBottom: "80px", background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              How it works
            </p>
            <h2 style={{ fontSize: "42px", fontWeight: "700", color: "#1a1a1a" }}>Three steps. Then autopilot.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {[
              { num: "1", title: "Tell us about your business", desc: "Answer a few questions about what you do and who you're looking for. NIO figures out the rest." },
              { num: "2", title: "We find and write", desc: "NIO researches real people, finds something relevant about them, and writes a personal email in your voice." },
              { num: "3", title: "You review, we send", desc: "Approve the messages you like, edit anything that feels off. NIO learns from every change you make." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff",
                border: "2px solid #f4f9f0",
                borderRadius: "20px",
                padding: "32px",
                position: "relative",
                animation: `slideInLeft 0.6s ease-out ${i * 0.15}s both`,
              }}>
                <div style={{ fontSize: "44px", fontWeight: "700", color: "#a8d5a2", marginBottom: "16px" }}>
                  {item.num}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: "#1a1a1a" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="why" style={{ paddingBottom: "80px", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Why NIO
            </p>
            <h2 style={{ fontSize: "42px", fontWeight: "700", color: "#1a1a1a" }}>Not another spam tool.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {[
              { title: "Learns your voice", desc: "NIO trains on how you actually talk through a short conversation. Every edit you make teaches it more.", bg: "#eef6e9", color: "#4a7a42" },
              { title: "Real research, not templates", desc: "Each email references something real — a recent post, a job change, a shared interest. Not 'I came across your profile.'", bg: "#f0ebe0", color: "#8a7550" },
              { title: "Runs while you sleep", desc: "Set it once. NIO finds new prospects daily, writes and sends emails, and pings you when someone replies.", bg: "#ede8f4", color: "#6b5b8a" },
            ].map((item, i) => (
              <div key={i} style={{
                background: item.bg,
                borderRadius: "20px",
                padding: "32px",
                animation: `slideInLeft 0.6s ease-out ${i * 0.15}s both`,
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px", color: item.color }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ paddingBottom: "80px", background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              FAQ
            </p>
            <h2 style={{ fontSize: "42px", fontWeight: "700", color: "#1a1a1a" }}>The obvious questions.</h2>
          </div>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} style={{ borderBottom: i < faqItems.length - 1 ? "1px solid #eee" : "none", paddingBottom: "16px", marginBottom: "16px" }}>
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "12px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                  }}
                >
                  {item.q}
                  <span style={{ fontSize: "20px", color: "#a8d5a2" }}>
                    {expandedFAQ === i ? "−" : "+"}
                  </span>
                </button>
                {expandedFAQ === i && (
                  <p style={{ fontSize: "14px", color: "#666", marginTop: "12px", lineHeight: "1.6", paddingLeft: "12px", borderLeft: "3px solid #a8d5a2" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", background: "#1a1a1a", borderRadius: "20px", padding: "60px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#f4f9f0", marginBottom: "16px" }}>
            Stop writing cold emails. Start getting replies.
          </h2>
          <p style={{ fontSize: "16px", color: "#ccc", marginBottom: "32px" }}>
            15 minutes to set up. Runs on autopilot from there.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#a8d5a2",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "24px",
              padding: "16px 36px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#96c88f";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#a8d5a2";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Book a demo →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "center", borderTop: "1px solid #eee", color: "#999", fontSize: "12px" }}>
        <p>© 2026 NIO. All rights reserved.</p>
      </footer>
    </div>
  );
}
