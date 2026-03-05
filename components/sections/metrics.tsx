"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { TrendingUp, Activity, Users, Shield } from "lucide-react"

const metrics = [
  {
    icon: Activity,
    value: "10M+",
    label: "Data Points Processed Daily",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/10",
  },
  {
    icon: TrendingUp,
    value: "50+",
    label: "AI Models in Production",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
  },
  {
    icon: Users,
    value: "40%",
    label: "Avg. Client Efficiency Gain",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Guaranteed Uptime SLA",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
  },
]

export function Metrics() {
  return (
    <section id="metrics" className="relative py-20 overflow-hidden border-y border-zinc-800/50 bg-zinc-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-transparent to-emerald-500/[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[600px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-2xl bg-zinc-900/30 border ${metric.border} cursor-default transition-all duration-300 hover:bg-zinc-900/60 hover:shadow-lg ${metric.glow}`}
            >
              {/* Icon */}
              <div className={`h-10 w-10 rounded-xl ${metric.bg} border ${metric.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>

              {/* Counter */}
              <div>
                <AnimatedCounter value={metric.value} color={metric.color} />
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mt-1.5 leading-tight group-hover:text-zinc-400 transition-colors">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const match = value.match(/([\d.]+)(.*)/)
  const numberPart = match ? parseFloat(match[1]) : 0
  const suffixPart = match ? match[2] : ""

  const isInView = useInView(ref, { once: true, margin: "-40px" })

  const springValue = useSpring(0, { stiffness: 50, damping: 18 })

  const displayValue = useTransform(springValue, (current) => {
    const isFloat = numberPart % 1 !== 0
    return isFloat ? current.toFixed(1) : Math.round(current).toString()
  })

  useEffect(() => {
    if (isInView) springValue.set(numberPart)
  }, [isInView, numberPart, springValue])

  return (
    <div
      ref={ref}
      className={`flex items-baseline justify-center gap-0.5 text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:${color} transition-colors duration-500`}
    >
      <motion.span>{displayValue}</motion.span>
      <span className={`${color}`}>{suffixPart}</span>
    </div>
  )
}