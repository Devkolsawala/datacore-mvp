"use client"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Smartphone, Globe, BarChart3, ArrowUpRight, BrainCircuit, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useContact } from "@/components/contact-provider"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const services = [
  {
    id: "01",
    title: "AI & Automation",
    description:
      "Deploy custom agents and RAG chatbots. We automate complex workflows — from data ingestion to intelligent decision-making — with precision and reliability.",
    icon: BrainCircuit,
    tags: ["LLM", "RAG", "Agents", "MLOps"],
    spotlight: "rgba(59,130,246,0.18)",
    accent: "blue",
    badge: "Flagship",
    featured: true,
  },
  {
    id: "02",
    title: "Data Analytics",
    description:
      "Turn raw data into strategic assets. Real-time visualization pipelines, custom dashboards, and predictive models that surface insights before they matter.",
    icon: BarChart3,
    tags: ["Snowflake", "BigQuery", "dbt", "Looker"],
    spotlight: "rgba(168,85,247,0.18)",
    accent: "purple",
    featured: false,
  },
  {
    id: "03",
    title: "Mobile Engineering",
    description:
      "High-performance React Native & Flutter apps. Pixel-perfect UI, offline-first architecture, and 60fps animations baked in from day one.",
    icon: Smartphone,
    tags: ["React Native", "Flutter", "Expo"],
    spotlight: "rgba(16,185,129,0.18)",
    accent: "emerald",
    featured: false,
  },
  {
    id: "04",
    title: "Web Platforms",
    description:
      "Next.js enterprise architecture that scales to millions. ISR, edge functions, SEO-hardened, and built to survive your next traffic spike.",
    icon: Globe,
    tags: ["Next.js", "TypeScript", "Edge", "CDN"],
    spotlight: "rgba(249,115,22,0.18)",
    accent: "orange",
    featured: true,
  },
]

const accentClasses: Record<string, { icon: string; tag: string; border: string; num: string }> = {
  blue:    { icon: "text-blue-400",    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",    border: "group-hover:border-blue-500/30",    num: "text-blue-500/30" },
  purple:  { icon: "text-purple-400",  tag: "bg-purple-500/10 text-purple-400 border-purple-500/20", border: "group-hover:border-purple-500/30", num: "text-purple-500/30" },
  emerald: { icon: "text-emerald-400", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", border: "group-hover:border-emerald-500/30", num: "text-emerald-500/30" },
  orange:  { icon: "text-orange-400",  tag: "bg-orange-500/10 text-orange-400 border-orange-500/20",  border: "group-hover:border-orange-500/30",  num: "text-orange-500/30" },
}

export function Services() {
  const { openContact } = useContact()

  return (
    <section id="services" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-5 mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
            Engineering for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              next generation.
            </span>
          </h2>
          <p className="max-w-[600px] text-zinc-400 md:text-lg leading-relaxed">
            Mission-critical infrastructure that powers scalable businesses across every layer of the stack.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((svc) => {
            const ac = accentClasses[svc.accent]
            return (
              <motion.div
                key={svc.id}
                variants={cardVariants}
                className={svc.featured ? "lg:col-span-2" : ""}
              >
                <SpotlightCard
                  spotlightColor={svc.spotlight}
                  className={`group cursor-pointer bg-zinc-900/40 border-zinc-800/60 h-full transition-all duration-500 ${ac.border}`}
                  onClick={openContact}
                >
                  <div className="relative h-full flex flex-col p-7 md:p-8">

                    {/* Card number watermark */}
                    <span className={`absolute top-6 right-7 text-6xl font-bold select-none pointer-events-none ${ac.num} transition-colors duration-500`}>
                      {svc.id}
                    </span>

                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/50 shadow-inner transition-all duration-500 group-hover:border-white/10 group-hover:shadow-lg">
                        <svc.icon className={`h-6 w-6 ${ac.icon} transition-colors duration-300`} />
                      </div>
                      {svc.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          {svc.badge}
                        </span>
                      )}
                    </div>

                    {/* Title + description */}
                    <div className="flex-1 space-y-3 mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-snug transition-colors duration-300 group-hover:text-white/90">
                        {svc.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                        {svc.description}
                      </p>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded-md border text-[11px] font-mono font-medium ${ac.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA link */}
                    <div className={`flex items-center gap-1.5 text-sm font-medium text-zinc-500 group-hover:${ac.icon} transition-colors duration-300`}>
                      <span>View Solutions</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}