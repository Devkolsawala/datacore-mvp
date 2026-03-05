"use client"

import {
  Database,
  TrendingUp,
  ShieldCheck,
  Zap,
  Server,
  BrainCircuit,
  Code2,
  CheckCircle2,
} from "lucide-react"
import { motion } from "framer-motion"

const featureRows = [
  {
    icon: Database,
    title: "Heavy-Lifting Data Engineering",
    desc: "We process terabytes, not megabytes. Scalable warehouses like Snowflake & BigQuery are our native playground.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/10 group-hover:border-blue-500/25",
  },
  {
    icon: TrendingUp,
    title: "Predictive, Not Just Descriptive",
    desc: "Dashboards show what happened. Our algorithms tell you what's about to — before it does.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/10 group-hover:border-emerald-500/25",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security By Default",
    desc: "SOC2-aligned architecture, encrypted at rest & in transit, with least-privilege IAM baked in from the start.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/10 group-hover:border-violet-500/25",
  },
]

const statCards = [
  { icon: Zap, value: "3+", label: "Years of Innovation", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", delay: 0.1 },
  { icon: Server, value: "50+", label: "Enterprise Pipelines", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", delay: 0.2 },
]

export function About() {
  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -translate-x-1/3 w-[500px] h-[500px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-start">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="space-y-10 lg:sticky lg:top-28"
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Code2 className="w-4 h-4 mr-2 text-blue-400" />
              The DataCore Difference
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We don't just <br className="hidden sm:block" />write code.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                We decode your business.
              </span>
            </h2>

            {/* Text blocks */}
            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                Most agencies build empty shells — apps that look good but lack
                intelligence. We started{" "}
                <span className="text-white font-semibold">3+ years ago</span>{" "}
                with a different premise:
              </p>
              <blockquote className="border-l-2 border-blue-500/50 pl-5 italic text-zinc-300 text-[17px]">
                "Software is useless if it doesn't make you smarter."
              </blockquote>
              <p>
                We are data engineers first. While others figure out how to
                connect an API, we architect custom ETL pipelines, train
                predictive models, and turn historical noise into clear,
                actionable signals.
              </p>
            </div>

            {/* Feature rows */}
            <div className="space-y-2 pt-2">
              {featureRows.map(({ icon: Icon, title, desc, color, bg, border }) => (
                <div
                  key={title}
                  className={`group flex items-start gap-4 p-4 rounded-2xl border bg-transparent hover:bg-zinc-900/40 transition-all duration-300 cursor-default ${border}`}
                >
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} border border-white/5`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="relative grid grid-cols-2 gap-4">

            {/* Stat cards */}
            {statCards.map(({ icon: Icon, value, label, color, bg, border, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl bg-zinc-900/50 border ${border} backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300 group cursor-default`}
              >
                <div className={`h-11 w-11 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</div>
                <div className="text-sm font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">{label}</div>
              </motion.div>
            ))}

            {/* Testimonial card (full width) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-span-2 relative group p-8 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800 overflow-hidden shadow-2xl"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/8 blur-[60px] rounded-full pointer-events-none group-hover:bg-emerald-500/12 transition-colors duration-700" />

              {/* Watermark icon */}
              <div className="absolute bottom-4 right-6 text-zinc-800/40 group-hover:text-emerald-500/8 transition-colors duration-500">
                <BrainCircuit className="h-24 w-24" />
              </div>

              <div className="space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified Client Outcome
                </div>

                <p className="text-lg font-medium text-zinc-200 leading-relaxed">
                  "Other agencies gave us a spreadsheet. DataCore built a live
                  prediction engine that saved us{" "}
                  <span className="text-emerald-400 font-bold">$1.2M in inventory waste</span>{" "}
                  within the first quarter."
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700 ring-2 ring-emerald-500/10">
                    CTO
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Series-B Logistics Platform</div>
                    <div className="text-xs text-zinc-500">Bangalore, India</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* "Why us" quick list card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
              className="col-span-2 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                Why clients choose us
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "No black-box handoffs",
                  "Async-first team",
                  "Full code ownership",
                  "Dedicated eng pod",
                  "Weekly live demos",
                  "Cancel anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}