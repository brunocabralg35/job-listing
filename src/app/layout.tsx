import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.module.scss";

const league = League_Spartan({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Job Listing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ boxSizing: "border-box", padding: 0, margin: 0 }}
        className={league.className}
      >
        {children}
      </body>
    </html>
  );
}
