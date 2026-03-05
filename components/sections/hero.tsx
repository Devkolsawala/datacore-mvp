"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Terminal, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { useContact } from "@/components/contact-provider"

const HEADLINE_WORDS = ["Engineering", "the", "Future", "of"]
const HEADLINE_ACCENT = ["Data &", "Intelligence"]

const stats = [
  { value: "10M+", label: "Data Points / Day" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "3+", label: "Years Building" },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { openContact } = useContact()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* ── Background image with parallax ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Hero Background"
          fill
          priority
          quality={80}
          className="object-cover"
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50" />

      {/* ── Animated grid ── */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* ── Ambient floating orbs ── */}
      <div className="absolute z-[2] top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute z-[2] bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container px-4 md:px-6 mx-auto pt-20"
      >
        <div className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.03)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All Systems Operational
            <span className="h-3 w-px bg-white/20" />
            <span className="text-zinc-500 text-xs">v2.4.1</span>
          </motion.div>

          {/* Headline — word-by-word stagger */}
          <div className="space-y-2">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-4">
              {HEADLINE_ACCENT.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + (HEADLINE_WORDS.length + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="max-w-[680px] text-zinc-400 text-lg md:text-xl leading-relaxed"
          >
            We build scalable analytics infrastructure and high-performance
            applications for forward-thinking enterprises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <button
              onClick={openContact}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-zinc-50 hover:shadow-[0_0_50px_rgba(255,255,255,0.18)] active:scale-[0.98]"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <Terminal className="h-4 w-4 text-blue-400" />
              Explore Services
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="w-full max-w-3xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.06]"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-0.5 bg-zinc-950/80 py-5 px-4 backdrop-blur-sm transition-colors hover:bg-zinc-900/60"
              >
                <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {value}
                </span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-600 hover:text-zinc-400 transition-colors"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}