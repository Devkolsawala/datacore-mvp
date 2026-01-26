"use client"

import { motion } from "framer-motion"

const metrics = [
  { label: "Data Points Processed", value: "10M+" },
  { label: "AI Models Deployed", value: "50+" },
  { label: "Client Efficiency Gain", value: "40%" },
  { label: "Uptime Guaranteed", value: "99.9%" },
]

export function Metrics() {
  return (
    // Reduced padding: py-16 -> py-12
    <section id="metrics" className="border-y border-zinc-800 bg-zinc-950/50 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] bg-blue-500/20 blur-[100px] rounded-full"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-2 text-center"
            >
              <span className="text-3xl md:text-5xl font-bold text-white tracking-tight">{metric.value}</span>
              <span className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-wider">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}