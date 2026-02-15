import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nexora.com"),
  title: {
    default: "NEXORA - Advanced Full Stack SaaS Platform",
    template: "%s | NEXORA"
  },
  description: "Build enterprise-grade SaaS applications with NEXORA. Features include authentication, role-based access control, admin dashboard, and more.",
  keywords: ["NEXORA", "SaaS", "Full Stack", "React", "Next.js", "TypeScript", "Authentication", "Admin Panel"],
  authors: [{ name: "NEXORA Team" }],
  creator: "NEXORA",
  publisher: "NEXORA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexora.com",
    siteName: "NEXORA",
    title: "NEXORA - Advanced Full Stack SaaS Platform",
    description: "Build enterprise-grade SaaS applications with NEXORA.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXORA - Advanced Full Stack SaaS Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA - Advanced Full Stack SaaS Platform",
    description: "Build enterprise-grade SaaS applications with NEXORA.",
    creator: "@nexora"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0ea5e9" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
