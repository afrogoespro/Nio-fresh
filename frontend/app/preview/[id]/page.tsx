"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface EmailSample {
  id: string;
  subject: string;
  body: string;
  to_person: string;
  to_company: string;
  personalization: string;
}

interface PreviewData {
  campaign_id: string;
  emails: EmailSample[];
  agent_tone: string;
  message: string;
}

export default function EmailPreview() {
  const params = useParams();
  const campaignId = params.id as string;

  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPreview();
  }, [campaignId]);

  const fetchPreview = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaignId,
          num_samples: 3,
        }),
      });
      const data = await res.json();
      setPreview(data);
      // Pre-select all emails
      const allIds = new Set(data.emails.map((e: EmailSample) => e.id));
      setSelectedEmails(allIds);
    } catch (error) {
      console.error("Failed to fetch preview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEmail = (emailId: string) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId);
    } else {
      newSelected.add(emailId);
    }
    setSelectedEmails(newSelected);
  };

  const handleApprove = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/${campaignId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: campaignId,
          approved_email_ids: Array.from(selectedEmails),
        }),
      });
      // Redirect to dashboard
      window.location.href = `/dashboard/${campaignId}`;
    } catch (error) {
      console.error("Failed to approve emails:", error);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preview/${campaignId}/regenerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_samples: 3 }),
      });
      const data = await res.json();
      setPreview(data);
      setCurrentIndex(0);
      // Re-select all
      const allIds = new Set(data.emails.map((e: EmailSample) => e.id));
      setSelectedEmails(allIds);
    } catch (error) {
      console.error("Failed to regenerate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", paddingTop: "100px" }}>
          <p style={{ color: "#666" }}>Loading email samples...</p>
        </div>
      </div>
    );
  }

  if (!preview || preview.emails.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ color: "#666" }}>Failed to load emails. Please try again.</p>
        </div>
      </div>
    );
  }

  const currentEmail = preview.emails[currentIndex];
  const hasNext = currentIndex < preview.emails.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#e8f3e5", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <Link href={`/plan/${campaignId}`}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#a8d5a2", marginBottom: "24px", fontWeight: "600" }}>
            ← Back to plan
          </button>
        </Link>
        <h1 style={{ fontSize: "40px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
          Sample emails
        </h1>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
          {preview.message}
        </p>

        {/* Email Card */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "32px", marginBottom: "24px", border: "1px solid #ddd" }}>
          {/* Recipient info */}
          <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #eee" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px 0", fontWeight: "600" }}>
              Sending to
            </p>
            <p style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: "700", margin: "0 0 4px 0" }}>
              {currentEmail.to_person}
            </p>
            <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
              {currentEmail.to_company}
            </p>
            {currentEmail.personalization && (
              <div style={{
                marginTop: "12px",
                padding: "12px",
                background: "#f4f9f0",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#666",
                borderLeft: "3px solid #a8d5a2",
              }}>
                <strong style={{ color: "#a8d5a2" }}>Personalization:</strong> {currentEmail.personalization}
              </div>
            )}
          </div>

          {/* Email content */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Subject
            </p>
            <p style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: "700", margin: "0 0 24px 0", lineHeight: "1.5" }}>
              {currentEmail.subject}
            </p>

            <p style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px 0", fontWeight: "600" }}>
              Body
            </p>
            <div style={{
              padding: "16px",
              background: "#f4f9f0",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1a1a1a",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}>
              {currentEmail.body}
            </div>
          </div>

          {/* Checkbox to select */}
          <div style={{
            paddingTop: "24px",
            borderTop: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <input
              type="checkbox"
              checked={selectedEmails.has(currentEmail.id)}
              onChange={() => toggleEmail(currentEmail.id)}
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: "#a8d5a2",
              }}
            />
            <label style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: "600", cursor: "pointer" }}>
              Approve this email
            </label>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={!hasPrev}
            style={{
              padding: "10px 16px",
              background: hasPrev ? "#ffffff" : "#f4f9f0",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              color: hasPrev ? "#1a1a1a" : "#999",
              cursor: hasPrev ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            ← Previous
          </button>

          <p style={{ fontSize: "13px", color: "#999" }}>
            Email {currentIndex + 1} of {preview.emails.length}
          </p>

          <button
            onClick={() => setCurrentIndex(Math.min(preview.emails.length - 1, currentIndex + 1))}
            disabled={!hasNext}
            style={{
              padding: "10px 16px",
              background: hasNext ? "#ffffff" : "#f4f9f0",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              color: hasNext ? "#1a1a1a" : "#999",
              cursor: hasNext ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            Next →
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", paddingTop: "40px", borderTop: "1px solid #ddd" }}>
          <button
            onClick={handleRegenerate}
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
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f4f9f0";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#ffffff";
            }}
          >
            Regenerate
          </button>
          <button
            onClick={handleApprove}
            disabled={selectedEmails.size === 0}
            style={{
              flex: 1,
              padding: "14px 20px",
              background: selectedEmails.size > 0 ? "#1a1a1a" : "#ddd",
              color: "#e8f3e5",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: selectedEmails.size > 0 ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              if (selectedEmails.size > 0) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Launch campaign ({selectedEmails.size}) →
          </button>
        </div>
      </div>
    </div>
  );
}
