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
    <div style={{ minHeight: "100vh", background: "#0f1f1a", fontFamily: "'DM Sans', sans-serif", color: "#e8f3e5" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(15, 31, 26, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "999px",
        padding: "12px 28px",
        display: "flex",
        gap: "40px",
        alignItems: "center",
        zIndex: 1000,
        border: "1px solid rgba(168, 213, 162, 0.15)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#a8d5a2" }}>nio</span>
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
        <div style={{ maxWidth: "800px", width: "100%" }}>
          {/* Left side: Text */}
          <div style={{ marginBottom: "60px", textAlign: "center" }}>
            <h1 style={{
              fontSize: "56px",
              fontWeight: "700",
              lineHeight: "1.2",
              marginBottom: "20px",
              color: "#e8f3e5"
            }}>
              Custom outreach on autopilot.
            </h1>
            <p style={{
              fontSize: "18px",
              color: "#999",
              marginBottom: "40px",
              lineHeight: "1.6",
              maxWidth: "100%",
              margin: "0 auto 40px"
            }}>
              NIO learns your voice, finds real prospects, writes personal emails, and sends them daily. No templates. No spam. Just results.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/agents">
                <button style={{
                  background: "#a8d5a2",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 36px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Start free →
              </button>
              </Link>
            </div>
          </div>

          {/* Visual Demo - Simple mockup of the process */}
          <div style={{
            background: "rgba(168, 213, 162, 0.05)",
            border: "1px solid rgba(168, 213, 162, 0.15)",
            borderRadius: "12px",
            padding: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}>
            {/* Left: Step indicator */}
            <div>
              <div style={{ fontSize: "12px", color: "#a8d5a2", textTransform: "uppercase", fontWeight: "600", marginBottom: "16px", letterSpacing: "0.05em" }}>
                Four simple steps
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 0",
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#a8d5a2",
                      color: "#1a1a1a",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}>
                      {num}
                    </div>
                    <div style={{
                      fontSize: "13px",
                      color: "#ccc",
                      fontWeight: "500",
                    }}>
                      {num === 1 && "Tell us about your business"}
                      {num === 2 && "Describe your ideal customer"}
                      {num === 3 && "Show us your voice"}
                      {num === 4 && "Set your outreach pace"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Output preview */}
            <div>
              <div style={{ fontSize: "12px", color: "#a8d5a2", textTransform: "uppercase", fontWeight: "600", marginBottom: "16px", letterSpacing: "0.05em" }}>
                What you get
              </div>
              <div style={{
                background: "#1a1a1a",
                border: "1px solid rgba(168, 213, 162, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "12px",
                color: "#ccc",
                lineHeight: "1.6",
              }}>
                <div style={{ color: "#a8d5a2", fontWeight: "600", marginBottom: "8px" }}>
                  Subject: Quick question about your product
                </div>
                <div>
                  Hi Sarah, saw you just launched the new feature. We're using similar tools at our company and would love to compare notes...
                </div>
              </div>
              <div style={{
                fontSize: "11px",
                color: "#666",
                marginTop: "12px",
                fontStyle: "italic"
              }}>
                12 personalized emails sent today
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Flow (Below fold) */}
      <section style={{ padding: "80px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Left: Animated connector */}
          <div style={{ position: "relative", width: "60px", flexShrink: 0 }}>
            <svg width="60" height="100%" viewBox="0 0 60 800" style={{ position: "absolute", top: 0, left: 0 }}>
              {steps.map((_, i) => {
                if (i < steps.length - 1) {
                  return (
                    <line
                      key={`line-${i}`}
                      x1="30"
                      y1={i * 200 + 60}
                      x2="30"
                      y2={(i + 1) * 200}
                      stroke="#a8d5a2"
                      strokeWidth="2"
                      opacity={visibleSteps.has(i + 1) ? 0.4 : 0.1}
                      style={{
                        transition: "opacity 0.6s ease",
                        transitionDelay: `${visibleSteps.has(i + 1) ? (i + 1) * 0.1 : 0}s`,
                      }}
                    />
                  );
                }
                return null;
              })}

              {/* Arrow heads */}
              {steps.map((_, i) => {
                if (i < steps.length - 1) {
                  return (
                    <g
                      key={`arrow-${i}`}
                      opacity={visibleSteps.has(i + 1) ? 0.4 : 0.1}
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
                  background: "#a8d5a2",
                  color: "#1a1a1a",
                  borderRadius: "8px",
                  opacity: visibleSteps.has(i) ? 1 : 0,
                  transform: visibleSteps.has(i) ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: `${visibleSteps.has(i) ? i * 0.1 : 0}s`,
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                  {step.num}
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
                  {step.title}
                </div>
                <div style={{ fontSize: "13px", fontWeight: "400", opacity: 0.8 }}>
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
                background: "#1a1a1a",
                color: "#a8d5a2",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                border: "1px solid #a8d5a2",
                opacity: visibleSteps.has(steps.length) ? 1 : 0,
                transform: visibleSteps.has(steps.length) ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${visibleSteps.has(steps.length) ? steps.length * 0.1 : 0}s`,
              }}
            >
              Then we start →
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px", textAlign: "center" }}>
          Here's what actually happens
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "center", marginBottom: "60px" }}>
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
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: "#e8f3e5" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#999", lineHeight: "1.5", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" style={{ padding: "100px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px", textAlign: "center" }}>
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
              background: "#1a1a1a",
              border: "1px solid rgba(168, 213, 162, 0.2)",
              borderRadius: "8px",
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px", color: "#a8d5a2" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#999", lineHeight: "1.5", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 20px", maxWidth: "640px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "60px", textAlign: "center" }}>
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
                <p style={{ fontSize: "13px", color: "#999", marginTop: "12px", lineHeight: "1.6", paddingLeft: "12px", borderLeft: "2px solid #a8d5a2" }}>
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
          <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px" }}>
            Ready to stop writing cold emails?
          </h2>
          <p style={{ fontSize: "14px", color: "#999", marginBottom: "32px" }}>
            15 minutes to set up. Runs on autopilot after that.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#a8d5a2",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              Start free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "center", borderTop: "1px solid rgba(168, 213, 162, 0.1)", color: "#555", fontSize: "12px" }}>
        <p>© 2026 NIO. All rights reserved.</p>
      </footer>
    </div>
  );
}
