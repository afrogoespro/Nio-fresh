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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2818 0%, #1a3a28 50%, #0f2818 100%)", fontFamily: "'DM Sans', sans-serif", color: "#e8f3e5" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(26, 26, 26, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "999px",
        padding: "14px 32px",
        display: "flex",
        gap: "48px",
        alignItems: "center",
        zIndex: 1000,
        border: "1px solid rgba(168, 213, 162, 0.2)",
      }}>
        <span style={{ fontSize: "16px", fontWeight: "700", color: "#a8d5a2" }}>nio</span>
        <div style={{ display: "flex", gap: "32px", fontSize: "13px" }}>
          <a href="#how" style={{ color: "#ccc", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#ccc"}>How it works</a>
          <a href="#why" style={{ color: "#ccc", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#ccc"}>Why NIO</a>
          <a href="#faq" style={{ color: "#ccc", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"} onMouseOut={(e) => e.currentTarget.style.color = "#ccc"}>FAQ</a>
        </div>
        <Link href="/agents">
          <button style={{
            background: "#a8d5a2",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "999px",
            padding: "10px 24px",
            fontSize: "13px",
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
      <section style={{ paddingTop: "160px", paddingBottom: "80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative geometric shapes */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(168, 213, 162, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(168, 213, 162, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }} />

        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "13px", color: "#a8d5a2", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px", fontWeight: "600" }}>
            Intelligent Outreach
          </p>
          <h1 style={{ fontSize: "56px", fontWeight: "700", lineHeight: "1.2", marginBottom: "16px", color: "#e8f3e5" }}>
            Intelligent cold outreach, done right.
          </h1>
          <p style={{ fontSize: "18px", color: "#bbb", marginBottom: "40px", lineHeight: "1.6" }}>
            NIO learns how you talk, finds the right people, and writes personalized emails—all on autopilot.
          </p>
          <Link href="/agents">
            <button style={{
              background: "linear-gradient(135deg, #a8d5a2, #96c88f)",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "12px",
              padding: "16px 40px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(168, 213, 162, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start free →
            </button>
          </Link>
        </div>
      </section>

      {/* 4-Step Animated Flow */}
      <section style={{ paddingBottom: "100px", padding: "40px 20px 100px", position: "relative" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {steps.map((step, i) => (
              <div key={i}>
                {/* Step Card */}
                <div
                  ref={(el) => {
                    if (el) stepRefs.current[i] = el;
                  }}
                  style={{
                    background: "linear-gradient(135deg, rgba(168, 213, 162, 0.15), rgba(168, 213, 162, 0.05))",
                    border: "1px solid rgba(168, 213, 162, 0.3)",
                    color: "#e8f3e5",
                    padding: "28px 32px",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "left",
                    opacity: visibleSteps.has(i) ? 1 : 0,
                    transform: visibleSteps.has(i) ? "translateX(0)" : "translateX(-40px)",
                    transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${visibleSteps.has(i) ? i * 0.1 : 0}s`,
                    marginBottom: i < steps.length - 1 ? "0" : "28px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontSize: "40px", fontWeight: "700", marginBottom: "8px", color: "#a8d5a2", opacity: 0.9 }}>
                    {step.num}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: "#e8f3e5" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "400", color: "#aaa", lineHeight: "1.5" }}>
                    {step.desc}
                  </div>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "16px 0",
                      opacity: visibleSteps.has(i + 1) ? 1 : 0.2,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 5V35M20 35L10 25M20 35L30 25"
                        stroke="#a8d5a2"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Final CTA */}
            <div
              ref={(el) => {
                if (el) stepRefs.current[steps.length] = el;
              }}
              style={{
                background: "linear-gradient(135deg, #a8d5a2, #96c88f)",
                color: "#1a1a1a",
                padding: "28px 32px",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "center",
                opacity: visibleSteps.has(steps.length) ? 1 : 0,
                transform: visibleSteps.has(steps.length) ? "translateX(0)" : "translateX(-40px)",
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${visibleSteps.has(steps.length) ? steps.length * 0.1 : 0}s`,
              }}
            >
              Then we start →
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ paddingBottom: "80px", padding: "80px 20px", position: "relative" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px" }}>
              Here's what actually happens
            </h2>
            <p style={{ fontSize: "16px", color: "#aaa" }}>
              Simple. No complex setup. No spam. Just real emails that work.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {[
              { num: "1", title: "We learn who you're looking for", desc: "You tell us about your business and ideal customer. That's it. We handle the research part." },
              { num: "2", title: "We find real people", desc: "No generic lists. We hunt for actual people who match what you're looking for." },
              { num: "3", title: "We write in your voice", desc: "Short, personal emails that sound like you. Not corporate. Not generic. Just real." },
              { num: "4", title: "We send on your schedule", desc: "Every day, a few emails go out. Spaced out so they feel like one person reaching out." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "24px" }}>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#a8d5a2", minWidth: "40px" }}>
                  {item.num}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#e8f3e5" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#aaa", lineHeight: "1.6", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" style={{ paddingBottom: "80px", padding: "80px 20px", position: "relative" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px" }}>
              Why people actually reply
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { title: "It sounds real", desc: "Emails sound like a human wrote them. Because you trained it." },
              { title: "It's personalized", desc: "Each email mentions something specific about the person. Real research." },
              { title: "It's consistent", desc: "You pick the pace. Same voice, same quality, every single email." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "24px",
                background: "rgba(168, 213, 162, 0.08)",
                border: "1px solid rgba(168, 213, 162, 0.2)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#a8d5a2" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.6", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ paddingBottom: "80px", padding: "80px 20px", position: "relative" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#e8f3e5", marginBottom: "12px" }}>
              Questions
            </h2>
          </div>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(168, 213, 162, 0.2)", paddingBottom: "16px", marginBottom: "16px" }}>
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
                    color: "#e8f3e5",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#a8d5a2"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#e8f3e5"}
                >
                  {item.q}
                  <span style={{ fontSize: "20px", color: "#a8d5a2" }}>
                    {expandedFAQ === i ? "−" : "+"}
                  </span>
                </button>
                {expandedFAQ === i && (
                  <p style={{ fontSize: "14px", color: "#aaa", marginTop: "12px", lineHeight: "1.6", paddingLeft: "12px", borderLeft: "3px solid #a8d5a2", margin: "12px 0 0 0" }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 20px", position: "relative" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", background: "linear-gradient(135deg, rgba(168, 213, 162, 0.1), rgba(168, 213, 162, 0.05))", border: "1px solid rgba(168, 213, 162, 0.3)", borderRadius: "20px", padding: "60px 32px", textAlign: "center", backdropFilter: "blur(10px)" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#e8f3e5", marginBottom: "16px" }}>
            Ready to stop writing cold emails?
          </h2>
          <p style={{ fontSize: "16px", color: "#aaa", marginBottom: "32px" }}>
            15 minutes to set up. Runs on autopilot after that.
          </p>
          <Link href="/agents">
            <button style={{
              background: "linear-gradient(135deg, #a8d5a2, #96c88f)",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "12px",
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(168, 213, 162, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start free →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: "40px", paddingBottom: "40px", textAlign: "center", borderTop: "1px solid rgba(168, 213, 162, 0.2)", color: "#666", fontSize: "12px" }}>
        <p>© 2026 NIO. All rights reserved.</p>
      </footer>
    </div>
  );
}
