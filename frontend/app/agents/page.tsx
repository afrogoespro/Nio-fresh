"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  age: string | null;
  role: string;
  description: string;
  vibe: string;
  avatar_url: string;
}

interface AgentListResponse {
  agents: Agent[];
  build_your_own: Agent;
}

export default function AgentSelection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [buildYourOwn, setBuildYourOwn] = useState<Agent | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/`);
      const data: AgentListResponse = await res.json();
      setAgents(data.agents);
      setBuildYourOwn(data.build_your_own);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (agentId: string) => {
    setSelectedId(agentId);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <Link href="/">
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#a8d5a2", marginBottom: "24px", fontWeight: "600" }}>
              ← Back to home
            </button>
          </Link>
          <h1 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
            Pick your agent
          </h1>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Each agent has its own voice and style. Pick one that matches how you talk, or train your own.
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
            Loading agents...
          </div>
        ) : (
          <>
            {/* Pre-built Agents Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => handleSelect(agent.id)}
                  style={{
                    padding: "24px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: selectedId === agent.id ? "3px solid #a8d5a2" : "1px solid #ddd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: selectedId === agent.id ? "0 8px 24px rgba(168, 213, 162, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseOver={(e) => {
                    if (selectedId !== agent.id) {
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedId !== agent.id) {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {/* Avatar placeholder */}
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: "#a8d5a2",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "32px",
                    fontWeight: "700",
                  }}>
                    {agent.name.charAt(0)}
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px 0" }}>
                    {agent.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#a8d5a2", margin: "0 0 12px 0", fontWeight: "600", textTransform: "uppercase" }}>
                    {agent.role}
                  </p>
                  {agent.age && (
                    <p style={{ fontSize: "12px", color: "#999", margin: "0 0 12px 0" }}>
                      {agent.age} years old
                    </p>
                  )}
                  <p style={{ fontSize: "13px", color: "#666", margin: "0 0 12px 0", lineHeight: "1.5" }}>
                    {agent.description}
                  </p>
                  <div style={{
                    padding: "8px 12px",
                    background: "#f4f9f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#a8d5a2",
                    fontWeight: "600",
                    textAlign: "center",
                  }}>
                    Vibe: {agent.vibe}
                  </div>

                  {selectedId === agent.id && (
                    <div style={{
                      marginTop: "16px",
                      padding: "8px 12px",
                      background: "#a8d5a2",
                      color: "#1a1a1a",
                      borderRadius: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}>
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Agent Option */}
            {buildYourOwn && (
              <div style={{ marginBottom: "60px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a1a", marginBottom: "24px" }}>
                  Or build your own
                </h2>
                <div
                  onClick={() => handleSelect("custom")}
                  style={{
                    padding: "32px 24px",
                    background: selectedId === "custom" ? "#a8d5a2" : "#ffffff",
                    borderRadius: "16px",
                    border: selectedId === "custom" ? "3px solid #8dc880" : "2px dashed #a8d5a2",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseOver={(e) => {
                    if (selectedId !== "custom") {
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(168, 213, 162, 0.2)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedId !== "custom") {
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: selectedId === "custom" ? "#ffffff" : "#1a1a1a",
                    margin: "0 0 8px 0",
                  }}>
                    {buildYourOwn.name}
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: selectedId === "custom" ? "rgba(255,255,255,0.8)" : "#666",
                    margin: "0 0 12px 0",
                    lineHeight: "1.6",
                  }}>
                    {buildYourOwn.description}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: selectedId === "custom" ? "rgba(255,255,255,0.7)" : "#a8d5a2",
                    margin: 0,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}>
                    {buildYourOwn.vibe}
                  </p>
                </div>
              </div>
            )}

            {/* Continue Button */}
            {selectedId && (
              <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #ddd", textAlign: "center" }}>
                <Link href={`/setup?agent=${selectedId}`}>
                  <button style={{
                    background: "#1a1a1a",
                    color: "#e8f3e5",
                    border: "none",
                    borderRadius: "24px",
                    padding: "16px 40px",
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
                    Continue with {agents.find(a => a.id === selectedId)?.name || "custom agent"} →
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
