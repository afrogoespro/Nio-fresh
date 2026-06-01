"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Setup() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get("agent") || "unknown";

  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm here to learn how you talk so I can write emails in your voice. Let's start with your business. What do you do?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [campaignId, setCampaignId] = useState("");

  // Step prompts
  const stepPrompts = [
    "Tell us about your business",
    "Who do you want to reach?",
    "How do you want to sound?",
    "How often should we send?",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Call voice/chat endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voice/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: agentId,
          step: step,
          user_input: input,
          conversation_history: newMessages,
        }),
      });
      const data = await res.json();

      // Add assistant response
      setMessages([...newMessages, { role: "assistant", content: data.response }]);

      // If this is the last step, move forward
      if (step < stepPrompts.length) {
        setStep(step + 1);
      } else {
        // Save campaign and move to plan page
        setCampaignId(data.campaign_id || "temp-campaign-id");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I had trouble understanding that. Can you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (campaignId) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", paddingTop: "100px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
            Perfect! 🎉
          </h1>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px", lineHeight: "1.6" }}>
            I've learned how you talk. Now let's see who you want to reach and create your campaign plan.
          </p>
          <Link href={`/plan/${campaignId}`}>
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
            }}>
              See your campaign plan →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <Link href="/agents">
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#a8d5a2", marginBottom: "24px", fontWeight: "600" }}>
              ← Change agent
            </button>
          </Link>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
            {stepPrompts[step - 1]}
          </h1>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Step {step} of {stepPrompts.length}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          height: "4px",
          background: "#ddd",
          borderRadius: "2px",
          marginBottom: "40px",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${(step / stepPrompts.length) * 100}%`,
            height: "100%",
            background: "#a8d5a2",
            transition: "width 0.3s ease",
          }} />
        </div>

        {/* Chat messages */}
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "24px",
          border: "1px solid #ddd",
        }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: msg.role === "user" ? "#a8d5a2" : "#f4f9f0",
                  color: msg.role === "user" ? "#ffffff" : "#1a1a1a",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ marginBottom: "16px", display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "#f4f9f0",
                  color: "#666",
                  fontSize: "14px",
                }}>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: "12px" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your response..."
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                resize: "none",
                minHeight: "40px",
                maxHeight: "120px",
                color: "#1a1a1a",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "#a8d5a2"}
              onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              style={{
                padding: "12px 24px",
                background: input.trim() && !isLoading ? "#a8d5a2" : "#ddd",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "8px",
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.background = "#8dc880";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = input.trim() && !isLoading ? "#a8d5a2" : "#ddd";
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
