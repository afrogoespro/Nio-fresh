"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ICPTag {
  type: string;
  value: string;
  category: string;
}

interface PlanData {
  campaign_id: string;
  business_summary: string;
  icp_tags: ICPTag[];
  emails_per_day: number;
  sending_window: string;
  message: string;
}

export default function PlanReview() {
  const params = useParams();
  const campaignId = params.id as string;

  const [plan, setPlan] = useState<PlanData | null>(null);
  const [emailsPerDay, setEmailsPerDay] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, [campaignId]);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaignId,
          business_description: "Your business",
          target_description: "Your target",
          goal: "Your goal",
        }),
      });
      const data = await res.json();
      setPlan(data);
      setEmailsPerDay(data.emails_per_day || 12);
    } catch (error) {
      console.error("Failed to fetch plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tagColors: Record<string, string> = {
    green: "#e8f3e5",
    tan: "#f5f0e8",
    purple: "#f3e8f5",
  };

  const tagBorders: Record<string, string> = {
    green: "#a8d5a2",
    tan: "#d4b5a0",
    purple: "#c9a8d5",
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", paddingTop: "100px" }}>
          <p style={{ color: "#666" }}>Loading your plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ color: "#666" }}>Failed to load plan. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <Link href="/agents">
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#a8d5a2", marginBottom: "24px", fontWeight: "600" }}>
            ← Start over
          </button>
        </Link>
        <h1 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
          Here's your plan
        </h1>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
          {plan.message}
        </p>

        {/* Business Summary */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", marginBottom: "24px", border: "1px solid #ddd" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0" }}>
            Your Business
          </h2>
          <p style={{ fontSize: "16px", color: "#1a1a1a", lineHeight: "1.6", margin: 0 }}>
            {plan.business_summary}
          </p>
        </div>

        {/* ICP Tags */}
        {plan.icp_tags.length > 0 && (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", marginBottom: "24px", border: "1px solid #ddd" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 16px 0" }}>
              Who we're targeting
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {plan.icp_tags.map((tag, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    background: tagColors[tag.category] || "#f4f9f0",
                    border: `1px solid ${tagBorders[tag.category] || "#a8d5a2"}`,
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "#1a1a1a",
                    fontWeight: "600",
                  }}
                >
                  {tag.value}
                  <span style={{ fontSize: "11px", color: "#999", marginLeft: "8px", fontWeight: "400" }}>
                    ({tag.type})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Frequency Adjustment */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", marginBottom: "24px", border: "1px solid #ddd" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 16px 0" }}>
            Email frequency
          </h2>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <label style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: "600" }}>
                Emails per day
              </label>
              <span style={{ fontSize: "24px", fontWeight: "700", color: "#a8d5a2" }}>
                {emailsPerDay}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={emailsPerDay}
              onChange={(e) => setEmailsPerDay(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "#ddd",
                outline: "none",
                WebkitAppearance: "none",
              } as any}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #a8d5a2;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #a8d5a2;
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
            `}</style>
          </div>
          <p style={{ fontSize: "13px", color: "#666", margin: "0", lineHeight: "1.5" }}>
            We'll send {emailsPerDay} emails per day between 9am-12pm. Each gets personalized research. No spam.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #ddd", display: "flex", gap: "12px" }}>
          <button style={{
            flex: 1,
            padding: "14px 20px",
            background: "none",
            border: "1px solid #ddd",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#1a1a1a",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f4f9f0";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            Edit Plan
          </button>
          <Link href={`/preview/${campaignId}`} style={{ flex: 1 }}>
            <button style={{
              width: "100%",
              padding: "14px 20px",
              background: "#1a1a1a",
              color: "#e8f3e5",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              See email samples →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
