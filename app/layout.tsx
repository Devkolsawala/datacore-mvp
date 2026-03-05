import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ContactProvider } from "@/components/contact-provider"
import { Chatbot } from "@/components/ui/chatbot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DataCore | Analytics & Application Development",
  description:
    "Enterprise-grade data analytics and full-stack application development services.",
  keywords: [
    "data analytics",
    "application development",
    "AI automation",
    "enterprise software",
    "Next.js",
  ],
  authors: [{ name: "DataCore Solutions" }],
  openGraph: {
    title: "DataCore | Analytics & Application Development",
    description:
      "Enterprise-grade data analytics and full-stack application development services.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Syne — distinctive geometric display font, no tailwind.config change needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root { --font-syne: 'Syne', sans-serif; }
          h1, h2, h3, h4, .font-display { font-family: var(--font-syne) !important; }
        `}</style>
      </head>
      <body
        className={`${inter.variable} min-h-screen bg-zinc-950 text-white antialiased`}
      >
        <ContactProvider>
          <Navbar />
          {children}
          <Chatbot />
        </ContactProvider>
      </body>
    </html>
  )
}