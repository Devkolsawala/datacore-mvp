import { Hero } from "@/components/sections/hero"
import { TechMarquee } from "@/components/ui/tech-marquee"
import { Services } from "@/components/sections/services"
import { About } from "@/components/sections/about"
import { Metrics } from "@/components/sections/metrics"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { Analytics } from '@vercel/analytics/next';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Navbar is rendered globally in layout.tsx — do NOT render it again here */}
      <Hero />
      <TechMarquee />
      <Services />
      <About />
      <Metrics />
      <CTA />
      <Footer />
      <Analytics />
    </main>
  )
}