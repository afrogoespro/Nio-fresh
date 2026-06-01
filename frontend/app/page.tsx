"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    { num: 1, title: "Tell us about your business", desc: "What do you do? Who do you want to reach?" },
    { num: 2, title: "Who you want to target", desc: "Describe your ideal customer. We'll find them." },
    { num: 3, title: "How you want to sound", desc: "Show us your style. We'll write like you." },
    { num: 4, title: "How often to reach out", desc: "Pick a pace. We'll send on schedule." },
  ];

  const faqItems = [
    {
      q: "Will people think this is spam?",
      a: "No. Every email is real and personalized. We cap sends at 30 a day and space them out. This feels like one person reaching out, not a blast."
    },
    {
      q: "Does it sound like a robot?",
      a: "NIO learns how you actually talk. It picks up your tone, your words, your style. Most people can't tell the difference."
    },
    {
      q: "How long does setup take?",
      a: "15 minutes. Answer a few questions. NIO handles everything else — finding people, researching them, writing emails."
    },
    {
      q: "What happens when someone replies?",
      a: "You get an email. Take the conversation from there. NIO opens the door, you close the deal."
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            setVisibleSteps((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0f1f1a 0%, #1a2a23 50%, #0f1f1a 100%)", fontFamily: "'DM Sans', sans-serif", color: "#e8f3e5" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(15, 31, 26, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: "999px",
        padding: "12px 28px",
        display: "flex",
        gap: "40px",
        alignItems: "center",
        zIndex: 1000,
        border: "1px solid rgba(168, 213, 162, 0.15)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#a8d5a2", letterSpacing: "0.05em" }}>nio</span>
        <div style={{ display: "flex", gap: "28px", fontSize: "12px" }}>
          <a href="#how" style={{ color: "#999", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#999"}>How it works</a>
          <a href="#why" style={{ color: "#999", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#999"}>Why NIO</a>
          <a href="#faq" style={{ color: "#999", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#999"}>FAQ</a>
        </div>
        <Link href="/agents">
          <button style={{
            background: "#a8d5a2",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s",
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
            Get Started
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: "140px", paddingBottom: "60px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "700", lineHeight: "1.3", marginBottom: "16px", color: "#e8f3e5" }}>
            Intelligent cold outreach, done right.
          </h1>
          <p style={{ fontSize: "16px", color: "#999", marginBottom: "36px", lineHeight: "1.6" }}>
            NIO learns how you talk, finds the right people, and writes personalized emails—all on autopilot.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#a8d5a2",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(168, 213, 162, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start free
            </button>
          </Link>
        </div>
      </section>

      {/* 4-Step Flow - Smooth & Flowing */}
      <section style={{ padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {steps.map((step, i) => (
            <div key={i}>
              <div
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                style={{
                  padding: "20px 24px",
                  background: "rgba(168, 213, 162, 0.12)",
                  border: "1px solid rgba(168, 213, 162, 0.15)",
                  borderRadius: "12px",
                  color: "#e8f3e5",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "left",
                  opacity: visibleSteps.has(i) ? 1 : 0,
                  transform: visibleSteps.has(i) ? "translateX(0)" : "translateX(-20px)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: `${visibleSteps.has(i) ? i * 0.08 : 0}s`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#a8d5a2", minWidth: "30px", marginTop: "2px" }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", color: "#e8f3e5" }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.4" }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "8px 0",
                  opacity: visibleSteps.has(i + 1) ? 0.4 : 0.15,
                  transition: "opacity 0.5s ease",
                  fontSize: "12px",
                  color: "#a8d5a2",
                }}>
                  ↓
                </div>
              )}
            </div>
          ))}

          {/* Then we start */}
          <div
            ref={(el) => {
              if (el) stepRefs.current[steps.length] = el;
            }}
            style={{
              padding: "20px 24px",
              background: "#a8d5a2",
              color: "#1a1a1a",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: "600",
              textAlign: "center",
              opacity: visibleSteps.has(steps.length) ? 1 : 0,
              transform: visibleSteps.has(steps.length) ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: `${visibleSteps.has(steps.length) ? steps.length * 0.08 : 0}s`,
            }}
          >
            Then we start →
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px", textAlign: "center" }}>
          Here's what actually happens
        </h2>
        <p style={{ fontSize: "13px", color: "#666", textAlign: "center", marginBottom: "48px" }}>
          Simple. No complex setup. No spam. Just real emails that work.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            { num: "1", title: "We learn who you're looking for", desc: "You tell us about your business and ideal customer. That's it. We handle the research part." },
            { num: "2", title: "We find real people", desc: "No generic lists. We hunt for actual people who match what you're looking for." },
            { num: "3", title: "We write in your voice", desc: "Short, personal emails that sound like you. Not corporate. Not generic. Just real." },
            { num: "4", title: "We send on your schedule", desc: "Every day, a few emails go out. Spaced out so they feel like one person reaching out." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "20px" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#a8d5a2", minWidth: "40px" }}>
                {item.num}
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "6px", color: "#e8f3e5" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.5", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" style={{ padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px", textAlign: "center" }}>
          Why people actually reply
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "48px" }}>
          {[
            { title: "It sounds real", desc: "Emails sound like a human wrote them. Because you trained it." },
            { title: "It's personalized", desc: "Each email mentions something specific about the person. Real research." },
            { title: "It's consistent", desc: "You pick the pace. Same voice, same quality, every single email." },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "20px",
              background: "rgba(168, 213, 162, 0.08)",
              border: "1px solid rgba(168, 213, 162, 0.12)",
              borderRadius: "12px",
            }}>
              <h3 style={{ fontSize: "13px", fontWeight: "700", marginBottom: "6px", color: "#a8d5a2" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#888", lineHeight: "1.5", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 20px", maxWidth: "640px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#e8f3e5", marginBottom: "48px", textAlign: "center" }}>
          Questions
        </h2>
        <div>
          {faqItems.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(168, 213, 162, 0.1)", paddingBottom: "16px", marginBottom: "16px" }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#e8f3e5",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"}
                onMouseOut={(e) => e.currentTarget.style.color = "#e8f3e5"}
              >
                {item.q}
                <span style={{ fontSize: "16px", color: "#a8d5a2" }}>
                  {expandedFAQ === i ? "−" : "+"}
                </span>
              </button>
              {expandedFAQ === i && (
                <p style={{ fontSize: "12px", color: "#888", marginTop: "12px", lineHeight: "1.6", paddingLeft: "12px", borderLeft: "2px solid #a8d5a2", margin: "12px 0 0 0" }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 20px 100px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", background: "rgba(168, 213, 162, 0.08)", border: "1px solid rgba(168, 213, 162, 0.12)", borderRadius: "16px", padding: "48px 32px", textAlign: "center", backdropFilter: "blur(10px)" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px" }}>
            Ready to stop writing cold emails?
          </h2>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
            15 minutes to set up. Runs on autopilot after that.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#a8d5a2",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(168, 213, 162, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "center", borderTop: "1px solid rgba(168, 213, 162, 0.1)", color: "#555", fontSize: "11px" }}>
        <p>© 2026 NIO. All rights reserved.</p>
      </footer>
    </div>
  );
}
