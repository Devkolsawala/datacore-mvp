"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const metrics = [
  { label: "Data Points Processed", value: "10M+" },
  { label: "AI Models Deployed", value: "50+" },
  { label: "Client Efficiency Gain", value: "40%" },
  { label: "Uptime Guaranteed", value: "99.9%" },
]

export function Metrics() {
  return (
    <section id="metrics" className="border-y border-zinc-800 bg-zinc-950/50 py-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center justify-center space-y-2 text-center cursor-default"
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <AnimatedCounter value={metric.value} />
              </div>

              <span className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-wider transition-colors duration-300 group-hover:text-zinc-300">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({ value }: { value: string }) {
  // FIXED: Changed HTMLSpanElement to HTMLDivElement to match the <div> below
  const ref = useRef<HTMLDivElement>(null)
  
  const match = value.match(/([\d.]+)(.*)/)
  const numberPart = match ? parseFloat(match[1]) : 0
  const suffixPart = match ? match[2] : ""

  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    duration: 1.5
  })

  const displayValue = useTransform(springValue, (current) => {
    const isFloat = numberPart % 1 !== 0
    return isFloat ? current.toFixed(1) : Math.round(current).toString()
  })

  useEffect(() => {
    if (isInView) {
      springValue.set(numberPart)
    }
  }, [isInView, numberPart, springValue])

  return (
    <div ref={ref} className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center justify-center gap-0.5 transition-colors duration-300 group-hover:text-blue-400">
      <motion.span>{displayValue}</motion.span>
      <span>{suffixPart}</span>
    </div>
  )
}