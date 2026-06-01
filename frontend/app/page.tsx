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

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a" }}>
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
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#e8f3e5" }}>nio</span>
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
            Try it now
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "52px", fontWeight: "700", lineHeight: "1.2", marginBottom: "12px", color: "#1a1a1a" }}>
            Intelligent cold outreach, done right.
          </h1>
          <p style={{ fontSize: "20px", color: "#666", marginBottom: "32px", lineHeight: "1.5" }}>
            NIO learns how you talk, finds the right people, and writes personalized emails—all on autopilot.
          </p>
          <Link href="/agents">
            <button style={{
              background: "#1a1a1a",
              color: "#e8f3e5",
              border: "none",
              borderRadius: "24px",
              padding: "14px 36px",
              fontSize: "16px",
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
              Start free →
            </button>
          </Link>
        </div>
      </section>

      {/* 4-Step Animated Flow */}
      <section style={{ paddingBottom: "100px", padding: "40px 20px 100px" }}>
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
                    background: "#a8d5a2",
                    color: "#fff",
                    padding: "24px 28px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "left",
                    opacity: visibleSteps.has(i) ? 1 : 0,
                    transform: visibleSteps.has(i) ? "translateX(0)" : "translateX(-40px)",
                    transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${visibleSteps.has(i) ? i * 0.1 : 0}s`,
                    marginBottom: i < steps.length - 1 ? "0" : "20px",
                  }}
                >
                  <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px", opacity: 0.8 }}>
                    {step.num}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "2px" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "400", opacity: 0.9 }}>
                    {step.desc}
                  </div>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "12px 0",
                      opacity: visibleSteps.has(i + 1) ? 1 : 0.3,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 5V35M20 35L10 25M20 35L30 25"
                        stroke="#a8d5a2"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                background: "#1a1a1a",
                color: "#e8f3e5",
                padding: "24px 28px",
                borderRadius: "12px",
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

      {/* How It Works Explained */}
      <section id="how" style={{ paddingBottom: "80px", background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
              Here's what actually happens
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>
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
                  <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.6" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" style={{ paddingBottom: "80px", padding: "80px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
              Why people actually reply
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
            {[
              { title: "It sounds real", desc: "Emails sound like a human wrote them. Because you trained it." },
              { title: "It's personalized", desc: "Each email mentions something specific about the person. Real research." },
              { title: "It's consistent", desc: "You pick the pace. Same voice, same quality, every single email." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px", background: "#f4f9f0", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#1a1a1a" }}>
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
            <h2 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
              Questions
            </h2>
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
          <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#e8f3e5", marginBottom: "16px" }}>
            Ready to stop writing cold emails?
          </h2>
          <p style={{ fontSize: "16px", color: "#ccc", marginBottom: "32px" }}>
            15 minutes to set up. Runs on autopilot after that.
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
              Start free →
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
