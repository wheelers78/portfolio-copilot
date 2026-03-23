import type { Metadata } from "next";
import { Google_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Google_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paul Whelan — Product Design Lead",
  description:
    "I design systems, AI-powered tools, and platform experiences that help teams turn complexity into clarity.",
  openGraph: {
    title: "Paul Whelan — Product Design Lead",
    description:
      "I design systems, AI-powered tools, and platform experiences that help teams turn complexity into clarity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
