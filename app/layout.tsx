import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ContactProvider } from "@/components/contact-provider" // Make sure this is imported
import { Chatbot } from "@/components/ui/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DataCore | Analytics & Application Development",
  description: "Enterprise-grade data analytics and full-stack application development services.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-white antialiased`}>
        {/* The Provider MUST wrap everything */}
        <ContactProvider>
          <Navbar />
          {children}
          <Chatbot />
        </ContactProvider>
      </body>
    </html>
  )
}