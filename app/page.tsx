import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { About } from "@/components/sections/about"
import { Metrics } from "@/components/sections/metrics"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      <Hero />
      <Services />
      <About />
      <Metrics />
      <CTA />
      <Footer />
    </main>
  )
}