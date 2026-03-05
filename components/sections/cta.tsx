"use client"

import { useContact } from "@/components/contact-provider"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, CheckCircle2, Clock, Shield } from "lucide-react"

const trustBadges = [
  { icon: CheckCircle2, label: "No commitment required" },
  { icon: Clock,        label: "Response within 24h" },
  { icon: Shield,       label: "NDA available on request" },
]

export function CTA() {
  const { openContact } = useContact()

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-zinc-950"
    >
      {/* ── Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/6 blur-[120px] rounded-full mix-blend-screen" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          {/* Main card */}
          <div className="relative group rounded-[2rem] overflow-hidden border border-white/[0.08] bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.08)] px-6 py-20 md:px-16 md:py-24 text-center">

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

            {/* Animated border glow */}
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-blue-600/30 via-transparent to-cyan-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />

            <div className="relative z-10 flex flex-col items-center space-y-8">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
                Let's Build Something
              </motion.div>

              {/* Headline */}
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
                Ready to engineer your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                  digital future?
                </span>
              </h2>

              <p className="max-w-[560px] text-zinc-400 text-lg leading-relaxed">
                Partner with a team that prioritizes scalable architecture,
                bank-grade security, and measurable business results — not just
                lines of code.
              </p>

              {/* CTA Button */}
              <button
                onClick={openContact}
                className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full p-[1px] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {/* Spinning conic gradient border */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60a5fa_0%,#312e81_50%,#60a5fa_100%)]"
                />
                <span className="relative inline-flex items-center gap-3 rounded-full bg-zinc-950 px-9 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 group-hover/btn:bg-zinc-900 group-hover/btn:shadow-[0_0_30px_rgba(96,165,250,0.15)]">
                  Launch Your Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </button>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-zinc-500">
                    <Icon className="h-4 w-4 text-zinc-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}