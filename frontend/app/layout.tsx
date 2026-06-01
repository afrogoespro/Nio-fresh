import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIO — Outreach on Autopilot",
  description: "AI-powered cold outreach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "inherit", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
