"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Metric {
  key: string;
  value: number | string;
  label: string;
}

interface ActivityEvent {
  timestamp: string;
  action: string;
  details: string;
  status: string;
}

interface DashboardData {
  campaign_id: string;
  agent_name: string;
  agent_role: string;
  status: string;
  metrics: Metric[];
  activity: ActivityEvent[];
  emails_sent_today: number;
  reply_rate: number;
  open_rate: number;
  next_send: string;
}

export default function Dashboard() {
  const params = useParams();
  const campaignId = params.id as string;

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignStatus, setCampaignStatus] = useState("active");

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [campaignId]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/${campaignId}/stats`);
      const data = await res.json();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCampaignControl = async (action: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/${campaignId}/control`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      setCampaignStatus(data.status);
    } catch (error) {
      console.error("Failed to control campaign:", error);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatPercent = (decimal: number) => {
    return `${(decimal * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", paddingTop: "100px" }}>
          <p style={{ color: "#666" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: "#666" }}>Failed to load dashboard.</p>
        </div>
      </div>
    );
  }

  const statusColor = {
    active: "#a8d5a2",
    paused: "#d4b5a0",
    completed: "#ccc",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <Link href="/agents">
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#a8d5a2", marginBottom: "24px", fontWeight: "600" }}>
              ← New campaign
            </button>
          </Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
                Campaign running
              </h1>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                Agent: <strong>{dashboard.agent_name}</strong> • Role: {dashboard.agent_role}
              </p>
            </div>
            <div style={{
              padding: "8px 16px",
              background: statusColor[campaignStatus as keyof typeof statusColor] || "#a8d5a2",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              color: "#ffffff",
              textTransform: "uppercase",
            }}>
              {campaignStatus}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "20px", border: "1px solid #ddd" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Sent Today
            </p>
            <p style={{ fontSize: "32px", fontWeight: "700", color: "#a8d5a2", margin: 0 }}>
              {dashboard.emails_sent_today}
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "20px", border: "1px solid #ddd" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Open Rate
            </p>
            <p style={{ fontSize: "32px", fontWeight: "700", color: "#a8d5a2", margin: 0 }}>
              {formatPercent(dashboard.open_rate)}
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "20px", border: "1px solid #ddd" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Reply Rate
            </p>
            <p style={{ fontSize: "32px", fontWeight: "700", color: "#a8d5a2", margin: 0 }}>
              {formatPercent(dashboard.reply_rate)}
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "20px", border: "1px solid #ddd" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Next Send
            </p>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>
              {formatDate(dashboard.next_send)}
            </p>
          </div>
        </div>

        {/* All Metrics */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", marginBottom: "40px", border: "1px solid #ddd" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 20px 0" }}>
            Campaign Stats
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
            {dashboard.metrics.map((metric) => (
              <div key={metric.key}>
                <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px 0", fontWeight: "600" }}>
                  {metric.label}
                </p>
                <p style={{ fontSize: "28px", fontWeight: "700", color: "#a8d5a2", margin: 0 }}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", marginBottom: "40px", border: "1px solid #ddd" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 20px 0" }}>
            Recent Activity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {dashboard.activity.map((event, i) => (
              <div key={i} style={{
                padding: "12px 16px",
                background: "#f4f9f0",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 4px 0" }}>
                    {event.action}
                  </p>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                    {event.details}
                  </p>
                </div>
                <p style={{ fontSize: "12px", color: "#999", margin: 0, whiteSpace: "nowrap" }}>
                  {formatDate(event.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Controls */}
        <div style={{ paddingTop: "40px", borderTop: "1px solid #ddd", display: "flex", gap: "12px" }}>
          {campaignStatus === "active" ? (
            <>
              <button
                onClick={() => handleCampaignControl("pause")}
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  background: "#ffffff",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#f4f9f0"}
                onMouseOut={(e) => e.currentTarget.style.background = "#ffffff"}
              >
                Pause Campaign
              </button>
            </>
          ) : (
            <button
              onClick={() => handleCampaignControl("resume")}
              style={{
                flex: 1,
                padding: "14px 20px",
                background: "#a8d5a2",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Resume Campaign
            </button>
          )}
          <button
            onClick={() => handleCampaignControl("stop")}
            style={{
              flex: 1,
              padding: "14px 20px",
              background: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1a1a1a",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#ffe8e8"}
            onMouseOut={(e) => e.currentTarget.style.background = "#ffffff"}
          >
            Stop Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
