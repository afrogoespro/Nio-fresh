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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8f6f1 0%, #fafaf8 50%, #f5f3ed 100%)", fontFamily: "'DM Sans', sans-serif", color: "#2a2a2a" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: "999px",
        padding: "12px 28px",
        display: "flex",
        gap: "40px",
        alignItems: "center",
        zIndex: 1000,
        border: "1px solid rgba(168, 213, 162, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#a8d5a2" }}>nio</span>
        <div style={{ display: "flex", gap: "28px", fontSize: "12px" }}>
          <a href="#how" style={{ color: "#666", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#666"}>How it works</a>
          <a href="#why" style={{ color: "#666", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#666"}>Why NIO</a>
          <a href="#faq" style={{ color: "#666", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#666"}>FAQ</a>
        </div>
        <Link href="/agents">
          <button style={{
            background: "#a8d5a2",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(168, 213, 162, 0.25)",
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

      {/* Hero - Above the Fold */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: "1000px", width: "100%" }}>
          {/* Text + Visual Container */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            {/* Left: Text */}
            <div>
              <h1 style={{
                fontSize: "52px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "20px",
                color: "#2a2a2a"
              }}>
                Custom outreach on autopilot.
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#666",
                marginBottom: "40px",
                lineHeight: "1.6"
              }}>
                NIO learns your voice, finds real prospects, writes personal emails, and sends them daily. No templates. No spam. Just results.
              </p>
              <Link href="/agents">
                <button style={{
                  background: "#a8d5a2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 36px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 8px 24px rgba(168, 213, 162, 0.3)",
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(168, 213, 162, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(168, 213, 162, 0.3)";
                  }}
                >
                  Start free →
                </button>
              </Link>
            </div>

            {/* Right: 3D Clay-style Illustration */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              position: "relative",
            }}>
              {/* Glass container with 3D effect */}
              <div style={{
                width: "100%",
                height: "400px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                border: "1px solid rgba(168, 213, 162, 0.3)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Left: Prospects */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", marginBottom: "12px" }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${i === 1 ? "#d4a574" : i === 2 ? "#c9956f" : "#deb887"}, ${i === 1 ? "#e8c9a8" : i === 2 ? "#dfc2a0" : "#f0dcc9"})`,
                        boxShadow: `0 8px 16px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.3)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#fff",
                      }}
                    >
                      {i}
                    </div>
                  ))}
                </div>

                {/* Message bubble from prospects */}
                <div style={{
                  background: "rgba(168, 213, 162, 0.15)",
                  border: "1px solid rgba(168, 213, 162, 0.3)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "12px",
                  color: "#2a2a2a",
                  lineHeight: "1.4",
                }}>
                  "Your product looks interesting..."
                </div>

                {/* Arrow indicator */}
                <div style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "#a8d5a2",
                  fontWeight: "700",
                }}>
                  ↓
                </div>

                {/* Right: Business Owner */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #a8d5a2, #96c88f)",
                      boxShadow: `0 12px 24px rgba(0, 0, 0, 0.15), inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px rgba(255, 255, 255, 0.4)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    👤
                  </div>
                </div>

                {/* Message bubble from owner */}
                <div style={{
                  background: "rgba(168, 213, 162, 0.2)",
                  border: "1px solid rgba(168, 213, 162, 0.4)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "12px",
                  color: "#2a2a2a",
                  lineHeight: "1.4",
                  textAlign: "right",
                }}>
                  "Let's chat!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Flow (Below fold) */}
      <section style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Left: Animated connector */}
          <div style={{ position: "relative", width: "60px", flexShrink: 0 }}>
            <svg width="60" height="100%" viewBox="0 0 60 800" style={{ position: "absolute", top: 0, left: 0 }}>
              {steps.map((_, i) => {
                if (i < steps.length - 1) {
                  return (
                    <path
                      key={`curve-${i}`}
                      d={`M 30 ${i * 200 + 60} Q 50 ${(i * 200 + 60 + (i + 1) * 200) / 2} 30 ${(i + 1) * 200}`}
                      fill="none"
                      stroke="#a8d5a2"
                      strokeWidth="2.5"
                      opacity={visibleSteps.has(i + 1) ? 0.5 : 0.1}
                      style={{
                        transition: "opacity 0.6s ease",
                        transitionDelay: `${visibleSteps.has(i + 1) ? (i + 1) * 0.1 : 0}s`,
                      }}
                    />
                  );
                }
                return null;
              })}

              {/* Animated arrow heads */}
              {steps.map((_, i) => {
                if (i < steps.length - 1) {
                  return (
                    <g
                      key={`arrow-${i}`}
                      opacity={visibleSteps.has(i + 1) ? 0.5 : 0.1}
                      style={{
                        transition: "opacity 0.6s ease",
                        transitionDelay: `${visibleSteps.has(i + 1) ? (i + 1) * 0.1 : 0}s`,
                      }}
                    >
                      <polygon points="30,200 25,190 35,190" fill="#a8d5a2" />
                    </g>
                  );
                }
                return null;
              })}
            </svg>
          </div>

          {/* Right: Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "140px", flex: 1 }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, rgba(168, 213, 162, 0.15), rgba(168, 213, 162, 0.05))",
                  border: "1px solid rgba(168, 213, 162, 0.2)",
                  color: "#2a2a2a",
                  borderRadius: "12px",
                  opacity: visibleSteps.has(i) ? 1 : 0,
                  transform: visibleSteps.has(i) ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: `${visibleSteps.has(i) ? i * 0.1 : 0}s`,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#a8d5a2" }}>
                  {step.num}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px", color: "#2a2a2a" }}>
                  {step.title}
                </div>
                <div style={{ fontSize: "13px", fontWeight: "400", opacity: 0.7, color: "#666" }}>
                  {step.desc}
                </div>
              </div>
            ))}

            <div
              ref={(el) => {
                if (el) stepRefs.current[steps.length] = el;
              }}
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #a8d5a2, #96c88f)",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                opacity: visibleSteps.has(steps.length) ? 1 : 0,
                transform: visibleSteps.has(steps.length) ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${visibleSteps.has(steps.length) ? steps.length * 0.1 : 0}s`,
                boxShadow: "0 8px 20px rgba(168, 213, 162, 0.3)",
              }}
            >
              Then we start →
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#2a2a2a", marginBottom: "12px", textAlign: "center" }}>
          Here's what actually happens
        </h2>
        <p style={{ fontSize: "14px", color: "#666", textAlign: "center", marginBottom: "60px" }}>
          Simple. No complex setup. No spam. Just real emails that work.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
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
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: "#2a2a2a" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#2a2a2a", marginBottom: "12px", textAlign: "center" }}>
          Why people actually reply
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "60px" }}>
          {[
            { title: "It sounds real", desc: "Emails sound like a human wrote them. Because you trained it." },
            { title: "It's personalized", desc: "Each email mentions something specific about the person. Real research." },
            { title: "It's consistent", desc: "You pick the pace. Same voice, same quality, every single email." },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "24px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))",
              border: "1px solid rgba(168, 213, 162, 0.15)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px", color: "#a8d5a2" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 20px", maxWidth: "640px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#2a2a2a", marginBottom: "60px", textAlign: "center" }}>
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
                  padding: "12px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2a2a2a",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"}
                onMouseOut={(e) => e.currentTarget.style.color = "#2a2a2a"}
              >
                {item.q}
                <span style={{ fontSize: "16px", color: "#a8d5a2" }}>
                  {expandedFAQ === i ? "−" : "+"}
                </span>
              </button>
              {expandedFAQ === i && (
                <p style={{ fontSize: "13px", color: "#666", marginTop: "12px", lineHeight: "1.6", paddingLeft: "12px", borderLeft: "2px solid #a8d5a2" }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#2a2a2a", marginBottom: "12px" }}>
            Ready to stop writing cold emails?
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>
            15 minutes to set up. Runs on autopilot after that.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#a8d5a2",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 36px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 8px 24px rgba(168, 213, 162, 0.3)",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(168, 213, 162, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(168, 213, 162, 0.3)";
              }}
            >
              Start free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "center", borderTop: "1px solid rgba(168, 213, 162, 0.1)", color: "#999", fontSize: "12px" }}>
        <p>© 2026 NIO. All rights reserved.</p>
      </footer>
    </div>
  );
}
